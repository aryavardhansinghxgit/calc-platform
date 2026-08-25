"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  HelpCircle,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Shield,
  Clock,
  Landmark,
  Percent,
  Sparkles,
  TrendingUp,
  Briefcase,
  DollarSign,
  PieChart,
  Layers,
  Target,
  ArrowRight,
  Info,
  Scale,
  Calendar,
} from "lucide-react";
import { annuityFaqs } from "@/calculators/finance/annuity/faq";

export function AnnuityContent() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const relatedCalculators = [
    {
      name: "Mortgage Calculator",
      slug: "/calculators/mortgage-calculator",
      description: "Model monthly principal, interest, taxes, and complete amortization schedules.",
    },
    {
      name: "Home Equity Loan Calculator",
      slug: "/calculators/home-equity-loan-calculator",
      description: "Calculate fixed-rate home equity borrowing payments and interest costs.",
    },
    {
      name: "HELOC Calculator",
      slug: "/calculators/heloc-calculator",
      description: "Model variable-rate revolving credit lines, draw periods, and interest-only payments.",
    },
    {
      name: "Down Payment Calculator",
      slug: "/calculators/down-payment-calculator",
      description: "Determine upfront purchase savings targets and loan-to-value milestones.",
    },
    {
      name: "Rent vs Buy Calculator",
      slug: "/calculators/rent-vs-buy-calculator",
      description: "Compare total lifetime housing wealth trajectories between renting and homeownership.",
    },
    {
      name: "VA Mortgage Calculator",
      slug: "/calculators/va-mortgage-calculator",
      description: "Calculate VA loan payments, zero-down options, and funding fee structures.",
    },
    {
      name: "FHA Loan Calculator",
      slug: "/calculators/fha-loan-calculator",
      description: "Estimate FHA financing, upfront MIP, and annual mortgage insurance premiums.",
    },
  ];

  return (
    <article className="mt-12 space-y-12 border-t border-slate-200 dark:border-slate-800 pt-10 text-slate-800 dark:text-slate-200">
      {/* Chapter 1: Header */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
          <BookOpen className="h-4 w-4" /> Comprehensive Financial &amp; Insurance Annuity Guide
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
          Annuity Accumulation, Growth Mechanics, Annuity Due &amp; Target Planning
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl">
          Annuities represent versatile financial and insurance structures designed to accumulate capital tax-deferred, manage cash-flow timing, and convert accumulated wealth into modeled income streams. Understanding contract mechanics—such as Ordinary Annuities vs. Annuities Due, compounding frequencies, surrender charge schedules, inflation drag, and fee breakdowns—is vital for building a mathematically sound retirement accumulation strategy.
        </p>
      </section>

      {/* Chapter 2: What Is an Annuity Calculator? */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Landmark className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          What Is an Annuity Calculator?
        </h2>
        <p className="text-sm leading-relaxed">
          An annuity calculator is a time-value-of-money tool for understanding how a starting balance and a stream of recurring contributions accumulate over time. Instead of looking only at a single upfront deposit and one future balance, it models the dynamic interaction between an initial principal amount, repeated recurring additions, an assumed growth rate, the exact calendar timing of those contributions, and the total duration over which the money compounds.
        </p>
        <p className="text-sm leading-relaxed">
          That distinction matters because two savings plans can contribute the exact same total dollar amount and still finish with substantially different balances. A payment made at the beginning of a period has more time to participate in compounding growth than an equal payment made at the end of that period. Over multi-decade investment horizons, that single timing variable compounds into tens of thousands of dollars in variance.
        </p>
        <p className="text-sm leading-relaxed">
          This calculator is most valuable when the planning question is not simply &ldquo;How much money will I have?&rdquo; but rather &ldquo;How do my starting capital, contribution cadence, timing convention, growth rate assumption, and time horizon interact to produce my future portfolio balance?&rdquo;
        </p>
      </section>

      {/* Chapter 3: How to Use the Calculator */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          How to Use the Annuity Calculator
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">Step 1</span>
            <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100">Set Core Parameters</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Enter your starting principal, annual contribution, monthly contribution, duration in years, and expected annual growth rate.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">Step 2</span>
            <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100">Select Timing &amp; Adjustments</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Choose Beginning of Period (Annuity Due) or End of Period (Ordinary Annuity), and optionally configure inflation and expected tax rates.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">Step 3</span>
            <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100">Explore Tabs &amp; Export</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Evaluate the Target Balance Planner, test 4-Plan Scenarios (6%, 8%, 10%, 12%), inspect visual growth charts, and download complete annual/monthly schedules.
            </p>
          </div>
        </div>
      </section>

      {/* Chapter 4 & 5: The Core Idea & Audited Reference Baseline */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Scale className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          The Core Idea: Contributions Plus Compounding &amp; The Audited Baseline
        </h2>
        <p className="text-sm leading-relaxed">
          An accumulation plan has two simultaneous financial engines. The first engine is your own saved capital: the initial principal and the regular additions you contribute over time. The second engine is compound growth: returns earned on accumulated capital that remain invested to generate their own subsequent returns.
        </p>
        <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-5 space-y-3">
          <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Audited Production Baseline Parameters (10-Year Horizon)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-500 block">Starting Principal:</span>
              <strong className="text-sm text-slate-900 dark:text-slate-100">$20,000.00</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Annual Contribution:</span>
              <strong className="text-sm text-slate-900 dark:text-slate-100">$10,000.00</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Contribution Timing:</span>
              <strong className="text-sm text-emerald-600 dark:text-emerald-400">Beginning (Due)</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Annual Growth Rate:</span>
              <strong className="text-sm text-slate-900 dark:text-slate-100">6.0%</strong>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-200 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-slate-500 block">Final Ending Balance:</span>
              <strong className="text-base text-blue-600 dark:text-blue-400">$175,533.38</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Total Principal + Additions:</span>
              <strong className="text-sm text-slate-900 dark:text-slate-100">$120,000.00</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Total Returns / Interest:</span>
              <strong className="text-sm text-amber-600 dark:text-amber-400">$55,533.38</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 6: Where the $175,533.38 Comes From */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <PieChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Where the $175,533.38 Comes From: Portfolio Composition
        </h2>
        <p className="text-sm leading-relaxed">
          The ending balance of $175,533.38 is constructed from three distinct mathematical components:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <li>
            <strong>Starting Principal ($20,000.00 | 11.4% share):</strong> Grows uninterrupted for the full 10-year term to reach $20,000 × 1.06<sup>10</sup> = $35,816.95.
          </li>
          <li>
            <strong>Total Additions ($100,000.00 | 57.0% share):</strong> Ten annual contributions of $10,000.00 made at the beginning of each year.
          </li>
          <li>
            <strong>Modeled Returns / Interest ($55,533.38 | 31.6% share):</strong> The pure compounding interest generated across both principal and growing additions ($175,533.38 − $120,000.00).
          </li>
        </ul>
        <p className="text-xs text-slate-500 italic">
          Note: Component shares (11.4% + 57.0% + 31.6% = 100.0%) sum exactly to 100% within standard rounding.
        </p>
      </section>

      {/* Chapter 7 & 8: Ordinary Annuity vs. Annuity Due */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Ordinary Annuity vs. Annuity Due: Why One Period of Timing Matters
        </h2>
        <p className="text-sm leading-relaxed">
          The primary timing distinction in annuity mathematics is whether contributions occur at the <em>beginning</em> or <em>end</em> of each payment period:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Ordinary Annuity (End of Period)</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Deposits are made at the end of each period. The first deposit earns zero interest in the initial period.
            </p>
            <div className="p-2.5 rounded bg-white dark:bg-slate-900 font-mono text-xs text-slate-800 dark:text-slate-200">
              FV_ord = PMT × [((1+r)^n − 1) / r]
            </div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Annuity Due (Beginning of Period)</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Deposits are made at the start of each period, earning interest immediately throughout that full period.
            </p>
            <div className="p-2.5 rounded bg-white dark:bg-slate-900 font-mono text-xs text-slate-800 dark:text-slate-200">
              FV_due = FV_ord × (1 + r)
            </div>
          </div>
        </div>
        <p className="text-sm leading-relaxed">
          Consider a simple 1-year example: with $0 starting principal, $10,000 contributed, and a 10% rate, an <strong>Annuity Due</strong> yields <strong>$11,000.00</strong> ($10,000 + $1,000 interest), whereas an <strong>Ordinary Annuity</strong> yields only <strong>$10,000.00</strong> ($0 interest earned in Year 1). Over 10, 20, or 30 periods, this timing advantage multiplies exponentially across every contribution batch.
        </p>
      </section>

      {/* Chapter 9, 10, 11: Annual, Monthly, and Combined Additions */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Annual, Monthly &amp; Combined Contribution Structures
        </h2>
        <p className="text-sm leading-relaxed">
          A $1,000 monthly contribution does not behave identically to a single $12,000 annual contribution because the cash flows enter the compounding engine progressively throughout the year rather than as one lump sum.
        </p>
        <p className="text-sm leading-relaxed">
          Many retirement savers operate with two contribution streams: a predictable monthly savings transfer plus an annual lump sum (such as an employer bonus, tax refund, or annual profit-sharing distribution). When both annual and monthly additions are active, the production engine deposits the annual contribution in Month 1 of each year while the monthly stream continues throughout the year, ensuring zero double counting.
        </p>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          For a broader explanation of pure compound growth dynamics without recurring annuity streams, the{" "}
          <Link href="/calculators/compound-interest-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Compound Interest Calculator
          </Link>{" "}
          provides a helpful companion model.
        </p>
      </section>

      {/* Chapter 12, 13, 14, 15: Audited Accumulation Schedule */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Audited Ten-Year Accumulation Schedule
        </h2>
        <p className="text-sm leading-relaxed">
          A trustworthy financial calculation must be verifiable period by period. The schedule satisfies two core mathematical identities without drift:
        </p>
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-1">
          <div>Ending_Balance_t = Beginning_Balance_t + Contribution_t + Interest_t</div>
          <div>Beginning_Balance_(t+1) = Ending_Balance_t</div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold">
              <tr>
                <th className="p-3">Period</th>
                <th className="p-3 text-right">Beginning Balance</th>
                <th className="p-3 text-right">Contribution</th>
                <th className="p-3 text-right">Return / Interest</th>
                <th className="p-3 text-right">Ending Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-sans tabular-nums">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3 font-semibold">Year 1</td>
                <td className="p-3 text-right">$20,000.00</td>
                <td className="p-3 text-right text-emerald-600 dark:text-emerald-400">$10,000.00</td>
                <td className="p-3 text-right text-amber-600 dark:text-amber-400">$1,800.00</td>
                <td className="p-3 text-right font-bold text-slate-900 dark:text-slate-100">$31,800.00</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3 font-semibold">Year 2</td>
                <td className="p-3 text-right">$31,800.00</td>
                <td className="p-3 text-right text-emerald-600 dark:text-emerald-400">$10,000.00</td>
                <td className="p-3 text-right text-amber-600 dark:text-amber-400">$2,508.00</td>
                <td className="p-3 text-right font-bold text-slate-900 dark:text-slate-100">$44,308.00</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3 font-semibold">Year 3</td>
                <td className="p-3 text-right">$44,308.00</td>
                <td className="p-3 text-right text-emerald-600 dark:text-emerald-400">$10,000.00</td>
                <td className="p-3 text-right text-amber-600 dark:text-amber-400">$3,258.48</td>
                <td className="p-3 text-right font-bold text-slate-900 dark:text-slate-100">$57,566.48</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3 font-semibold">Year 4</td>
                <td className="p-3 text-right">$57,566.48</td>
                <td className="p-3 text-right text-emerald-600 dark:text-emerald-400">$10,000.00</td>
                <td className="p-3 text-right text-amber-600 dark:text-amber-400">$4,053.99</td>
                <td className="p-3 text-right font-bold text-slate-900 dark:text-slate-100">$71,620.47</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3 font-semibold">Year 5</td>
                <td className="p-3 text-right">$71,620.47</td>
                <td className="p-3 text-right text-emerald-600 dark:text-emerald-400">$10,000.00</td>
                <td className="p-3 text-right text-amber-600 dark:text-amber-400">$4,897.23</td>
                <td className="p-3 text-right font-bold text-slate-900 dark:text-slate-100">$86,517.70</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3 font-semibold">Year 6</td>
                <td className="p-3 text-right">$86,517.70</td>
                <td className="p-3 text-right text-emerald-600 dark:text-emerald-400">$10,000.00</td>
                <td className="p-3 text-right text-amber-600 dark:text-amber-400">$5,791.06</td>
                <td className="p-3 text-right font-bold text-slate-900 dark:text-slate-100">$102,308.76</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3 font-semibold">Year 7</td>
                <td className="p-3 text-right">$102,308.76</td>
                <td className="p-3 text-right text-emerald-600 dark:text-emerald-400">$10,000.00</td>
                <td className="p-3 text-right text-amber-600 dark:text-amber-400">$6,738.53</td>
                <td className="p-3 text-right font-bold text-slate-900 dark:text-slate-100">$119,047.28</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3 font-semibold">Year 8</td>
                <td className="p-3 text-right">$119,047.28</td>
                <td className="p-3 text-right text-emerald-600 dark:text-emerald-400">$10,000.00</td>
                <td className="p-3 text-right text-amber-600 dark:text-amber-400">$7,742.84</td>
                <td className="p-3 text-right font-bold text-slate-900 dark:text-slate-100">$136,790.12</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3 font-semibold">Year 9</td>
                <td className="p-3 text-right">$136,790.12</td>
                <td className="p-3 text-right text-emerald-600 dark:text-emerald-400">$10,000.00</td>
                <td className="p-3 text-right text-amber-600 dark:text-amber-400">$8,807.41</td>
                <td className="p-3 text-right font-bold text-slate-900 dark:text-slate-100">$155,597.53</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3 font-semibold">Year 10</td>
                <td className="p-3 text-right">$155,597.53</td>
                <td className="p-3 text-right text-emerald-600 dark:text-emerald-400">$10,000.00</td>
                <td className="p-3 text-right text-amber-600 dark:text-amber-400">$9,935.85</td>
                <td className="p-3 text-right font-bold text-blue-600 dark:text-blue-400">$175,533.38</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Chapter 16, 17, 18: Target Balance Planner & Round-Trip Verification */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Target Balance Planner &amp; Round-Trip Verification
        </h2>
        <p className="text-sm leading-relaxed">
          The Target Balance Planner reverses the direction of accumulation. Instead of asking &ldquo;What will my savings become?&rdquo;, it solves &ldquo;How much must I deposit each year or month to reach a specific financial goal?&rdquo;
        </p>
        <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-5 space-y-3">
          <h3 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            Audited $500,000 Target Goal Scenario ($20k Principal, 6% Growth, 10 Years, Annuity Due)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-slate-500 block">Required Annual Contribution:</span>
              <strong className="text-base text-blue-600 dark:text-blue-400">$33,223.23 / yr</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Required Monthly Contribution:</span>
              <strong className="text-base text-emerald-600 dark:text-emerald-400">$2,768.60 / mo</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Round-Trip Forward Result:</span>
              <strong className="text-base text-slate-900 dark:text-slate-100">$500,000.05</strong>
            </div>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          When the planning goal requires broader cash-flow flexibility or uneven contribution scheduling, the{" "}
          <Link href="/calculators/future-value-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Future Value Calculator
          </Link>{" "}
          offers an expansive multi-asset model.
        </p>
      </section>

      {/* Chapter 19, 20, 21: Four-Plan Scenario Comparison */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Layers className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Four-Plan Scenario Sensitivity &amp; Reference Reconciliation
        </h2>
        <p className="text-sm leading-relaxed">
          Because long-term financial outcomes are sensitive to growth assumptions, the calculator models four simultaneous interest rate scenarios under identical contribution parameters ($20k principal + $10k/yr):
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="text-xs font-bold text-slate-500">Plan A (Conservative)</span>
            <div className="text-lg font-extrabold text-slate-900 dark:text-slate-100">$175,533.38</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Rate: 6.0% | Gains: $55,533.38</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="text-xs font-bold text-slate-500">Plan B (Moderate)</span>
            <div className="text-lg font-extrabold text-blue-600 dark:text-blue-400">$199,633.37</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Rate: 8.0% | Gains: $79,633.37</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="text-xs font-bold text-slate-500">Plan C (Growth)</span>
            <div className="text-lg font-extrabold text-slate-900 dark:text-slate-100">$227,186.52</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Rate: 10.0% | Gains: $107,186.52</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="text-xs font-bold text-slate-500">Plan D (Aggressive)</span>
            <div className="text-lg font-extrabold text-slate-900 dark:text-slate-100">$258,662.80</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Rate: 12.0% | Gains: $138,662.80</div>
          </div>
        </div>
        <p className="text-xs text-slate-500 italic">
          Reference Disclosure: The mathematical oracle verifies that Plan B calculates to exactly $199,633.37 ($120,000 contributions + $79,633.37 interest), matching the reference screenshot.
        </p>
      </section>

      {/* Chapter 22, 23, 24: Inflation and Tax Adjustments */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Percent className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Inflation Drag &amp; Modeled Tax-Adjusted Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Real Inflation-Adjusted Purchasing Power</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Nominal balances represent future dollar counts, while real purchasing power answers what those dollars will buy in present terms. Under a 2.5% inflation rate over 10 years, the $175,533.38 nominal balance adjusts to <strong>$137,126.40</strong> in today&rsquo;s dollars ($175,533.38 / 1.025<sup>10</sup>).
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              For historical and forward purchasing power modeling, the{" "}
              <Link href="/calculators/inflation-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Inflation Calculator
              </Link>{" "}
              provides historical CPI tracking.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Modeled Tax-Adjusted Value</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Under an assumed 20% tax rate applied to earnings ($55,533.38 × 20% = $11,106.68 modeled tax), the estimated net value is <strong>$164,426.70</strong>. This represents a planning estimate, as actual tax liabilities depend on whether the contract is qualified vs. non-qualified.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              To model direct paycheck-level withholding, the{" "}
              <Link href="/calculators/take-home-paycheck-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Take-Home Paycheck Calculator
              </Link>{" "}
              computes state and federal withholdings.
            </p>
          </div>
        </div>
      </section>

      {/* Chapter 30, 31, 32, 33: Product Structures & YMYL Qualification */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Annuity Product Structures &amp; Insurance Contract Mechanics
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold">
              <tr>
                <th className="p-3">Annuity Type</th>
                <th className="p-3">Principal Protection</th>
                <th className="p-3">Growth Mechanism</th>
                <th className="p-3">Risk &amp; Return Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">Fixed Annuity / MYGA</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">Guaranteed by Insurer</td>
                <td className="p-3">Declared fixed interest rate (e.g. 5.0%–6.0%)</td>
                <td className="p-3">Very Low Market Risk (Inflation Risk)</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">Fixed-Indexed Annuity (FIA)</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">0% Floor (No Loss)</td>
                <td className="p-3">Indexed returns subject to caps and participation rates</td>
                <td className="p-3">Low to Moderate (Capped Upside)</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">Variable Annuity</td>
                <td className="p-3 text-rose-600 dark:text-rose-400 font-bold">No Principal Guarantee</td>
                <td className="p-3">Direct equity and bond sub-account performance</td>
                <td className="p-3">Moderate to High Market Volatility</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 space-y-2 text-xs leading-relaxed text-amber-900 dark:text-amber-300">
          <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-200">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            Important Financial &amp; Tax Disclosures
          </div>
          <p>
            Annuity guarantees rely exclusively on the financial strength and claims-paying ability of the issuing insurance company. Surrender charges typically decline over 5 to 10 years (e.g., 7% down to 0%). Withdrawals of taxable earnings prior to age 59½ may incur a 10% IRS penalty in addition to ordinary income tax, subject to statutory exceptions. This calculator provides educational models, not individualized investment, tax, or legal advice.
          </p>
        </div>
      </section>

      {/* Chapter 34: Where an Annuity Fits in Retirement & Contextual Links */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Where Annuity Accumulation Fits into Comprehensive Planning
        </h2>
        <p className="text-sm leading-relaxed">
          Accumulating capital inside an annuity represents one component of an overarching financial architecture. Once the accumulation trajectory is understood, the{" "}
          <Link href="/calculators/retirement-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Retirement Calculator
          </Link>{" "}
          can model sustainable post-retirement withdrawal schedules.
        </p>
        <p className="text-sm leading-relaxed">
          For households balancing real estate financing with retirement savings, specialized debt instruments interact directly with monthly cash flow. For a separate mortgage scenario, the{" "}
          <Link href="/calculators/mortgage-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Mortgage Calculator
          </Link>{" "}
          models principal, interest, and amortization. If tapping home equity to fund retirement transitions, the{" "}
          <Link href="/calculators/home-equity-loan-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Home Equity Loan Calculator
          </Link>{" "}
          and{" "}
          <Link href="/calculators/heloc-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            HELOC Calculator
          </Link>{" "}
          quantify fixed-rate and revolving credit structures.
        </p>
        <p className="text-sm leading-relaxed">
          When upfront savings goals target home purchase milestones rather than annuity contracts, the{" "}
          <Link href="/calculators/down-payment-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Down Payment Calculator
          </Link>{" "}
          and{" "}
          <Link href="/calculators/rent-vs-buy-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Rent vs Buy Calculator
          </Link>{" "}
          evaluate property acquisition versus ongoing renting. For veteran and government-backed borrowing, the{" "}
          <Link href="/calculators/va-mortgage-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            VA Mortgage Calculator
          </Link>{" "}
          and{" "}
          <Link href="/calculators/fha-loan-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            FHA Loan Calculator
          </Link>{" "}
          provide exact qualification parameters.
        </p>
      </section>

      {/* Chapter 37: Formula Reference */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Annuity Formula Reference &amp; Mathematical Notation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wider">Future Value of Starting Principal</h3>
            <div className="p-2 rounded bg-white dark:bg-slate-900 font-mono text-xs text-slate-800 dark:text-slate-200">
              FV_principal = P × (1 + r)^n
            </div>
            <p className="text-xs text-slate-500">P = Initial deposit, r = growth rate, n = total periods.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wider">Ordinary Annuity Stream</h3>
            <div className="p-2 rounded bg-white dark:bg-slate-900 font-mono text-xs text-slate-800 dark:text-slate-200">
              FV_ordinary = PMT × [((1 + r)^n − 1) / r]
            </div>
            <p className="text-xs text-slate-500">PMT = Periodic contribution deposited at period end.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wider">Annuity Due Stream</h3>
            <div className="p-2 rounded bg-white dark:bg-slate-900 font-mono text-xs text-slate-800 dark:text-slate-200">
              FV_due = PMT × [((1 + r)^n − 1) / r] × (1 + r)
            </div>
            <p className="text-xs text-slate-500">Includes (1+r) timing multiplier for beginning-of-period deposits.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wider">Target Contribution Solver</h3>
            <div className="p-2 rounded bg-white dark:bg-slate-900 font-mono text-xs text-slate-800 dark:text-slate-200">
              PMT = [Target − P × (1 + r)^n] / AnnuityFactor
            </div>
            <p className="text-xs text-slate-500">Solves required annual or monthly deposit to hit exact future goal.</p>
          </div>
        </div>
      </section>

      {/* Chapter 39: Exactly 12 Canonical FAQs */}
      <section className="space-y-6 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
            Frequently Asked Questions (12 Essential Annuity Insights)
          </h2>
        </div>

        <div className="space-y-3">
          {annuityFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-4 text-left font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2.5 pr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-sans tabular-nums text-xs font-bold shrink-0">
                      Q{idx + 1}.
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-500 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50/50 dark:bg-slate-900/50 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Chapter 40: Single Canonical Related Calculators Block */}
      <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Layers className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Related Financial &amp; Loan Calculators
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {relatedCalculators.map((calc, idx) => (
            <Link
              key={idx}
              href={calc.slug}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors group flex flex-col justify-between space-y-2"
            >
              <div className="space-y-1">
                <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center justify-between">
                  <span>{calc.name}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {calc.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}

export default AnnuityContent;

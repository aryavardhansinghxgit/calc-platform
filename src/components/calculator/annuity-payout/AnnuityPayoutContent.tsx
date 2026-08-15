"use client";

import React, { useState } from "react";
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
  Heart,
  Briefcase,
  DollarSign,
  PieChart,
} from "lucide-react";

export function AnnuityPayoutContent() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "What is an annuity payout phase?",
      a: "The payout phase (or distribution phase) is the period during which an insurance company makes regular, guaranteed income payments to an annuitant from the accumulated balance of an annuity contract.",
    },
    {
      q: "What is the difference between Fixed Length and Fixed Payment payouts?",
      a: "A Fixed Length payout guarantees income for a set duration (e.g. 10 or 20 years), automatically computing the periodic payment amount. A Fixed Payment payout lets you specify the exact dollar check you want each month (e.g. $5,000/mo) and calculates how long your funds will last until depleted.",
    },
    {
      q: "How are qualified vs. non-qualified annuity payouts taxed?",
      a: "Payouts from qualified annuities (funded with pre-tax dollars from 401ks or traditional IRAs) are 100% taxable as ordinary income. Non-qualified annuity payouts (funded with after-tax dollars) utilize an IRS Exclusion Ratio where each payment is divided into tax-free return of principal and taxable interest earnings.",
    },
    {
      q: "What is the IRS 10% early withdrawal penalty?",
      a: "If you take withdrawals or receive annuity payouts prior to reaching age 59½, the IRS assesses a 10% early withdrawal tax penalty on the taxable portion of the payment, in addition to ordinary federal and state income taxes.",
    },
    {
      q: "What is a 1035 Exchange?",
      a: "A 1035 Exchange is a provision under Section 1035 of the Internal Revenue Code that permits an annuity owner to transfer funds tax-free from an existing contract into a new annuity contract without triggering immediate tax liabilities.",
    },
    {
      q: "What is a Partial 1035 Exchange?",
      a: "A Partial 1035 Exchange allows an investor to transfer a portion of an existing annuity contract tax-free into a second annuity, dividing cost basis pro-rata while maintaining tax deferral on both contracts.",
    },
    {
      q: "What is a Life Only annuity payout option?",
      a: "A Life Only option pays guaranteed income for as long as the annuitant lives. However, payments cease immediately upon death, even if death occurs shortly after annuitization, leaving no balance to heirs.",
    },
    {
      q: "What is a Joint and Survivor annuity payout option?",
      a: "A Joint and Survivor payout guarantees income for the lifetime of two individuals (usually spouses). When the primary worker passes away, the surviving spouse continues receiving 50%, 75%, or 100% of the original monthly check.",
    },
    {
      q: "What is a Life with Period Certain payout option?",
      a: "Life with Period Certain guarantees income for life while also guaranteeing payments for a minimum fixed term (e.g., 10 or 20 years). If the annuitant dies during the period certain, remaining payments go to designated beneficiaries.",
    },
    {
      q: "How does inflation affect annuity monthly payouts?",
      a: "Fixed annuity payments lose purchasing power over time due to inflation. Over a 20-year retirement, a modest 2.5% inflation rate erodes purchasing power by over 38%. Utilizing inflation riders (COLA) helps preserve real purchasing power.",
    },
    {
      q: "Can I cancel or alter an annuity after annuitization begins?",
      a: "In most traditional annuitized contracts, the decision to annuitize is irrevocable. Once monthly lifetime payouts begin, you generally cannot access principal or alter the payout structure.",
    },
    {
      q: "What is the 4% safe withdrawal rule for annuities?",
      a: "The 4% rule suggests withdrawing 4% of your initial portfolio value in year one, adjusted annually for inflation, to ensure funds last 30 years. Annuity fixed payout options often provide higher payout rates (5%-7%) because they combine principal return with interest.",
    },
    {
      q: "Are annuity payouts protected by state guaranty associations?",
      a: "Yes. State Guaranty Associations protect policyholders against insurer bankruptcy up to statutory state limits (typically $250,000 to $500,000 in annuity present value).",
    },
    {
      q: "What is the annuitization phase?",
      a: "The annuitization phase is the formal transition point where the accumulated cash value of a deferred annuity is converted into regular guaranteed periodic income streams.",
    },
    {
      q: "How do I choose between a lump-sum payout and monthly payments?",
      a: "A lump-sum payout offers maximum liquidity and investment flexibility but exposes you to market risk and taxation. Monthly annuity payouts offer guaranteed lifetime income and longevity protection.",
    },
  ];

  return (
    <div className="mt-12 space-y-12 border-t border-zinc-200 dark:border-zinc-800 pt-10 text-zinc-800 dark:text-zinc-200">
      {/* Article Header */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
          <BookOpen className="h-4 w-4" /> Comprehensive Retirement Income &amp; Annuity Payout Guide
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
          Annuity Payout Calculator Guide: Optimizing Guaranteed Retirement Income
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-4xl">
          Transitioning from accumulating retirement wealth to drawing down sustainable income is one of the most vital financial shifts in retirement planning. An annuity payout converts an accumulated balance into predictable, guaranteed income.
        </p>
      </section>

      {/* Main Educational Sections with Exact Requested H2 Headers */}
      <div className="space-y-8 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">What Is an Annuity Payout?</h2>
          <p>
            An annuity payout is a series of recurring financial disbursements made by an insurance company to a contract owner (annuitant). Payouts can be structured for a fixed duration or guaranteed for life, providing income security.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">How an Annuity Payout Calculator Works</h2>
          <p>
            An Annuity Payout Calculator applies time-value-of-money annuity formulas to determine periodic income, total interest earned, and portfolio depletion schedules based on principal, interest rate, term length, and payout frequency.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Fixed Length vs Fixed Payment Payouts</h2>
          <p>
            In a <strong>Fixed Length Payout</strong>, you choose a set term (such as 10, 15, or 20 years), and the calculator solves for the monthly income check. In a <strong>Fixed Payment Payout</strong>, you specify your required monthly dollar check, and the calculator determines how many years and months funds will last before depletion.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Immediate vs Deferred Annuities</h2>
          <p>
            Single Premium Immediate Annuities (SPIAs) begin generating monthly income checks almost immediately after purchase (within 1 to 12 months). Deferred Annuities accumulate earnings tax-deferred during a holding phase before payouts commence.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Qualified vs Non-Qualified Annuities</h2>
          <p>
            Qualified annuities are funded with pre-tax dollars (such as IRA or 401k rollovers); their entire payout is taxable as ordinary income. Non-qualified annuities are purchased with after-tax dollars; only accumulated earnings are taxed upon withdrawal under IRS LIFO rules.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-y border-zinc-200 dark:border-zinc-800 py-6">
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">Accumulation Phase</h2>
            <p className="text-xs">The initial growth period where premium deposits compound tax-deferred.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">Annuitization Phase</h2>
            <p className="text-xs">The formal conversion point where accumulated principal transitions into income streams.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">Payout Phase</h2>
            <p className="text-xs">The distribution period where guaranteed periodic checks are disbursed to the annuitant.</p>
          </div>
        </div>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Early Withdrawal Rules &amp; Penalties</h2>
          <p>
            Withdrawing taxable earnings from an annuity contract prior to age 59½ triggers a 10% IRS early withdrawal tax penalty on top of ordinary income tax rates.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">1035 Exchange &amp; Partial 1035 Exchange</h2>
          <p>
            Under Section 1035 of the Internal Revenue Code, contract owners can exchange an existing annuity for a new annuity tax-free. A Partial 1035 Exchange allows splitting an existing annuity tax-free into multiple contracts.
          </p>
        </section>

        {/* Types of Annuity Payout Options with H3 Headings */}
        <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-6">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Types of Annuity Payout Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
              <h3 className="text-sm font-bold text-indigo-600 dark:text-indigo-400">Life Only</h3>
              <p className="text-xs mt-1">Highest monthly check; pays guaranteed income for life, but payments cease immediately upon death.</p>
            </div>
            <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
              <h3 className="text-sm font-bold text-indigo-600 dark:text-indigo-400">Joint and Survivor</h3>
              <p className="text-xs mt-1">Guarantees income for the lifetimes of both primary annuitant and surviving spouse (50%-100% payout).</p>
            </div>
            <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
              <h3 className="text-sm font-bold text-indigo-600 dark:text-indigo-400">Life with Period Certain</h3>
              <p className="text-xs mt-1">Pays for life with a guaranteed minimum term (e.g. 10 or 20 years) passing to beneficiaries if death occurs early.</p>
            </div>
            <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
              <h3 className="text-sm font-bold text-indigo-600 dark:text-indigo-400">Lump Sum Withdrawal</h3>
              <p className="text-xs mt-1">Withdraws the full account value at once, providing maximum liquidity but triggering immediate tax liability.</p>
            </div>
            <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
              <h3 className="text-sm font-bold text-indigo-600 dark:text-indigo-400">Fixed Period</h3>
              <p className="text-xs mt-1">Disburses income for a specified number of years regardless of lifetime longevity.</p>
            </div>
            <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
              <h3 className="text-sm font-bold text-indigo-600 dark:text-indigo-400">Fixed Amount</h3>
              <p className="text-xs mt-1">Pays a fixed dollar check each month until accumulated principal and interest are fully exhausted.</p>
            </div>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Taxation of Annuities &amp; Inflation Impact</h2>
          <p>
            Non-qualified annuity payouts utilize the IRS Exclusion Ratio to separate taxable earnings from non-taxable principal returns. Inflation erodes real purchasing power over multi-decade retirements; electing Cost-of-Living Adjustments (COLA) helps mitigate inflation risk.
          </p>
        </section>
      </div>

      {/* 15+ FAQ Accordion Section */}
      <section className="space-y-6 border-t border-zinc-200 dark:border-zinc-800 pt-8">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Frequently Asked Questions (15 Key Payout Insights)
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-4 text-left font-semibold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2 pr-4">
                    <span className="text-indigo-600 dark:text-indigo-400 font-sans tabular-nums text-xs font-bold shrink-0">
                      Q{idx + 1}.
                    </span>
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-zinc-500 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/50 font-normal">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

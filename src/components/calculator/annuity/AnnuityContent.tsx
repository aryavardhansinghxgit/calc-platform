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

export function AnnuityContent() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "What is an annuity contract?",
      a: "An annuity is a legal financial contract issued by an insurance company designed to accumulate capital tax-deferred and/or convert a lump sum into a guaranteed stream of income for a specified term or for the remainder of your lifetime.",
    },
    {
      q: "What is the difference between an Ordinary Annuity and an Annuity Due?",
      a: "An Ordinary Annuity makes or receives payments at the END of each compounding period (e.g., month or year). An Annuity Due requires payments at the BEGINNING of each period. Because deposits earn interest for an extra period in an Annuity Due, it results in a higher final balance.",
    },
    {
      q: "What is the difference between a Fixed, Variable, and Fixed-Indexed Annuity?",
      a: "Fixed Annuities pay a guaranteed, fixed interest rate declared by the insurer. Variable Annuities invest your money in market sub-accounts (similar to mutual funds), offering higher growth potential alongside market risk. Fixed-Indexed Annuities link growth to a market index (like the S&P 500) while guaranteeing zero principal loss during market downturns.",
    },
    {
      q: "What is a Multi-Year Guarantee Annuity (MYGA)?",
      a: "A Multi-Year Guarantee Annuity (MYGA) is a specialized fixed annuity that locks in a fixed, guaranteed interest rate for a specific duration (typically 3 to 10 years), functioning similarly to a bank Certificate of Deposit (CD) but with tax-deferred growth benefits.",
    },
    {
      q: "What is an Immediate Annuity vs. a Deferred Annuity?",
      a: "An Immediate Annuity (SPIA) converts a single upfront premium into regular income checks starting almost immediately (within 1 to 12 months). A Deferred Annuity accumulates earnings tax-deferred over a specified holding period before payouts begin.",
    },
    {
      q: "What are annuity surrender charges?",
      a: "Surrender charges are penalties assessed by an insurance company if you withdraw more than your penalty-free amount (typically 10% annually) or cancel your annuity contract before the surrender period ends (usually 5 to 10 years). Surrender penalties typically decline by 1% each year.",
    },
    {
      q: "What is the 10% IRS early withdrawal penalty for annuities?",
      a: "If you withdraw taxable earnings from a deferred annuity prior to age 59½, the IRS imposes a 10% early withdrawal tax penalty on top of ordinary income taxes, similar to traditional IRAs and 401(k) plans.",
    },
    {
      q: "What is an annuity free-look period?",
      a: "A free-look period is a consumer protection window (typically 10 to 30 days depending on state law) after purchasing an annuity, during which you can cancel the contract for a 100% full refund without any surrender penalties.",
    },
    {
      q: "What are Mortality & Expense (M&E) risk charges?",
      a: "Mortality and Expense (M&E) risk charges are ongoing administrative fees charged on variable annuities (typically 0.40% to 1.75% annually) to compensate the insurer for providing guaranteed death benefits and lifetime income guarantees.",
    },
    {
      q: "What is an annuity rider?",
      a: "An annuity rider is an optional add-on provision that customizes your contract for an additional fee. Common riders include Guaranteed Minimum Income Benefits (GMIB), Guaranteed Minimum Withdrawal Benefits (GMWB), Cost-of-Living Adjustments (COLA), and Long-Term Care riders.",
    },
    {
      q: "How are annuities taxed upon withdrawal?",
      a: "Earnings withdrawn from a non-qualified annuity (funded with after-tax dollars) are taxed as ordinary income on a Last-In, First-Out (LIFO) basis, meaning earnings come out first and are taxed before tax-free principal is returned. Qualified annuities (funded with pre-tax dollars) are 100% taxable as ordinary income.",
    },
    {
      q: "Can I roll over a 401(k) or Traditional IRA into an annuity tax-free?",
      a: "Yes. By executing a direct trustee-to-trustee rollover or 1035 exchange, you can transfer funds from a 401(k), 403(b), or IRA into a qualified annuity without triggering immediate taxes or IRS penalties.",
    },
    {
      q: "What is a 1035 Exchange?",
      a: "A 1035 Exchange is a tax-free transaction authorized under Section 1035 of the Internal Revenue Code that allows you to swap an existing non-qualified annuity for a new annuity without incurring income taxes on accumulated gains.",
    },
    {
      q: "How does inflation impact annuity purchasing power?",
      a: "Fixed annuity payments lose purchasing power over time due to inflation unless you elect a Cost-of-Living Adjustment (COLA) rider or utilize an indexed growth structure.",
    },
    {
      q: "What is a participation rate in a fixed-indexed annuity?",
      a: "A participation rate determines what percentage of an index's gain is credited to your annuity. For example, if the S&P 500 gains 10% and your participation rate is 80%, your contract receives an 8% credit.",
    },
    {
      q: "What is an annuity cap rate?",
      a: "A cap rate is the maximum interest rate an indexed annuity can earn during an index period. If an index gains 15% but your cap rate is 7%, your credited growth is capped at 7%.",
    },
    {
      q: "What is a spread rate or margin fee in an indexed annuity?",
      a: "A spread rate (or asset fee) is a percentage deducted from an index's total gain before crediting interest to your annuity. For instance, if the index gains 10% and the spread rate is 2%, your net gain is 8%.",
    },
    {
      q: "Are annuities protected if the insurance company goes bankrupt?",
      a: "Yes. State Guaranty Associations protect policyholders up to statutory state limits (typically $250,000 to $500,000 in annuity present value per insurer).",
    },
    {
      q: "Can I take penalty-free withdrawals from an annuity?",
      a: "Most deferred annuity contracts allow you to withdraw up to 10% of your account value or initial premium each year without incurring surrender charges.",
    },
    {
      q: "What is a Single Premium Immediate Annuity (SPIA)?",
      a: "A Single Premium Immediate Annuity (SPIA) is purchased with a single lump-sum payment and begins paying guaranteed monthly or annual income checks within 12 months.",
    },
    {
      q: "What is a Deferred Income Annuity (DIA)?",
      a: "A Deferred Income Annuity (DIA), also called a longevity annuity, is purchased upfront but delays guaranteed payout streams to a future date (such as age 80 or 85) to protect against outliving assets.",
    },
    {
      q: "What is a Qualified Longevity Annuity Contract (QLAC)?",
      a: "A QLAC is a deferred income annuity purchased inside a Traditional IRA or 401(k) that allows you to defer Required Minimum Distributions (RMDs) on up to $200,000 of retirement funds until age 85.",
    },
    {
      q: "What happens to annuity funds when the owner passes away?",
      a: "If the contract has a death benefit rider or is in the accumulation phase, remaining balances pass directly to designated beneficiaries without going through probate court.",
    },
    {
      q: "Are annuity management fees tax-deductible?",
      a: "Under current tax laws (Tax Cuts and Jobs Act), individual investors cannot deduct annuity management fees or administrative expenses on personal tax returns.",
    },
    {
      q: "How do I choose between a fixed annuity and a bank CD?",
      a: "Fixed annuities typically offer higher interest rates and tax-deferred growth compared to CDs, making them suitable for long-term retirement building. CDs offer FDIC insurance and shorter maturity options.",
    },
  ];

  return (
    <div className="mt-12 space-y-12  dark:border-zinc-800 pt-10 text-zinc-800 dark:text-zinc-200">
      {/* Overview Header */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
          <BookOpen className="h-4 w-4" /> Comprehensive Financial &amp; Insurance Annuity Guide
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
          Annuity Accumulation, Fixed vs. Variable Structures &amp; Fee Mechanics
        </h2>
        <p className="text-sm text-slate-900 dark:text-slate-100 leading-relaxed max-w-4xl">
          Annuities represent versatile insurance and investment instruments capable of accumulating capital tax-deferred or securing guaranteed lifetime income. Understanding contract mechanics—such as Ordinary Annuities vs. Annuity Due, fixed vs. indexed crediting, surrender charge schedules, and fee breakdowns—is vital for constructing a resilient retirement portfolio.
        </p>
      </section>

      {/* Grid of Core Concepts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
            <Landmark className="h-5 w-5" /> Ordinary vs. Annuity Due
          </div>
          <p className="text-xs text-slate-900 dark:text-slate-100 leading-relaxed">
            Annuity Due deposits occur at the beginning of each period, earning interest immediately for the full term. Ordinary Annuity deposits occur at the end of each period.
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
            <TrendingUp className="h-5 w-5" /> Fixed, Indexed &amp; Variable
          </div>
          <p className="text-xs text-slate-900 dark:text-slate-100 leading-relaxed">
            Fixed annuities guarantee interest rates; Fixed-Indexed annuities cap equity upside while protecting principal (0% floor); Variable annuities invest directly in market sub-accounts.
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
            <AlertTriangle className="h-5 w-5" /> Surrender &amp; IRS Penalties
          </div>
          <p className="text-xs text-slate-900 dark:text-slate-100 leading-relaxed">
            Canceling early triggers declining surrender charges (e.g. 7% down to 0% over 7 years). Withdrawals of earnings before age 59½ incur a 10% IRS tax penalty.
          </p>
        </div>
      </div>

      {/* Deep-Dive Section 1: Annuity Types Comparison */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <PieChart className="h-5 w-5 text-blue-600" /> Fixed vs. Variable vs. Fixed-Indexed Annuities Comparison
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse border border-zinc-200 dark:border-zinc-800">
            <thead>
              <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-bold">
                <th className="p-3 border border-zinc-200 dark:border-zinc-700">Annuity Type</th>
                <th className="p-3 border border-zinc-200 dark:border-zinc-700">Principal Guarantee</th>
                <th className="p-3 border border-zinc-200 dark:border-zinc-700">Growth Mechanism</th>
                <th className="p-3 border border-zinc-200 dark:border-zinc-700">Risk Profile</th>
              </tr>
            </thead>
            <tbody className=" dark:divide-zinc-800 text-slate-900 dark:text-slate-100">
              <tr>
                <td className="p-3 font-semibold text-zinc-900 dark:text-zinc-100 border">Fixed Annuity / MYGA</td>
                <td className="p-3 text-blue-600 font-bold border">100% Guaranteed</td>
                <td className="p-3 border">Declared fixed interest rate (e.g. 5.5%)</td>
                <td className="p-3 border">Very Low (Inflation Risk Only)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-zinc-900 dark:text-zinc-100 border">Fixed-Indexed Annuity (FIA)</td>
                <td className="p-3 text-blue-600 font-bold border">100% Guaranteed (0% Floor)</td>
                <td className="p-3 border">Indexed returns subject to caps/participation rates</td>
                <td className="p-3 border">Low to Moderate</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-zinc-900 dark:text-zinc-100 border">Variable Annuity</td>
                <td className="p-3 text-blue-600 font-bold border">No Principal Guarantee</td>
                <td className="p-3 border">Direct equity/bond sub-account performance</td>
                <td className="p-3 border">Moderate to High Market Risk</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 25+ FAQ Accordion Section */}
      <section className="space-y-6  dark:border-zinc-800 pt-8">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Frequently Asked Questions (25 Essential Annuity Insights)
          </h3>
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
                    <span className="text-blue-600 dark:text-blue-400 font-sans tabular-nums text-xs font-bold shrink-0">
                      Q{idx + 1}.
                    </span>
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-900 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed  dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/50 font-normal">
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

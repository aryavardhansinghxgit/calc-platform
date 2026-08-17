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
} from "lucide-react";

export function PensionContent() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "What is a Defined Benefit (DB) pension plan?",
      a: "A Defined Benefit (DB) pension plan is an employer-sponsored retirement plan where the employer promises a specified monthly benefit upon retirement. Unlike a Defined Contribution plan (like a 401k), the benefit amount is calculated using a predetermined formula based on factors such as your final average salary, years of service, and a benefit multiplier percentage, with the employer assuming all investment risks.",
    },
    {
      q: "Should I take a lump sum payout or monthly pension payments?",
      a: "Choosing between a lump sum payout and a monthly pension depends on your risk tolerance, health, and financial discipline. A monthly pension provides guaranteed, predictable lifetime income that eliminates market risk. Conversely, a lump sum offers maximum liquidity, control over investment allocation, and the ability to leave remaining wealth to heirs or a surviving spouse.",
    },
    {
      q: "How does a Joint-and-Survivor pension benefit work?",
      a: "A Joint-and-Survivor pension payout provides monthly income during your lifetime and continues paying a reduced or equal percentage (such as 50%, 66%, 75%, or 100%) to your surviving spouse after your death. Because the pension covers two lifespans, the initial monthly payout is smaller than a Single Life pension, but it provides crucial financial protection for your spouse.",
    },
    {
      q: "What survivor benefit ratio should I choose (50%, 75%, or 100%)?",
      a: "Choosing a survivor ratio depends on your spouse's independent retirement income and health. A 100% survivor payout ensures your spouse experiences zero drop in pension income after your passing, while a 50% survivor option yields a higher monthly payout during your joint lives. If your spouse has minimal Social Security or personal retirement savings, a 75% or 100% survivor option is usually recommended.",
    },
    {
      q: "Is it financially beneficial to work longer for a higher pension?",
      a: "Working additional years increases your pension by boosting both your years of service and final average salary. However, retiring earlier allows you to collect pension payments for more total years. To determine if working longer is worth it, compare the foregone pension payments during the extra working years against the higher monthly check over your expected lifetime.",
    },
    {
      q: "How does a Cost-of-Living Adjustment (COLA) protect my pension?",
      a: "A Cost-of-Living Adjustment (COLA) increases your monthly pension payment annually to keep pace with inflation (typically between 1% and 3.5% per year). Without a COLA, fixed pension payments lose significant purchasing power over a 20- to 30-year retirement due to cumulative inflation.",
    },
    {
      q: "How are pension distributions taxed at federal and state levels?",
      a: "Pension payments funded with pre-tax dollars are taxed as ordinary income at federal and state levels. If you made after-tax contributions to your pension, a portion of each check is tax-free under IRS exclusion ratio rules. Additionally, nine US states impose zero state income tax on pension payments.",
    },
    {
      q: "What is the formula for calculating a pension benefit?",
      a: "Most defined benefit pensions calculate your annual payout using the formula: Annual Pension = Final Average Salary × Years of Credited Service × Benefit Multiplier %. For example, a $80,000 final average salary × 25 years × 2.0% multiplier yields an annual pension of $40,000 ($3,333.33 per month).",
    },
    {
      q: "What happens to my pension if my former employer goes bankrupt?",
      a: "In the United States, private sector defined benefit pension plans are insured by the Pension Benefit Guaranty Corporation (PBGC), a federal agency. If an employer bankrupts, the PBGC steps in to pay monthly pension benefits up to statutory maximum limits.",
    },
    {
      q: "Can I roll over a pension lump sum into an IRA without taxes?",
      a: "Yes. By executing a direct trustee-to-trustee rollover of your pension lump sum into a Traditional IRA, you avoid immediate federal withholding tax and preserve the tax-deferred growth status of your retirement assets.",
    },
    {
      q: "How does Social Security integrate with pension benefits?",
      a: "For most private sector employees, Social Security and pension benefits are received independently. However, for certain state or municipal workers who did not pay Social Security taxes, federal rules like the Windfall Elimination Provision (WEP) or Government Pension Offset (GPO) may reduce Social Security benefits.",
    },
    {
      q: "What is pension maximization ('Pension Max') using life insurance?",
      a: "Pension Maximization is a strategy where a retiree elects the higher Single Life pension option instead of a Joint Survivor option, and uses part of the extra monthly cash flow to buy a private life insurance policy naming the spouse as beneficiary. If executed properly, it can provide higher lifetime income and liquidity for the survivor.",
    },
    {
      q: "What is the breakeven age in a Lump Sum vs. Monthly Pension analysis?",
      a: "The breakeven age is the point in time at which the cumulative monthly pension payments received equal the value of the lump sum payout (plus any investment returns earned on that lump sum). If you expect to live past the breakeven age, the monthly pension is mathematically superior.",
    },
    {
      q: "What is a pop-up clause in a Joint-and-Survivor pension?",
      a: "A pop-up clause is a feature in some Joint-and-Survivor pension plans. If your spouse predeceases you, your reduced monthly joint pension 'pops up' back to the higher Single Life pension amount for the remainder of your life.",
    },
    {
      q: "Can I take both a lump sum and a monthly pension?",
      a: "Some corporate and public pension plans offer a 'partial lump sum option' (PLSO), allowing retirees to take a lump sum upfront (e.g., 10% to 25% of the total value) in exchange for a permanently reduced monthly pension payment.",
    },
  ];

  return (
    <div className="mt-12 space-y-12  dark:border-zinc-800 pt-10 text-zinc-800 dark:text-zinc-200">
      {/* Header */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
          <BookOpen className="h-4 w-4" /> Complete Actuarial &amp; Pension Payout Guide
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">
          Understanding Pension Payout Options, COLA &amp; Actuarial Trade-Offs
        </h2>
        <p className="text-sm text-slate-900 dark:text-slate-100 leading-relaxed max-w-4xl">
          A defined-benefit pension represents one of the most valuable financial assets in retirement planning. However, when retiring, employees face irreversible choices: electing between an upfront lump sum vs. lifetime monthly income, selecting single-life vs. joint-and-survivor annuities, or determining whether working additional years yields a higher financial benefit. This guide analyzes actuarial formulas, tax implications, and decision frameworks.
        </p>
      </section>

      {/* Grid of Core Concepts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
            <Landmark className="h-5 w-5" /> Lump Sum vs. Annuity
          </div>
          <p className="text-xs text-slate-900 dark:text-slate-100 leading-relaxed">
            Lump sums provide liquidity and estate planning flexibility, but transfer all market risk to you. Monthly annuity payments provide guaranteed lifetime income backed by employer assets or the PBGC.
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
            <Heart className="h-5 w-5" /> Survivor Ratios (50-100%)
          </div>
          <p className="text-xs text-slate-900 dark:text-slate-100 leading-relaxed">
            Joint-and-Survivor pensions reduce monthly checks during your joint lifetime to guarantee a continuing income (50%, 66%, 75%, or 100%) for your spouse after your passing.
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
            <TrendingUp className="h-5 w-5" /> COLA Power
          </div>
          <p className="text-xs text-slate-900 dark:text-slate-100 leading-relaxed">
            A Cost-of-Living Adjustment (COLA) compounds annually. A 3.5% COLA doubles your monthly pension check over 20 years, protecting your purchasing power against inflation.
          </p>
        </div>
      </div>

      {/* Deep-Dive Section 1: Defined Benefit Formula */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Defined Benefit Pension Formula Breakdown
        </h3>
        <p className="text-sm text-slate-900 dark:text-slate-100 leading-relaxed">
          Traditional pensions calculate your annual payout using a standardized actuarial formula based on service tenure and salary history.
        </p>

        <div className="bg-blue-50/70 dark:bg-blue-50/30 border border-indigo-200 dark:border-indigo-800 p-5 rounded-xl text-xs space-y-3 font-sans tabular-nums">
          <div className="text-indigo-900 dark:text-indigo-200 font-bold text-sm font-sans">
            Standard DB Pension Formula:
          </div>
          <div className="text-base text-blue-600 dark:text-blue-400 font-extrabold">
            Annual Pension = Final Average Salary (FAS) × Credited Years of Service × Benefit Multiplier %
          </div>
          <div className="text-slate-900 dark:text-slate-100 font-sans text-xs">
            Example: If your highest 3-year average salary is $90,000, with 30 years of service and a 2.0% multiplier:
            <br />
            <span className="font-sans tabular-nums font-bold text-blue-600 dark:text-blue-400">
              Annual Pension = $90,000 × 30 × 2.0% = $54,000/year ($4,500/month)
            </span>
          </div>
        </div>
      </section>

      {/* Deep-Dive Section 2: Comparison Table */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Defined Benefit vs. Defined Contribution (401k / IRA)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse border border-zinc-200 dark:border-zinc-800">
            <thead>
              <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-bold">
                <th className="p-3 border border-zinc-200 dark:border-zinc-700">Feature</th>
                <th className="p-3 border border-zinc-200 dark:border-zinc-700">Defined Benefit Pension</th>
                <th className="p-3 border border-zinc-200 dark:border-zinc-700">Defined Contribution (401k / IRA)</th>
              </tr>
            </thead>
            <tbody className=" dark:divide-zinc-800 text-slate-900 dark:text-slate-100">
              <tr>
                <td className="p-3 font-semibold text-zinc-900 dark:text-zinc-100 border">Investment Risk</td>
                <td className="p-3 text-blue-600 font-bold border">Employer Bears All Risk</td>
                <td className="p-3 text-blue-600 font-bold border">Employee Bears Market Risk</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-zinc-900 dark:text-zinc-100 border">Lifetime Income Guarantee</td>
                <td className="p-3 text-blue-600 font-bold border">Guaranteed for Life</td>
                <td className="p-3 text-blue-600 font-bold border">Depends on Withdrawal Rate</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-zinc-900 dark:text-zinc-100 border">Liquidity &amp; Inheritance</td>
                <td className="p-3 border">Limited (Ends at Death / Spouse Death)</td>
                <td className="p-3 text-blue-600 font-bold border">High (Passes to Heirs)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-zinc-900 dark:text-zinc-100 border">Inflation Protection</td>
                <td className="p-3 border">Depends on Plan COLA</td>
                <td className="p-3 border">Depends on Asset Allocation</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 15+ FAQ Accordion Section */}
      <section className="space-y-6  dark:border-zinc-800 pt-8">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h3 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
            Frequently Asked Questions (15 Key Pension Insights)
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

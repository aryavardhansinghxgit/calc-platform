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
  Users,
} from "lucide-react";

export function SocialSecurityContent() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "What is Social Security and how is my monthly benefit calculated?",
      a: "Social Security is a federal social insurance program that provides guaranteed inflation-adjusted income to retired workers, disabled individuals, and surviving family members. Your monthly benefit is calculated by indexing your 35 highest-earning working years to account for wage growth, deriving your Average Indexed Monthly Earnings (AIME), and applying the Social Security Primary Insurance Amount (PIA) bend-point formula to determine your Full Retirement Age benefit.",
    },
    {
      q: "What is my Full Retirement Age (FRA)?",
      a: "Your Full Retirement Age (FRA) is the age at which you become legally entitled to collect 100% of your unreduced Social Security Primary Insurance Amount (PIA). For individuals born between 1943 and 1954, FRA is age 66. For those born in 1960 or later, FRA is age 67. For individuals born between 1955 and 1959, FRA increases by 2 months for each year after 1954.",
    },
    {
      q: "How much is my benefit reduced if I claim early at age 62?",
      a: "Claiming Social Security at the earliest eligible age of 62 results in a permanent reduction of your monthly check. If your FRA is 67, claiming at age 62 permanently reduces your monthly benefit by 30%. The reduction is calculated at 5/9 of 1% for each of the first 36 months early, plus 5/12 of 1% for each additional month.",
    },
    {
      q: "How much does my benefit increase if I delay claiming until age 70?",
      a: "If you delay claiming past your Full Retirement Age, the Social Security Administration awards Delayed Retirement Credits of 8% per year (0.667% per month) until age 70. If your FRA is 67, waiting until age 70 permanently boosts your monthly check by 24%. Delayed credits cease accumulating once you reach age 70.",
    },
    {
      q: "What is the breakeven age when comparing early vs. delayed claiming?",
      a: "The breakeven age is the point in time at which the total cumulative dollar amount received from a larger delayed monthly check equals the cumulative total collected from smaller, early checks. For most individuals comparing age 62 vs. age 70, the breakeven age occurs between age 78 and 80. If you expect to live past age 80, delaying claiming yields a higher lifetime financial payout.",
    },
    {
      q: "How does the Cost-of-Living Adjustment (COLA) protect my benefits?",
      a: "Cost-of-Living Adjustments (COLA) increase monthly Social Security payments annually to offset consumer inflation. Calculated based on changes in the Consumer Price Index for Urban Wage Earners and Clerical Workers (CPI-W) from the third quarter of the prior year, COLA ensures your purchasing power remains intact throughout retirement.",
    },
    {
      q: "Are Social Security benefits taxable at the federal level?",
      a: "Yes, up to 85% of your Social Security benefits may be subject to federal income tax if your 'Combined Income' exceeds specific statutory thresholds. Combined Income equals your Adjusted Gross Income (AGI) + Non-taxable Interest + 50% of your annual Social Security benefits. For single filers, taxability begins at $25,000; for married couples filing jointly, taxability begins at $32,000.",
    },
    {
      q: "What are the combined income tax thresholds for Social Security?",
      a: "For single tax filers: Combined income between $25,000 and $34,000 makes up to 50% of benefits taxable; combined income above $34,000 makes up to 85% of benefits taxable. For married couples filing jointly: Combined income between $32,000 and $44,000 makes up to 50% taxable; combined income above $44,000 makes up to 85% taxable.",
    },
    {
      q: "Can I collect Social Security benefits while continuing to work?",
      a: "Yes, but if you are under your Full Retirement Age and earn more than the annual Retirement Earnings Test limit, the SSA temporarily holds back benefits. In 2026, if you are under FRA, $1 in benefits is withheld for every $2 earned above the annual earnings limit. Once you reach FRA, the earnings test disappears completely, and your monthly check is recalculated higher to credit you for withheld benefits.",
    },
    {
      q: "How do Spousal Social Security Benefits work?",
      a: "A spouse can receive up to 50% of the primary worker's Full Retirement Age benefit amount. To qualify, the spouse must be at least 62 years old, and the primary worker must have already filed for their own retirement benefits. If the spouse claims before their own FRA, the spousal benefit is permanently reduced.",
    },
    {
      q: "How do Survivor Benefits work for a widowed spouse?",
      a: "A surviving spouse can receive up to 100% of the deceased worker's monthly Social Security benefit (including any delayed credits earned by the deceased). A surviving spouse can claim survivor benefits as early as age 60 (or age 50 if disabled). Alternatively, a widow(er) can claim survivor benefits first while letting their own retirement benefit grow until age 70.",
    },
    {
      q: "Can a divorced spouse claim Social Security on an ex-spouse's earnings record?",
      a: "Yes, if you were married for at least 10 continuous years, are currently unmarried, and are age 62 or older, you can claim spousal or survivor benefits based on your ex-spouse's work record. Claiming ex-spousal benefits does not impact your ex-spouse's benefit check or their current spouse's benefit.",
    },
    {
      q: "What is the difference between SSDI and SSI?",
      a: "Social Security Disability Insurance (SSDI) pays benefits to individuals who became disabled after accumulating sufficient work credits through FICA payroll taxes. Supplemental Security Income (SSI) is a needs-based program funded by general tax revenues that provides financial assistance to low-income disabled or elderly individuals regardless of work history.",
    },
    {
      q: "What are FICA taxes and the annual wage base limit?",
      a: "Federal Insurance Contributions Act (FICA) taxes fund Social Security and Medicare. Employees pay 6.2% for Social Security and 1.45% for Medicare, matched by employers. In 2026, Social Security payroll tax is capped at the maximum wage base limit (e.g. $184,500), meaning earnings above that threshold are exempt from Social Security tax.",
    },
    {
      q: "Can I receive Social Security benefits while living outside the United States?",
      a: "Yes, U.S. citizens can receive monthly Social Security checks while residing in most foreign countries without restriction. Payments can be direct-deposited into U.S. or qualifying foreign bank accounts.",
    },
    {
      q: "What is the Windfall Elimination Provision (WEP)?",
      a: "The Windfall Elimination Provision (WEP) is a federal rule that reduces Social Security benefits for individuals who receive a pension from non-covered employment (such as government jobs where FICA taxes were not withheld) while also qualifying for Social Security from other covered jobs.",
    },
    {
      q: "What is the Government Pension Offset (GPO)?",
      a: "The Government Pension Offset (GPO) reduces Social Security spousal or survivor benefits for spouses who receive a government pension from employment not covered by Social Security. The GPO reduction equals two-thirds of the government pension amount.",
    },
    {
      q: "Can I withdraw or undo my Social Security claim if I change my mind?",
      a: "Yes. Within 12 months of filing for Social Security retirement benefits, you can submit IRS Form SSA-521 to withdraw your application. However, you must repay all benefits received by you and your family. After 12 months, you cannot withdraw, but once reaching FRA, you can suspend your benefits to earn delayed credits until age 70.",
    },
    {
      q: "How does Social Security integrate with my 401(k) and Traditional IRA?",
      a: "Social Security provides guaranteed, inflation-indexed income that acts as a stable floor. By coordinating Social Security claiming with 401(k) and IRA withdrawals, retirees can draw from portfolios during lower-income gap years (ages 62-70) while allowing Social Security benefits to compound at 8% per year.",
    },
    {
      q: "Why is age 70 the maximum recommended age to claim Social Security?",
      a: "Delayed Retirement Credits stop accumulating after age 70. Waiting past age 70 provides zero additional financial benefit, so everyone should claim their Social Security by age 70 at the latest.",
    },
  ];

  return (
    <div className="mt-12 space-y-12 border-t border-zinc-200 dark:border-zinc-800 pt-10 text-zinc-800 dark:text-zinc-200">
      {/* Overview Header */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
          <BookOpen className="h-4 w-4" /> Authoritative Social Security Administration (SSA) Guide
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
          Complete Guide to Social Security Benefits, FRA &amp; Claiming Strategies
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-4xl">
          Social Security serves as the cornerstone of retirement security for tens of millions of Americans. Deciding when and how to claim your benefits is one of the most consequential financial choices you will make. This guide breaks down Full Retirement Age (FRA) multipliers, early vs. delayed claiming trade-offs, spousal and survivor protections, taxation rules, and optimal claiming strategies.
        </p>
      </section>

      {/* Grid of Core Concepts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
            <Clock className="h-5 w-5" /> Full Retirement Age (FRA)
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Your FRA is 67 if born in 1960 or later. Claiming at 62 permanently reduces checks by up to 30%, while delaying to 70 increases monthly checks by 24% (+8%/yr).
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
            <Users className="h-5 w-5" /> Spousal &amp; Survivor Rights
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Spouses can receive up to 50% of a worker's FRA benefit. Widows and widowers can claim up to 100% survivor benefits starting as early as age 60.
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
            <Percent className="h-5 w-5" /> Taxability &amp; COLA
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Up to 85% of Social Security benefits become taxable if Combined Income exceeds $34k (single) or $44k (married). Annual COLA offsets consumer inflation.
          </p>
        </div>
      </div>

      {/* Deep-Dive Section 1: Early vs. Delayed Claiming Comparison */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-indigo-600" /> Benefit Multiplier Scale: Age 62 vs. FRA (67) vs. Age 70
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          The table below illustrates how your Primary Insurance Amount (PIA) adjusts depending on the exact age you file your application.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse border border-zinc-200 dark:border-zinc-800">
            <thead>
              <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-bold">
                <th className="p-3 border border-zinc-200 dark:border-zinc-700">Claiming Age</th>
                <th className="p-3 border border-zinc-200 dark:border-zinc-700">Category</th>
                <th className="p-3 border border-zinc-200 dark:border-zinc-700">% of FRA Benefit</th>
                <th className="p-3 border border-zinc-200 dark:border-zinc-700">Example ($2,200 FRA Base)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-600 dark:text-zinc-400">
              <tr>
                <td className="p-3 font-semibold text-rose-600 border">Age 62</td>
                <td className="p-3 border">Earliest Eligibility</td>
                <td className="p-3 font-bold text-rose-600 border">70.0% (-30.0%)</td>
                <td className="p-3 font-mono border">$1,540 / month</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold border">Age 65</td>
                <td className="p-3 border">Early Claiming</td>
                <td className="p-3 font-bold text-amber-600 border">86.7% (-13.3%)</td>
                <td className="p-3 font-mono border">$1,907 / month</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-indigo-600 border">Age 67</td>
                <td className="p-3 font-bold border">Full Retirement Age (FRA)</td>
                <td className="p-3 font-bold text-indigo-600 border">100.0% (Baseline)</td>
                <td className="p-3 font-mono font-bold border">$2,200 / month</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-emerald-600 border">Age 70</td>
                <td className="p-3 border">Maximum Delayed Credits</td>
                <td className="p-3 font-bold text-emerald-600 border">124.0% (+24.0%)</td>
                <td className="p-3 font-mono font-bold text-emerald-600 border">$2,728 / month</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 20+ FAQ Accordion Section */}
      <section className="space-y-6 border-t border-zinc-200 dark:border-zinc-800 pt-8">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Frequently Asked Questions (20 Key Social Security Insights)
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
                    <span className="text-indigo-600 dark:text-indigo-400 font-mono text-xs font-bold shrink-0">
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

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
  Tag,
  Building,
  Target,
} from "lucide-react";
import Link from "next/link";

export function CommissionContent() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "How is sales commission calculated?",
      a: "Sales commission is calculated by multiplying total sales revenue by the agreed commission percentage rate. For example, a 3% commission on a $200,000 transaction equals $6,000.",
    },
    {
      q: "How does a graduated tiered commission work?",
      a: "In a graduated tiered commission structure, sales volume is divided into brackets. Higher commission rates apply only to sales exceeding specified threshold amounts. For example, 3% on the first $20k, 5% on $20k–$25k, and 10% above $25k.",
    },
    {
      q: "What is the difference between revenue commission and profit margin commission?",
      a: "Revenue commission is based on gross transaction value. Profit margin commission is calculated on net profit after deducting product cost of goods sold (COGS), encouraging sales reps to protect profit margins.",
    },
    {
      q: "How do real estate commission splits work between agents and brokerages?",
      a: "In real estate, a typical 6% total commission is divided 50/50 between the listing broker ($15,000 on a $500k home) and buyer's broker ($15,000). Each agent then shares their portion with their sponsoring brokerage according to their split agreement (e.g., 80% agent / 20% brokerage).",
    },
    {
      q: "What is a base salary plus commission plan?",
      a: "A base salary plus commission plan guarantees a fixed monthly or annual salary while providing variable incentive compensation based on sales achieved.",
    },
    {
      q: "What is a commission cap?",
      a: "A commission cap limits the maximum dollar amount an agent or broker pays to their brokerage per year (e.g. $20,000 cap). Once the cap is met, the agent retains 100% of their commission payouts.",
    },
    {
      q: "How do you calculate required sales volume to hit a target income goal?",
      a: "Required Sales Volume = (Target Earnings - Base Salary) / Commission Rate. To earn $10,000 commission at a 5% rate, required sales volume equals $10,000 / 0.05 = $200,000.",
    },
    {
      q: "What is a draw against commission?",
      a: "A draw is an advance payment made to a salesperson against anticipated future commission earnings. Recoverable draws must be paid back if future sales fall short, while non-recoverable draws act as a guaranteed minimum payout.",
    },
    {
      q: "Are sales commissions taxable?",
      a: "Yes. In the United States and most jurisdictions, commissions are treated as supplemental wages subject to federal income tax withholding, FICA tax, and state taxes.",
    },
    {
      q: "What is a clawback provision in sales compensation?",
      a: "A clawback allows an employer to reclaim paid commissions if a customer cancels a deal, requests a refund, or defaults on payment within a specified timeframe (e.g., 90 days).",
    },
    {
      q: "How does decelerated vs accelerated tiered commission function?",
      a: "Accelerated commission increases payout rates as sales quotas are exceeded (e.g., 5% up to quota, 8% above quota). Decelerated commission lowers percentage rates on ultra-high volumes to manage corporate commission budgets.",
    },
    {
      q: "What is an effective commission rate?",
      a: "Effective commission rate is total commission earnings divided by total gross sales volume, expressed as a percentage.",
    },
    {
      q: "What is the standard commission rate in commercial real estate?",
      a: "Commercial real estate commissions typically range from 4% to 8% for property sales, or 3% to 6% of total lease value over the primary lease term.",
    },
    {
      q: "How do B2B SaaS software sales commission structures work?",
      a: "B2B SaaS companies usually pay 8% to 12% of Annual Contract Value (ACV) or Total Contract Value (TCV), often with accelerators for multi-year deals.",
    },
    {
      q: "Why use tiered commission structures?",
      a: "Tiered structures motivate salespeople to exceed minimum targets and reach higher performance tiers, driving revenue growth for the enterprise.",
    },
  ];

  return (
    <div className="mt-12 space-y-12  dark:border-zinc-800 pt-10 text-zinc-800 dark:text-zinc-200">
      {/* Article Header */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
          <BookOpen className="h-4 w-4" /> Comprehensive Sales Compensation &amp; Commission Guide
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
          Commission Calculator Guide: Tiered Structures &amp; Sales Compensation Mechanics
        </h1>
        <p className="text-sm text-slate-900 dark:text-slate-100 leading-relaxed max-w-4xl">
          Sales commission is a vital compensation model used across real estate, retail, automotive, B2B software, and financial services. Understanding simple commission rates, base salary blends, graduated tiered brackets, and real estate brokerage splits ensures accurate financial planning and transparent earnings projections.
        </p>
      </section>

      {/* Main Educational Content with Required Headings */}
      <div className="space-y-8 text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">What Is a Commission?</h2>
          <p>
            A commission is a fee or financial reward paid to a salesperson, broker, or agent for negotiating or completing a commercial transaction. Commissions align representative incentives directly with organizational revenue generation.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">How Commissions Work</h2>
          <p>
            Commissions are calculated as a percentage of gross sales price or net profit margin. Payouts can be structured as commission-only, base salary plus commission, or graduated tiered commission rates.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Simple &amp; Graduated Tiered Commission Formulas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border font-sans tabular-nums text-xs space-y-1">
              <span className="font-sans font-bold text-zinc-900 dark:text-zinc-100 block">Simple Commission Formula</span>
              <div>Commission Amount = Sales Price × (Commission Rate / 100)</div>
              <div>Company Net Revenue = Sales Price - Commission Amount</div>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border font-sans tabular-nums text-xs space-y-1">
              <span className="font-sans font-bold text-zinc-900 dark:text-zinc-100 block">Graduated Tiered Commission Formula</span>
              <div>Total Commission = ∑ [ (Tier Sales) × (Tier Rate / 100) ]</div>
              <div>Total Compensation = Base Salary + Total Commission</div>
            </div>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Graduated Tiered Brackets Example</h2>
          <p>
            For a salesperson generating $27,000 in monthly sales with the following tiered bracket structure:
          </p>
          <div className="bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border font-sans tabular-nums text-xs space-y-1">
            <div>• Tier 1 ($0 to $20,000 @ 3%): $20,000 × 0.03 = $600.00</div>
            <div>• Tier 2 ($20,000 to $25,000 @ 5%): $5,000 × 0.05 = $250.00</div>
            <div>• Tier 3 ($25,000+ @ 10%): $2,000 × 0.10 = $200.00</div>
            <div>Total Commission Earned = $600 + $250 + $200 = $1,050.00</div>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Real Estate Agent &amp; Brokerage Split Mechanics</h2>
          <p>
            Real estate commissions are split between the listing broker and buyer broker (e.g. 50/50 split of a 6% total commission). Each agent then splits their share with their sponsoring brokerage (e.g. 80% agent / 20% brokerage) until annual cap thresholds are achieved.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-y border-zinc-200 dark:border-zinc-800 py-6 text-xs">
          <div>
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-1">Commission Only</h3>
            <p>High reward potential with zero base pay safety net, standard in real estate and automotive sales.</p>
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-1">Base Salary + Commission</h3>
            <p>Provides income stability alongside sales performance incentives, popular in B2B SaaS sales.</p>
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-1">Draw Against Commission</h3>
            <p>Advance pay against future commission earnings to protect reps during long sales cycles.</p>
          </div>
        </div>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Quota &amp; Target Goal Seek Planning</h2>
          <p>
            Calculating required sales volume helps sales representatives and managers establish weekly and monthly activity targets needed to achieve specific compensation goals.
          </p>
        </section>
      </div>

      {/* 15+ FAQ Accordion Section */}
      <section className="space-y-6  dark:border-zinc-800 pt-8">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Frequently Asked Questions (15 Key Commission Insights)
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

      {/* Related Calculators */}
      <section className="space-y-3  dark:border-zinc-800 pt-6">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Related Financial &amp; Business Calculators</h2>
        <div className="flex flex-wrap gap-2 text-xs">
          <Link href="/calculators/margin-calculator" className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Profit Margin Calculator
          </Link>
          <Link href="/calculators/discount-calculator" className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Discount Calculator
          </Link>
          <Link href="/calculators/income-tax-calculator" className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Income Tax Calculator
          </Link>
          <Link href="/calculators/roi-calculator" className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            ROI Calculator
          </Link>
        </div>
      </section>
    </div>
  );
}

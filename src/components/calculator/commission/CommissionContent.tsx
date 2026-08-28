"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  BookOpen,
  ShieldCheck,
  Briefcase,
  DollarSign,
  Layers,
  Building,
  Target,
  TrendingUp,
  Percent,
  Calculator,
  ArrowRight,
  Scale,
  Award,
  AlertTriangle,
} from "lucide-react";
import { commissionFaqs } from "@/calculators/finance/commission/faq";

export function CommissionContent() {
  // All 15 FAQs open by default (matching 401(k) / Traditional IRA / Pension calculator layout)
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: commissionFaqs.length }, (_, i) => i))
  );

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
      {/* 1. EXPANDED MAIN EDUCATIONAL CONTENT */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        
        {/* Section 1: Title & Introduction */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Commission Calculator – Sales Commission, Tiered Pay &amp; Real Estate Split Guide
          </h2>
          <p>
            Commission is one of the simplest compensation concepts mathematically, but the amount a salesperson or agent actually earns can become complicated when a deal includes different commission rates, progressive sales tiers, a base salary, brokerage splits, or an earnings target.
          </p>
          <p>
            This commission calculator lets you work through those situations using several related calculation models. You can calculate a basic sales commission, solve backward for a commission rate or sales price, model graduated commission brackets, estimate real-estate agent and brokerage distributions, and determine how much sales volume is required to reach a target income.
          </p>
          <p>
            The calculator is designed to answer both straightforward questions such as <em>&ldquo;What is 3% of $200,000?&rdquo;</em> and more involved questions such as <em>&ldquo;How much do I need to sell to earn $10,000 when I receive a $2,000 salary and a 5% commission?&rdquo;</em>
          </p>
          <p>
            For real-estate calculations, the result should be treated as a mathematical model rather than a universal industry rule. Brokerage agreements, listing agreements, buyer agreements, transaction structure, and local requirements determine how compensation is actually divided. Broker compensation is not set by law and is negotiable.
          </p>
        </section>

        {/* Section 2: What Is a Commission? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is a Commission?
          </h2>
          <p>
            A commission is compensation calculated from a sale, transaction, or other measurable business activity. In a percentage-based arrangement, the commission is normally calculated by multiplying the relevant sales amount by the agreed commission rate.
          </p>
          <p>
            For example, suppose a salesperson generates $200,000 in sales and receives a 3% commission:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-xs sm:text-sm text-center">
            Commission = $200,000 &times; 3% = $6,000 | Company Net Revenue = $200,000 &minus; $6,000 = $194,000
          </div>
          <p>
            So the salesperson earns $6,000 in commission, while the company receives $194,000 before considering other costs, fees, taxes, refunds, chargebacks, or other adjustments.
          </p>
          <p>
            The important point is that a commission percentage is applied to a defined commission base. The agreement should determine exactly what counts as the commissionable amount.
          </p>
        </section>

        {/* Section 3: How to Calculate Commission & Formulas */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How to Calculate Commission
          </h2>
          <p>The basic commission formula is:</p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-center text-xs sm:text-sm">
            C = S &times; (r / 100)
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Where: <strong>C</strong> = commission amount, <strong>S</strong> = sales amount, and <strong>r</strong> = commission rate in percent.
          </p>
          <p><strong>Example: 3% Commission on $200,000</strong></p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-xs text-center">
            C = 200,000 &times; (3 / 100) = $6,000
          </div>
          <p>When you know the sale and commission but do not know the rate:</p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-center text-xs sm:text-sm">
            r = (C / S) &times; 100 &rarr; (6,000 / 200,000) &times; 100 = 3%
          </div>
          <p>The calculator therefore works in both directions instead of requiring you to perform the algebra manually.</p>
        </section>

        {/* Section 4: What Each Mode Does */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Commission Calculator: What Each Mode Does
          </h2>
          <div className="space-y-2.5">
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block text-xs">1. Simple 3-Way Commission Solver</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Calculates the missing value when you know any two of: Sales Price, Commission Rate, or Commission Amount. For example, a $6,000 commission can result from $200k @ 3%, $150k @ 4%, or $300k @ 2%.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block text-xs">2. Graduated &amp; Tiered Commission Calculations</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Divides sales volume into progressive brackets. Each marginal rate applies only to the amount that falls inside that specific bracket rather than applying the top rate to the entire volume.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block text-xs">3. Real Estate Splits &amp; Brokerage Distributions</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Models multi-party real estate transactions, allocating gross commission between listing-side and buyer-side brokerages, and splitting each side between the agent and brokerage.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block text-xs">4. Target Goal Seek Planner</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Reverses the commission formula to determine the exact required sales volume needed to hit a target total earnings goal after accounting for guaranteed base salary.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Commission vs Markup */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Commission vs. Markup: Do Not Confuse Them
          </h2>
          <p>
            Commission and markup both use percentages, but they describe entirely different concepts:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300">
            <li><strong>Commission:</strong> Compensation associated with generating a sale or transaction (e.g. 5% on a $125 sale = $6.25).</li>
            <li><strong>Markup:</strong> The percentage added to wholesale cost to determine selling price (e.g. $100 cost sold at $125 is a 25% markup).</li>
          </ul>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            The markup belongs to the pricing structure; the commission belongs to the compensation structure.
          </p>
        </section>

        {/* Section 6: Progressive Tiered Example */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Graduated Tiered Commission Mechanics ($27,000 Example)
          </h2>
          <p>
            Consider a tiered plan with: First $20,000 @ 3%, $20,000–$25,000 @ 5%, and Amount above $25,000 @ 10%. On $27,000 in total sales:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2 text-xs font-mono">
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60">
              <span className="text-slate-500 block">Tier 1 ($0–$20k @ 3%)</span>
              <strong className="text-sm font-bold text-emerald-600">$20,000 &times; 3% = $600</strong>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60">
              <span className="text-slate-500 block">Tier 2 ($20k–$25k @ 5%)</span>
              <strong className="text-sm font-bold text-emerald-600">$5,000 &times; 5% = $250</strong>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60">
              <span className="text-slate-500 block">Tier 3 ($25k+ @ 10%)</span>
              <strong className="text-sm font-bold text-emerald-600">$2,000 &times; 10% = $200</strong>
            </div>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1 text-xs">
            <p><strong>Total Tiered Commission:</strong> $600 + $250 + $200 = <strong>$1,050.00</strong></p>
            <p><strong>Effective Commission Rate:</strong> ($1,050 / $27,000) &times; 100 = <strong>3.89%</strong></p>
            <p><strong>With $500 Base Salary:</strong> Total Compensation = $500 + $1,050 = <strong>$1,550.00</strong></p>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            <strong>Tiered vs. Flat Top-Tier:</strong> A progressive tiered plan applies each rate only to the sales within that bracket ($1,050 commission). A flat top-tier attainment plan awarding 10% on the entire $27,000 would pay $2,700. Always check your written agreement.
          </p>
        </section>

        {/* Section 7: Real Estate Commission Splits */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Real Estate Commission &amp; Brokerage Split Structure
          </h2>
          <p>
            Suppose a property sells for $500,000 with a 6% total transaction commission ($30,000 gross). In a 50/50 listing/buyer split with an 80/20 agent/brokerage split:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div><strong>Listing Agent Net (80%):</strong> $12,000.00</div>
              <div><strong>Buyer Agent Net (80%):</strong> $12,000.00</div>
              <div><strong>Brokerage Retained Share:</strong> $6,000.00</div>
            </div>
            <p className="text-slate-500 text-[11px] pt-1">
              Note: Since August 2024, NAR MLS policy changes require written buyer agreements with objectively ascertainable compensation. Real estate commission is not set by law and is fully negotiable.
            </p>
          </div>
        </section>

        {/* Section 8: Goal Planning & Reverse Solving */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Target Earnings Goal Planning Formula
          </h2>
          <p>
            To reach a target total compensation <em>T</em> with base salary <em>B</em> and commission rate <em>r</em>:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-center text-xs sm:text-sm">
            Required Sales S = (Target Total Earnings &minus; Base Salary) / (Commission Rate / 100)
          </div>
          <p>
            To earn $10,000 total with a $2,000 base salary at a 5% commission rate: ($10,000 &minus; $2,000) &divide; 0.05 = <strong>$160,000.00 in required sales volume</strong>.
          </p>
        </section>

        {/* Section 9: Taxation & Gross Revenue vs Profit */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Taxes, Withholding &amp; Company Net Revenue vs. Profit
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2 text-xs">
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block">Tax Withholding on Commissions</strong>
              <p className="text-slate-600 dark:text-slate-400">
                The IRS treats commissions as supplemental wages with a standard 22% federal withholding rate (37% over $1M). Withholding is an advance estimate, not final tax liability.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block">Company Net Revenue &ne; Company Profit</strong>
              <p className="text-slate-600 dark:text-slate-400">
                On $200k sales with $6k commission, company net revenue is $194,000. Operating costs, inventory, rent, and overhead must be subtracted before finding actual business profit.
              </p>
            </div>
          </div>
        </section>

        {/* Section 10: Common Mistakes */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Common Commission Calculation Mistakes
          </h2>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300 text-xs">
            <li><strong>Applying the highest tier to all sales:</strong> Substantially overstates earnings in progressive bracket plans.</li>
            <li><strong>Confusing commission with profit:</strong> Commission is a compensation expense, not net business profit.</li>
            <li><strong>Forgetting the commission base:</strong> A percentage requires an exact base (gross revenue, collected cash, or net of discounts).</li>
            <li><strong>Ignoring refunds and chargebacks:</strong> Cancelled sales or customer defaults often trigger contractual commission clawbacks.</li>
            <li><strong>Treating a real estate split as universal:</strong> Real estate compensation is negotiable and varies by brokerage contract.</li>
          </ul>
        </section>

        {/* Section 11: Related Calculators */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Related Income &amp; Financial Calculators
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Explore these companion financial tools for comprehensive compensation and business planning:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <Link
              href="/calculators/salary-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">Salary Calculator</span>
              <span className="text-slate-500 text-[11px]">Convert hourly wages to annual pay.</span>
            </Link>
            <Link
              href="/calculators/take-home-pay-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">Take-Home Pay</span>
              <span className="text-slate-500 text-[11px]">Estimate net paycheck deductions.</span>
            </Link>
            <Link
              href="/calculators/margin-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">Margin Calculator</span>
              <span className="text-slate-500 text-[11px]">Calculate profit margins &amp; markup.</span>
            </Link>
            <Link
              href="/calculators/discount-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">Discount Calculator</span>
              <span className="text-slate-500 text-[11px]">Model promotional price reductions.</span>
            </Link>
            <Link
              href="/calculators/sales-tax-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">Sales Tax Calculator</span>
              <span className="text-slate-500 text-[11px]">Calculate state &amp; local sales taxes.</span>
            </Link>
            <Link
              href="/calculators/income-tax-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">Income Tax</span>
              <span className="text-slate-500 text-[11px]">Estimate federal &amp; state tax brackets.</span>
            </Link>
            <Link
              href="/calculators/roi-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">ROI Calculator</span>
              <span className="text-slate-500 text-[11px]">Evaluate sales campaign returns.</span>
            </Link>
            <Link
              href="/calculators/payback-period-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">Payback Period</span>
              <span className="text-slate-500 text-[11px]">Model investment break-even timing.</span>
            </Link>
          </div>
        </section>
      </div>

      {/* 2. FAQ SECTION (All 15 FAQs, Open by Default) */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {commissionFaqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2 pr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-sans tabular-nums text-xs font-bold shrink-0">
                      Q{idx + 1}.
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-zinc-50/50 dark:bg-zinc-900/50 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
}

export default CommissionContent;

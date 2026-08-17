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

export function MarginContent() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "What is profit margin and how is it calculated?",
      a: "Profit margin measures the percentage of revenue that remains as profit after deducting product cost. Formula: Profit Margin % = [(Revenue - Cost) / Revenue] × 100.",
    },
    {
      q: "What is the difference between Margin and Markup?",
      a: "Profit Margin calculates profit relative to the selling price (revenue), whereas Markup calculates profit relative to item cost. A 25% profit margin corresponds to a 33.33% markup on cost.",
    },
    {
      q: "What is stock margin trading?",
      a: "Stock margin trading involves borrowing capital from a brokerage to buy securities, using existing account cash or stock as collateral. Federal Reserve Regulation T requires an initial margin of 50%.",
    },
    {
      q: "What is a Margin Call and when is it triggered?",
      a: "A margin call occurs when portfolio equity falls below the broker's maintenance margin requirement (typically 25% to 30%). The broker demands additional funds or liquidates positions to cover the loan.",
    },
    {
      q: "How is the Margin Call trigger price calculated?",
      a: "The stock price that triggers a margin call equals: Loan Amount / [Number of Shares × (1 - Maintenance Margin %)]. For example, a $1,281 loan on 100 shares with 25% maintenance margin triggers a call at $17.08.",
    },
    {
      q: "What is forex margin trading and leverage ratio?",
      a: "Forex margin trading uses leverage ratios (such as 20:1, 50:1, or 100:1) allowing traders to control large currency positions with a small deposit equity. A 50:1 ratio requires a 2% margin deposit.",
    },
    {
      q: "What is gross margin vs. net margin?",
      a: "Gross margin deducts only Direct Cost of Goods Sold (COGS) from revenue. Net margin deducts all operating expenses, taxes, interest, and overhead to show true net profitability.",
    },
    {
      q: "Why is margin trading considered high-risk?",
      a: "Leverage amplifies both gains and losses. If a stock declines, losses can exceed your initial cash investment, resulting in forced liquidation and debt owed to the broker.",
    },
    {
      q: "What is Federal Reserve Regulation T (Reg T)?",
      a: "Regulation T is a federal requirement establishing a 50% initial margin for purchasing equities, meaning investors must fund at least 50% of a stock purchase with cash collateral.",
    },
    {
      q: "What is maintenance margin?",
      a: "Maintenance margin is the minimum percentage of equity (FINRA minimum 25%) an investor must maintain in a margin account after purchasing stocks on leverage.",
    },
    {
      q: "Can brokers sell my stock without notifying me during a margin call?",
      a: "Yes. Brokerage agreements state that brokers can liquidate positions immediately without advance notice to satisfy a margin call if account equity drops severely.",
    },
    {
      q: "How do price increases affect markup vs. profit margin?",
      a: "As selling price increases, markup percentage grows infinitely, while profit margin asymptotically approaches 100%.",
    },
    {
      q: "What is a good profit margin for retail or e-commerce?",
      a: "Average gross profit margins in retail range between 30% and 50%, while net profit margins typically range from 5% to 15% depending on operating costs.",
    },
    {
      q: "What is a margin interest rate?",
      a: "Margin interest is the annual percentage rate (APR) charged by brokerages on borrowed funds used in a margin account, typically ranging from 7% to 13%.",
    },
    {
      q: "How can businesses improve profit margins?",
      a: "Businesses improve margins by reducing cost of goods (COGS) through wholesale volume discounts, increasing selling prices, or optimizing operational efficiency.",
    },
  ];

  return (
    <div className="mt-12 space-y-12  dark:border-zinc-800 pt-10 text-zinc-800 dark:text-zinc-200">
      {/* Article Header */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
          <BookOpen className="h-4 w-4" /> Comprehensive Financial Margin Guide
        </div>
        <h1 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
          Margin Calculator Guide: Profit Margins, Stock Leverage &amp; Forex Margin
        </h1>
        <p className="text-sm text-slate-900 dark:text-slate-100 leading-relaxed max-w-4xl">
          The concept of "margin" carries distinct meanings across commerce, stock trading, and foreign exchange (forex). In business, margin measures profit relative to sales price. In stock trading and forex, margin represents collateral required to open leveraged positions.
        </p>
      </section>

      {/* Main Educational Content with Required H2 Headings */}
      <div className="space-y-8 text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">What Is Margin?</h2>
          <p>
            In corporate finance, <strong>Gross Profit Margin</strong> represents the percentage of total sales revenue retained after incurring direct costs of producing goods (COGS). In securities trading, <strong>Margin</strong> is the equity deposited by an investor with a broker to secure a loan for purchasing assets.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">How It Works</h2>
          <p>
            For commercial products, entering cost and selling price allows calculating dollar profit, gross margin percentage, and markup percentage simultaneously. For stock margin trading, entering stock price, shares, and initial margin requirement calculates the required cash deposit and borrowed loan amount.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">Formula Explained</h2>
          <div className="bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs space-y-2">
            <div>Profit Margin % = [(Revenue - Cost) / Revenue] × 100</div>
            <div>Markup % = [(Revenue - Cost) / Cost] × 100</div>
            <div>Margin Required ($) = Total Position Value × Initial Margin %</div>
            <div>Margin Call Trigger Price = Loan / [Shares × (1 - Maintenance Margin %)]</div>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">Step-by-Step Example</h2>
          <p>
            Suppose a retail item costs $120 to manufacture and sells for $160:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Dollar Profit = $160 - $120 = <strong>$40.00</strong></li>
            <li>Profit Margin % = ($40 / $160) × 100 = <strong>25.00%</strong></li>
            <li>Markup % = ($40 / $120) × 100 = <strong>33.33%</strong></li>
          </ul>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-y border-zinc-200 dark:border-zinc-800 py-6">
          <div>
            <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-1">Benefits</h2>
            <p className="text-xs">Accurate pricing ensures profitability and prevents underpricing products below break-even thresholds.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-1">Advantages</h2>
            <p className="text-xs">Margin trading leverage allows investors to magnify purchasing power and trade larger position sizes.</p>
          </div>
        </div>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">Common Mistakes</h2>
          <p>
            A common mistake is confusing <em>Margin</em> with <em>Markup</em>. Setting a 25% markup on a $100 product results in a $125 price (20% margin), which falls short of a targeted 25% profit margin ($133.33 price).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">Real-Life Applications &amp; Advanced Strategies</h2>
          <p>
            E-commerce sellers use margin calculators to set optimal list prices considering shipping and merchant fees. Stock traders use margin call solvers to place stop-loss orders above liquidation levels.
          </p>
        </section>
      </div>

      {/* 15+ FAQ Accordion Section */}
      <section className="space-y-6  dark:border-zinc-800 pt-8">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
            Frequently Asked Questions (15 Key Margin Insights)
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

      {/* Related Calculators & Final Thoughts */}
      <section className="space-y-3  dark:border-zinc-800 pt-6">
        <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400">Final Thoughts &amp; Next Steps</h2>
        <p className="text-xs text-slate-900 dark:text-slate-100 leading-relaxed">
          Mastering profit margins and managing trading leverage protects business profitability and personal portfolio capital. Explore our related financial calculators to optimize your pricing and investment strategies.
        </p>
      </section>
    </div>
  );
}

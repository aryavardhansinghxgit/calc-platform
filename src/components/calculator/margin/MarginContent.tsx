"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ShieldCheck,
  Clock,
  Landmark,
  Percent,
  Sparkles,
  TrendingUp,
  Briefcase,
  DollarSign,
  PieChart as PieIcon,
  Layers,
  BarChart3,
  Info,
  Scale,
  Calculator,
  Target,
  Zap,
} from "lucide-react";

export const marginFaqs = [
  {
    question: "What is profit margin and how does it differ from markup?",
    answer:
      "Profit margin measures profit relative to selling price (Revenue), expressed as [(Revenue − Cost) ÷ Revenue] × 100. Markup measures profit relative to cost of goods, expressed as [(Revenue − Cost) ÷ Cost] × 100. For example, if a product costs $120 and sells for $160, the $40 gross profit represents a 25% profit margin but a 33.33% markup.",
  },
  {
    question: "How do I calculate the required selling price for a target profit margin?",
    answer:
      "To achieve a target gross margin, use the formula: Selling Price = Cost ÷ (1 − Target Margin Decimal). For instance, if your wholesale cost is $120 and you require a 25% profit margin: $120 ÷ (1 − 0.25) = $120 ÷ 0.75 = $160.00. (Note: simply adding 25% to cost produces $150, which yields only a 20% margin).",
  },
  {
    question: "Can profit margin be negative?",
    answer:
      "Yes. If direct product costs or operating expenses exceed selling revenue, net profit is negative, resulting in a negative profit margin. For instance, selling an item that costs $120 for $100 creates a $20 loss and a -20% gross margin.",
  },
  {
    question: "What is stock trading margin and how does leverage work?",
    answer:
      "Stock margin is collateral equity deposited by an investor to borrow funds from a broker to purchase securities. Under Federal Reserve Regulation T, the initial margin requirement for equities is typically 50%, meaning you deposit $5,000 in equity to control $10,000 worth of stock (2x leverage multiplier).",
  },
  {
    question: "What is the difference between initial margin and maintenance margin in stocks?",
    answer:
      "Initial margin is the minimum equity percentage required to open a new leveraged position (typically 50% under Reg T). Maintenance margin is the minimum equity percentage that must remain in your account as stock prices fluctuate (FINRA Rule 4210 mandates a minimum 25%, though individual broker house rules frequently require 30%–40%).",
  },
  {
    question: "How is a stock margin-call price calculated?",
    answer:
      "The margin call price is the exact stock price where account equity falls to the broker's maintenance requirement. The formula is: Margin Call Price = Borrowed Loan Amount ÷ [Number of Shares × (1 − Maintenance Margin Decimal)]. For 100 shares purchased at $18.30 with a $1,281 loan and 25% maintenance requirement: $1,281 ÷ [100 × (1 − 0.25)] = $1,281 ÷ 75 = $17.08.",
  },
  {
    question: "What happens when a margin call is triggered?",
    answer:
      "When equity drops below the maintenance threshold, the broker issues a margin call requiring an immediate cash deposit or liquidation of securities. Under standard margin agreements, brokers reserve the right to liquidate your positions immediately without prior notification or waiting for your deposit.",
  },
  {
    question: "What is forex margin and how does forex leverage work?",
    answer:
      "Forex margin is a security deposit required to open and maintain leveraged currency positions. Margin percentage is the inverse of leverage (Margin % = 1 ÷ Leverage Ratio). For example, 20:1 leverage requires a 5% margin deposit (1 ÷ 20 = 0.05). Controlling a $100,000 standard lot at 20:1 leverage requires $5,000 in posted margin.",
  },
  {
    question: "What are the regulatory minimum margin requirements for US retail forex?",
    answer:
      "Under Commodity Futures Trading Commission (CFTC) and National Futures Association (NFA) rules, maximum leverage for US retail forex traders is capped at 50:1 (2% margin requirement) for major currency pairs and 20:1 (5% margin requirement) for non-major currency pairs to protect retail accounts from rapid liquidation.",
  },
  {
    question: "What is the difference between gross margin, operating margin, and net margin?",
    answer:
      "Gross margin measures revenue minus direct cost of goods sold (COGS). Operating margin (EBIT margin) deducts COGS plus indirect operating expenses (salaries, marketing, R&D, depreciation). Net profit margin deducts all costs including interest expenses and income taxes, showing final bottom-line profitability per dollar of revenue.",
  },
  {
    question: "Why does increasing sales volume not always fix a low profit margin?",
    answer:
      "If pricing fails to cover variable costs or marginal overhead expenses, selling more units simply accelerates cash drain. Furthermore, razor-thin gross margins leave zero cushion for supply chain inflation, payment processing fees, shipping spikes, or customer return allowances.",
  },
  {
    question: "How does price discounting affect required sales volume to maintain gross profit?",
    answer:
      "Price cuts dramatically erode margins. For example, on a product with a 25% gross margin, offering a 10% price discount requires a 66.7% surge in sales volume just to generate the identical dollar gross profit: Volume Increase % = Discount % ÷ (Original Margin % − Discount %) = 10% ÷ (25% − 10%) = 66.7%.",
  },
];

export function MarginContent() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="space-y-10 text-slate-900 dark:text-slate-100 font-sans">
      {/* 1. INTRODUCTION */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
          <BookOpen className="h-4 w-4" /> Educational &amp; Theoretical Guide
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
          1. Introduction to Financial Margins
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The mathematical term <strong>margin</strong> serves distinct yet fundamental purposes across commercial business, equity markets, and currency trading. In corporate commerce and retail pricing, <strong>profit margin</strong> measures what percentage of top-line revenue translates into gross profit after direct acquisition costs. In equity markets, <strong>stock margin</strong> represents the collateral equity required to borrow capital from a broker to establish leveraged positions. In foreign exchange, <strong>forex margin</strong> dictates the security deposit necessary to maintain notional currency exposure.
        </p>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Understanding the mathematical relationship between cost, selling price, borrowing ratios, and liquidation thresholds is critical. Confusing commercial margin with markup leads to severe underpricing in business, while failing to track maintenance equity in margin trading exposes investors to sudden forced portfolio liquidations.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Commercial Pricing</span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Evaluates gross profit, markup percentages, unit contribution margins, and break-even pricing elasticity.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Securities Collateral</span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Models Regulation T initial margin, FINRA Rule 4210 maintenance equity, and margin-call liquidation price triggers.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">Forex Leverage</span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Calculates notional lot exposure, inverse leverage ratios, and CFTC/NFA security-deposit requirements.
            </p>
          </div>
        </div>
      </section>

      {/* 2. MATHEMATICAL CONCEPT */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Scale className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          2. Mathematical Concept: Denominators &amp; Leverage Multipliers
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The central mathematical distinction between profit margin and markup lies in the choice of denominator:
        </p>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 list-disc pl-5">
          <li>
            <strong>Profit Margin Denominator:</strong> Uses Total Revenue (P). It quantifies the fraction of every incoming customer dollar retained as profit after direct costs. Because profit cannot exceed revenue in ordinary sales, margin is capped at 100%.
          </li>
          <li>
            <strong>Markup Denominator:</strong> Uses Cost of Goods Sold (C). It quantifies how much is added on top of unit costs. Markup can exceed 100%, 500%, or 1,000% without theoretical upper bound.
          </li>
          <li>
            <strong>Securities Margin Multiplier:</strong> In finance, margin represents the ratio of equity (E) to total position value (V). Leverage (L) is mathematically the reciprocal of the margin percentage: Leverage = 1 ÷ Margin %. A 20% margin requirement yields 5x leverage.
          </li>
        </ul>
      </section>

      {/* 3. FORMULAS SECTION */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Calculator className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          3. Core Formulas &amp; Variable Definitions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Commercial Profit Margin &amp; Markup
            </h3>
            <div className="space-y-1.5 font-mono text-xs text-slate-800 dark:text-slate-200">
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                Gross Profit (G) = Revenue (R) − Cost (C)
              </div>
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                Margin % = [(Revenue − Cost) ÷ Revenue] × 100
              </div>
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                Markup % = [(Revenue − Cost) ÷ Cost] × 100
              </div>
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                Target Selling Price = Cost ÷ (1 − Margin Decimal)
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Securities &amp; Forex Margin Mechanics
            </h3>
            <div className="space-y-1.5 font-mono text-xs text-slate-800 dark:text-slate-200">
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                Initial Equity Deposit = Position Value × Initial Margin %
              </div>
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                Margin Call Price = Loan ÷ [Shares × (1 − Maintenance Margin %)]
              </div>
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                Forex Margin % = 1 ÷ Leverage Ratio
              </div>
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                Required Forex Deposit = Notional Value × Forex Margin %
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW THE CALCULATION WORKS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          4. How the Calculation Works (Step-by-Step)
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex gap-3 items-start">
            <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">Step 1:</span>
            <div>
              <strong>Define Direct Inputs &amp; Parameters:</strong> Determine unit cost of goods sold (C) and proposed customer revenue (R), or position purchase price, share count, and maintenance borrowing thresholds.
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex gap-3 items-start">
            <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">Step 2:</span>
            <div>
              <strong>Calculate Net Dollar Spread:</strong> Compute absolute gross profit G = R − C or borrowed debt liability Loan = Position Value − Initial Deposit.
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex gap-3 items-start">
            <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">Step 3:</span>
            <div>
              <strong>Normalize Against Context Denominator:</strong> Compute margin percentage by dividing profit by selling price (G ÷ R) and markup percentage by dividing profit by cost (G ÷ C).
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex gap-3 items-start">
            <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">Step 4:</span>
            <div>
              <strong>Solve for Risk &amp; Liquidation Triggers:</strong> For investment margin, calculate the critical asset price at which remaining account equity Equity = (Price × Shares) − Loan exactly equals Price × Shares × Maintenance Margin %.
            </div>
          </div>
        </div>
      </section>

      {/* 5. WORKED EXAMPLES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          5. Worked Numerical Examples
        </h2>

        <div className="space-y-4">
          {/* Example 1 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Example 1: Retail Product Pricing (Cost $120, Selling Price $160)
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-semibold">
                Commercial
              </span>
            </div>
            <div className="text-xs font-mono space-y-1 text-slate-800 dark:text-slate-200">
              <div>1. Dollar Profit = $160.00 − $120.00 = $40.00</div>
              <div>2. Profit Margin % = ($40.00 ÷ $160.00) × 100 = 25.00%</div>
              <div>3. Markup % = ($40.00 ÷ $120.00) × 100 = 33.33%</div>
              <div className="text-slate-600 dark:text-slate-400 pt-1 font-sans text-[11px]">
                Insight: A 25% profit margin requires a 33.33% markup on cost.
              </div>
            </div>
          </div>

          {/* Example 2 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Example 2: Stock Margin &amp; Margin Call Trigger (100 shares @ $18.30)
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-semibold">
                Securities
              </span>
            </div>
            <div className="text-xs font-mono space-y-1 text-slate-800 dark:text-slate-200">
              <div>1. Total Position Value = 100 shares × $18.30 = $1,830.00</div>
              <div>2. Initial Deposit (30% Initial Margin) = $1,830.00 × 30% = $549.00</div>
              <div>3. Borrowed Loan Balance = $1,830.00 − $549.00 = $1,281.00</div>
              <div>4. Margin Call Trigger Price (25% Maintenance Margin) = $1,281.00 ÷ [100 × (1 − 0.25)] = $1,281 ÷ 75 = $17.08</div>
              <div>5. Maximum Drop Before Margin Call = ($17.08 − $18.30) ÷ $18.30 = -6.67%</div>
              <div className="text-slate-600 dark:text-slate-400 pt-1 font-sans text-[11px]">
                Verification: At $17.08/share, Position = $1,708. Equity = $1,708 − $1,281 = $427 (exactly 25% of $1,708).
              </div>
            </div>
          </div>

          {/* Example 3 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wider text-purple-600 dark:text-purple-400">
                Example 3: Forex Currency Position (EUR/USD @ 1.30, 20:1 Leverage)
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 font-semibold">
                Forex
              </span>
            </div>
            <div className="text-xs font-mono space-y-1 text-slate-800 dark:text-slate-200">
              <div>1. Position Size = 100 units @ 1.30 exchange rate = $130.00 Notional Value</div>
              <div>2. Margin Requirement % = 1 ÷ 20 = 5.00%</div>
              <div>3. Required Security Deposit = $130.00 × 5.00% = $6.50</div>
              <div className="text-slate-600 dark:text-slate-400 pt-1 font-sans text-[11px]">
                Insight: A $6.50 equity deposit commands $130.00 in currency exposure under 20:1 leverage.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. VISUAL UNDERSTANDING & SENSITIVITY TABLE */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          6. Visual Understanding: Margin vs. Markup Sensitivity Matrix
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The table below demonstrates how adjusting customer selling price across a fixed $120 unit cost impacts gross dollar profit, profit margin, and corresponding markup percentage:
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-100 dark:bg-slate-800 font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3">Scenario</th>
                <th className="p-3">Selling Price ($)</th>
                <th className="p-3">Unit Cost ($)</th>
                <th className="p-3">Dollar Profit ($)</th>
                <th className="p-3">Profit Margin (%)</th>
                <th className="p-3">Markup (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[11px]">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-sans font-medium text-slate-900 dark:text-slate-100">80% Revenue (Discounted)</td>
                <td className="p-3">$128.00</td>
                <td className="p-3">$120.00</td>
                <td className="p-3 text-amber-600 dark:text-amber-400">$8.00</td>
                <td className="p-3">6.25%</td>
                <td className="p-3">6.67%</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-sans font-medium text-slate-900 dark:text-slate-100">90% Revenue</td>
                <td className="p-3">$144.00</td>
                <td className="p-3">$120.00</td>
                <td className="p-3">$24.00</td>
                <td className="p-3">16.67%</td>
                <td className="p-3">20.00%</td>
              </tr>
              <tr className="bg-blue-50/50 dark:bg-blue-950/20 font-semibold">
                <td className="p-3 font-sans text-blue-700 dark:text-blue-300">100% Baseline Model</td>
                <td className="p-3 text-blue-700 dark:text-blue-300">$160.00</td>
                <td className="p-3">$120.00</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400">$40.00</td>
                <td className="p-3 text-blue-700 dark:text-blue-300">25.00%</td>
                <td className="p-3">33.33%</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-sans font-medium text-slate-900 dark:text-slate-100">110% Revenue</td>
                <td className="p-3">$176.00</td>
                <td className="p-3">$120.00</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400">$56.00</td>
                <td className="p-3">31.82%</td>
                <td className="p-3">46.67%</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-sans font-medium text-slate-900 dark:text-slate-100">120% Revenue (Premium)</td>
                <td className="p-3">$192.00</td>
                <td className="p-3">$120.00</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400">$72.00</td>
                <td className="p-3">37.50%</td>
                <td className="p-3">60.00%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          7. Critical Mistakes &amp; Financial Misconceptions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
            <h3 className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              1. Adding Target Margin Directly to Cost
            </h3>
            <p className="text-amber-800/90 dark:text-amber-300/90 text-xs">
              Multiplying a $100 cost by 1.30 produces $130, which gives a 23.08% margin, NOT 30%. True 30% margin requires dividing by 0.70 ($142.86).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
            <h3 className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              2. Assuming Margin Calls Guarantee Prior Notice
            </h3>
            <p className="text-amber-800/90 dark:text-amber-300/90 text-xs">
              Under FINRA rules and brokerage customer agreements, brokers have the legal right to liquidate client securities immediately without notice to satisfy maintenance deficits.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
            <h3 className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              3. Overlooking Non-Linear Leverage Risk
            </h3>
            <p className="text-amber-800/90 dark:text-amber-300/90 text-xs">
              Leverage magnifies losses symmetrically. At 10:1 leverage, a minor 10% adverse price move completely eliminates 100% of your deposited equity capital.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
            <h3 className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              4. Confusing Gross Margin with Net Profit
            </h3>
            <p className="text-amber-800/90 dark:text-amber-300/90 text-xs">
              A 40% gross margin does not equal 40% profit in your pocket. Operating overhead, payroll, software subscriptions, credit card merchant fees (2.5%–3.5%), and taxes must still be deducted.
            </p>
          </div>
        </div>
      </section>

      {/* 8. PRACTICAL APPLICATIONS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          8. Practical Industry &amp; Trading Applications
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">E-Commerce &amp; Retail</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Wholesalers use margin formulas to structure tiered volume discounts, wholesale price sheets, and MAP (minimum advertised pricing) compliance agreements.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Securities Portfolio Hedging</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Investors compute margin-call trigger thresholds to place automated stop-loss protection orders well above forced liquidation price zones.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Corporate FP&amp;A</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Finance directors monitor gross, operating, and EBITDA margins across distinct product lines to identify margin compression and allocate capital.
            </p>
          </div>
        </div>
      </section>

      {/* 9. FREQUENTLY ASKED QUESTIONS */}
      <section className="space-y-4 pt-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
            9. Frequently Asked Questions (FAQ)
          </h2>
        </div>

        <div className="space-y-3">
          {marginFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-100 flex items-start gap-2.5">
                    <span className="text-blue-600 dark:text-blue-400 font-bold shrink-0">
                      Q{idx + 1}.
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  <div className="shrink-0 text-slate-400">
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/80 leading-relaxed font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 10. SUMMARY & KEY TAKEAWAYS */}
      <section className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-3">
        <h3 className="font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          10. Educational Key Takeaways
        </h3>
        <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 list-disc pl-5 leading-relaxed">
          <li><strong>Margin vs. Markup:</strong> Margin divides by Revenue (R); Markup divides by Cost (C). They represent different fractions of the same dollar profit.</li>
          <li><strong>Pricing Target:</strong> Always use Selling Price = Cost ÷ (1 − Margin) to protect gross commercial margins.</li>
          <li><strong>Securities Margin:</strong> Reg T mandates 50% initial margin; FINRA requires 25% minimum maintenance equity.</li>
          <li><strong>Margin Call Price:</strong> Modeled as Loan ÷ [Shares × (1 − Maintenance %)].</li>
          <li><strong>Leverage Reciprocal:</strong> In foreign exchange, Margin % is the mathematical inverse of the leverage ratio (1 ÷ Leverage).</li>
        </ul>
      </section>

      {/* REGULATORY DISCLAIMER */}
      <section className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-900 dark:text-amber-200 space-y-1 leading-relaxed">
        <div className="font-bold flex items-center gap-1.5">
          <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0" />
          Regulatory Disclosure &amp; Trading Risk Notice
        </div>
        <p>
          Calculations are for educational and mathematical modeling purposes only. Margin borrowing in securities involves substantial risk of loss and is subject to broker approval, house maintenance rules, and regulatory frameworks (Regulation T, FINRA Rule 4210, CFTC/NFA retail forex guidelines).
        </p>
      </section>
    </div>
  );
}

export default MarginContent;

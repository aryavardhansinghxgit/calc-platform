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
  Heart,
  Briefcase,
  DollarSign,
  PieChart,
  Tag,
  Layers,
  BarChart3,
  Info,
} from "lucide-react";

export function MarginContent() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "What is profit margin?",
      a: "Profit margin is the percentage of revenue that remains as profit after subtracting the modeled direct cost. The basic formula is (Revenue − Cost) ÷ Revenue × 100. A product costing $120 and selling for $160 therefore has a 25% profit margin.",
    },
    {
      q: "What is the difference between margin and markup?",
      a: "Margin measures profit as a percentage of revenue, while markup measures profit as a percentage of cost. A $120 cost and $160 selling price produce a 25% margin but a 33.33% markup.",
    },
    {
      q: "How do I calculate a 25% profit margin?",
      a: "A target margin cannot normally be achieved by simply adding 25% to cost. The required price is Cost ÷ (1 − Margin). With a $120 cost, a 25% target margin requires $160 revenue.",
    },
    {
      q: "How is markup calculated?",
      a: "Markup is (Revenue − Cost) ÷ Cost × 100. If a product costs $120 and sells for $160, the markup is 33.33%.",
    },
    {
      q: "Can profit margin be negative?",
      a: "Yes. If revenue is less than cost, the business has a loss rather than a profit. A $120 cost and $100 revenue produce a $20 loss and a modeled margin of -20%.",
    },
    {
      q: "What is stock margin?",
      a: "Stock margin is the amount of equity required to establish a leveraged securities position. In the calculator's example, a $1,830 stock position with a 30% initial margin requirement requires $549 of equity.",
    },
    {
      q: "What is the difference between initial margin and maintenance margin?",
      a: "Initial margin is the equity required to establish a leveraged position under the applicable rule or model. Maintenance margin is the minimum equity that must remain relative to the current market value after the position has been established. Brokers can impose maintenance requirements above regulatory baselines.",
    },
    {
      q: "How is a stock margin-call price calculated?",
      a: "Under the calculator's model, the trigger price is Loan ÷ [Shares × (1 − Maintenance Margin)]. For the $1,281 loan, 100 shares, and 25% maintenance example, the modeled price is approximately $17.08.",
    },
    {
      q: "Is the margin-call price from this calculator guaranteed?",
      a: "No. It is a mathematical scenario under the selected inputs. Actual brokers can impose higher maintenance requirements, security-specific rules, portfolio-level requirements, or different liquidation procedures. The SEC warns that firms may liquidate securities under the terms of the margin agreement and may not always wait for a traditional margin call.",
    },
    {
      q: "What is forex margin?",
      a: "Forex margin is the capital required to control a currency position under a specified leverage or security-deposit assumption. At 20:1 leverage, the mathematical margin requirement is 5%, so a $130 notional position would require $6.50 under the calculator's model.",
    },
    {
      q: "Does higher forex leverage mean higher profit?",
      a: "No. Leverage increases exposure relative to the capital posted. It can magnify both gains and losses. The CFTC specifically warns that leverage amplifies gains and losses in retail forex trading.",
    },
    {
      q: "What does 20:1 leverage mean?",
      a: "20:1 leverage means one unit of posted capital corresponds to approximately 20 units of notional exposure under the simplified model. The corresponding margin percentage is 1 ÷ 20 = 5%.",
    },
    {
      q: "Are forex margin requirements the same for every broker?",
      a: "No. Actual requirements can depend on the broker, jurisdiction, currency pair, instrument, account type, and applicable regulatory rules. U.S. retail forex transactions are subject to regulatory security-deposit requirements, but a calculator scenario should not be interpreted as a universal broker quotation.",
    },
    {
      q: "What is a margin call?",
      a: "A margin call generally occurs when account equity falls below the applicable maintenance requirement. The broker may require additional capital or liquidate positions according to the margin agreement and applicable rules. The SEC notes that firms may liquidate securities without waiting for the customer to satisfy a traditional margin call.",
    },
    {
      q: "Why are margin and markup different percentages for the same product?",
      a: "Because they use different denominators. Margin divides profit by revenue; markup divides profit by cost. With $120 cost and $160 revenue, the same $40 profit is 25% of revenue but 33.33% of cost.",
    },
  ];

  return (
    <div className="mt-12 space-y-12 dark:border-zinc-800 pt-10 text-zinc-800 dark:text-zinc-200 font-sans">
      {/* SECTION 1: HEADER & EXECUTIVE OVERVIEW */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
          <BookOpen className="h-4 w-4" /> Comprehensive Financial Margin Guide
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">
          Margin Calculator — Profit Margins, Stock Leverage &amp; Forex Margin
        </h1>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed max-w-4xl font-normal">
          The word margin can mean very different things depending on what you are calculating. In business pricing, profit margin tells you what percentage of selling revenue remains after direct product cost. In stock trading, margin refers to the equity a trader must provide when borrowing against securities. In forex, margin represents the deposit required to control a larger notional position through leverage. A margin call then introduces another calculation altogether: the market price at which account equity falls to the broker's required maintenance level. Treating all of these concepts as the same percentage creates misleading results.
        </p>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed max-w-4xl font-normal">
          This Margin Calculator is designed around those distinctions. The business module calculates dollar profit, gross profit margin, and markup from cost and revenue. The stock module estimates the required deposit, borrowed margin loan, position value, and a modeled margin-call trigger price. The forex module converts an exchange rate, trading units, and leverage ratio into notional value and required margin. A separate risk solver shows the stock-price decline implied by the selected maintenance requirement, while the sensitivity dashboard demonstrates how changing selling price affects both margin and markup.
        </p>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed max-w-4xl font-normal">
          The calculator's business reference example is simple but important. An item costs $120 to produce or acquire and sells for $160. The dollar profit is therefore $40. Profit margin is $40 divided by $160, or 25%. Markup is $40 divided by $120, or 33.33%. The numbers are different because margin uses revenue as its denominator while markup uses cost.
        </p>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed max-w-4xl font-normal">
          The investment side of the calculator uses a different definition of margin entirely. In the stock example shown in the current calculator, a $18.30 stock price and 100 shares create a $1,830 position. With a 30% initial margin requirement, the modeled required deposit is $549 and the implied borrowed amount is $1,281. With a 25% maintenance requirement, the formula produces a modeled margin-call trigger of approximately $17.08. These figures describe a mathematical margin model under the selected assumptions; they should not be interpreted as a guarantee that every brokerage account uses the same requirements or liquidation procedure.
        </p>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed max-w-4xl font-normal">
          That qualification matters because brokerage maintenance requirements can be higher than regulatory minimums, and brokers may liquidate positions under their margin agreement. FINRA's published margin requirements describe a 50% initial-margin framework under Regulation T for most marginable equity purchases and a 25% maintenance requirement as a baseline for long marginable equity positions, while also noting that firms may impose higher maintenance requirements.
        </p>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed max-w-4xl font-normal">
          Forex margin is also highly dependent on the instrument, broker, jurisdiction, and regulatory regime. In the calculator's illustrative 20:1 example, a 5% margin requirement controls a $130 notional position with $6.50 of required margin. That relationship is mathematically straightforward—20:1 leverage corresponds to a 5% deposit—but actual retail forex security-deposit requirements are governed by applicable rules and can differ by currency pair and regulatory jurisdiction. The CFTC states that U.S. retail forex rules impose minimum security-deposit parameters of 2% for major currency pairs and 5% for other retail forex transactions, subject to the applicable regulatory framework.
        </p>
      </section>

      {/* SECTION 2: PROFIT MARGIN VS MARKUP */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
          <PieChart className="h-5 w-5" /> Profit Margin vs. Markup: The Most Important Distinction in Business Pricing
        </h2>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
          Profit margin and markup are often used interchangeably in everyday conversation, but they measure profitability from different reference points. That difference becomes significant when a business sets prices, evaluates products, compares suppliers, or determines whether a target margin has actually been achieved.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Profit Margin Formula (Revenue Baseline)
            </h3>
            <div className="space-y-1 font-mono text-xs text-slate-800 dark:text-slate-200">
              <div>Profit = Revenue − Cost</div>
              <div>Profit Margin % = [(Revenue − Cost) ÷ Revenue] × 100</div>
              <div className="text-zinc-500 dark:text-zinc-400 text-[11px] pt-1">
                Baseline: ($40 ÷ $160) × 100 = 25.00%
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Markup Formula (Cost Baseline)
            </h3>
            <div className="space-y-1 font-mono text-xs text-slate-800 dark:text-slate-200">
              <div>Markup % = [(Revenue − Cost) ÷ Cost] × 100</div>
              <div>Required Price = Cost × (1 + Markup %)</div>
              <div className="text-zinc-500 dark:text-zinc-400 text-[11px] pt-1">
                Baseline: ($40 ÷ $120) × 100 = 33.33%
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
          The same $40 profit can therefore be described as a 25% margin or a 33.33% markup. Neither calculation is wrong. They simply answer different questions.
        </p>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
          The distinction becomes even clearer when working backward from a target. Suppose a product costs $120 and the business wants a 25% profit margin. It cannot simply add 25% to the cost and charge $150. A $150 selling price would produce only:
          <br />
          <strong className="font-mono">($150 − $120) ÷ $150 = 20% margin</strong>
          <br />
          To achieve a true 25% margin, the required selling price is:
          <br />
          <strong className="font-mono">Price = Cost ÷ (1 − Target Margin) → $120 ÷ 0.75 = $160.00</strong>
        </p>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
          This is one of the most valuable applications of the calculator because businesses frequently say, "I want a 25% margin," when what they actually mean is "I want to mark my cost up by 25%." Those are not equivalent. A 25% markup on $120 produces a selling price of $120 × 1.25 = $150, resulting in only a 20% margin.
        </p>
      </section>

      {/* SECTION 3: STOCK MARGIN */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
          <TrendingUp className="h-5 w-5" /> Stock Margin: How a Leveraged Position Turns a Deposit Into a Larger Position
        </h2>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
          Stock margin is fundamentally different from business profit margin. Instead of asking how much profit a product produces relative to revenue, stock margin asks how much equity an investor must provide when financing a securities position with borrowed funds.
        </p>

        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Stock Margin Position Breakdown ($18.30 Stock Price × 100 Shares)
          </h3>
          <div className="space-y-1.5 text-xs font-mono text-slate-800 dark:text-slate-200">
            <div>1. Total Position Value: $18.30 × 100 = $1,830.00</div>
            <div>2. Required Initial Deposit (30% Margin): $1,830 × 30% = $549.00</div>
            <div>3. Implied Borrowed Loan: $1,830 − $549 = $1,281.00</div>
            <div className="text-blue-600 dark:text-blue-400 font-bold pt-1">
              4. Modeled Leverage Multiplier: $1,830 ÷ $549 ≈ 3.33x Purchasing Power
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
          Actual U.S. brokerage rules are more nuanced. Regulation T generally requires 50% initial margin for most marginable long equity purchases, while FINRA's baseline maintenance requirement for long marginable equity positions is generally 25%; individual firms can impose higher requirements.
        </p>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
          This is why the calculator's 30% initial / 25% maintenance example should be treated as a scenario, not as a universal brokerage rule. A broker can impose a higher house maintenance requirement, and certain securities can have special requirements.
        </p>
      </section>

      {/* SECTION 4: MARGIN CALL PRICE TRIGGER */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" /> Margin Call Price: Understanding the Point Where Maintenance Equity Becomes Critical
        </h2>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
          The Margin Call Trigger Solver answers a more advanced question: given the current position, borrowed amount, number of shares, and maintenance requirement, at what stock price would account equity mathematically fall to the maintenance threshold?
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-1">
          <div>Formula: Margin Call Price = Loan ÷ [Shares × (1 − Maintenance Margin %)]</div>
          <div>Calculation: $1,281 ÷ [100 × (1 − 0.25)] = $1,281 ÷ 75 = $17.08</div>
          <div className="text-rose-600 dark:text-rose-400 font-bold pt-1">
            Modeled Maximum Price Decline: ($17.08 ÷ $18.30 − 1) × 100 ≈ -6.7%
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
          The strongest way to verify this result is not merely to reproduce the formula. Instead, calculate the account's equity at the trigger price and compare it with the maintenance requirement. At approximately $17.08:
          <br />
          • Position Value ≈ $1,708.00
          <br />
          • Loan = $1,281.00
          <br />
          • Equity = $1,708 − $1,281 = <strong>$427.00</strong>
          <br />
          Twenty-five percent of $1,708 is approximately $427, so the equity percentage is exactly equal to the maintenance requirement.
        </p>
      </section>

      {/* SECTION 5: FOREX MARGIN & LEVERAGE */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
          <Landmark className="h-5 w-5" /> Forex Margin and Leverage: Why a Small Deposit Controls a Larger Notional Position
        </h2>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
          Forex margin is a third meaning of margin, and it is fundamentally a leverage calculation. The calculator's production example uses:
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-1">
          <div>1. Exchange Rate: 1.30 | Units: 100 | Leverage Ratio: 20:1</div>
          <div>2. Equivalent Margin % = 1 ÷ 20 = 5.00%</div>
          <div>3. Total Notional Value = 1.30 × 100 = $130.00</div>
          <div className="text-purple-600 dark:text-purple-400 font-bold pt-1">
            4. Required Margin Deposit = $130.00 × 5% = $6.50
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
          The CFTC explicitly warns that leverage amplifies both gains and losses. In retail forex, minimum security-deposit parameters are 2% of notional value for major currency pairs and 5% for other retail forex transactions under U.S. regulatory frameworks.
        </p>
      </section>

      {/* SECTION 6: SENSITIVITY MATRIX */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
          <BarChart3 className="h-5 w-5" /> Margin Sensitivity: How Price Changes Alter Profitability and Leverage
        </h2>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
          The calculator's sensitivity dashboard provides a bridge between the core business margin calculation and real pricing decisions. Holding the cost at $120, it evaluates several revenue scenarios around the baseline $160 selling price:
        </p>
        <div className="space-y-1.5 text-xs font-mono bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
          <div>• 80% Revenue ($128): Profit $8.00 | Margin 6.25% | Markup 6.67%</div>
          <div>• 90% Revenue ($144): Profit $24.00 | Margin 16.67% | Markup 20.00%</div>
          <div>• 100% Revenue ($160): Profit $40.00 | Margin 25.00% | Markup 33.33%</div>
          <div>• 110% Revenue ($176): Profit $56.00 | Margin 31.82% | Markup 46.67%</div>
          <div>• 120% Revenue ($192): Profit $72.00 | Margin 37.50% | Markup 60.00%</div>
        </div>
      </section>

      {/* SECTION 7: COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" /> Margin Calculation Mistakes That Can Distort Business and Trading Decisions
        </h2>
        <div className="space-y-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-normal leading-relaxed">
          <p>• <strong>Confusing margin with markup:</strong> A 25% markup on a $100 item produces a $125 price and a $25 profit, which equals a 20% margin, not 25%.</p>
          <p>• <strong>Using cost as the margin denominator:</strong> Margin is Profit ÷ Revenue, whereas Markup is Profit ÷ Cost.</p>
          <p>• <strong>Adding target margin directly to cost:</strong> A 30% margin requires Cost ÷ 0.70, not Cost × 1.30.</p>
          <p>• <strong>Equating initial margin with maintenance margin:</strong> Initial margin opens a position; maintenance margin sustains it.</p>
          <p>• <strong>Assuming margin call prices are guaranteed:</strong> Brokerages can liquidate positions immediately without demand under account agreements.</p>
          <p>• <strong>Treating leverage as guaranteed profit:</strong> Leverage magnifies both gains and losses proportionally.</p>
          <p>• <strong>Assuming forex leverage is universal:</strong> Allowable leverage depends on regulatory frameworks, broker policy, and currency pair risk.</p>
          <p>• <strong>Ignoring context denominators:</strong> Margin in corporate finance differs fundamentally from margin in securities collateral.</p>
        </div>
      </section>

      {/* SECTION 8: HOW TO USE */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5" /> How to Use the Margin Calculator
        </h2>
        <div className="space-y-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-normal leading-relaxed">
          <p>• <strong>Profit Margin &amp; Markup:</strong> Enter any two of Cost, Revenue, Margin %, or Profit to solve for remaining business pricing metrics.</p>
          <p>• <strong>Stock Trading Margin:</strong> Input stock price, shares, initial margin %, and maintenance margin % to evaluate purchasing power and borrowing.</p>
          <p>• <strong>Margin Call Trigger Solver:</strong> Model the exact price threshold where portfolio equity hits maintenance requirements.</p>
          <p>• <strong>Forex Exchange Margin:</strong> Specify exchange rate, leverage ratio, and units to compute notional trade exposure and required deposit.</p>
          <p>• <strong>Sensitivity &amp; Dashboards:</strong> Review dynamic tables and visual charts demonstrating how pricing shifts impact unit profitability.</p>
        </div>
      </section>

      {/* SECTION 9: FREQUENTLY ASKED QUESTIONS */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 sm:p-5 shadow-xs space-y-2"
            >
              <h3 className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 font-sans tabular-nums font-bold shrink-0">
                  Q{idx + 1}.
                </span>
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 10: FORMULA REFERENCE */}
      <section className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-xs space-y-3">
        <h3 className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          FORMULA REFERENCE &amp; MATHEMATICAL DEFINITIONS
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-[11px] text-slate-800 dark:text-slate-200">
          <div className="p-3 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700">
            <strong>Profit Margin %:</strong> [(Revenue − Cost) ÷ Revenue] × 100
          </div>
          <div className="p-3 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700">
            <strong>Markup %:</strong> [(Revenue − Cost) ÷ Cost] × 100
          </div>
          <div className="p-3 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700">
            <strong>Required Stock Deposit:</strong> Position Value × Initial Margin %
          </div>
          <div className="p-3 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700">
            <strong>Margin Call Price:</strong> Loan ÷ [Shares × (1 − Maintenance Margin %)]
          </div>
          <div className="p-3 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700">
            <strong>Forex Margin %:</strong> 1 ÷ Leverage Ratio
          </div>
          <div className="p-3 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700">
            <strong>Required Forex Deposit:</strong> (Exchange Rate × Units) × Margin %
          </div>
        </div>
      </section>

      {/* SECTION 12: YMYL REGULATORY & TRADING RISK DISCLOSURE */}
      <section className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-900 dark:text-amber-200 space-y-1.5 leading-relaxed">
        <div className="font-bold flex items-center gap-1.5">
          <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0" />
          Important Financial-Risk &amp; Regulatory Note
        </div>
        <p>
          This calculator performs mathematical modeling. Stock-margin and forex-margin results are not guarantees of broker requirements, liquidation prices, available leverage, or trading outcomes. For securities margin, Regulation T and FINRA rules provide regulatory frameworks, while individual broker-dealers may impose higher maintenance requirements. For retail forex, applicable security-deposit and leverage requirements depend on the regulatory jurisdiction and transaction. In the U.S., CFTC rules establish minimum security-deposit parameters, and the CFTC warns that leverage magnifies both gains and losses.
        </p>
      </section>
    </div>
  );
}

export default MarginContent;

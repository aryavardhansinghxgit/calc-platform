"use client";

import React from "react";
import Link from "next/link";
import {
  EducationalSection,
  FormulaBox,
  EducationalGrid,
  EducationalCard,
  FAQSection,
  DisclaimerSection,
} from "@/components/calculator/educational";

export function InvestmentContent() {
  const faqs = [
    {
      question: "What is a good annual investment return?",
      answer:
        "Historically, a broad stock market index fund (e.g. S&P 500) returns an average of 8–10% annually before inflation. Balanced portfolios with fixed-income bonds generally target 5–7% nominal annual returns.",
    },
    {
      question: "How much should I invest monthly?",
      answer:
        "Financial advisors generally recommend investing 15–20% of your gross annual income into retirement and growth portfolios to build long-term financial independence.",
    },
    {
      question: "What is dollar-cost averaging (DCA)?",
      answer:
        "Dollar-cost averaging (DCA) is the disciplined practice of investing a fixed dollar amount at recurring intervals regardless of market fluctuations, reducing timing risk and emotional volatility.",
    },
    {
      question: "Should I invest monthly or annually?",
      answer:
        "Monthly contributions put capital to work faster, capturing intra-year compound returns and dollar-cost averaging benefits compared to a single annual lump-sum deposit at year-end.",
    },
    {
      question: "How does the FIRE number work?",
      answer:
        "Your Financial Independence, Retire Early (FIRE) number typically equals 25 times your anticipated annual living expenses, derived from the academic 4% safe withdrawal rule.",
    },
    {
      question: "How does expense ratio impact portfolio growth?",
      answer:
        "High management fees compound exponentially over time. An expense ratio of 1.00% versus 0.05% in low-cost index funds can erase up to 25% of total potential investment wealth over a 30-year horizon.",
    },
  ];

  return (
    <div className="space-y-10 py-2 text-slate-900 dark:text-slate-100">
      {/* 1. WHAT IS INVESTING & WHY IT MATTERS */}
      <EducationalSection
        id="what-is-investing"
        title="Understanding Investing & Long-Term Portfolio Growth"
      >
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <strong>Investing</strong> is the strategic commitment of capital to productive assets—such as equities,
          fixed-income bonds, real estate investment trusts (REITs), certificates of deposit (CDs), or commodities—with
          the objective of generating capital appreciation, dividend income, or compound cash flows over time.
        </p>

        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Unlike uninvested cash held in low-yield deposit accounts which steadily loses real purchasing power to inflation,
          invested capital leverages compounding returns through asset appreciation, recurring dividend reinvestment, and
          interest accumulation, transforming investment horizon into a powerful wealth multiplier.
        </p>

        <EducationalGrid columns={2}>
          <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 space-y-1">
            <h4 className="font-bold text-xs text-blue-900 dark:text-blue-200">
              Inflation Protection &amp; Real Growth
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Historically, broad equity index funds return 8–10% nominal annualized gains, outpacing long-term consumer
              price inflation (2–3%) to preserve and expand real purchasing power.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-1">
            <h4 className="font-bold text-xs text-emerald-900 dark:text-emerald-200">
              Passive Income &amp; Financial Independence
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Consistent compound accumulation builds a self-sustaining asset base capable of funding living expenses via
              the classic 4% safe withdrawal rule.
            </p>
          </div>
        </EducationalGrid>
      </EducationalSection>

      {/* 2. THE POWER OF COMPOUND GROWTH & TIME HORIZON */}
      <EducationalSection
        id="compound-growth-time-horizon"
        title="Compound Growth Mechanics &amp; Mathematical Principles"
      >
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          The core driver of exponential portfolio expansion is <strong>compound growth</strong>—the financial mechanism
          where returns are earned not solely on original principal contributions, but continuously on all previously
          accumulated interest, dividends, and capital gains.
        </p>

        {/* Standard Formula Box Matching Mortgage Calculator Reference */}
        <FormulaBox
          title="Investment Future Value Formula (Discrete Compounding):"
          badge="Discrete Compounding Model"
          formula="FV = PV × (1 + r/n)^(n × t) + PMT × [ ((1 + r/n)^(n × t) - 1) / (r/n) ]"
          variables={[
            { symbol: "FV", name: "Future Portfolio Value", description: "Target ending balance" },
            { symbol: "PV", name: "Starting Principal", description: "Initial upfront investment" },
            { symbol: "PMT", name: "Recurring Contribution", description: "Monthly or annual deposit" },
            { symbol: "r", name: "Annual Return Rate", description: "Nominal annualized return" },
            { symbol: "t", name: "Investment Horizon", description: "Total duration in years" },
            { symbol: "n", name: "Compounding Frequency", description: "Periods per year (e.g., 12 for monthly)" },
          ]}
          notes={
            <div className="leading-relaxed">
              To evaluate dedicated compounding schedules and isolated future value curves, visit our{" "}
              <Link
                href="/calculators/compound-interest-calculator"
                className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                compound interest calculator
              </Link>{" "}
              and{" "}
              <Link
                href="/calculators/future-value-calculator"
                className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                future value calculator
              </Link>
              .
            </div>
          }
        />
      </EducationalSection>

      {/* 3. ASSET CLASSES & INVESTMENT TYPES */}
      <EducationalSection
        id="asset-classes-investment-types"
        title="Asset Classes &amp; Portfolio Construction"
      >
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Asset allocation determines over 90% of long-term portfolio return variation and volatility characteristics.
          Different asset classes fulfill distinct structural roles:
        </p>

        <EducationalGrid columns={3}>
          <EducationalCard title="1. Certificates of Deposit (CDs)">
            Low-risk fixed-income products issued by FDIC-insured banks guaranteeing principal and fixed interest returns
            for contracted maturity terms.
          </EducationalCard>

          <EducationalCard title="2. Government & Corporate Bonds">
            Debt securities providing periodic coupon distributions. U.S. Treasuries provide sovereign credit backing with
            minimal default risk.
          </EducationalCard>

          <EducationalCard title="3. Equities & Common Stocks">
            Fractional ownership in public corporations offering high long-term capital appreciation potential and dividend
            income streams.
          </EducationalCard>

          <EducationalCard title="4. Real Estate & REITs">
            Physical income property or liquid Real Estate Investment Trusts offering contractual rental yields, equity
            amortization, and inflation hedging.
          </EducationalCard>

          <EducationalCard title="5. Commodities & Gold">
            Tangible real assets (precious metals, industrial commodities) functioning as geopolitical stores of value and
            currency hedges.
          </EducationalCard>

          <EducationalCard title="6. Broad Market Index Funds & ETFs">
            Pooled baskets tracking benchmark market indexes (e.g. S&amp;P 500) delivering instant diversification with
            ultra-low expense ratios.
          </EducationalCard>
        </EducationalGrid>
      </EducationalSection>

      {/* 4. INFLATION, TAXES & EXPENSE RATIO FRICTION */}
      <EducationalSection
        id="inflation-taxes-fee-drag"
        title="Managing Inflation, Taxes &amp; Expense Ratio Friction"
      >
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Gross nominal market returns differ from net spendable real wealth due to three continuous friction factors:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">1. Inflation Purchasing Power Drag</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              A 3% constant annual inflation rate reduces nominal portfolio purchasing power by approximately 44% over a
              20-year horizon. Long-term wealth planning requires modeling real purchasing power adjustments.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">2. Expense Ratio &amp; Management Fees</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              An expense ratio of 1.00% versus 0.05% in index funds compounds aggressively over multi-decade timeframes,
              erasing up to 25% of total potential wealth accumulation over 30 years.
            </p>
          </div>
        </div>
      </EducationalSection>

      {/* 5. FREQUENTLY ASKED QUESTIONS (OPEN BY DEFAULT) */}
      <FAQSection faqs={faqs} />

      {/* 6. METHODOLOGY & EDUCATIONAL DISCLAIMER */}
      <DisclaimerSection
        title="Financial Planning Methodology & Educational Disclaimer"
        methodology="Future value projections apply discrete compounding annuity formulations with user-configured compounding frequencies, cash flow timing conventions (annuity due vs. ordinary annuity), and optional inflation-drag adjustments."
        disclaimer="This investment calculator provides mathematical simulations and hypothetical projections for general educational and personal financial planning purposes. Past performance is no guarantee of future results. Market investments are subject to market risks, including the possible loss of principal. Tax and inflation treatments represent generalized modeling assumptions. This platform does not provide personalized legal, accounting, tax, or investment advice. Consult a registered investment advisor (RIA) or certified financial planner (CFP) for personalized financial advisory guidance."
      />
    </div>
  );
}

export default InvestmentContent;

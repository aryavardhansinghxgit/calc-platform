"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Coins,
  DollarSign,
  PieChart as PieIcon,
  BookOpen,
  HelpCircle,
  ShieldCheck,
  Zap,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Target,
  Scale,
  Calculator,
  FileText,
  Clock,
  Layers,
  Sparkles,
  TrendingUp,
  Globe,
  Landmark,
  ArrowRightLeft,
} from "lucide-react";

export const currencyFaqs = [
  {
    question: "What is the mid-market exchange rate?",
    answer:
      "The mid-market rate (also known as the interbank rate or spot rate) is the real-time midpoint between global wholesale buy (bid) and sell (ask) prices traded by multinational banks in the foreign exchange market. It is the only true, unbiased exchange rate before commercial retail markups are added.",
  },
  {
    question: "Why do currency exchange rates fluctuate continuously?",
    answer:
      "Exchange rates fluctuate 24 hours a day, 5 days a week due to continuous changes in international trade flows, central bank benchmark interest rate differentials, national inflation metrics, sovereign debt levels, economic growth reports, and geopolitical capital flight.",
  },
  {
    question: "What is Dynamic Currency Conversion (DCC) and why should I always decline it?",
    answer:
      "Dynamic Currency Conversion occurs when an overseas card reader or ATM offers to bill you in your home currency rather than the local foreign currency. Choosing your home currency enables the merchant's payment terminal to apply an inflated exchange rate with a hidden 5%–12% markup. Always select to pay in the local currency.",
  },
  {
    question: "How do commercial banks and credit card issuers charge hidden fees on foreign exchange?",
    answer:
      "Financial institutions generate revenue through two layers: explicit fees (wire transfer fees, foreign transaction fees) and hidden exchange-rate spreads (offering a customer exchange rate 2.5%–4.0% worse than the interbank rate, or 8.0%–15.0% worse at airport kiosks).",
  },
  {
    question: "What is the difference between floating and fixed (pegged) exchange rate systems?",
    answer:
      "A floating exchange rate is determined entirely by market supply and demand dynamics in global FX trading (e.g., USD, EUR, GBP, JPY). A fixed or pegged currency is tied by a central monetary authority to an anchor currency (e.g., UAE Dirham pegged at 3.6725 AED/USD, Saudi Riyal pegged at 3.75 SAR/USD).",
  },
  {
    question: "What are ISO 4217 standard currency codes?",
    answer:
      "ISO 4217 is the international three-letter standard established to eliminate cross-border transaction ambiguity. The first two characters designate the country code (e.g., US for United States, JP for Japan, GB for Great Britain), while the third character denotes the currency unit (D for Dollar, Y for Yen, P for Pound).",
  },
  {
    question: "How do central bank interest rates influence currency strength?",
    answer:
      "When a central bank raises benchmark policy rates, it increases sovereign bond yields and fixed-income returns in that nation. International capital flows into those higher-yielding assets, increasing demand for that currency and causing it to appreciate.",
  },
  {
    question: "What is the Purchasing Power Parity (PPP) theory?",
    answer:
      "Purchasing Power Parity is an economic theory stating that in the long run, exchange rates between two currencies should adjust so that an identical basket of goods costs the exact same amount in both nations. Differences in inflation rates drive long-term currency depreciations or appreciations.",
  },
  {
    question: "What is the cheapest way to convert money when traveling internationally?",
    answer:
      "The most cost-effective approach is using a credit card with 0% foreign transaction fees for electronic purchases (which convert at wholesale Visa/Mastercard rates of ~0.3% spread) and withdrawing cash from official in-branch bank ATMs while declining DCC.",
  },
  {
    question: "What is the difference between a direct and indirect currency quotation?",
    answer:
      "A direct quotation states how much domestic currency is needed to buy one unit of foreign currency (e.g., In the US, $1.08 USD per 1 EUR). An indirect quotation states how much foreign currency is obtained with one unit of domestic currency (e.g., In the US, 0.9259 EUR per 1 USD).",
  },
  {
    question: "What is a currency cross rate?",
    answer:
      "A cross rate is an exchange rate between two currencies that does not involve the US Dollar as a base or quote currency (e.g., EUR/GBP or AUD/JPY), mathematically derived by dividing each currency's respective USD exchange rate.",
  },
  {
    question: "How can businesses hedge against foreign currency exchange volatility?",
    answer:
      "Corporations and importers utilize FX forward contracts, currency options, and multi-currency treasury hedging accounts to lock in guaranteed exchange rates up to 12–24 months in advance, protecting profit margins from adverse currency movements.",
  },
];

export function CurrencyContent() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="space-y-10 text-slate-900 dark:text-slate-100 font-sans">
      {/* 1. INTRODUCTION */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
          <BookOpen className="h-4 w-4" /> Comprehensive Foreign Exchange Guide
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
          1. Introduction to Foreign Exchange &amp; Currency Conversion
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The global foreign exchange (Forex / FX) market represents the world's largest and most liquid financial market, trading over <strong>$7.5 trillion in daily volume</strong> across global financial centers. A <strong>Currency Calculator</strong> converts value between distinct sovereign fiat monetary units based on real-time interbank market valuations, international ISO 4217 specifications, and central bank monetary dynamics.
        </p>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Whether planning international travel, settling cross-border commercial invoices, or evaluating overseas investment returns, understanding <strong>mid-market exchange rates</strong>, <strong>retail bank markup spreads</strong>, and <strong>Dynamic Currency Conversion (DCC) traps</strong> is essential to avoid paying excessive hidden fees.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Interbank Mid-Market</span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              The pure wholesale exchange rate traded between global banks, free from retail dealer spreads and commission markups.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Floating vs. Pegged</span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Free-market floating regimes (USD, EUR, JPY) vs. fixed central bank peg anchors (AED, SAR, HKD).
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">Hidden Spread Cost</span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Retail bank markups (2.5%–4%) and airport kiosk spreads (8%–15%) that silently inflate transaction costs.
            </p>
          </div>
        </div>
      </section>

      {/* 2. MATHEMATICAL CONCEPT */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Scale className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          2. Mathematical Concept: Exchange Ratios, Reciprocals &amp; Cross Rates
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The mathematical foundation of currency conversion relies on three core principles:
        </p>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 list-disc pl-5">
          <li>
            <strong>Direct Conversion Ratio:</strong> If the exchange rate from Base Currency (A) to Quote Currency (B) is R_(A → B), converting an amount X of Currency A produces:
            <br />
            <span className="font-mono text-xs text-blue-600 dark:text-blue-400">
              Amount_B = Amount_A × R_(A → B)
            </span>
          </li>
          <li>
            <strong>Reciprocal Inverse Rate:</strong> The reverse conversion from Currency B to Currency A is the mathematical reciprocal of the forward rate:
            <br />
            <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400">
              R_(B → A) = 1 ÷ R_(A → B)
            </span>
          </li>
          <li>
            <strong>Triangular Cross-Rate Parity:</strong> When converting between two non-USD currencies (e.g., EUR to JPY), the cross rate is derived by dividing their respective USD exchange quotes:
            <br />
            <span className="font-mono text-xs text-purple-600 dark:text-purple-400">
              R_(EUR → JPY) = R_(EUR → USD) × R_(USD → JPY)
            </span>
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
              Direct &amp; Cross Conversion Formulas
            </h3>
            <div className="space-y-1.5 font-mono text-xs text-slate-800 dark:text-slate-200">
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                Converted Amount ($B$) = Amount ($A$) × Exchange Rate ($R$)
              </div>
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                Inverse Rate = 1 ÷ Forward Rate
              </div>
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                Cross Rate ($A \to C$) = $(A \to B) \times (B \to C)$
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Bank Spread Markup &amp; Hidden Fees
            </h3>
            <div className="space-y-1.5 font-mono text-xs text-slate-800 dark:text-slate-200">
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                Retail Bank Rate = Mid-Market Rate × (1 − Spread Markup %)
              </div>
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                Hidden Spread Loss = Mid-Market Total − Retail Received Total
              </div>
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                Total Transaction Cost = Explicit Fee + Hidden Spread Loss
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
              <strong>Fetch Live Interbank Mid-Market Quote:</strong> Retrieve the institutional spot price between Base Currency (e.g., USD) and Target Currency (e.g., EUR).
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex gap-3 items-start">
            <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">Step 2:</span>
            <div>
              <strong>Execute Base Multiplication:</strong> Multiply the input principal amount by the exact real-time exchange rate to establish the fair baseline conversion value.
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex gap-3 items-start">
            <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">Step 3:</span>
            <div>
              <strong>Evaluate Retail Bank &amp; Kiosk Markups:</strong> Deduct provider percentage markups (e.g., 3.0% at banks, 10.0% at airport booths) to demonstrate real out-of-pocket costs and hidden fees.
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex gap-3 items-start">
            <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">Step 4:</span>
            <div>
              <strong>Compute Multi-Currency Matrix &amp; Inverse Quotes:</strong> Generate cross-currency tables and reciprocal rate conversions (1 Target = X Base) for complete financial transparency.
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
                Example 1: Direct Conversion &amp; Inverse Rate ($1,000 USD to EUR @ 0.9250)
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-semibold">
                Direct Conversion
              </span>
            </div>
            <div className="text-xs font-mono space-y-1 text-slate-800 dark:text-slate-200">
              <div>1. Principal Amount = $1,000.00 USD | Spot Rate (USD → EUR) = 0.9250</div>
              <div>2. Converted EUR Amount = $1,000.00 × 0.9250 = €925.00 EUR</div>
              <div>3. Inverse Exchange Rate (EUR → USD) = 1 ÷ 0.9250 = $1.0811 USD</div>
              <div className="text-slate-600 dark:text-slate-400 font-sans text-[11px] pt-1">
                Insight: $1.00 USD buys €0.9250 EUR, while €1.00 EUR buys $1.0811 USD.
              </div>
            </div>
          </div>

          {/* Example 2 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Example 2: Quantifying Hidden Bank Markup vs. Mid-Market Rate ($5,000 Transfer)
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 font-semibold">
                Bank Markup Comparison
              </span>
            </div>
            <div className="text-xs font-mono space-y-1 text-slate-800 dark:text-slate-200">
              <div>1. Principal = $5,000.00 USD | Mid-Market Rate = 0.9250 (Mid-Market Total = €4,625.00)</div>
              <div>2. Commercial Bank Markup = 3.2% Spread → Bank Rate = 0.9250 × (1 − 0.032) = 0.8954</div>
              <div>3. Amount Received from Bank = $5,000.00 × 0.8954 = €4,477.00 EUR</div>
              <div className="text-amber-600 dark:text-amber-400 font-bold pt-1">
                4. Hidden Exchange Fee = €4,625.00 − €4,477.00 = €148.00 (~$160.00 USD loss)
              </div>
              <div className="text-slate-600 dark:text-slate-400 font-sans text-[11px]">
                Plus $45.00 fixed wire fee → Total true transfer friction = $205.00 USD (4.1% of principal).
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. VISUAL UNDERSTANDING & COMPARISON MATRIX */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          6. Visual Understanding: Major World Currency Matrix &amp; Regimes
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The table below illustrates benchmark global currency classifications, ISO codes, central bank authorities, and typical retail conversion spreads:
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-100 dark:bg-slate-800 font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3">Currency</th>
                <th className="p-3">ISO Code</th>
                <th className="p-3">Central Bank Authority</th>
                <th className="p-3">Exchange Regime</th>
                <th className="p-3">Typical Bank Spread</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[11px]">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-sans font-medium text-slate-900 dark:text-slate-100">US Dollar</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">USD ($)</td>
                <td className="p-3 font-sans">Federal Reserve (Fed)</td>
                <td className="p-3 font-sans">Free-Floating (Global Reserve)</td>
                <td className="p-3">0.1%–0.3% (Wholesale)</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-sans font-medium text-slate-900 dark:text-slate-100">Euro</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">EUR (€)</td>
                <td className="p-3 font-sans">European Central Bank (ECB)</td>
                <td className="p-3 font-sans">Free-Floating</td>
                <td className="p-3">2.0%–3.5%</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-sans font-medium text-slate-900 dark:text-slate-100">British Pound</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">GBP (£)</td>
                <td className="p-3 font-sans">Bank of England (BoE)</td>
                <td className="p-3 font-sans">Free-Floating</td>
                <td className="p-3">2.2%–3.8%</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-sans font-medium text-slate-900 dark:text-slate-100">Japanese Yen</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">JPY (¥)</td>
                <td className="p-3 font-sans">Bank of Japan (BoJ)</td>
                <td className="p-3 font-sans">Free-Floating</td>
                <td className="p-3">2.5%–4.0%</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 bg-blue-50/50 dark:bg-blue-950/20 font-semibold">
                <td className="p-3 font-sans text-blue-700 dark:text-blue-300">UAE Dirham</td>
                <td className="p-3 text-blue-700 dark:text-blue-300 font-bold">AED (د.إ)</td>
                <td className="p-3 font-sans">Central Bank of the UAE</td>
                <td className="p-3 font-sans text-emerald-600 dark:text-emerald-400">Fixed Peg (3.6725 USD)</td>
                <td className="p-3">1.5%–2.5%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          7. Critical Traps &amp; Foreign Exchange Pitfalls
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
            <h3 className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              1. Accepting Dynamic Currency Conversion (DCC)
            </h3>
            <p className="text-amber-800/90 dark:text-amber-300/90 text-xs">
              Selecting to be charged in your home currency at overseas payment terminals allows merchants to charge predatory 5%–12% conversion markups. Always choose local currency.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
            <h3 className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              2. Exchanging Physical Cash at Airports &amp; Hotels
            </h3>
            <p className="text-amber-800/90 dark:text-amber-300/90 text-xs">
              Airport kiosks and hotel desks advertise "Zero Commission" while concealing massive 10%–15% bid-ask spread markups in their quoted rates.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
            <h3 className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              3. Using Cards with Foreign Transaction Fees
            </h3>
            <p className="text-amber-800/90 dark:text-amber-300/90 text-xs">
              Standard non-travel credit cards levy a 3.0% surcharge on every international purchase. Always travel with a dedicated 0% foreign-transaction-fee card.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
            <h3 className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              4. Confusing Inverse Exchange Rates
            </h3>
            <p className="text-amber-800/90 dark:text-amber-300/90 text-xs">
              Mixing up 1 USD = 0.92 EUR with 1 EUR = 1.08 USD results in calculating the wrong required spending budget by 17%+.
            </p>
          </div>
        </div>
      </section>

      {/* 8. PRACTICAL APPLICATIONS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Landmark className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          8. Practical Applications: International Travel &amp; Trade
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Global Travel Budgeting</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Travelers calculate daily spending allowances, lodging costs, and ATM withdrawal requirements in local destination currency.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Cross-Border E-Commerce</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Online merchants price products across multi-currency checkouts while accounting for credit card gateway processing fees.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Corporate Import/Export</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Importers execute forward exchange contracts and evaluate FX invoice terms to safeguard gross profit margins.
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
          {currencyFaqs.map((faq, idx) => {
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
          <li><strong>Mid-Market Benchmark:</strong> Always compare commercial quotations against the wholesale mid-market rate.</li>
          <li><strong>Decline DCC:</strong> Never accept Dynamic Currency Conversion on foreign card terminals or ATMs.</li>
          <li><strong>Use 0% FTF Cards:</strong> Avoid the standard 3.0% foreign transaction fee on credit card purchases abroad.</li>
          <li><strong>ATM Best Practice:</strong> Withdraw local physical currency exclusively from official in-branch bank ATMs.</li>
          <li><strong>Cross Rates:</strong> Convert between any two world currencies by multiplying or dividing their respective USD spot rates.</li>
        </ul>
      </section>
    </div>
  );
}

export default CurrencyContent;

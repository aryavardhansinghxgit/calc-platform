"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingDown,
  Calculator,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Layers,
  HelpCircle,
  ChevronDown,
  Sparkles,
  DollarSign,
  FileSpreadsheet,
  Building,
  Scale,
} from "lucide-react";

export const depreciationFaqs = [
  {
    question: "What is asset depreciation in financial accounting and tax law?",
    answer:
      "Depreciation is the systematic, non-cash allocation of the capitalized historical acquisition cost of a tangible fixed asset (machinery, vehicles, equipment, buildings) across its estimated useful economic lifespan. It adheres to the GAAP/IFRS matching principle by recognizing the expense in the same accounting periods the asset generates revenue.",
  },
  {
    question: "How does the Straight-Line depreciation method work?",
    answer:
      "Straight-Line depreciation allocates an equal dollar amount of depreciation expense each year throughout the asset's useful life: Annual Depreciation = (Asset Cost − Salvage Value) ÷ Useful Life in Years. It is the most common method for financial reporting because of its simplicity and predictability.",
  },
  {
    question: "How does Double Declining Balance (200% DDB) work and when does it stop?",
    answer:
      "Double Declining Balance is an accelerated method where the annual rate is double the straight-line rate (2 ÷ Useful Life). In each year, this rate is multiplied by the asset's beginning net book value (carrying value). Crucially, depreciation stops as soon as the book value reaches the estimated salvage value; the asset is never depreciated below its salvage value.",
  },
  {
    question: "What is MACRS and how does it differ from GAAP book depreciation?",
    answer:
      "The Modified Accelerated Cost Recovery System (MACRS) is the mandatory statutory tax depreciation system required by the IRS for US federal income tax returns. Unlike GAAP book accounting, MACRS ignores salvage value ($0 salvage baseline), assigns statutory recovery periods (3, 5, 7, 10, 15, or 20 years), and applies standardized averaging conventions (such as the Half-Year or Mid-Quarter convention).",
  },
  {
    question: "How does the Sum-of-the-Years'-Digits (SYD) calculation work?",
    answer:
      "SYD is an accelerated method that applies a decreasing fraction to the depreciable base (Cost − Salvage). The denominator is the sum of digits from 1 to n: SYD = n(n + 1) ÷ 2. For a 5-year asset, the denominator is 15 (5+4+3+2+1). The first year's depreciation fraction is 5/15, the second year is 4/15, and so on.",
  },
  {
    question: "What is the Units of Production depreciation method?",
    answer:
      "Units of Production ties depreciation directly to physical asset output or operational usage (such as machine hours or miles driven) rather than the passage of time: Depreciation Rate per Unit = (Cost − Salvage Value) ÷ Total Lifetime Estimated Units. Annual Depreciation = Actual Units Produced in Year × Rate per Unit.",
  },
  {
    question: "What is Salvage Value and what is Book Value?",
    answer:
      "Salvage value (residual value) is the estimated net realizable scrap or trade-in value of an asset at the end of its useful lifespan. Book value (carrying value) is the asset's original historical capitalized purchase cost minus all cumulative accumulated depreciation recorded to date.",
  },
  {
    question: "Can land ever be depreciated?",
    answer:
      "No. Land has an indefinite, unlimited economic lifespan and does not physically deteriorate or wear out over time. Under US GAAP, IFRS, and IRS tax regulations, land cannot be depreciated. However, physical land improvements (such as parking lots, fences, or paved roads) can be depreciated over their specific useful lives.",
  },
  {
    question: "What is Section 179 Expensing and Bonus Depreciation?",
    answer:
      "Section 179 allows qualifying small and medium businesses to immediately deduct up to 100% of the purchase price of eligible equipment, machinery, and business vehicles in the tax year placed in service (subject to annual IRS dollar caps). Bonus Depreciation provides an additional first-year percentage write-off without an annual cap under the Tax Cuts and Jobs Act.",
  },
  {
    question: "What is Depreciation Recapture when an asset is sold?",
    answer:
      "If a business sells a depreciated asset for a price exceeding its net adjusted tax book value, the gain attributable to previously claimed depreciation deductions is taxed as ordinary income rather than capital gains under IRS Section 1245 (personal property) or Section 1250 (real property) depreciation recapture rules.",
  },
];

export function DepreciationContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200">
      {/* 1. INTRODUCTION */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-lg sm:text-xl">
          <TrendingDown className="h-6 w-6" />
          <h2>1. Introduction to Asset Depreciation &amp; Cost Recovery</h2>
        </div>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          In corporate financial accounting and taxation, capital assets such as industrial machinery, commercial vehicle fleets, computer hardware, and buildings provide productive utility across multiple accounting periods. When an entity acquires a long-term capital asset, accounting standards require the cost to be capitalized on the balance sheet rather than expensed immediately in the period of purchase.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          <strong>Depreciation</strong> is the systematic, rational process of allocating this capitalized historical cost over the asset&apos;s estimated useful economic lifespan. This process fulfills the fundamental GAAP and IFRS <em>matching principle</em>, ensuring that the expense of utilizing the asset is matched directly against the operational revenues generated by that asset in each accounting period.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-1.5">
              <Scale className="h-4 w-4" /> Financial Reporting (GAAP/IFRS)
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Aims for economic accuracy and fair presentation of net book value and operating margins on public financial statements.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-emerald-600 dark:text-emerald-400 mb-1 flex items-center gap-1.5">
              <DollarSign className="h-4 w-4" /> Tax Optimization (IRS MACRS)
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Accelerates early-year tax deductions to reduce taxable income, conserve liquidity, and maximize cash flow.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-amber-600 dark:text-amber-400 mb-1 flex items-center gap-1.5">
              <Building className="h-4 w-4" /> Capital Lifecycle Planning
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Tracks asset wear-and-tear, scrap value, and scheduled replacement cycles for enterprise capital budgeting.
            </p>
          </div>
        </div>
      </section>

      {/* 2. MATHEMATICAL CONCEPTS */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-lg sm:text-xl">
          <Calculator className="h-6 w-6" />
          <h2>2. Underlying Mathematical Theory &amp; Core Definitions</h2>
        </div>
        <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          <p>
            Asset depreciation is governed by five foundational variables that determine annual amortization schedules:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Capitalized Historical Cost (C):</strong> Total gross acquisition cost, including purchase invoice price, freight, sales taxes, site preparation, and installation costs necessary to bring the asset into operating condition.
            </li>
            <li>
              <strong>Estimated Salvage Value (S):</strong> The projected net residual or scrap value expected to be realized when the asset is retired or disposed of at the end of its useful life.
            </li>
            <li>
              <strong>Depreciable Base (Base = C − S):</strong> The total cumulative dollar amount eligible to be written off over the asset&apos;s lifespan.
            </li>
            <li>
              <strong>Useful Economic Life (n):</strong> The estimated duration (in years, operational hours, or production units) the asset is expected to remain productive.
            </li>
            <li>
              <strong>Net Book Value (Carrying Value, BV_t):</strong> The asset&apos;s original cost minus all cumulative accumulated depreciation recognized through period t (BV_t = C − Σ D_i).
            </li>
          </ul>
        </div>
      </section>

      {/* 3. FORMULAS */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-lg sm:text-xl">
          <FileSpreadsheet className="h-6 w-6" />
          <h2>3. Depreciation Formulas Across Standard Accounting Methods</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400">
              1. Straight-Line (SL) Method
            </h3>
            <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200">
              Annual D = (Cost − Salvage) ÷ Life (Years)
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Evenly distributes cost. Depreciation Rate = 1 ÷ n.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              2. 200% Double Declining Balance (DDB)
            </h3>
            <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200">
              D_t = Beginning Book Value_(t−1) × (2 ÷ n)
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Accelerated method. Depreciation stops when Book Value equals Salvage Value.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-purple-600 dark:text-purple-400">
              3. Sum-of-the-Years&apos;-Digits (SYD)
            </h3>
            <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200">
              D_t = (Cost − Salvage) × [Remaining Life ÷ (n(n + 1) ÷ 2)]
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Smooth accelerated schedule using decreasing fractions based on remaining years.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400">
              4. Units of Production Method
            </h3>
            <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200">
              D_t = Actual Units_t × [(Cost − Salvage) ÷ Total Lifetime Units]
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Activity-based cost allocation tied directly to wear-and-tear.
            </p>
          </div>
        </div>
      </section>

      {/* 4. HOW THE CALCULATION WORKS */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-lg sm:text-xl">
          <Zap className="h-6 w-6" />
          <h2>4. How the Calculation Works (Step-by-Step)</h2>
        </div>
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex gap-3 items-start">
            <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">Step 1:</span>
            <div>
              <strong>Define Asset Parameters:</strong> Establish total historical capitalized cost (C), estimated salvage value (S), and useful economic lifespan (n).
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex gap-3 items-start">
            <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">Step 2:</span>
            <div>
              <strong>Determine Depreciable Base:</strong> Compute eligible write-off amount: Base = C − S. (For MACRS tax depreciation, assume Salvage = $0).
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex gap-3 items-start">
            <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">Step 3:</span>
            <div>
              <strong>Apply Chosen Method:</strong> Calculate annual depreciation expense for each period t using the selected methodology formula.
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex gap-3 items-start">
            <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">Step 4:</span>
            <div>
              <strong>Update Balance Sheet Ledger:</strong> Accumulate depreciation (Accumulated Depr_t = Accumulated Depr_(t−1) + D_t) and compute ending net book value (Book Value_t = Cost − Accumulated Depr_t).
            </div>
          </div>
        </div>
      </section>

      {/* 5. WORKED EXAMPLES */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-lg sm:text-xl">
          <Layers className="h-6 w-6" />
          <h2>5. Comprehensive Worked Example &amp; Method Comparison</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          Consider an industrial CNC machine acquired for <strong>$50,000</strong> with an estimated <strong>$5,000 salvage value</strong> and a <strong>5-year useful life</strong> (Depreciable Base = $45,000). Here is how the methods compare over the full schedule:
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3">Year</th>
                <th className="p-3">Straight-Line ($)</th>
                <th className="p-3">200% DDB ($)</th>
                <th className="p-3">Sum-of-Years&apos; Digits ($)</th>
                <th className="p-3">MACRS 5-Yr 200% DB ($)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold">Year 1</td>
                <td className="p-3">$9,000.00</td>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">$20,000.00</td>
                <td className="p-3">$15,000.00</td>
                <td className="p-3">$10,000.00 (20.0%)</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold">Year 2</td>
                <td className="p-3">$9,000.00</td>
                <td className="p-3">$12,000.00</td>
                <td className="p-3">$12,000.00</td>
                <td className="p-3">$16,000.00 (32.0%)</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold">Year 3</td>
                <td className="p-3">$9,000.00</td>
                <td className="p-3">$7,200.00</td>
                <td className="p-3">$9,000.00</td>
                <td className="p-3">$9,600.00 (19.2%)</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold">Year 4</td>
                <td className="p-3">$9,000.00</td>
                <td className="p-3">$4,320.00</td>
                <td className="p-3">$6,000.00</td>
                <td className="p-3">$5,760.00 (11.52%)</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold">Year 5</td>
                <td className="p-3">$9,000.00</td>
                <td className="p-3">$1,480.00 (capped at $5k salvage)</td>
                <td className="p-3">$3,000.00</td>
                <td className="p-3">$5,760.00 (11.52%)</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold">Year 6</td>
                <td className="p-3">$0.00</td>
                <td className="p-3">$0.00</td>
                <td className="p-3">$0.00</td>
                <td className="p-3">$2,880.00 (5.76% half-year)</td>
              </tr>
              <tr className="bg-slate-50 dark:bg-slate-800/80 font-bold text-slate-900 dark:text-slate-100">
                <td className="p-3">Total Written Off</td>
                <td className="p-3">$45,000.00</td>
                <td className="p-3">$45,000.00</td>
                <td className="p-3">$45,000.00</td>
                <td className="p-3">$50,000.00 (100% of cost)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. COMMON MISTAKES */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-lg sm:text-xl">
          <AlertTriangle className="h-6 w-6" />
          <h2>6. Common Mistakes &amp; Edge Cases in Asset Depreciation</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-1.5">
            <h3 className="font-bold text-rose-800 dark:text-rose-300">
              1. Depreciating Below Salvage Value in DDB
            </h3>
            <p className="text-slate-700 dark:text-slate-300">
              In declining balance methods, applying the fixed percentage without checking the salvage floor can cause book value to dip below salvage value. Book value must be hard-capped at salvage value.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-1.5">
            <h3 className="font-bold text-rose-800 dark:text-rose-300">
              2. Confusing Book (GAAP) vs Tax (MACRS) Depreciation
            </h3>
            <p className="text-slate-700 dark:text-slate-300">
              Book depreciation uses estimated useful lives and salvage values. Tax depreciation follows IRS tables, statutory recovery classes, and always assumes $0 salvage value, creating deferred tax assets/liabilities.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-1.5">
            <h3 className="font-bold text-rose-800 dark:text-rose-300">
              3. Attempting to Depreciate Raw Land
            </h3>
            <p className="text-slate-700 dark:text-slate-300">
              Land does not wear out or decay and cannot be depreciated under GAAP, IFRS, or IRS tax law. When purchasing commercial real estate, land value must be partitioned from the depreciable building value.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-1.5">
            <h3 className="font-bold text-rose-800 dark:text-rose-300">
              4. Overlooking Section 1245 Depreciation Recapture
            </h3>
            <p className="text-slate-700 dark:text-slate-300">
              Selling a fully depreciated business asset above its tax book value triggers ordinary income tax on the prior depreciation deductions rather than preferential capital gains rates.
            </p>
          </div>
        </div>
      </section>

      {/* 7. PRACTICAL APPLICATIONS */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-lg sm:text-xl">
          <Building className="h-6 w-6" />
          <h2>7. Practical Industry Applications</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Corporate Finance &amp; EBITDA</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Because depreciation is a non-cash expense, analysts add it back to Net Income to evaluate EBITDA and operational cash flows.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Tax Strategy &amp; Liquidity</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Accelerated MACRS and Section 179 deductions shield operational income from immediate taxation, freeing up cash for reinvestment.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Equipment Fleet Management</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Units of Production modeling ensures vehicles and machinery are expensed in direct alignment with physical wear and operational mileage.
            </p>
          </div>
        </div>
      </section>

      {/* 8. FREQUENTLY ASKED QUESTIONS */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-lg sm:text-xl">
          <HelpCircle className="h-6 w-6" />
          <h2>8. Frequently Asked Questions (FAQ)</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Explore essential mathematical, accounting, and tax questions regarding asset depreciation schedules.
        </p>

        <div className="space-y-3 pt-2">
          {depreciationFaqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 text-left font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-blue-600 dark:text-blue-400" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-800/20">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. SUMMARY & KEY TAKEAWAYS */}
      <section className="p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm space-y-3">
        <h3 className="font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          9. Educational Key Takeaways
        </h3>
        <ul className="space-y-2 text-slate-700 dark:text-slate-300 list-disc pl-5 leading-relaxed">
          <li><strong>Matching Principle:</strong> Depreciation matches asset acquisition costs with the revenue periods they enable.</li>
          <li><strong>Method Selection:</strong> Use Straight-Line for uniform utility, DDB/SYD for tech/vehicles that lose value rapidly, and Units of Production for machine usage.</li>
          <li><strong>Salvage Floor:</strong> Book value is never depreciated below estimated salvage value in GAAP reporting.</li>
          <li><strong>Tax Separation:</strong> MACRS tax depreciation governs US tax returns with statutory tables and $0 salvage assumptions.</li>
          <li><strong>Non-Cash Nature:</strong> Depreciation reduces net accounting income and tax liability without immediate operational cash outflow.</li>
        </ul>
      </section>
    </div>
  );
}

export default DepreciationContent;

"use client";

import React from "react";

export function DepreciationContent() {
  const faqs = [
    {
      question: "1. What is asset depreciation in accounting?",
      answer:
        "Depreciation is the systematic allocation of the depreciable cost of a tangible fixed asset (machinery, vehicles, buildings, technology) over its estimated useful economic life. It adheres to the GAAP/IFRS matching principle by recognizing the expense in the same periods the asset generates revenue.",
    },
    {
      question: "2. How does the Straight-Line depreciation method work?",
      answer:
        "Straight-Line depreciation spreads expense evenly across all years of useful life: Annual Depreciation = (Initial Purchase Cost - Salvage Value) ÷ Useful Life in Years. It is the simplest and most widely used book accounting method.",
    },
    {
      question: "3. What is the Double Declining Balance (200% DDB) method?",
      answer:
        "Double Declining Balance is an accelerated depreciation method that doubles the straight-line percentage rate and applies it to the beginning book value each year (Annual Depr = Beginning Book Value × (2 ÷ Useful Life)). Depreciation stops once the asset reaches its estimated salvage value.",
    },
    {
      question: "4. What is MACRS and how does IRS tax depreciation differ from GAAP book depreciation?",
      answer:
        "The Modified Accelerated Cost Recovery System (MACRS) is the mandatory tax depreciation framework established by the IRS for US tax returns. Unlike GAAP, MACRS assumes a $0 salvage value, assigns fixed asset recovery classes (e.g. 3, 5, 7, 15, 27.5, or 39 years), and incorporates standard half-year conventions.",
    },
    {
      question: "5. What is Section 179 expensing and Bonus Depreciation?",
      answer:
        "Section 179 allows qualifying businesses to immediately deduct up to 100% of the purchase price of eligible equipment and software in the year placed in service. Bonus Depreciation provides an additional first-year percentage write-off under the Tax Cuts and Jobs Act.",
    },
    {
      question: "6. What is the Sum-of-the-Years'-Digits (SYD) method?",
      answer:
        "Sum-of-the-Years'-Digits is an accelerated method calculated by multiplying depreciable base by a declining fraction: Fraction = Remaining Useful Life ÷ (n(n + 1) ÷ 2), where n is total useful life.",
    },
    {
      question: "7. How does the Units of Production depreciation method calculate expense?",
      answer:
        "Units of Production ties depreciation directly to physical asset usage (e.g., machine hours or miles driven): Depreciation per Unit = (Cost - Salvage) ÷ Total Lifetime Estimated Units. Annual Expense = Units Produced in Year × Depreciation per Unit.",
    },
    {
      question: "8. What is Salvage Value (Residual Value)?",
      answer:
        "Salvage value is the estimated scrap, trade-in, or resale dollar value of an asset at the end of its useful economic lifespan. Depreciable Base = Initial Cost - Salvage Value.",
    },
    {
      question: "9. What is Book Value (Carrying Value)?",
      answer:
        "Book Value equals the asset's original capitalized historical purchase cost minus total cumulative accumulated depreciation recognized to date.",
    },
    {
      question: "10. What happens when an asset is sold for more than its book value (Depreciation Recapture)?",
      answer:
        "If a depreciated business asset is sold for a price exceeding its net book value, the realized gain attributable to prior depreciation write-offs is taxed as ordinary income under IRS Section 1245 / 1250 depreciation recapture rules.",
    },
    {
      question: "11. Can land be depreciated for tax or accounting purposes?",
      answer:
        "No. Land has an indefinite useful lifespan and does not physically wear out or become obsolete over time; therefore, land is never depreciable under US GAAP, IFRS, or IRS tax law.",
    },
    {
      question: "12. What is the difference between physical wear-and-tear and economic obsolescence?",
      answer:
        "Physical wear-and-tear refers to operational deterioration from usage and age. Economic/technological obsolescence occurs when technological advances make existing equipment inefficient or obsolete prior to physical breakdown.",
    },
  ];

  return (
    <div className="space-y-10 text-black dark:text-slate-100 font-medium leading-relaxed">
      {/* 1. PRINCIPLES OF ASSET DEPRECIATION */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          1. Accounting Principles of Asset Depreciation &amp; Cost Recovery
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          <strong>Asset Depreciation</strong> is the systematic, non-cash accounting allocation of an asset&apos;s capitalized acquisition cost across the accounting periods that benefit from its productive operation.
        </p>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          Under both US GAAP and IFRS framework standards, depreciation matches capital outlays against operational revenues, presenting an accurate depiction of true operating profitability and net tangible book value.
        </p>
      </section>

      {/* 2. THE FIVE STANDARD DEPRECIATION METHODS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          2. The Five Standard Depreciation Methods Compared
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              1. Straight-Line Method
            </h3>
            <p className="text-black dark:text-slate-100">
              Even allocation across all years: <strong>(Cost - Salvage) ÷ Life</strong>. Best for assets with steady, uniform utility over time.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              2. 200% Double Declining Balance (DDB)
            </h3>
            <p className="text-black dark:text-slate-100">
              Accelerates deductions in early years: <strong>Beginning Book Value × (2 ÷ Life)</strong>. Ideal for technology and vehicles that lose value rapidly.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              3. Sum-of-the-Years'-Digits (SYD)
            </h3>
            <p className="text-black dark:text-slate-100">
              Smooth accelerated schedule using decreasing fractions based on remaining years.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              4. MACRS (IRS Tax Method)
            </h3>
            <p className="text-black dark:text-slate-100">
              Mandatory US tax accounting framework with preset IRS recovery classes and half-year conventions ($0 salvage baseline).
            </p>
          </div>
        </div>
      </section>

      {/* 3. 12 FAQS */}
      <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          Frequently Asked Questions (FAQ)
        </h2>
        <div className="space-y-3 text-xs leading-relaxed text-black dark:text-slate-100">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5"
            >
              <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
                {faq.question}
              </h3>
              <p className="text-black dark:text-slate-100 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

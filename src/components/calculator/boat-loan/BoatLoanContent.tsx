"use client";

import React from "react";

export function BoatLoanContent() {
  const faqs = [
    {
      question: "1. What is a boat loan and how does marine financing work?",
      answer:
        "A boat loan is a specialized installment loan used to purchase a recreational vessel, yacht, or commercial boat. The boat itself serves as loan collateral, allowing lenders to offer extended repayment terms (often 10 to 20 years for larger vessels) and fixed interest rates comparable to auto loans or home equity financing.",
    },
    {
      question: "2. How long are typical boat loan terms?",
      answer:
        "Boat loan terms range from 2 to 20 years depending on the loan amount and vessel age. Loans under $25,000 are typically financed over 5 to 10 years, while vessels over $50,000 to $100,000 frequently qualify for 15 to 20-year financing to keep monthly payments affordable.",
    },
    {
      question: "3. How much down payment is required for a boat loan?",
      answer:
        "Most marine lenders require a down payment between 10% and 20% of the purchase price. Buyers with tier-1 credit (740+) may qualify for 0% to 5% down programs, while older used boats or high-performance vessels may require 20% to 30% down.",
    },
    {
      question: "4. What credit score is needed to qualify for marine financing?",
      answer:
        "A credit score of 700 or higher unlocks the lowest marine interest rates and longest loan terms. Many lenders approve applicants with credit scores down to 640–660 with higher down payments and shorter terms.",
    },
    {
      question: "5. What are the typical annual ongoing maintenance and storage costs for a boat?",
      answer:
        "A standard rule of thumb is that annual ongoing maintenance, insurance, fuel, and storage equal approximately 10% to 15% of the boat's purchase price each year ($3,500 to $5,000/year for a $35,000 vessel).",
    },
    {
      question: "6. What is a Marine Survey and is it mandatory for a boat loan?",
      answer:
        "A marine survey is a comprehensive mechanical and structural inspection conducted by a certified marine surveyor (similar to a home inspection). Lenders almost universally require an independent marine survey on used boats over $25,000 or older than 10 years.",
    },
    {
      question: "7. Can boat loan interest be tax-deductible as a second home?",
      answer:
        "Yes. Under IRS regulations, if your boat contains dedicated sleeping quarters, a permanent galley (cooking facility), and a head (toilet facility), it may qualify as a second home, allowing you to deduct the loan interest as mortgage interest.",
    },
    {
      question: "8. Is boat insurance mandatory when financing a vessel?",
      answer:
        "Yes. Lenders require comprehensive marine hull and liability insurance naming the lender as the primary loss payee before disbursing loan funds. Annual insurance typically ranges from 1% to 2% of the boat's market value.",
    },
    {
      question: "9. What is the difference between wet slip and dry stack storage?",
      answer:
        "A wet slip keeps the boat in the water at a marina dock year-round, allowing immediate access but exposing the hull to marine growth. Dry stack storage stores the boat in an indoor rack warehouse, using a forklift to launch it on demand, which protects the gelcoat and reduces maintenance.",
    },
    {
      question: "10. How does boat sales tax work across different states?",
      answer:
        "State boat sales tax rates range from 0% (in states like Delaware, Alaska, Montana, New Hampshire, and Oregon) to 8%+. Several coastal states (e.g. Florida and Maryland) enforce maximum sales tax caps (e.g. $18,000 max tax in Florida) to attract yacht buyers.",
    },
    {
      question: "11. Can I finance boat trailers, electronics, and accessories in the loan?",
      answer:
        "Yes. Most marine lenders allow you to roll the cost of the boat trailer, outboard motors, GPS/fishfinder navigation electronics, and dealer rigging fees directly into the financed loan balance.",
    },
    {
      question: "12. What happens if I pay off my boat loan early?",
      answer:
        "Most recreational boat loans do not have prepayment penalty fees, allowing you to make extra principal payments or pay off the entire balance early to save thousands in finance interest charges.",
    },
  ];

  return (
    <div className="space-y-3 text-black dark:text-zinc-100 font-sans leading-relaxed">
      {/* SECTION 1: WHAT IS A BOAT LOAN & KEY MECHANICS */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 p-3.5 shadow-xs space-y-2.5">
        <h2 className="text-sm font-extrabold text-black dark:text-zinc-100">
          Marine Financing: How Boat Loans Work & Key Components
        </h2>
        <p className="text-xs text-black dark:text-zinc-200">
          A boat loan is an amortized installment contract where a financial institution lends capital to acquire a vessel. Marine loans differ from automotive financing due to extended repayment horizons (up to 20 years), specialized marine surveys, and vessel titling standards:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-1">
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-[11px] uppercase text-black dark:text-zinc-100 block">Down Payment</span>
            <p className="text-[11px] text-black dark:text-zinc-300">
              Typically 10% to 20% cash or trade-in equity. Reduces loan principal and protects against rapid early marine depreciation.
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-[11px] uppercase text-black dark:text-zinc-100 block">Extended Terms (10–20 Yrs)</span>
            <p className="text-[11px] text-black dark:text-zinc-300">
              Larger vessels qualify for 120 to 240-month terms to keep monthly payments manageable on high-value yachts.
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-[11px] uppercase text-black dark:text-zinc-100 block">Marine Survey</span>
            <p className="text-[11px] text-black dark:text-zinc-300">
              Professional hull and engine inspection required by lenders on used boats to verify seaworthiness and fair market value.
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-[11px] uppercase text-black dark:text-zinc-100 block">Collateral Lien</span>
            <p className="text-[11px] text-black dark:text-zinc-300">
              The lender holds a preferred ship mortgage or state title lien until the final installment is paid in full.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: HIDDEN & ONGOING COSTS OF BOAT OWNERSHIP */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 p-3.5 shadow-xs space-y-2.5">
        <h2 className="text-sm font-extrabold text-black dark:text-zinc-100">
          The True Cost of Boat Ownership (Beyond the Monthly Loan Payment)
        </h2>
        <p className="text-xs text-black dark:text-zinc-200">
          A successful boat budget must incorporate ongoing operating costs that average 10% to 15% of the boat value annually:
        </p>

        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-[11px] space-y-1 text-black dark:text-zinc-200">
          <div className="font-bold font-sans text-xs text-black dark:text-zinc-100">Annual Recurring Ownership Expenses:</div>
          <div>1. Slip & Dockage / Dry Storage: $2,000 to $10,000/year depending on marina location and vessel length.</div>
          <div>2. Marine Insurance: $400 to $2,500/year covering collision, hurricane haul-out, and $500k liability.</div>
          <div>3. Fuel Consumption: $500 to $3,000/year (marine outboards burn 5 to 20+ gallons per cruising hour).</div>
          <div>4. Winterization & Seasonal Maintenance: $800 to $2,000/year for engine fluid changes, shrink-wrap, and bottom paint.</div>
          <div>5. Trailer Maintenance & State Registration: $200 to $500/year for wheel bearings, lights, and state decal stickers.</div>
        </div>
      </div>

      {/* SECTION 3: WORKED MATHEMATICAL CASE STUDIES */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 p-3.5 shadow-xs space-y-2.5">
        <h2 className="text-sm font-extrabold text-black dark:text-zinc-100">
          Worked Mathematical Example ($35,000 Boat Price, $7,000 Down @ 7.0% APR over 10 Years)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-xs uppercase text-black dark:text-zinc-100">Loan & Upfront Breakdown</h3>
            <div className="font-mono text-[11px] text-black dark:text-zinc-300 space-y-0.5">
              <div>• Purchase Price = $35,000.00</div>
              <div>• Down Payment (20%) = $7,000.00</div>
              <div>• Total Loan Financed = <strong>$28,000.00</strong></div>
              <div>• Sales Tax (3%) = $1,050.00</div>
              <div>• Dealer & Rigging Fees = $2,800.00</div>
              <div>• Total Upfront Out-of-Pocket = <strong>$10,850.00</strong></div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-xs uppercase text-black dark:text-zinc-100">Repayment & Total Cost (120 Months)</h3>
            <div className="font-mono text-[11px] text-black dark:text-zinc-300 space-y-0.5">
              <div>• Monthly Loan Payment = <strong>$325.10/mo</strong></div>
              <div>• Total of 120 Loan Payments = $39,012.45</div>
              <div>• Total Finance Interest Paid = <strong>$11,012.45 (28.2%)</strong></div>
              <div>• Principal Repaid = $28,000.00 (71.8%)</div>
              <div>• Grand Total Cost of Boat = <strong>$49,862.45</strong></div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: 12 FAQS ALWAYS OPEN CARDS */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 p-3.5 shadow-xs space-y-2.5">
        <h2 className="text-sm font-extrabold text-black dark:text-zinc-100">
          Frequently Asked Questions (12 Key Boat Financing FAQs)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 bg-slate-50 dark:bg-slate-800/50 space-y-1"
            >
              <h3 className="font-bold text-xs text-black dark:text-zinc-100">
                {faq.question}
              </h3>
              <p className="text-[11px] text-black dark:text-zinc-300 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";

export function LeaseContent() {
  const faqs = [
    {
      question: "1. What is a lease and how does it work?",
      answer:
        "A lease is a contractual agreement where the asset owner (lessor) grants another party (lessee) the right to use an asset (vehicle, equipment, or real estate) for a specified term in exchange for periodic payments. Unlike a loan, a lease finances only the asset's depreciation during the term plus finance charges, rather than full purchase value.",
    },
    {
      question: "2. What is the difference between rent and a lease?",
      answer:
        "While often used interchangeably, a lease refers to a formal, legally binding long-term contractual agreement (typically 12 to 60 months) with locked terms, payment obligations, and residual conditions. Rent generally refers to shorter-term or periodic month-to-month arrangements that can be modified or terminated with short notice.",
    },
    {
      question: "3. What is Residual Value and why is it critical in a lease?",
      answer:
        "Residual value is the projected wholesale market value of an asset at the end of the lease term. Higher residual values reduce the total depreciation you must finance, leading directly to lower monthly lease payments.",
    },
    {
      question: "4. What is Money Factor and how do I convert it to APR?",
      answer:
        "Money Factor (lease factor) is the fractional interest rate applied by lessors. To convert Money Factor to an Annual Percentage Rate (APR), multiply by 2,400 (e.g. 0.0025 × 2,400 = 6.0% APR). Conversely, divide APR by 2,400 to find the Money Factor.",
    },
    {
      question: "5. How is a monthly lease payment calculated mathematically?",
      answer:
        "Monthly lease payments consist of three parts: 1) Monthly Depreciation = (Net Capitalized Cost - Residual Value) ÷ Lease Term; 2) Monthly Finance Charge = (Net Cap Cost + Residual Value) × Money Factor; and 3) Monthly Sales Tax = (Depreciation + Finance Charge) × Sales Tax Rate.",
    },
    {
      question: "6. Is it better to lease or buy an automobile?",
      answer:
        "Leasing offers 30% to 50% lower monthly payments, warranty protection, and the ability to drive a new car every 3 years without trade-in hassles. Buying requires higher payments but builds long-term vehicle equity and eliminates mileage restrictions and wear-and-tear fees.",
    },
    {
      question: "7. What is the difference between a Capital Lease and an Operating Lease?",
      answer:
        "Under ASC 842 / IFRS 16 accounting rules, a Capital/Finance Lease transfers substantially all benefits and risks of ownership to the lessee (recorded as an asset and liability on the balance sheet). An Operating Lease is a traditional rental where the lessor retains asset ownership and risk.",
    },
    {
      question: "8. What are NNN (Triple Net) commercial real estate leases?",
      answer:
        "In a Triple Net (NNN) lease, the tenant pays base rent plus all three major operational expenses: property taxes, building insurance, and common area maintenance (CAM). In a Gross Lease, the landlord pays all building expenses out of a single flat rental fee.",
    },
    {
      question: "9. Should I make a large down payment (Cap Cost Reduction) on a lease?",
      answer:
        "Financial analysts strongly advise making $0 or minimal down payment on auto leases. If the vehicle is totaled or stolen early in the lease, insurance and GAP coverage pay off the lessor, but your upfront down payment cash is permanently lost.",
    },
    {
      question: "10. What happens if I exceed the annual lease mileage limit?",
      answer:
        "Standard auto leases include mileage allowances (typically 10,000 to 15,000 miles/year). Exceeding this allowance results in end-of-lease penalty fees typically ranging from $0.15 to $0.30 per excess mile.",
    },
    {
      question: "11. What is an Acquisition Fee and Disposition Fee?",
      answer:
        "An Acquisition Fee ($500–$1,000) is an upfront administrative fee charged by the leasing bank to establish the lease. A Disposition Fee ($350–$500) is charged at the end of the lease to clean, recondition, and auction the returned vehicle if you do not purchase it.",
    },
    {
      question: "12. Can I negotiate the purchase price (Cap Cost) of a leased vehicle?",
      answer:
        "Yes. The vehicle price (Gross Capitalized Cost) is fully negotiable just like a cash purchase. Negotiating a lower vehicle price directly reduces monthly depreciation charges and finance fees.",
    },
  ];

  return (
    <div className="space-y-3 text-black dark:text-zinc-100 font-sans leading-relaxed">
      {/* SECTION 1: WHAT IS A LEASE & CORE CONCEPTS */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 p-3.5 shadow-xs space-y-2.5">
        <h2 className="text-sm font-extrabold text-black dark:text-zinc-100">
          What is a Lease? Financial Mechanics & Legal Definitions
        </h2>
        <p className="text-xs text-black dark:text-zinc-200">
          A lease is an enforceable contract between a lessor (the legal owner of an asset) and a lessee (the party granted user rights) for a defined term in exchange for scheduled periodic payments. Leasing is widely utilized across motor vehicles, corporate machinery, commercial aircraft, office spaces, and industrial real estate.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-1">
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-[11px] uppercase text-black dark:text-zinc-100 block">Gross Capitalized Cost</span>
            <p className="text-[11px] text-black dark:text-zinc-300">
              The agreed-upon sales price of the asset plus any added options, administrative fees, or rolled-in negative trade-in balance.
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-[11px] uppercase text-black dark:text-zinc-100 block">Residual Value</span>
            <p className="text-[11px] text-black dark:text-zinc-300">
              The contractually predetermined wholesale value of the asset at lease maturity. Higher residual reduces monthly payments.
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-[11px] uppercase text-black dark:text-zinc-100 block">Money Factor (Lease Factor)</span>
            <p className="text-[11px] text-black dark:text-zinc-300">
              The fractional interest rate used to calculate finance rent charges. Multiplying Money Factor by 2,400 yields the equivalent APR.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: LEASE FORMULA & STEP-BY-STEP CALCULATION */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 p-3.5 shadow-xs space-y-2.5">
        <h2 className="text-sm font-extrabold text-black dark:text-zinc-100">
          How Lease Payments Are Calculated: Step-by-Step Mathematical Formulas
        </h2>
        <p className="text-xs text-black dark:text-zinc-200">
          Unlike an amortized loan where you pay off 100% of the loan principal, a lease only charges for the difference between the starting price (Cap Cost) and the ending value (Residual), plus a finance charge on the tied-up capital:
        </p>

        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-[11px] space-y-1 text-black dark:text-zinc-200">
          <div className="font-bold font-sans text-xs text-black dark:text-zinc-100">Core Mathematical Formulas:</div>
          <div>1. Adjusted Cap Cost = Gross Agreed Price + Fees - Down Payment - Trade-in Equity</div>
          <div>2. Monthly Depreciation Fee = (Adjusted Cap Cost - Residual Value) ÷ Lease Term (Months)</div>
          <div>3. Monthly Rent Charge = (Adjusted Cap Cost + Residual Value) × Money Factor</div>
          <div>4. Base Monthly Payment = Monthly Depreciation Fee + Monthly Rent Charge</div>
          <div>5. Total Monthly Payment = Base Monthly Payment × (1 + Sales Tax Rate)</div>
        </div>
      </div>

      {/* SECTION 3: COMMERCIAL & REAL ESTATE LEASE STRUCTURES */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 p-3.5 shadow-xs space-y-2.5">
        <h2 className="text-sm font-extrabold text-black dark:text-zinc-100">
          Commercial, Equipment & Real Estate Lease Structures
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-[11px] uppercase text-black dark:text-zinc-100 block">Gross Lease</span>
            <p className="text-[11px] text-black dark:text-zinc-300">
              Tenant pays a flat rent; landlord pays all building property taxes, insurance, and maintenance expenses.
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-[11px] uppercase text-black dark:text-zinc-100 block">Single Net (N Lease)</span>
            <p className="text-[11px] text-black dark:text-zinc-300">
              Tenant pays base rent plus their proportional share of real estate property taxes.
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-[11px] uppercase text-black dark:text-zinc-100 block">Double Net (NN Lease)</span>
            <p className="text-[11px] text-black dark:text-zinc-300">
              Tenant pays base rent plus property taxes and building insurance premiums.
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-[11px] uppercase text-black dark:text-zinc-100 block">Triple Net (NNN Lease)</span>
            <p className="text-[11px] text-black dark:text-zinc-300">
              Tenant pays base rent, property taxes, insurance, and all common area maintenance (CAM) repairs.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 4: WORKED MATHEMATICAL CASE STUDIES */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 p-3.5 shadow-xs space-y-2.5">
        <h2 className="text-sm font-extrabold text-black dark:text-zinc-100">
          Worked Mathematical Example ($20,000 Asset Value @ 6.0% APR over 36 Months)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-xs uppercase text-black dark:text-zinc-100">Lease Breakdown ($8,000 Residual)</h3>
            <div className="font-mono text-[11px] text-black dark:text-zinc-300 space-y-0.5">
              <div>• Net Capitalized Cost = $20,000.00</div>
              <div>• Residual Value = $8,000.00 (40%)</div>
              <div>• Total Depreciation = $20,000 - $8,000 = $12,000</div>
              <div>• Monthly Depreciation = $12,000 ÷ 36 = <strong>$333.33/mo</strong></div>
              <div>• Money Factor = 6.0% ÷ 2,400 = 0.0025</div>
              <div>• Monthly Rent Charge = ($20,000 + $8,000) × 0.0025 = <strong>$70.00/mo</strong></div>
              <div>• Base Monthly Payment = $333.33 + $70.00 = <strong>$403.33/mo</strong></div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-xs uppercase text-black dark:text-zinc-100">Cumulative 3-Year Totals</h3>
            <div className="font-mono text-[11px] text-black dark:text-zinc-300 space-y-0.5">
              <div>• Total Monthly Payments = 36 × $405.06 = <strong>$14,582.28</strong></div>
              <div>• Total Depreciation Paid = <strong>$12,000.00 (82.3%)</strong></div>
              <div>• Total Finance Interest Charges = <strong>$2,582.28 (17.7%)</strong></div>
              <div>• Purchase Option at Term End = <strong>$8,000.00</strong></div>
              <div>• Total Cost if Bought Out = $14,582.28 + $8,000 = $22,582.28</div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 5: 12 FAQS ALWAYS OPEN CARDS */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 p-3.5 shadow-xs space-y-2.5">
        <h2 className="text-sm font-extrabold text-black dark:text-zinc-100">
          Frequently Asked Questions (12 Key Lease FAQs)
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

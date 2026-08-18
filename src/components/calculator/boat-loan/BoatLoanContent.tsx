"use client";

import React from "react";

export function BoatLoanContent() {
  const faqs = [
    {
      question: "1. What are typical interest rates, terms, and down payments on boat loans?",
      answer:
        "Marine financing terms typically range from 5 to 20 years (longer for yachts and vessels over $100k). Interest rates average between 6.5% and 10.5% depending on credit rating, loan amount, and vessel age. Lenders standardly require a 10% to 20% down payment.",
    },
    {
      question: "2. What is the Total Cost of Boat Ownership (TCO) beyond the monthly loan payment?",
      answer:
        "A common marine industry rule of thumb estimates annual operating and maintenance expenses at 10% to 15% of the boat's purchase price each year, including marina slip slipways/mooring fees, comprehensive marine insurance, fuel, engine servicing, winterization, and haul-out storage.",
    },
    {
      question: "3. What is a Marine Survey and why do boat lenders require one?",
      answer:
        "A Marine Survey is a comprehensive physical inspection and valuation conducted by a certified marine surveyor (SAMS or NAMS). Lenders require surveys on used vessels (typically over 25–30 feet or valued over $25,000) to confirm hull integrity, seaworthiness, and fair market appraisal value before underwriting financing.",
    },
    {
      question: "4. Can a boat loan qualify for the US Second Home Mortgage Interest tax deduction?",
      answer:
        "Yes. Under IRS Section 163(h), a boat can qualify as a secondary residence for mortgage interest deductions if it contains basic living accommodations: a permanent sleeping berth, galley (cooking facilities), and an onboard head (marine toilet/bathroom).",
    },
    {
      question: "5. What is the difference between US Coast Guard (USCG) Documentation and State Titling?",
      answer:
        "USCG Documentation is a national federal registration for vessels measuring at least 5 net tons (typically 25+ feet). Most marine lenders require USCG Documentation with a Preferred Ship Mortgage because it establishes a clear federal lien and international recognition for cruising foreign waters.",
    },
    {
      question: "6. How fast do new and used boats depreciate over time?",
      answer:
        "New boats experience rapid initial depreciation: typically 15% to 25% in year one and 8% to 12% annually in years two through five. By year five, most vessels stabilize around 50% to 60% of their original MSRP before leveling off.",
    },
    {
      question: "7. When should I consider refinancing my existing boat loan?",
      answer:
        "Refinancing makes financial sense when prevailing marine market rates drop by at least 1.0% to 1.5% below your existing APR, your credit score has improved significantly, or you wish to extend/shorten your repayment timeline to optimize cash flow.",
    },
    {
      question: "8. What is the difference between a Secured Boat Loan and an Unsecured Personal Loan?",
      answer:
        "A secured marine loan uses the vessel as collateral, offering lower interest rates, higher loan amounts ($500k+), and longer terms (up to 20 years). An unsecured loan requires no collateral or marine survey but carries higher interest rates, shorter terms (3 to 7 years), and lower borrowing caps ($50k–$100k).",
    },
    {
      question: "9. How do boat loan terms differ between new vs. older used vessels?",
      answer:
        "Newer boats qualify for the longest terms (15 to 20 years) and lowest rates. Vessels older than 10 to 15 years often face stricter lender caps: maximum 5-to-10-year terms, mandatory hull surveys, and higher interest rates.",
    },
    {
      question: "10. What credit score is needed to qualify for competitive boat financing?",
      answer:
        "While some subprime marine lenders accept scores around 640–660, prime competitive rates and maximum loan-to-value (LTV) terms require a FICO score of 700 to 740+ along with a debt-to-income (DTI) ratio below 40%–45%.",
    },
    {
      question: "11. Are boat sales taxes paid upfront or financed into the loan?",
      answer:
        "Depending on the state where the boat is registered and lender underwriting policies, state sales/use taxes (typically 3% to 8%, with some states having tax caps like Florida's $18,000 cap) can be paid out-of-pocket at closing or rolled into the financed principal balance.",
    },
    {
      question: "12. How does boat winterization and seasonal storage affect ownership cost?",
      answer:
        "In cold-climate regions, winterization (engine fogging, antifreeze flushing, shrink-wrapping) and dry-stack or yard storage typically add $1,000 to $3,500+ annually to ownership costs to protect engines and plumbing from freeze damage.",
    },
  ];

  return (
    <div className="space-y-10 text-black dark:text-slate-100 font-medium leading-relaxed">
      {/* 1. PRINCIPLES OF MARINE FINANCING */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          1. Principles of Marine Financing &amp; Vessel Amortization
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          Marine financing represents a specialized sector of collateralized asset lending. Because boats and marine vessels operate in harsh aquatic environments and retain substantial tangible value over long lifespans, boat loans often feature extended amortization horizons (10 to 20 years) comparable to residential home equity lending.
        </p>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          Understanding the true cost of boat ownership requires evaluating both the monthly financing payment and ongoing ownership expenses like marina slip fees, insurance, fuel, and scheduled winterization.
        </p>
      </section>

      {/* 2. THE TOTAL COST OF OWNERSHIP (TCO) */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          2. The Total Cost of Boat Ownership (The 10%–15% Rule)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              1. Mooring &amp; Slip Fees
            </h3>
            <p className="text-black dark:text-slate-100">
              Wet slips, dry-stack storage, or mooring balls typically cost $150 to $600+/month depending on vessel length and marina location.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              2. Marine Insurance &amp; Fuel
            </h3>
            <p className="text-black dark:text-slate-100">
              Comprehensive hull and liability marine coverage averages 1.0%–1.5% of boat value per year. High-horsepower outboard and inboard engines consume significant fuel during cruising.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              3. Maintenance &amp; Winterization
            </h3>
            <p className="text-black dark:text-slate-100">
              Annual engine service, anti-fouling bottom paint, hull cleaning, and winter freeze protection average $1,500 to $4,000+ annually.
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

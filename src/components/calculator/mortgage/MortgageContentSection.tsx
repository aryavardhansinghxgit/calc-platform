"use client";

import React from "react";

export function MortgageContentSection() {
  const faqList = [
    {
      question: "What is included in a monthly mortgage payment?",
      answer: "A monthly mortgage payment typically consists of Principal, Interest, Property Taxes, Homeowners Insurance (PITI), and Private Mortgage Insurance (PMI) or HOA fees if applicable."
    },
    {
      question: "What is the difference between a 15-year and 30-year fixed mortgage?",
      answer: "A 30-year fixed mortgage offers lower monthly payments but results in significantly higher total interest paid over the life of the loan. A 15-year fixed mortgage has higher monthly payments but lower interest rates and builds home equity twice as fast."
    },
    {
      question: "How much down payment do I need to buy a home?",
      answer: "While 20% down payment eliminates Private Mortgage Insurance (PMI), many conventional loan programs accept as little as 3% down payment, and FHA loans require 3.5% down payment."
    },
    {
      question: "How can I avoid paying Private Mortgage Insurance (PMI)?",
      answer: "You can avoid PMI by putting down 20% or more at purchase. If you put down less than 20%, federal law requires lenders to automatically cancel PMI once your loan balance reaches 78% of the home's original purchase price."
    },
    {
      question: "How do bi-weekly mortgage payments work?",
      answer: "Bi-weekly payments split your monthly payment into two equal halves paid every two weeks. Because there are 52 weeks in a year, you make 26 half-payments (equivalent to 13 monthly payments per year), shaving years off a 30-year mortgage term."
    },
    {
      question: "What are mortgage escrow accounts?",
      answer: "An escrow account is a holding account managed by your mortgage servicer. A portion of your monthly payment is placed into escrow to pay annual property taxes and homeowners insurance premiums on your behalf."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqList.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <div className="space-y-8 py-2 text-slate-900 dark:text-slate-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* 1. What is a Mortgage */}
      <section className="space-y-3">
        <h3 className="text-lg font-extrabold text-blue-600 dark:text-blue-400">
          What is a Mortgage?
        </h3>
        <p className="text-sm leading-relaxed text-slate-900 dark:text-slate-100 font-medium">
          A <strong>mortgage</strong> is a debt instrument secured by the collateral of specified real estate property. When buying a home, most buyers do not have the full purchase amount in liquid cash; instead, a bank or mortgage lender provides the upfront capital to complete the purchase, and the borrower agrees to pay back the loan over a structured period (typically 15 to 30 years) with interest.
        </p>
        <p className="text-sm leading-relaxed text-slate-900 dark:text-slate-100 font-medium">
          If the borrower defaults on their loan payments, the lender retains a legal lien on the home, granting them the right to take ownership of the property through foreclosure to recover the outstanding principal.
        </p>
      </section>

      {/* 2. Key Components of a Monthly Mortgage (PITI) */}
      <section className="space-y-3">
        <h3 className="text-lg font-extrabold text-blue-600 dark:text-blue-400">
          Key Components of a Monthly Mortgage Payment (PITI)
        </h3>
        <p className="text-sm leading-relaxed text-slate-900 dark:text-slate-100 font-medium">
          Your total monthly mortgage payment consists of four core elements, frequently referred to in financial planning as <strong>PITI</strong>:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              Principal
            </h4>
            <p className="text-xs text-slate-900 dark:text-slate-100 leading-relaxed font-medium">
              The original amount of money borrowed from the lender. Each monthly payment pays off a portion of this principal, slowly building equity in your home.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              Interest
            </h4>
            <p className="text-xs text-slate-900 dark:text-slate-100 leading-relaxed font-medium">
              The fee charged by the lender for borrowing their money, calculated as an annual percentage rate (APR) applied to your remaining loan balance.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              Property Taxes
            </h4>
            <p className="text-xs text-slate-900 dark:text-slate-100 leading-relaxed font-medium">
              Taxes assessed by local county or city governments based on your property value. Lenders collect 1/12th of this annual cost monthly into an escrow account.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              Home Insurance
            </h4>
            <p className="text-xs text-slate-900 dark:text-slate-100 leading-relaxed font-medium">
              Hazard and property insurance required by lenders to protect the home against hazards like fires, storms, or physical damage.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Property Taxes */}
      <section className="space-y-3">
        <h3 className="text-lg font-extrabold text-blue-600 dark:text-blue-400">
          Understanding Property Taxes
        </h3>
        <p className="text-sm leading-relaxed text-slate-900 dark:text-slate-100 font-medium">
          Property tax rates vary significantly by state and local municipality, typically ranging from <strong>0.3% to over 2.5%</strong> of the home’s assessed value annually. Because local governments re-evaluate property values periodically, property taxes often increase over time. Accounting for a 2%–3% annual tax increase ensures your housing budget remains resilient against future tax hikes.
        </p>
      </section>

      {/* 4. Homeowner's Insurance */}
      <section className="space-y-3">
        <h3 className="text-lg font-extrabold text-blue-600 dark:text-blue-400">
          Home Insurance Costs & Escrow
        </h3>
        <p className="text-sm leading-relaxed text-slate-900 dark:text-slate-100 font-medium">
          Homeowners insurance policies cover repairs or rebuilding costs in the event of disasters. Most lenders require buyers to pay insurance premiums via an escrow account. Premium prices fluctuate based on geographic climate risk, age of roof, building materials, and claim history.
        </p>
      </section>

      {/* 5. PMI Insurance */}
      <section className="space-y-3">
        <h3 className="text-lg font-extrabold text-blue-600 dark:text-blue-400">
          Private Mortgage Insurance (PMI)
        </h3>
        <p className="text-sm leading-relaxed text-slate-900 dark:text-slate-100 font-medium">
          If your down payment is less than <strong>20% of the home price</strong> (Loan-to-Value ratio over 80%), conventional lenders require Private Mortgage Insurance (PMI). PMI protects the lender if you default.
        </p>
        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-xs space-y-2">
          <p className="font-bold text-blue-900 dark:text-blue-200">How to eliminate PMI:</p>
          <ul className="list-disc list-inside space-y-1 text-slate-900 dark:text-slate-100 font-medium">
            <li><strong>Automatic Cancellation:</strong> Under federal law (HPA), PMI must automatically cancel when your principal balance reaches 78% of the original home price.</li>
            <li><strong>Requested Cancellation:</strong> You can request PMI removal once your loan balance reaches 80% LTV.</li>
            <li><strong>Re-Appraisal:</strong> Significant home renovations or local market appreciation can allow you to request an appraisal to remove PMI early.</li>
          </ul>
        </div>
      </section>

      {/* 6. HOA Fees */}
      <section className="space-y-3">
        <h3 className="text-lg font-extrabold text-blue-600 dark:text-blue-400">
          HOA Fees & Community Assessments
        </h3>
        <p className="text-sm leading-relaxed text-slate-900 dark:text-slate-100 font-medium">
          Properties in condominiums, townhome communities, or master-planned subdivisions often require monthly <strong>Homeowners Association (HOA)</strong> fees. HOA dues pay for shared amenities (pools, clubhouses, fitness centers), exterior landscaping, trash pickup, and reserve funds. Note that HOA fees are paid directly to the association, not through your bank loan escrow.
        </p>
      </section>

      {/* 7. Early Repayment Strategies */}
      <section className="space-y-3">
        <h3 className="text-lg font-extrabold text-blue-600 dark:text-blue-400">
          Proven Early Repayment Strategies
        </h3>
        <p className="text-sm leading-relaxed text-slate-900 dark:text-slate-100 font-medium">
          Accelerating your mortgage payoff saves tens or hundreds of thousands of dollars in compounding interest:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">
              Bi-Weekly Payments
            </h4>
            <p className="text-slate-900 dark:text-slate-100 font-medium">
              Pay half your monthly mortgage payment every 2 weeks. This results in 26 half-payments (13 full monthly payments per year), cutting years off a 30-year term.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">
              Fixed Extra Monthly
            </h4>
            <p className="text-slate-900 dark:text-slate-100 font-medium">
              Adding even $100 or $200 extra every month directly reduces principal, compounding savings every single month for the rest of the loan term.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">
              Lump-Sum Repayment
            </h4>
            <p className="text-slate-900 dark:text-slate-100 font-medium">
              Apply annual work bonuses, tax refunds, or inheritance payouts as one-time principal curtailments to dramatically reduce your payoff schedule.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Pros & Cons */}
      <section className="space-y-3">
        <h3 className="text-lg font-extrabold text-blue-600 dark:text-blue-400">
          Pros and Cons of Extra Mortgage Payments
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 space-y-2">
            <h4 className="font-bold text-sm text-blue-900 dark:text-blue-300">
              Advantages (Pros)
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-900 dark:text-slate-100 font-medium">
              <li className="flex items-start gap-1.5">
                <span className="font-bold text-blue-600">•</span> Guaranteed return on investment equal to your mortgage interest rate.
              </li>
              <li className="flex items-start gap-1.5">
                <span className="font-bold text-blue-600">•</span> Shaves years off your payoff timeline and builds home equity rapidly.
              </li>
              <li className="flex items-start gap-1.5">
                <span className="font-bold text-blue-600">•</span> Provides financial freedom and peace of mind when debt-free.
              </li>
              <li className="flex items-start gap-1.5">
                <span className="font-bold text-blue-600">•</span> Eliminates PMI faster if down payment was under 20%.
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              Trade-offs (Cons)
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-900 dark:text-slate-100 font-medium">
              <li className="flex items-start gap-1.5">
                <span className="font-bold">•</span> Reduced liquidity — cash tied up in home equity cannot be easily spent in emergencies.
              </li>
              <li className="flex items-start gap-1.5">
                <span className="font-bold">•</span> Opportunity cost: Stock market investments (e.g. S&P 500) may yield higher average returns long-term.
              </li>
              <li className="flex items-start gap-1.5">
                <span className="font-bold">•</span> Missed retirement tax benefits if tax-advantaged accounts (401k/IRA) are not maxed out first.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 9. Frequently Asked Questions (FAQs) */}
      <section className="space-y-4 pt-2">
        <h3 className="text-lg font-extrabold text-blue-600 dark:text-blue-400">
          Frequently Asked Questions (Mortgage FAQs)
        </h3>
        <div className="space-y-3">
          {faqList.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                {item.question}
              </h4>
              <p className="text-xs text-slate-900 dark:text-slate-100 leading-relaxed font-medium">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default MortgageContentSection;

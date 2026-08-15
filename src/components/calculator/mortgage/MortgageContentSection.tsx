"use client";

import React from "react";
import {
  BookOpen,
  DollarSign,
  ShieldAlert,
  Home,
  TrendingDown,
  CheckCircle2,
  XCircle,
  Percent,
  CalendarCheck,
  Building,
} from "lucide-react";

export function MortgageContentSection() {
  return (
    <div className="space-y-8 py-2 text-zinc-700 dark:text-zinc-300">
      {/* 1. What is a Mortgage */}
      <section className="space-y-3">
        <h3 className="text-lg font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          What is a Mortgage?
        </h3>
        <p className="text-sm leading-relaxed">
          A <strong>mortgage</strong> is a debt instrument secured by the collateral of specified real estate property. When buying a home, most buyers do not have the full purchase amount in liquid cash; instead, a bank or mortgage lender provides the upfront capital to complete the purchase, and the borrower agrees to pay back the loan over a structured period (typically 15 to 30 years) with interest.
        </p>
        <p className="text-sm leading-relaxed">
          If the borrower defaults on their loan payments, the lender retains a legal lien on the home, granting them the right to take ownership of the property through foreclosure to recover the outstanding principal.
        </p>
      </section>

      {/* 2. Key Components of a Monthly Mortgage (PITI) */}
      <section className="space-y-3">
        <h3 className="text-lg font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Key Components of a Monthly Mortgage Payment (PITI)
        </h3>
        <p className="text-sm leading-relaxed">
          Your total monthly mortgage payment consists of four core elements, frequently referred to in financial planning as <strong>PITI</strong>:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 space-y-1">
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-blue-500"></span> Principal
            </h4>
            <p className="text-xs text-slate-900 dark:text-slate-100 leading-relaxed">
              The original amount of money borrowed from the lender. Each monthly payment pays off a portion of this principal, slowly building equity in your home.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 space-y-1">
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-500"></span> Interest
            </h4>
            <p className="text-xs text-slate-900 dark:text-slate-100 leading-relaxed">
              The fee charged by the lender for borrowing their money, calculated as an annual percentage rate (APR) applied to your remaining loan balance.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 space-y-1">
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span> Property Taxes
            </h4>
            <p className="text-xs text-slate-900 dark:text-slate-100 leading-relaxed">
              Taxes assessed by local county or city governments based on your property value. Lenders collect 1/12th of this annual cost monthly into an escrow account.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 space-y-1">
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-purple-500"></span> Home Insurance
            </h4>
            <p className="text-xs text-slate-900 dark:text-slate-100 leading-relaxed">
              Hazard and property insurance required by lenders to protect the home against hazards like fires, storms, or physical damage.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Property Taxes */}
      <section className="space-y-3">
        <h3 className="text-lg font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Percent className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Understanding Property Taxes
        </h3>
        <p className="text-sm leading-relaxed">
          Property tax rates vary significantly by state and local municipality, typically ranging from <strong>0.3% to over 2.5%</strong> of the home’s assessed value annually. Because local governments re-evaluate property values periodically, property taxes often increase over time. Accounting for a 2%–3% annual tax increase ensures your housing budget remains resilient against future tax hikes.
        </p>
      </section>

      {/* 4. Homeowner's Insurance */}
      <section className="space-y-3">
        <h3 className="text-lg font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Home className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Home Insurance Costs & Escrow
        </h3>
        <p className="text-sm leading-relaxed">
          Homeowners insurance policies cover repairs or rebuilding costs in the event of disasters. Most lenders require buyers to pay insurance premiums via an escrow account. Premium prices fluctuate based on geographic climate risk, age of roof, building materials, and claim history.
        </p>
      </section>

      {/* 5. PMI Insurance (Private Mortgage Insurance) */}
      <section className="space-y-3">
        <h3 className="text-lg font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Private Mortgage Insurance (PMI)
        </h3>
        <p className="text-sm leading-relaxed">
          If your down payment is less than <strong>20% of the home price</strong> (Loan-to-Value ratio over 80%), conventional lenders require Private Mortgage Insurance (PMI). PMI protects the lender if you default.
        </p>
        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-50/30 border border-amber-200 dark:border-amber-800 text-xs space-y-2">
          <p className="font-bold text-amber-900 dark:text-amber-200">How to eliminate PMI:</p>
          <ul className="list-disc list-inside space-y-1 text-amber-800 dark:text-blue-400">
            <li><strong>Automatic Cancellation:</strong> Under federal law (HPA), PMI must automatically cancel when your principal balance reaches 78% of the original home price.</li>
            <li><strong>Requested Cancellation:</strong> You can request PMI removal once your loan balance reaches 80% LTV.</li>
            <li><strong>Re-Appraisal:</strong> Significant home renovations or local market appreciation can allow you to request an appraisal to remove PMI early.</li>
          </ul>
        </div>
      </section>

      {/* 6. HOA Fees */}
      <section className="space-y-3">
        <h3 className="text-lg font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Building className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          HOA Fees & Community Assessments
        </h3>
        <p className="text-sm leading-relaxed">
          Properties in condominiums, townhome communities, or master-planned subdivisions often require monthly <strong>Homeowners Association (HOA)</strong> fees. HOA dues pay for shared amenities (pools, clubhouses, fitness centers), exterior landscaping, trash pickup, and reserve funds. Note that HOA fees are paid directly to the association, not through your bank loan escrow.
        </p>
      </section>

      {/* 7. Early Repayment Strategies */}
      <section className="space-y-3">
        <h3 className="text-lg font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <TrendingDown className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Proven Early Repayment Strategies
        </h3>
        <p className="text-sm leading-relaxed">
          Accelerating your mortgage payoff saves tens or hundreds of thousands of dollars in compounding interest:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-xs space-y-1">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1">
              <CalendarCheck className="h-3.5 w-3.5 text-blue-500" /> Bi-Weekly Payments
            </h4>
            <p className="text-slate-900 dark:text-slate-100">
              Pay half your monthly mortgage payment every 2 weeks. This results in 26 half-payments (13 full monthly payments per year), cutting years off a 30-year term.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-xs space-y-1">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1">
              <DollarSign className="h-3.5 w-3.5 text-blue-600" /> Fixed Extra Monthly
            </h4>
            <p className="text-slate-900 dark:text-slate-100">
              Adding even $100 or $200 extra every month directly reduces principal, compounding savings every single month for the rest of the loan term.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-xs space-y-1">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1">
              <TrendingDown className="h-3.5 w-3.5 text-blue-600" /> Lump-Sum Lump
            </h4>
            <p className="text-slate-900 dark:text-slate-100">
              Apply annual work bonuses, tax refunds, or inheritance payouts as one-time principal curtailments to dramatically reduce your payoff schedule.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Pros & Cons of Making Extra Payments */}
      <section className="space-y-3">
        <h3 className="text-lg font-extrabold text-zinc-900 dark:text-zinc-100">
          Pros and Cons of Extra Mortgage Payments
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-50/20 border border-emerald-200 dark:border-emerald-800 space-y-2">
            <h4 className="font-bold text-sm text-emerald-900 dark:text-blue-400 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" /> Advantages (Pros)
            </h4>
            <ul className="space-y-1.5 text-xs text-emerald-800 dark:text-blue-400">
              <li className="flex items-start gap-1.5">
                <span className="font-bold">•</span> Guaranteed return on investment equal to your mortgage interest rate.
              </li>
              <li className="flex items-start gap-1.5">
                <span className="font-bold">•</span> Shaves years off your payoff timeline and builds home equity rapidly.
              </li>
              <li className="flex items-start gap-1.5">
                <span className="font-bold">•</span> Provides financial freedom and peace of mind when debt-free.
              </li>
              <li className="flex items-start gap-1.5">
                <span className="font-bold">•</span> Eliminates PMI faster if down payment was under 20%.
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-50/20 border border-rose-200 dark:border-rose-800 space-y-2">
            <h4 className="font-bold text-sm text-rose-900 dark:text-blue-400 flex items-center gap-1.5">
              <XCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" /> Trade-offs (Cons)
            </h4>
            <ul className="space-y-1.5 text-xs text-rose-800 dark:text-blue-400">
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
    </div>
  );
}

export default MortgageContentSection;

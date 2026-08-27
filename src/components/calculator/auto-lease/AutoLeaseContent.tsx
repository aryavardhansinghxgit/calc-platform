import React from "react";
import Link from "next/link";
import {
  Car,
  Calculator,
  Percent,
  TrendingDown,
  ShieldCheck,
  ShieldAlert,
  Clock,
  ArrowRight,
  BookOpen,
  DollarSign,
  Layers,
  Sparkles,
  HelpCircle,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sliders,
  Scale,
} from "lucide-react";

export function AutoLeaseContent() {
  return (
    <article className="space-y-12 text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
      {/* =========================================================================
          ARTICLE HERO / INTRODUCTION
         ========================================================================= */}
      <section className="space-y-4">
        <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
          An auto lease payment can look deceptively simple when a dealer advertises a low monthly number, but the actual cost of a lease depends on several interacting variables. The negotiated vehicle price, MSRP, residual value, lease term, money factor or APR, capitalized-cost reductions, acquisition and other fees, taxes, mileage allowance, manufacturer incentives, and trade-in equity can all affect what you ultimately pay. That is why comparing lease offers only by their advertised monthly payment can produce a misleading result.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          The <strong>Auto Lease Calculator</strong> is designed to expose the major components of a lease and show how they combine into the monthly payment and total modeled cost. In the calculator&apos;s tested reference scenario, a <strong>$35,000</strong> negotiated price, <strong>$36,000</strong> MSRP, <strong>36-month</strong> term, <strong>6%</strong> APR, <strong>55%</strong> residual, <strong>$5,500</strong> of cap-cost reductions, and the specified fees and tax produce a modeled monthly payment of <strong>$442.70</strong>.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          The underlying lease structure follows the basic framework used in consumer lease disclosures: an adjusted capitalized cost is compared with the vehicle&apos;s residual value to determine depreciation, while a separate rent or finance charge is calculated using the lease&apos;s financing factor. Taxes and other charges are then incorporated according to the applicable lease structure and the assumptions used by the calculator. The Consumer Financial Protection Bureau (CFPB) describes the same broad mechanism: most of a standard lease payment represents depreciation, while the consumer also pays a rent charge, with taxes and fees affecting the final payment.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          This calculator is built for users who want more than a single payment estimate. It can work forward from vehicle price and lease terms, work backward from a target monthly payment, analyze excess mileage, compare leasing with buying via our integrated <Link href="/calculators/auto-loan-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Auto Loan Calculator</Link>, examine how APR and residual assumptions change the payment, and visualize the composition of the lease cost. The calculator also maintains a detailed schedule and provides exportable CSV and PDF reports, making it easy to compare multiple dealer quotes on a consistent basis.
        </p>
        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <strong>Important Limitation:</strong> A calculator can model the assumptions you provide, but it cannot know the exact contractual terms a leasing company will approve. Residual percentages, money factors, acquisition fees, mileage charges, taxes, rebates, and purchase-option terms can vary by lender, vehicle, location, credit profile, promotion, and contract. The numbers here should therefore be used to analyze and compare lease offers, while the actual lease contract remains the controlling document.
        </div>
      </section>

      {/* =========================================================================
          SECTION 1: WHAT AN AUTO LEASE PAYMENT ACTUALLY REPRESENTS
         ========================================================================= */}
      <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/50">
            <Car className="h-5 w-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            1. What an Auto Lease Payment Actually Represents
          </h2>
        </div>

        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          An auto lease is fundamentally a way of paying for the use of a vehicle over a defined period rather than financing the entire purchase price in the same manner as a conventional auto loan. A lease starts with a negotiated vehicle value, estimates what the vehicle will be worth at the end of the term, charges the lessee for the portion of the vehicle&apos;s value consumed during the lease, and adds a financing or rent charge. The resulting payment is then adjusted for taxes, fees, credits, rebates and other contractual items.
        </p>

        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          The first number that matters is the <strong>capitalized cost</strong>. This is broadly the amount used as the starting value of the leased vehicle after accounting for items that are capitalized into the lease. A negotiated selling price is often the largest component, but an acquisition fee and certain other charges can also be incorporated. Consumer lease disclosures refer to the <em>gross capitalized cost</em> and <em>adjusted capitalized cost</em> because the amount ultimately used to calculate the base payment can differ from the headline vehicle selling price.
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm space-y-2 font-mono">
          <p className="font-sans font-bold text-slate-900 dark:text-white">Reference Scenario Cap Cost Breakdown:</p>
          <p>• Negotiated Price = $35,000.00</p>
          <p>• Acquisition Fee = +$695.00</p>
          <p className="font-bold text-blue-600 dark:text-blue-400">→ Gross Capitalized Cost = $35,695.00</p>
          <p>• Cap-Cost Reductions (Down Payment, Trade Equity, Rebates) = -$5,500.00</p>
          <p className="font-bold text-emerald-600 dark:text-emerald-400">→ Adjusted (Net) Capitalized Cost = $30,195.00</p>
        </div>

        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          The second major number is the <strong>residual value</strong>. This represents the estimated value of the vehicle at the end of the lease. In the reference scenario, the vehicle has an MSRP of $36,000 and a residual percentage of 55%, producing:
        </p>

        <div className="p-3 rounded-lg bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 font-mono text-center text-sm">
          $$36,000 \times 55\% = \$19,800.00
        </div>

        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          The difference between the adjusted capitalized cost and residual value is therefore:
        </p>

        <div className="p-3 rounded-lg bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 font-mono text-center text-sm">
          $$30,195 - \$19,800 = \$10,395.00
        </div>

        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          This is the modeled depreciation charge across the 36-month lease ($288.75/month). The third major component is the <strong>rent charge</strong>, often discussed as the lease&apos;s financing charge ($124.99/month). That is why two vehicles with the same MSRP can have significantly different lease payments: one could have a higher residual percentage, a lower money factor, a larger manufacturer incentive, or a lower negotiated selling price.
        </p>
      </section>

      {/* =========================================================================
          SECTION 2: HOW TO CALCULATE A CAR LEASE PAYMENT
         ========================================================================= */}
      <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/50">
            <Calculator className="h-5 w-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            2. How to Calculate a Car Lease Payment
          </h2>
        </div>

        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          A conventional lease-payment calculation can be broken into several structured stages. The standard consumer calculation provides a clear, verifiable framework for evaluating any quote:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="font-bold text-blue-600 dark:text-blue-400 block font-sans">Step 1: Gross &amp; Adjusted Cap Cost</span>
            <p className="font-mono text-xs text-slate-600 dark:text-slate-400">Gross Cap Cost = Price + Capitalized Fees</p>
            <p className="font-mono text-xs font-semibold text-slate-900 dark:text-white">$35,000 + $695 = $35,695</p>
            <p className="font-mono text-xs text-slate-600 dark:text-slate-400 pt-1">Adjusted Cap Cost = Gross Cap - Reductions</p>
            <p className="font-mono text-xs font-semibold text-slate-900 dark:text-white">$35,695 - $5,500 = $30,195</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="font-bold text-blue-600 dark:text-blue-400 block font-sans">Step 2: Monthly Depreciation</span>
            <p className="font-mono text-xs text-slate-600 dark:text-slate-400">Residual Value = $36,000 × 55% = $19,800</p>
            <p className="font-mono text-xs text-slate-600 dark:text-slate-400">Depreciation = Adjusted Cap - Residual</p>
            <p className="font-mono text-xs font-semibold text-slate-900 dark:text-white">$30,195 - $19,800 = $10,395</p>
            <p className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 pt-1">Monthly Dep = $10,395 ÷ 36 = $288.75 / mo</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="font-bold text-blue-600 dark:text-blue-400 block font-sans">Step 3: Monthly Finance / Rent Charge</span>
            <p className="font-mono text-xs text-slate-600 dark:text-slate-400">Money Factor = APR ÷ 2400 = 6.0 ÷ 2400 = 0.0025</p>
            <p className="font-mono text-xs text-slate-600 dark:text-slate-400">Rent Charge = (Adjusted Cap + Residual) × MF</p>
            <p className="font-mono text-xs text-slate-600 dark:text-slate-400">($30,195 + $19,800) × 0.0025 = $49,995 × 0.0025</p>
            <p className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 pt-1">Monthly Rent Charge = $124.99 / mo</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="font-bold text-blue-600 dark:text-blue-400 block font-sans">Step 4: Monthly Sales Tax &amp; Total Payment</span>
            <p className="font-mono text-xs text-slate-600 dark:text-slate-400">Pre-Tax Payment = $288.75 + $124.99 = $413.74</p>
            <p className="font-mono text-xs text-slate-600 dark:text-slate-400">Monthly Sales Tax (7%) = $413.74 × 7.0% = $28.96</p>
            <p className="font-mono text-xs font-black text-blue-600 dark:text-blue-400 pt-1 text-sm">Total Monthly Payment = $442.70 / mo</p>
          </div>
        </div>

        {/* Calculation Flow Chart Diagram */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-900/10 via-indigo-900/10 to-purple-900/10 border border-blue-200/60 dark:border-blue-900/40 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-300 block">
            Standard Auto Lease Mathematical Flow
          </span>
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
            <span className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">Negotiated Price</span>
            <ArrowRight className="h-3.5 w-3.5 text-blue-500 shrink-0" />
            <span className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">+ Capitalized Fees</span>
            <ArrowRight className="h-3.5 w-3.5 text-blue-500 shrink-0" />
            <span className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">Gross Cap Cost</span>
            <ArrowRight className="h-3.5 w-3.5 text-blue-500 shrink-0" />
            <span className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">− Cap Reductions</span>
            <ArrowRight className="h-3.5 w-3.5 text-blue-500 shrink-0" />
            <span className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">Adjusted Cap Cost</span>
            <ArrowRight className="h-3.5 w-3.5 text-blue-500 shrink-0" />
            <span className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">− Residual</span>
            <ArrowRight className="h-3.5 w-3.5 text-blue-500 shrink-0" />
            <span className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">Depreciation</span>
            <ArrowRight className="h-3.5 w-3.5 text-blue-500 shrink-0" />
            <span className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">+ Rent Charge</span>
            <ArrowRight className="h-3.5 w-3.5 text-blue-500 shrink-0" />
            <span className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">+ Tax</span>
            <ArrowRight className="h-3.5 w-3.5 text-blue-500 shrink-0" />
            <span className="px-2.5 py-1 rounded-md bg-blue-600 text-white font-bold">Monthly Payment</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: MONEY FACTOR, APR AND RESIDUAL VALUE
         ========================================================================= */}
      <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/50">
            <Percent className="h-5 w-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            3. Money Factor, APR and Residual Value: The Three Numbers That Change a Lease
          </h2>
        </div>

        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          Money factor and residual value are two of the least intuitive parts of vehicle leasing, yet they have an enormous impact on the monthly payment. A money factor is a decimal financing factor used in vehicle leases. The conventional conversion formulas are:
        </p>

        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 font-mono text-sm text-center">
          Money Factor = APR ÷ 2,400 &nbsp;|&nbsp; APR = Money Factor × 2,400
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm pt-2">
          {/* APR Sensitivity */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="font-bold text-slate-900 dark:text-white block">Interest Rate (APR) Sensitivity</span>
            <p className="text-xs text-slate-600 dark:text-slate-400">Holding price, residual, and term constant:</p>
            <div className="space-y-1 font-mono text-xs">
              <div className="flex justify-between"><span>3.0% APR (MF 0.00125):</span><span className="font-bold">$375.83 / mo</span></div>
              <div className="flex justify-between"><span>4.5% APR (MF 0.00187):</span><span className="font-bold">$409.26 / mo</span></div>
              <div className="flex justify-between text-blue-600 dark:text-blue-400 font-bold"><span>6.0% APR (MF 0.00250):</span><span>$442.70 / mo</span></div>
              <div className="flex justify-between"><span>7.5% APR (MF 0.00313):</span><span className="font-bold">$476.13 / mo</span></div>
              <div className="flex justify-between"><span>9.0% APR (MF 0.00375):</span><span className="font-bold">$509.57 / mo</span></div>
            </div>
          </div>

          {/* Residual Sensitivity */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="font-bold text-slate-900 dark:text-white block">Residual Value % Sensitivity</span>
            <p className="text-xs text-slate-600 dark:text-slate-400">Holding price, APR, and term constant:</p>
            <div className="space-y-1 font-mono text-xs">
              <div className="flex justify-between"><span>45% Residual ($16,200):</span><span className="font-bold">$540.07 / mo</span></div>
              <div className="flex justify-between"><span>50% Residual ($18,000):</span><span className="font-bold">$491.38 / mo</span></div>
              <div className="flex justify-between text-blue-600 dark:text-blue-400 font-bold"><span>55% Residual ($19,800):</span><span>$442.70 / mo</span></div>
              <div className="flex justify-between"><span>60% Residual ($21,600):</span><span className="font-bold">$394.01 / mo</span></div>
              <div className="flex justify-between"><span>65% Residual ($23,400):</span><span className="font-bold">$345.33 / mo</span></div>
            </div>
          </div>
        </div>

        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          There is an important distinction between <strong>MSRP</strong> and <strong>capitalized cost</strong>. Residual value is generally based on the vehicle&apos;s contractual residual percentage applied to the original MSRP, while depreciation uses the adjusted capitalized cost. This means negotiating the selling price down directly reduces depreciation dollar-for-dollar without diminishing the contractual residual value.
        </p>
      </section>

      {/* =========================================================================
          SECTION 4: DOWN PAYMENTS, TRADE-INS, REBATES AND FEES
         ========================================================================= */}
      <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/50">
            <DollarSign className="h-5 w-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            4. Down Payments, Trade-Ins, Rebates and Fees: Why Advertised Payments Mislead
          </h2>
        </div>

        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          A low monthly lease payment often comes from a large upfront cash contribution rather than an inherently inexpensive lease. For example, an offer of <strong>$400/month with $5,000 due at signing</strong> costs significantly more out of pocket over 36 months than <strong>$450/month with $1,000 due at signing</strong> ($19,400 vs $17,200 total outlay).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="font-bold text-slate-900 dark:text-white block">Positive Trade-In Equity</span>
            <p className="text-slate-600 dark:text-slate-400">Trade Value ($20,000) − Loan Payoff ($17,000) = <strong>+$3,000 Net Equity</strong>.</p>
            <p className="text-slate-600 dark:text-slate-400">This acts as a cap-cost reduction, lowering your monthly depreciation charge.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="font-bold text-rose-700 dark:text-rose-400 block">Negative Trade-In Equity (Underwater)</span>
            <p className="text-slate-600 dark:text-slate-400">Trade Value ($17,000) − Loan Payoff ($20,000) = <strong>−$3,000 Negative Equity</strong>.</p>
            <p className="text-slate-600 dark:text-slate-400">This gets added into the gross capitalized cost, increasing both monthly depreciation and finance charges.</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs sm:text-sm text-amber-900 dark:text-amber-200 space-y-1">
          <strong>Expert Lease Rule:</strong> Financial experts advise making minimal or $0 down payment on a car lease. If a leased vehicle is totaled or stolen during the lease, insurance pays the leasing bank the fair market value, but your upfront down payment cash is not refunded.
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: LEASE MILEAGE, RESIDUAL RISK AND END-OF-TERM CHARGES
         ========================================================================= */}
      <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/50">
            <Clock className="h-5 w-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            5. Lease Mileage, Residual Risk and End-of-Term Charges
          </h2>
        </div>

        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          Most auto leases specify an annual mileage allowance (commonly 10,000, 12,000, or 15,000 miles/year). Exceeding this limit incurs an excess mileage charge at vehicle return, typically between $0.15 and $0.30 per mile. In the reference scenario, driving 42,000 miles on a 36,000-mile contract creates 6,000 excess miles at $0.20/mile, resulting in a <strong>$1,200.00</strong> penalty fee.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white block">Excess Mileage</span>
            <p className="text-slate-600 dark:text-slate-400">$0.15–$0.30 per mile over contract limit at return.</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white block">Excess Wear &amp; Tear</span>
            <p className="text-slate-600 dark:text-slate-400">Deep scratches, windshield cracks, or bald tires.</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white block">Disposition Fee</span>
            <p className="text-slate-600 dark:text-slate-400">$350–$495 bank fee to process return at lease end.</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white block">Purchase Option</span>
            <p className="text-slate-600 dark:text-slate-400">Contractual right to buy the car for its residual value.</p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: LEASE VS. BUY: COMPARING MONTHLY PAYMENT IS NOT ENOUGH
         ========================================================================= */}
      <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/50">
            <Scale className="h-5 w-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            6. Lease vs. Buy: Comparing Monthly Payment Is Not Enough
          </h2>
        </div>

        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          The decision between leasing and buying is more complicated than picking the lower monthly payment. Leasing has a lower payment because you pay only for depreciation during the term. Buying produces higher monthly payments but builds vehicle equity as the loan amortizes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/50 space-y-2">
            <span className="font-bold text-blue-900 dark:text-blue-300 text-sm block">Lease Option (Reference Scenario)</span>
            <p>• Monthly Payment: <strong>$442.70 / mo</strong></p>
            <p>• Total Cash Outlay: <strong>$19,232.17</strong></p>
            <p>• Retained Equity: <strong>$0.00</strong></p>
            <p className="font-bold text-blue-600 dark:text-blue-400 pt-1">→ Net Effective Cost = $19,532.17</p>
          </div>

          <div className="p-4 rounded-xl bg-purple-50/60 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/50 space-y-2">
            <span className="font-bold text-purple-900 dark:text-purple-300 text-sm block">Purchase Option (36-Month Loan)</span>
            <p>• Monthly Payment: <strong>$1,029.75 / mo</strong></p>
            <p>• Total Cash Outlay: <strong>$39,571.04</strong></p>
            <p>• Retained Vehicle Equity: <strong>$19,800.00</strong></p>
            <p className="font-bold text-purple-600 dark:text-purple-400 pt-1">→ Net Effective Cost = $20,571.04</p>
          </div>
        </div>

        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          In this scenario, leasing provides a modeled net cost advantage of approximately <strong>$1,039</strong> over the 36-month horizon. For longer holding periods (6+ years), buying typically becomes significantly more economical because loan payments end while the vehicle continues providing reliable transportation. Use our <Link href="/calculators/loan-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Loan Calculator</Link> and <Link href="/calculators/depreciation-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Depreciation Calculator</Link> to model multi-year ownership horizons.
        </p>
      </section>

      {/* =========================================================================
          SECTION 7: REVERSE LEASE CALCULATOR: SOLVING FROM MONTHLY BUDGET
         ========================================================================= */}
      <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/50">
            <RotateCcw className="h-5 w-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            7. Reverse Lease Calculator: Finding the Vehicle Price You Can Afford
          </h2>
        </div>

        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          Most lease calculators work forward: enter the vehicle price and get a monthly payment. The reverse approach is often more practical when shopping because consumers begin with a monthly budget. The Auto Lease Calculator includes an exact reverse solver: for a target payment of <strong>$450.00/month</strong> (36 months, 6% APR, 55% residual, 7% sales tax), the maximum supported vehicle selling price is <strong>$35,225.00</strong>.
        </p>

        <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 font-mono text-xs sm:text-sm text-center">
          Net Cap Cost Target = [Subtotal Target + Residual × (1/Term − MF)] ÷ (1/Term + MF)
        </div>

        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          This reverse calculation is a powerful negotiation tool. When a dealer states &quot;we can get you to $450/month,&quot; you can verify whether they lowered the vehicle selling price or simply lengthened the lease term or required additional upfront cash at signing.
        </p>
      </section>

      {/* =========================================================================
          SECTION 8: HOW TO COMPARE LEASE OFFERS & USE THE CALCULATOR
         ========================================================================= */}
      <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/50">
            <FileSpreadsheet className="h-5 w-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            8. How to Compare Lease Offers and Use the Calculator Responsibly
          </h2>
        </div>

        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          To compare dealership lease quotes on an apples-to-apples basis, normalize every input parameter into a structured evaluation grid:
        </p>

        {/* Structured Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold">
              <tr>
                <th className="p-3 border-b border-slate-200 dark:border-slate-700">Lease Variable</th>
                <th className="p-3 border-b border-slate-200 dark:border-slate-700">Dealer Quote A</th>
                <th className="p-3 border-b border-slate-200 dark:border-slate-700">Dealer Quote B</th>
                <th className="p-3 border-b border-slate-200 dark:border-slate-700">Why It Matters</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-sans">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                <td className="p-3 font-semibold">Negotiated Price</td>
                <td className="p-3 font-mono">$35,000</td>
                <td className="p-3 font-mono">$34,200</td>
                <td className="p-3 text-slate-600 dark:text-slate-400">Lower price directly reduces depreciation portion.</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                <td className="p-3 font-semibold">Residual Value %</td>
                <td className="p-3 font-mono">55% ($19,800)</td>
                <td className="p-3 font-mono">58% ($20,880)</td>
                <td className="p-3 text-slate-600 dark:text-slate-400">Higher residual means you pay for less depreciation.</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                <td className="p-3 font-semibold">Money Factor (APR)</td>
                <td className="p-3 font-mono">0.0025 (6.0%)</td>
                <td className="p-3 font-mono">0.0021 (5.04%)</td>
                <td className="p-3 text-slate-600 dark:text-slate-400">Directly controls monthly rent charge.</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                <td className="p-3 font-semibold">Due at Signing</td>
                <td className="p-3 font-mono">$3,342.70</td>
                <td className="p-3 font-mono">$1,500.00</td>
                <td className="p-3 text-slate-600 dark:text-slate-400">Upfront cash at risk if the vehicle is totaled.</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                <td className="p-3 font-semibold">Monthly Payment</td>
                <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">$442.70</td>
                <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">$428.15</td>
                <td className="p-3 text-slate-600 dark:text-slate-400">Periodic payment including tax.</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50 bg-blue-50/30 dark:bg-blue-950/20">
                <td className="p-3 font-bold text-slate-900 dark:text-white">Total Modeled Cost</td>
                <td className="p-3 font-mono font-bold text-slate-900 dark:text-white">$19,232.17</td>
                <td className="p-3 font-mono font-bold text-slate-900 dark:text-white">$16,913.40</td>
                <td className="p-3 font-semibold text-emerald-600 dark:text-emerald-400">True bottom-line comparison metric.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* =========================================================================
          FORMULA & CALCULATION METHOD
         ========================================================================= */}
      <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/50">
            <Calculator className="h-5 w-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Formula &amp; Calculation Method
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-sans font-bold text-slate-900 dark:text-white block">Residual Value</span>
            <p className="text-blue-600 dark:text-blue-400 font-bold">Residual Value = MSRP × Residual %</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-sans font-bold text-slate-900 dark:text-white block">Adjusted Cap Cost</span>
            <p className="text-blue-600 dark:text-blue-400 font-bold">Adjusted Cap = Gross Cap − Cap Reductions</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-sans font-bold text-slate-900 dark:text-white block">Monthly Depreciation</span>
            <p className="text-blue-600 dark:text-blue-400 font-bold">(Adjusted Cap − Residual) ÷ Term</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-sans font-bold text-slate-900 dark:text-white block">Money Factor &amp; APR</span>
            <p className="text-blue-600 dark:text-blue-400 font-bold">MF = APR ÷ 2400 | APR = MF × 2400</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-sans font-bold text-slate-900 dark:text-white block">Monthly Finance / Rent Charge</span>
            <p className="text-blue-600 dark:text-blue-400 font-bold">(Adjusted Cap + Residual) × Money Factor</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-sans font-bold text-slate-900 dark:text-white block">Monthly Sales Tax</span>
            <p className="text-blue-600 dark:text-blue-400 font-bold">(Depreciation + Rent Charge) × Tax Rate</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-sans font-bold text-slate-900 dark:text-white block">Total Monthly Payment</span>
            <p className="text-emerald-600 dark:text-emerald-400 font-bold">Depreciation + Rent Charge + Monthly Tax</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-sans font-bold text-slate-900 dark:text-white block">Excess Mileage Penalty</span>
            <p className="text-rose-600 dark:text-rose-400 font-bold">max(0, Expected − Contract) × Rate</p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FULL WORKED STEP-BY-STEP EXAMPLE
         ========================================================================= */}
      <section className="bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-5 border border-blue-800/40">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="p-2 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-400/30">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
              Worked Auto Lease Calculation Example
            </h2>
            <p className="text-xs text-blue-200/80 mt-0.5">
              Exact mathematical derivation of the $35,000 reference scenario.
            </p>
          </div>
        </div>

        {/* Input Parameters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-black/30 p-4 rounded-xl border border-white/10 font-sans tabular-nums">
          <div><span className="text-blue-300 block text-[10px] uppercase font-bold">Vehicle Price</span><span className="font-bold text-white text-sm">$35,000</span></div>
          <div><span className="text-blue-300 block text-[10px] uppercase font-bold">Vehicle MSRP</span><span className="font-bold text-white text-sm">$36,000</span></div>
          <div><span className="text-blue-300 block text-[10px] uppercase font-bold">Lease Term</span><span className="font-bold text-white text-sm">36 Months</span></div>
          <div><span className="text-blue-300 block text-[10px] uppercase font-bold">APR Interest</span><span className="font-bold text-white text-sm">6.0% (MF 0.0025)</span></div>
          <div><span className="text-blue-300 block text-[10px] uppercase font-bold">Residual Value</span><span className="font-bold text-white text-sm">55% ($19,800)</span></div>
          <div><span className="text-blue-300 block text-[10px] uppercase font-bold">Acquisition Fee</span><span className="font-bold text-white text-sm">$695</span></div>
          <div><span className="text-blue-300 block text-[10px] uppercase font-bold">Cap Reductions</span><span className="font-bold text-white text-sm">$5,500</span></div>
          <div><span className="text-blue-300 block text-[10px] uppercase font-bold">Sales Tax Rate</span><span className="font-bold text-white text-sm">7.0%</span></div>
        </div>

        {/* Derivation Steps */}
        <div className="space-y-3 text-xs leading-relaxed text-blue-100/90 pt-1 font-mono">
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <span className="font-bold text-blue-300 block text-xs font-sans">Step 1: Gross &amp; Adjusted Cap Cost</span>
            <p>$35,000 + $695 = $35,695 (Gross Cap Cost)</p>
            <p className="text-white font-bold">$35,695 − $5,500 = $30,195.00 (Adjusted Cap Cost)</p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <span className="font-bold text-blue-300 block text-xs font-sans">Step 2: Residual Value &amp; Monthly Depreciation</span>
            <p>$36,000 × 0.55 = $19,800.00 (Residual Value)</p>
            <p>$30,195 − $19,800 = $10,395.00 (Total Depreciation)</p>
            <p className="text-white font-bold">$10,395 ÷ 36 = $288.75 / month</p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <span className="font-bold text-blue-300 block text-xs font-sans">Step 3: Monthly Finance / Rent Charge</span>
            <p>Money Factor = 6.0% ÷ 2,400 = 0.0025</p>
            <p>($30,195 + $19,800) × 0.0025 = $49,995 × 0.0025</p>
            <p className="text-white font-bold">$124.9875 → $124.99 / month</p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <span className="font-bold text-blue-300 block text-xs font-sans">Step 4: Monthly Sales Tax &amp; Total Payment</span>
            <p>Pre-tax Payment = $288.75 + $124.99 = $413.74</p>
            <p>Monthly Sales Tax = $413.74 × 7.0% = $28.9616 → $28.96</p>
            <p className="text-emerald-400 font-black text-base pt-1 font-sans">
              Total Monthly Lease Payment = $288.75 + $124.99 + $28.96 = $442.70 / month
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          METHODOLOGY & LIMITATIONS
         ========================================================================= */}
      <section className="space-y-3 pt-6 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Methodology &amp; Limitations
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          This Auto Lease Calculator models standard consumer leasing equations using mathematical formulations compliant with federal consumer-leasing disclosure standards. All calculations are performed deterministically in real time. Actual lease contracts can vary based on dealer documentation fees, regional sales-tax rules (e.g., upfront taxation vs monthly payment taxation), captive lender money factors, credit tier requirements, and manufacturer acquisition fee guidelines. Always inspect your written lease agreement before signing.
        </p>
      </section>

      {/* =========================================================================
          CONTEXTUAL RELATED CALCULATORS NAVIGATION
         ========================================================================= */}
      <section className="space-y-3 pt-6 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white">
          Explore Related Financial Calculators
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Compare auto financing strategies with our suite of precision calculators:
        </p>
        <div className="flex flex-wrap gap-2 pt-1 text-xs">
          <Link href="/calculators/auto-loan-calculator" className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-slate-200 dark:border-slate-700 transition-colors">
            Auto Loan Calculator →
          </Link>
          <Link href="/calculators/loan-calculator" className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-slate-200 dark:border-slate-700 transition-colors">
            Loan Calculator →
          </Link>
          <Link href="/calculators/payment-calculator" className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-slate-200 dark:border-slate-700 transition-colors">
            Payment Calculator →
          </Link>
          <Link href="/calculators/interest-rate-calculator" className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-slate-200 dark:border-slate-700 transition-colors">
            Interest Rate Calculator →
          </Link>
          <Link href="/calculators/depreciation-calculator" className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-slate-200 dark:border-slate-700 transition-colors">
            Depreciation Calculator →
          </Link>
          <Link href="/calculators/roi-calculator" className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-slate-200 dark:border-slate-700 transition-colors">
            ROI Calculator →
          </Link>
          <Link href="/calculators/inflation-calculator" className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-slate-200 dark:border-slate-700 transition-colors">
            Inflation Calculator →
          </Link>
        </div>
      </section>
    </article>
  );
}

export default AutoLeaseContent;

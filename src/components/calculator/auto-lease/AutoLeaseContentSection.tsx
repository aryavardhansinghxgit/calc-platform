"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, BookOpen, Calculator, CheckCircle2, ArrowRight, ShieldAlert, FileSpreadsheet, DollarSign } from "lucide-react";
import AUTO_LEASE_CALCULATOR from "@/calculators/finance/auto-lease";

export function AutoLeaseContentSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = AUTO_LEASE_CALCULATOR.faqs || [];

  const relatedCalculators = [
    { name: "Auto Loan Calculator", href: "/calculators/auto-loan-calculator", desc: "Compare vehicle financing payments and interest" },
    { name: "Loan Calculator", href: "/calculators/loan-calculator", desc: "General amortized borrowing calculations" },
    { name: "EMI Calculator", href: "/calculators/emi-calculator", desc: "Equal monthly installment schedule" },
    { name: "Amortization Calculator", href: "/calculators/amortization-calculator", desc: "Full debt reduction schedule" },
    { name: "Mortgage Payoff Calculator", href: "/calculators/mortgage-payoff-calculator", desc: "Accelerate home payoff timelines" },
    { name: "Refinance Calculator", href: "/calculators/refinance-calculator", desc: "Evaluate auto & mortgage rate savings" },
    { name: "Personal Loan Calculator", href: "/calculators/personal-loan-calculator", desc: "Unsecured personal loan analysis" },
    { name: "Debt Payoff Calculator", href: "/calculators/debt-payoff-calculator", desc: "Consolidate debt balances" },
  ];

  return (
    <div className="space-y-8 mt-8">
      {/* ==========================================
          SECTION 13: FULL WORKED STEP-BY-STEP EXAMPLE
         ========================================== */}
      <section className="bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950 text-white rounded-xl p-6 sm:p-8 shadow-xl space-y-4 border border-blue-800/50">
        <div className="flex items-center gap-3 /60 pb-3">
          <div className="p-2 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-400/30">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-white">
              Full Worked Auto Lease Calculation Example
            </h2>
            <p className="text-xs text-blue-200/80">
              Step-by-step mathematical walkthrough of how monthly lease payments are computed.
            </p>
          </div>
        </div>

        {/* Input Scenario Parameters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-black/30 p-3.5 rounded-lg border border-white/10 font-sans tabular-nums">
          <div>
            <span className="text-blue-300 block text-[10px]">Auto Price</span>
            <span className="font-bold text-white">$50,000</span>
          </div>
          <div>
            <span className="text-blue-300 block text-[10px]">Down Payment</span>
            <span className="font-bold text-white">$8,000</span>
          </div>
          <div>
            <span className="text-blue-300 block text-[10px]">Trade-In Value</span>
            <span className="font-bold text-white">$5,000</span>
          </div>
          <div>
            <span className="text-blue-300 block text-[10px]">Residual Value</span>
            <span className="font-bold text-white">$25,000</span>
          </div>
          <div>
            <span className="text-blue-300 block text-[10px]">APR Interest</span>
            <span className="font-bold text-white">6.0%</span>
          </div>
          <div>
            <span className="text-blue-300 block text-[10px]">Lease Term</span>
            <span className="font-bold text-white">36 Months</span>
          </div>
          <div>
            <span className="text-blue-300 block text-[10px]">Sales Tax Rate</span>
            <span className="font-bold text-white">6.0%</span>
          </div>
          <div>
            <span className="text-blue-300 block text-[10px]">Money Factor</span>
            <span className="font-bold text-white">0.0025</span>
          </div>
        </div>

        {/* Step-by-Step Mathematical Walkthrough */}
        <div className="space-y-3 text-xs leading-relaxed text-blue-100/90 pt-1">
          <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1 font-sans tabular-nums">
            <span className="font-bold text-blue-300 block font-sans">Step 1: Calculate Net Capitalized Cost</span>
            <p>Net Cap Cost = Auto Price - Down Payment - Trade-In Value</p>
            <p className="text-white font-bold">$50,000 - $8,000 - $5,000 = $37,000</p>
          </div>

          <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1 font-sans tabular-nums">
            <span className="font-bold text-blue-300 block font-sans">Step 2: Calculate Monthly Depreciation Charge</span>
            <p>Monthly Depreciation = (Net Cap Cost - Residual Value) ÷ Lease Term</p>
            <p className="text-white font-bold">($37,000 - $25,000) ÷ 36 = $12,000 ÷ 36 = $333.33 / month</p>
          </div>

          <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1 font-sans tabular-nums">
            <span className="font-bold text-blue-300 block font-sans">Step 3: Convert APR to Money Factor & Calculate Rent Charge</span>
            <p>Money Factor = 6.0% ÷ 2400 = 0.0025</p>
            <p>Monthly Finance Charge = (Net Cap Cost + Residual Value) × Money Factor</p>
            <p className="text-white font-bold">($37,000 + $25,000) × 0.0025 = $62,000 × 0.0025 = $155.00 / month</p>
          </div>

          <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1 font-sans tabular-nums">
            <span className="font-bold text-blue-300 block font-sans">Step 4: Calculate Monthly Sales Tax & Final Payment</span>
            <p>Subtotal = $333.33 + $155.00 = $488.33</p>
            <p>Monthly Tax = $488.33 × 6.0% = $29.30</p>
            <p className="text-blue-400 font-extrabold text-sm font-sans">
              Total Monthly Lease Payment = $333.33 + $155.00 + $29.30 = $517.63 / month
            </p>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 11: LONG-FORM SEO CONTENT
         ========================================== */}
      <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sm:p-8 shadow-sm space-y-8 text-zinc-800 dark:text-zinc-200">
        <div className="flex items-center gap-3  dark:border-zinc-800 pb-4">
          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400">
              The Complete Guide to Auto Leasing Mechanics & Strategy
            </h2>
            <p className="text-xs text-slate-900 dark:text-slate-100 mt-0.5">
              Master money factor conversions, residual values, wear-and-tear rules, and early lease termination.
            </p>
          </div>
        </div>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-xs sm:text-sm leading-relaxed">
          {/* Guide 1 */}
          <div>
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 mb-2">
              1. What Is Auto Leasing?
            </h3>
            <p className="text-slate-900 dark:text-zinc-300">
              An auto lease is a long-term rental contract between a car buyer (lessee) and a financing bank (lessor). Instead of borrowing money to purchase the full ownership price of the car, a lease charges you only for the vehicle's projected depreciation over a set duration (typically 24 to 48 months), plus a monthly finance charge (money factor) and sales tax.
            </p>
          </div>

          {/* Guide 2 */}
          <div>
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 mb-2">
              2. Money Factor Explained
            </h3>
            <p className="text-slate-900 dark:text-zinc-300">
              The Money Factor (also called the rent charge or lease factor) represents the interest rate charged on a lease. Unlike standard loans expressed as annual percentage rates (APR), money factor is expressed as a small decimal value like 0.00250.
            </p>
            <div className="bg-blue-50 dark:bg-blue-950/40 p-3 rounded-lg border border-blue-100 dark:border-blue-900/50 mt-2 text-xs text-blue-900 dark:text-blue-200 font-sans tabular-nums">
              Money Factor = APR ÷ 2400 &nbsp;|&nbsp; APR = Money Factor × 2400
            </div>
          </div>

          {/* Guide 3 */}
          <div>
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 mb-2">
              3. Residual Value Explained
            </h3>
            <p className="text-slate-900 dark:text-zinc-300">
              Residual Value is the estimated market value of the vehicle at the end of the lease term, set by the financing bank's actuarial tables (usually expressed as a percentage of MSRP). A higher residual value means lower monthly payments, as you pay for less vehicle depreciation.
            </p>
          </div>

          {/* Guide 4 */}
          <div>
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 mb-2">
              4. Mileage Limits & Excess Mileage Fees
            </h3>
            <p className="text-slate-900 dark:text-zinc-300">
              Auto leases strictly limit the number of miles you can drive per year (typically 10,000, 12,000, or 15,000 miles/year). If you return the car at lease end exceeding your contract limit, lessors charge an excess mileage penalty rate ranging from $0.15 to $0.30 per mile.
            </p>
          </div>

          {/* Guide 5 */}
          <div>
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 mb-2">
              5. Normal vs Excess Wear and Tear
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="bg-blue-50 dark:bg-blue-50/30 p-3 rounded-lg border border-emerald-200 dark:border-emerald-900/40 text-xs">
                <h4 className="font-bold text-emerald-800 dark:text-blue-400 mb-1">Normal Wear & Tear (Covered)</h4>
                <ul className="list-disc pl-4 space-y-1 text-emerald-900 dark:text-emerald-200 text-[11px]">
                  <li>Small door dings under 2 inches</li>
                  <li>Light scratches that buff out</li>
                  <li>Normal tire tread wear above 4/32&quot;</li>
                  <li>Minor interior carpet scuffs</li>
                </ul>
              </div>

              <div className="bg-blue-50 dark:bg-blue-50/30 p-3 rounded-lg border border-rose-200 dark:border-rose-900/40 text-xs">
                <h4 className="font-bold text-rose-800 dark:text-blue-400 mb-1">Excess Wear & Tear (Penalty Fees)</h4>
                <ul className="list-disc pl-4 space-y-1 text-rose-900 dark:text-rose-200 text-[11px]">
                  <li>Cracked or chipped windshield glass</li>
                  <li>Deep body dents or rust patches</li>
                  <li>Tires worn below 4/32&quot; safety depth</li>
                  <li>Torn upholstery or burn marks</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Guide 6 */}
          <div>
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 mb-2">
              6. Lease Maintenance Requirements
            </h3>
            <p className="text-slate-900 dark:text-zinc-300">
              Lessees are contractually obligated to maintain the vehicle according to manufacturer service intervals (oil changes, tire rotations, fluid flushes). Because leased vehicles are brand new, most routine maintenance is covered under the manufacturer's 3-year factory warranty.
            </p>
          </div>

          {/* Guide 7 & 8 */}
          <div>
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 mb-2">
              7 & 8. Advantages vs Disadvantages of Leasing
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="bg-zinc-50 dark:bg-zinc-950 p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800">
                <h4 className="font-bold text-xs text-blue-600 dark:text-blue-400 mb-1">Advantages of Leasing</h4>
                <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-900 dark:text-slate-100">
                  <li>30–60% lower monthly payments than buying</li>
                  <li>Drive brand new cars under factory warranty</li>
                  <li>No resale hassle at lease end</li>
                  <li>Tax write-off benefits for business use</li>
                </ul>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-950 p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800">
                <h4 className="font-bold text-xs text-blue-600 dark:text-blue-400 mb-1">Disadvantages of Leasing</h4>
                <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-900 dark:text-slate-100">
                  <li>Zero equity ownership at lease end</li>
                  <li>Strict annual mileage caps</li>
                  <li>Excess wear & tear penalty risk</li>
                  <li>Continuous monthly car payment cycle</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Guide 9 & 10 */}
          <div>
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 mb-2">
              9 & 10. When Leasing Makes Sense vs When Buying Is Better
            </h3>
            <p className="text-slate-900 dark:text-zinc-300">
              <strong>Leasing makes sense</strong> if you want lower monthly payments, drive under 12,000 miles per year, enjoy upgrading to new tech every 3 years, and write off the vehicle for business. <strong>Buying is better</strong> if you plan to keep your car for 6+ years, drive heavy annual mileage, or prefer building financial asset equity.
            </p>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 12: GETTING OUT OF A LEASE EARLY
         ========================================== */}
      <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-3  dark:border-zinc-800 pb-3">
          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-50/60 text-blue-600 dark:text-blue-400">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400">
              5 Pathways for Getting Out of an Auto Lease Early
            </h2>
            <p className="text-xs text-slate-900 dark:text-slate-100">
              Strategic options if your financial situation or lifestyle changes mid-lease.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs pt-1">
          <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 space-y-1">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-xs">1. Lease Transfer / Swap</h3>
            <p className="text-[11px] text-slate-900 dark:text-slate-100">
              Transfer your remaining lease contract to a qualified buyer using platforms like Swapalease or LeaseTrader for a small administrative fee.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 space-y-1">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-xs">2. Dealer Early Buyout</h3>
            <p className="text-[11px] text-slate-900 dark:text-slate-100">
              Sell or trade in the leased vehicle to an authorized dealer. If the car&apos;s market value exceeds the bank buyout payoff, you capture positive equity.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 space-y-1">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-xs">3. Lease Buyout & Private Sale</h3>
            <p className="text-[11px] text-slate-900 dark:text-slate-100">
              Purchase the vehicle outright at the current payoff amount from the financing bank, take clear title, and sell it privately for market value.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 space-y-1">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-xs">4. Negotiating With Lessor</h3>
            <p className="text-[11px] text-slate-900 dark:text-slate-100">
              Contact the captive lender if experiencing severe hardship. Banks may grant temporary payment deferrals or formal early surrender terms.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-blue-50/30 dark:bg-blue-50/20 space-y-1 col-span-1 sm:col-span-2 lg:col-span-2">
            <h3 className="font-bold text-rose-800 dark:text-blue-400 text-xs">5. Early Termination Return (High Penalty)</h3>
            <p className="text-[11px] text-rose-900 dark:text-rose-200">
              Returning the car directly to the dealer early requires paying early termination fees equal to the difference between your remaining balance and the auction value. Avoid this if possible.
            </p>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 15: FAQ ACCORDION WITH SCHEMA
         ========================================== */}
      <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-3  dark:border-zinc-800 pb-4">
          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-50/60 text-blue-600 dark:text-blue-400">
            <HelpCircle className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400">
              Frequently Asked Questions (FAQ)
            </h2>
            <p className="text-xs text-slate-900 dark:text-slate-100 mt-0.5">
              Expert answers to money factor, residual value, and lease negotiation questions.
            </p>
          </div>
        </div>

        <div className=" dark:divide-zinc-800">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={`lease-faq-${idx}`} className="py-3.5">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left focus-visible:outline-none cursor-pointer group"
                >
                  <span className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-blue-600 dark:text-blue-400" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <p className="mt-2 text-xs text-slate-900 dark:text-zinc-300 leading-relaxed pr-6 bg-zinc-50 dark:bg-zinc-950 p-3.5 rounded-lg border border-zinc-100 dark:border-zinc-800">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* RELATED CALCULATORS GRID */}
      <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-3  dark:border-zinc-800 pb-3">
          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-50/60 text-blue-600 dark:text-blue-400">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold tracking-tight text-blue-600 dark:text-blue-400">
              Related Financial Calculators
            </h2>
            <p className="text-xs text-slate-900 dark:text-slate-100">
              Explore complementary borrowing, loan, and refinancing tools.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          {relatedCalculators.map((calc, i) => (
            <Link
              key={`rel-l-${i}`}
              href={calc.href}
              className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 hover:border-blue-200 dark:hover:border-blue-900/50 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {calc.name}
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-transform group-hover:translate-x-0.5" />
              </div>
              <p className="text-[11px] text-slate-900 dark:text-slate-100 mt-1 line-clamp-2">
                {calc.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

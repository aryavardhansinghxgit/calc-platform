"use client";

import React from "react";

export function LeaseContent() {
  const faqs = [
    {
      question: "1. How is a monthly auto or equipment lease payment calculated?",
      answer:
        "A lease payment consists of two primary components: Monthly Depreciation Fee plus Monthly Finance Charge (Rent Charge). Depreciation Fee = (Net Capitalized Cost - Residual Value) ÷ Lease Term in Months. Rent Charge = (Net Capitalized Cost + Residual Value) × Money Factor. Adding monthly sales tax equals the total periodic payment.",
    },
    {
      question: "2. What is a Money Factor and how do I convert it to an Annual Percentage Rate (APR)?",
      answer:
        "The Money Factor (also called the lease factor or lease fee) is a fractional decimal used by leasing finance companies to calculate interest charges. To convert Money Factor to an approximate APR percentage, multiply by 2,400 (e.g., 0.00250 × 2,400 = 6.00% APR). To convert APR to Money Factor, divide by 2,400.",
    },
    {
      question: "3. What is Residual Value and why is it critical in a lease agreement?",
      answer:
        "The Residual Value is the projected fair market value of the vehicle or equipment at the end of the lease term, set by the financing lessor at signing. A higher residual value means less total depreciation over the lease term, resulting in lower monthly lease payments.",
    },
    {
      question: "4. What is the difference between an Operating Lease and a Capital / Finance Lease?",
      answer:
        "Under GAAP/IFRS standards, an Operating Lease functions like a traditional rental where the lessor retains asset ownership risks, and payments are treated as operational expenses. A Capital/Finance Lease transfers substantially all risks and ownership rewards to the lessee, requiring the asset and liability to be capitalized on the balance sheet.",
    },
    {
      question: "5. Should I put a large down payment (Capitalized Cost Reduction) on an auto lease?",
      answer:
        "Financial advisors generally recommend $0 or minimal down payments on leases. If a leased vehicle is totaled or stolen early in the contract, insurance payouts go directly to the leasing bank, and your upfront cash down payment is typically lost completely unless covered by GAP insurance.",
    },
    {
      question: "6. What is GAP (Guaranteed Asset Protection) insurance and is it included in leases?",
      answer:
        "GAP insurance covers the financial shortfall between the vehicle's depreciated actual market value and the outstanding lease balance if the car is totaled or stolen. Most manufacturer captive finance leases (e.g. BMW FS, Honda Financial) include complimentary GAP coverage, but independent lessors may require separate purchase.",
    },
    {
      question: "7. What are the tax advantages of leasing equipment for small businesses?",
      answer:
        "Under Section 179 and standard IRS guidelines, operating lease payments on equipment and commercial vehicles can often be deducted as 100% ordinary business operating expenses, reducing taxable net income without depleting capital credit lines.",
    },
    {
      question: "8. What happens if I exceed the annual mileage limit on a leased vehicle?",
      answer:
        "Lease agreements establish strict annual mileage allowances (typically 10,000, 12,000, or 15,000 miles per year). Exceeding this limit incurs an excess mileage penalty at lease end, ranging from $0.15 to $0.30 per excess mile.",
    },
    {
      question: "9. Can I buy my leased vehicle at the end of the term (Lease Buyout)?",
      answer:
        "Yes. Nearly all standard consumer closed-end leases provide a contractual purchase option allowing the lessee to purchase the vehicle for the preset Residual Value plus a nominal purchase option documentation fee ($150–$500).",
    },
    {
      question: "10. What is the difference between Closed-End and Open-End leases?",
      answer:
        "In a Closed-End lease (standard consumer auto lease), the lessee returns the vehicle at lease end with zero liability for market depreciation beyond excess wear and mileage. In an Open-End lease (common for commercial fleets), the lessee must pay the difference if the physical resale value falls below the contractual residual value.",
    },
    {
      question: "11. What is an Acquisition Fee and Disposition Fee?",
      answer:
        "An Acquisition Fee (or bank fee, $595–$1,095) is charged upfront by the lessor for originating the lease contract. A Disposition Fee ($350–$595) is charged at lease turn-in to cover vehicle reconditioning, transport, and auction resale costs (waived if you purchase or lease another vehicle from the same brand).",
    },
    {
      question: "12. Is it financially better to lease or buy a vehicle?",
      answer:
        "Leasing offers lower monthly payments, perpetual factory warranty coverage, and the ability to drive new vehicles every 2 to 4 years. Buying/financing costs more per month initially, but builds equity and delivers substantially lower long-term cost of ownership when the vehicle is kept past loan payoff.",
    },
  ];

  return (
    <div className="space-y-10 text-black dark:text-slate-100 font-medium leading-relaxed">
      {/* 1. PRINCIPLES OF LEASING */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          1. Principles of Leasing &amp; Mathematical Mechanics
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          A <strong>Lease Agreement</strong> is a contractual financial arrangement wherein the owner of an asset (the <em>lessor</em>) grants another party (the <em>lessee</em>) the legal right to possess and operate the equipment or vehicle for a specified duration in exchange for periodic lease payments.
        </p>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          Unlike purchasing an asset where the buyer finances 100% of the purchase price, a lease finances only the <strong>projected depreciation</strong> of the asset over the term, plus an implicit financing charge (money factor / interest rate).
        </p>
      </section>

      {/* 2. THE LEASE PAYMENT FORMULA */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          2. Standard Auto &amp; Equipment Lease Formula Breakdown
        </h2>
        <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-3 text-xs font-medium">
          <p className="text-black dark:text-slate-100">
            A standard monthly lease installment consists of three distinct mathematical components:
          </p>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-1">
            <div>1. Monthly Depreciation = (Net Cap Cost - Residual Value) ÷ Term in Months</div>
            <div>2. Monthly Finance Fee (Rent Charge) = (Net Cap Cost + Residual Value) × Money Factor</div>
            <div>3. Total Monthly Payment = (Monthly Depreciation + Rent Charge) × (1 + Sales Tax Rate)</div>
          </div>
        </div>
      </section>

      {/* 3. MONEY FACTOR VS APR */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          3. Converting Money Factor to Annual Percentage Rate (APR)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              Money Factor to APR (Rule of 2400)
            </h3>
            <p className="text-black dark:text-slate-100">
              Multiply the fractional money factor by 2,400. For example, a money factor of <strong>0.00250</strong> corresponds to an APR of <strong>6.00%</strong> (0.00250 × 2400 = 6.0%).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              APR to Money Factor
            </h3>
            <p className="text-black dark:text-slate-100">
              Divide the annual percentage interest rate by 2,400. For example, an interest rate of <strong>7.20% APR</strong> equals a money factor of <strong>0.00300</strong> (7.20 ÷ 2400 = 0.00300).
            </p>
          </div>
        </div>
      </section>

      {/* 4. LEASE VS BUY TRADEOFFS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          4. Strategic Comparison: Leasing vs. Purchasing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              When Leasing is Superior
            </h3>
            <ul className="list-disc list-inside space-y-1 text-black dark:text-slate-100">
              <li>Desire to drive new vehicles every 2 to 4 years under continuous factory warranty.</li>
              <li>Lower monthly cash outlays compared to equal-term financing.</li>
              <li>Small business equipment where payments are 100% tax-deductible operational expenses.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              When Buying is Superior
            </h3>
            <ul className="list-disc list-inside space-y-1 text-black dark:text-slate-100">
              <li>Intention to retain vehicle or equipment for 6 to 10+ years past loan payoff.</li>
              <li>High annual mileage driving (&gt;15,000 miles/year) that incurs heavy lease penalties.</li>
              <li>Building long-term tangible asset equity.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. 12 FAQS */}
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

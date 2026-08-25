"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Landmark,
  Scale,
  Sparkles,
  PieChart,
  Clock,
  Calendar,
  FileText,
  Target,
  Layers,
  Percent,
  Shield,
  Briefcase,
  AlertTriangle,
  TrendingDown,
  Car,
} from "lucide-react";
import { leaseFaqs } from "@/calculators/finance/lease/faq";

export function LeaseContent() {
  // All 12 FAQs open by default matching platform standard for SEO crawling & instant user readability
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 12 }, (_, i) => i))
  );

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const relatedCalculators = [
    {
      name: "Auto Loan Calculator",
      slug: "/calculators/auto-loan-calculator",
    },
    {
      name: "Loan Calculator",
      slug: "/calculators/loan-calculator",
    },
    {
      name: "APR Calculator",
      slug: "/calculators/apr-calculator",
    },
    {
      name: "Rent vs Buy Calculator",
      slug: "/calculators/rent-vs-buy-calculator",
    },
    {
      name: "Amortization Calculator",
      slug: "/calculators/amortization-calculator",
    },
    {
      name: "Interest Calculator",
      slug: "/calculators/interest-calculator",
    },
    {
      name: "Mortgage Calculator",
      slug: "/calculators/mortgage-calculator",
    },
  ];

  return (
    <article className="mt-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-10 divide-y divide-slate-100 dark:divide-slate-800 shadow-xs">
      {/* 1. SINGLE CANONICAL RELATED CALCULATORS BLOCK (AT TOP - Exactly 7 Verified Live Routes) */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
          Related Valuation &amp; Financing Tools
        </h2>
        <div className="flex flex-wrap gap-2 text-xs">
          {relatedCalculators.map((calc, idx) => (
            <Link
              key={idx}
              href={calc.slug}
              className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              {calc.name}
            </Link>
          ))}
        </div>
      </div>

      {/* 2. WHAT IS A LEASE CALCULATOR */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
          <BookOpen className="h-4 w-4" /> Comprehensive Lease Financing Chapter
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          1. What Is a Lease Calculator and Why Does the Monthly Payment Tell Only Part of the Story?
        </h2>
        <p>
          A lease calculator is a time-value-of-money tool designed to explain the cash-flow mechanics of leasing an asset over a defined period. Unlike a simple loan calculator, which normally assumes that the borrower is working toward a zero loan balance, a lease model often begins with an asset value and ends with a residual value that represents the portion of the asset&apos;s value expected to remain at the end of the contract. That difference changes the mathematics completely. A lease payment is therefore influenced not only by the amount being financed or used, but also by how much value is expected to remain when the lease ends, how financing or rent charges are calculated, how payments are timed, and whether taxes, acquisition costs, documentation fees, down payments, or other charges are included. The production audit for this calculator verifies a six-module system covering the standard lease calculation, fixed-payment solver, auto lease and money-factor tools, lease-versus-buy comparison, equipment and commercial lease analysis, and asset depreciation/residual-value modeling. Those modules were tested independently rather than treating the page as one simple payment widget.
        </p>
        <p>
          The standard reference scenario makes the basic idea concrete. The asset is valued at $20,000, the residual is $8,000, the lease term is 36 months, the rate is 6%, the down payment is $0, and tax is 0%. The calculator produces a monthly payment of $405.06, total scheduled payments of $14,582.28, total modeled depreciation of $12,000, and total interest/rent of $2,582.28. At the end of the 36-month schedule, the modeled balance reaches the contractual $8,000 residual rather than zero. That last point is critical because a lease is not automatically the same thing as a fully amortizing loan. The payment is solving a cash-flow equation in which part of the asset&apos;s value remains outstanding as a terminal residual.
        </p>
        <p>
          The regression audit independently verifies the standard lease module, fixed-rate solver, auto lease, lease-vs-buy, equipment present-value/classification module and depreciation/residual solver. It reports 50/50 property invariants and 2,046/2,046 tested scenarios passed, with zero P0, P1, P2 and P3 defects. That level of testing matters because financial calculators can fail in ways that remain visually plausible. A payment can be off because a monthly rate was converted incorrectly, because a residual was treated as zero, because an upfront fee was omitted, or because the payment timing was shifted by one period. The purpose of the audit is to prove the mathematical relationships rather than simply verify that a screenshot looks reasonable.
        </p>
        <p>
          This is also why the page should teach users how to interpret the output instead of presenting a single headline payment. Someone evaluating a vehicle lease may want to know the monthly payment, total amount paid at signing and over the contract, the expected residual, the money factor or rate, and how the lease compares with purchasing the asset. A business user may instead care about present value and accounting classification. A vehicle-financing alternative can be explored with the{" "}
          <Link href="/calculators/auto-loan-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Auto Loan Calculator
          </Link>
          , while a broader installment-debt question can be handled with the{" "}
          <Link href="/calculators/loan-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Loan Calculator
          </Link>
          . These links belong in the story because the reader&apos;s intent often moves naturally from &ldquo;What is my lease payment?&rdquo; to &ldquo;What would ownership cost?&rdquo; A lease calculator should therefore be presented as a transparent scenario model: it can calculate the result of the selected assumptions, but it cannot promise that a real-world contract will contain identical fees, residual terms, taxes, mileage rules or purchase conditions.
        </p>
      </section>

      {/* 3. HOW A STANDARD LEASE PAYMENT IS CALCULATED */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          2. How a Standard Lease Payment Is Calculated
        </h2>
        <p>
          The standard lease calculation is easiest to understand by starting with the relationship between the asset&apos;s current value and its expected residual value. In the audited baseline, the asset is worth $20,000 at the start and the contractual residual is $8,000 after 36 months. The difference, $12,000, is the amount of value modeled as being consumed over the lease term. That is the depreciation component. A separate finance or rent component is then applied according to the production model&apos;s periodic rate. The production engine uses an actuarial balloon-amortization structure in which the residual is discounted back to the present when calculating the periodic payment. In simplified form, the model can be expressed as:
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs text-blue-600 dark:text-blue-400 font-bold">
          PMT = [Net Capitalized Cost − Residual × (1 + r)^−n] / [(1 − (1 + r)^−n) / r]
        </div>
        <p>
          This is not the same as pretending the lease is a standard loan that amortizes to zero. The residual is a terminal value that remains at the end of the lease term. The audited implementation reconciles the baseline at $405.06 per month, with 36 scheduled payments totaling $14,582.28, $12,000 of modeled depreciation and $2,582.28 of modeled interest/rent.
        </p>
        <p>
          A lease calculator also has to handle payment timing correctly. The standard baseline uses payments in arrears, meaning the payment is treated as occurring at the end of each period. The auto-lease module uses payment-in-advance timing because the reference scenario treats the first payment as being due at signing. This difference is not cosmetic. When a payment occurs at the beginning of a period, its present value is greater than the value of the same payment made at the end, so the required periodic payment changes. The regression audit explicitly verifies that the auto module&apos;s timing convention produces the reference $501.76 payment and $21,063.48 total out-of-pocket result. A calculator that changes timing without recalculating the financial equation can generate an answer that looks believable but is mathematically inconsistent.
        </p>
        <p>
          The baseline schedule illustrates the logic row by row. Month 1 begins at $20,000, shows a $405.06 payment, allocates $305.06 to principal/depreciation and $100.00 to interest, and ends at $19,694.94. Month 2 starts at $19,694.94, allocates $306.59 to principal and $98.47 to interest, and ends at $19,388.35. This recurrence continues until Month 36, when the ending balance reaches $8,000. A correct schedule therefore satisfies the identities Payment = Principal Component + Interest Component, Ending Balance = Beginning Balance − Principal Component, and Next Beginning Balance = Previous Ending Balance. The schedule is the proof that the headline payment is not arbitrary.
        </p>
        <p>
          For a more general view of payment and balance mechanics, the{" "}
          <Link href="/calculators/amortization-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Amortization Calculator
          </Link>{" "}
          can provide a conventional principal-and-interest schedule, while the{" "}
          <Link href="/calculators/interest-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Interest Calculator
          </Link>{" "}
          can isolate the interest component of a borrowing scenario. When fees and financing cost are the question, the{" "}
          <Link href="/calculators/apr-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            APR Calculator
          </Link>{" "}
          can provide a complementary fee-adjusted rate perspective.
        </p>
      </section>

      {/* 4. RESIDUAL VALUE, DEPRECIATION AND ECONOMICS */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          3. Residual Value, Depreciation and the Economics of What You Are Paying For
        </h2>
        <p>
          Residual value is one of the most important variables in a lease because it determines how much of the asset&apos;s value is treated as remaining at the end of the contract. If an asset starts at $20,000 and has an $8,000 residual after three years, the modeled depreciation component is $12,000. In the audited standard lease, the residual is also present in the terminal-value portion of the payment equation. This means a higher residual can reduce the portion of the asset&apos;s value that must be recovered through periodic depreciation, while a lower residual can increase the amount being consumed during the term. That is one reason two vehicles with the same sticker price can have substantially different lease payments. Residual assumptions are not an afterthought; they are a central economic input.
        </p>
        <p>
          The production calculator also contains a dedicated depreciation/residual solver. Its audited example starts with a $30,000 asset, a three-year term and a 15% annual depreciation rate. The production model uses a declining-balance formula: <code>Residual = P × (1 − d)^t</code>. The result is $30,000 × 0.85^3 = $18,423.75, which is 61.4% of the starting value. Total modeled depreciation is $11,576.25. The formula is internally consistent and passes the depreciation property and differential tests. That does not mean the model is a universal prediction of market resale value. Actual asset values can depend on mileage, operating hours, maintenance, condition, brand, technology changes, market supply and demand, and the precise configuration of the asset.
        </p>
        <p>
          This distinction is important when a calculator is used for real-world planning. A residual value in a lease contract is a contractual or modeled assumption. A market resale price is an outcome that may occur later. Those two numbers can be related but they are not guaranteed to be identical. A user should therefore avoid interpreting a high residual as proof that the asset will actually sell for that amount in every market. Similarly, a declining-balance depreciation model is a mathematical scenario and should not automatically be described as a tax depreciation method, accounting policy, or forecast of the asset&apos;s resale market.
        </p>
        <p>
          The{" "}
          <Link href="/calculators/rent-vs-buy-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Rent vs Buy Calculator
          </Link>{" "}
          can provide a broader ownership-versus-use comparison, while the{" "}
          <Link href="/calculators/auto-loan-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Auto Loan Calculator
          </Link>{" "}
          can model the balance path of a financed vehicle. Together, those tools show the difference between depreciation, financing cost, residual value and ownership equity.
        </p>
      </section>

      {/* 5. MONEY FACTOR, INTEREST RATE AND APR */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          4. Money Factor, Interest Rate and APR: How to Read the Financing Charge
        </h2>
        <p>
          Auto leasing frequently uses a money factor instead of a conventional annual percentage rate. A money factor is a small decimal that represents the financing component of a lease calculation, and a common industry conversion is <strong>Money Factor × 2,400 ≈ APR equivalent</strong>. The audited auto baseline uses a money factor of 0.00225, which corresponds to approximately 5.40% under that conventional conversion. The report verifies both directions of this relationship. At the same time, the content should keep an important qualification: the money-factor conversion is a conventional approximation, not a universal statement that every lease contract&apos;s money factor is identical to an actuarial APR disclosure. Actual effective cost can depend on timing, fees, taxes, capitalized cost and the complete contract structure.
        </p>
        <p>
          The auto module provides a useful worked example. The audited inputs are $33,000 agreed price, $19,250 residual, $2,000 down payment, $650 acquisition fee, $350 documentation fee, money factor 0.00225, 36 months, 7% tax, and payment in advance. The calculator produces $501.76 per month and $21,063.48 total out-of-pocket. The monthly depreciation component is $354.17 and the monthly rent component is $114.77. These values demonstrate why the financing factor is only one part of the lease economics. A user focusing only on the money factor could miss the effect of fees, taxes, the residual, the down payment and the amount of cash required at signing.
        </p>
        <p>
          The fixed-payment solver offers another important validation. Starting from the standard lease baseline, the calculator can take the asset value, residual, payment and term and solve backwards to recover the rate. The audited solver recovers 6.00% from the $405.06 baseline and maps it to a 0.00250 money factor, with a reported total finance charge of $2,582.16. The regression test then feeds the recovered rate back into the forward model and confirms the payment remains consistent. This forward/backward round trip is a strong way to catch hidden formula drift, because a calculator can produce a reasonable payment even if the inverse solver is using a slightly different convention.
        </p>
      </section>

      {/* 6. AUTO LEASE FEES, TAXES, DOWN PAYMENTS */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          5. Auto Lease Fees, Taxes, Down Payments and Payment Timing
        </h2>
        <p>
          An actual vehicle lease normally contains more economic variables than the price of the vehicle. Acquisition fees, documentation charges, down payments, taxes and payment timing can materially change the amount a customer spends at signing and over the term. The audited auto baseline demonstrates how these elements work together. It uses a $33,000 agreed price, $19,250 residual, $2,000 down payment, $650 acquisition fee, $350 documentation fee, 0.00225 money factor, 36-month term and 7% sales tax. The resulting payment is $501.76 per month and total out-of-pocket is $21,063.48. The out-of-pocket calculation includes the initial down payment and fees in addition to scheduled lease payments. That is why a monthly payment should never be treated as the complete price of a lease.
        </p>
        <p>
          Payment timing is another major issue. The standard lease module uses in-arrears payments, while the auto lease module uses payment-in-advance timing. When a payment is made at signing or at the beginning of a period, its present value is greater than the same payment made at the end of the period. The financial equation therefore changes. The audit specifically checks the auto module&apos;s payment-in-advance treatment, and the regression report identifies this behavior as verified. This is one reason a user should not compare two lease advertisements without checking whether the headline payment assumes a first payment due at signing, a due-at-delivery structure, or a different convention.
        </p>
        <p>
          Sales tax also has to be modeled explicitly. In the audited lease-versus-buy comparison, the lease side applies tax to lease-payment installments while the purchase-loan side capitalizes sales tax into the financed vehicle cost. That convention reproduces the reference comparison, but it should be presented as the calculator&apos;s selected scenario rather than a universal tax rule. Tax treatment varies by jurisdiction and by contract.
        </p>
      </section>

      {/* 7. LEASE AMORTIZATION SCHEDULES */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          6. Lease Amortization Schedules and Lease-End Economics
        </h2>
        <p>
          The amortization schedule is where a lease calculator becomes transparent. A headline payment tells the reader what is paid each period, but the schedule explains why that payment works and how the modeled balance evolves. In the audited standard lease, Month 1 begins at $20,000, uses a $405.06 payment, allocates $305.06 to principal/depreciation and $100.00 to interest, and ends at $19,694.94. Month 2 begins at $19,694.94, allocates $306.59 to principal and $98.47 to interest, and ends at $19,388.35. The process continues until Month 36, where the ending balance reaches $8,000. The schedule therefore has to satisfy a recurrence on every row: payment equals principal plus interest, ending balance equals beginning balance minus principal, and the next beginning balance equals the prior ending balance.
        </p>
        <p>
          Unlike a conventional fully amortizing loan, the lease&apos;s final balance is not normally zero. The $8,000 residual is the terminal value in the audited example. This is one of the most important conceptual distinctions on the page. A user who expects the lease schedule to reach zero may incorrectly conclude that the calculator is wrong, when the opposite is true: a correct residual lease model should end at the contractual residual. The regression audit explicitly verifies this behavior and reports the terminal balance as $8,000.00.
        </p>
        <p>
          For users interested in the ownership side, the{" "}
          <Link href="/calculators/amortization-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Amortization Calculator
          </Link>{" "}
          can show how a conventional loan balance falls toward zero. For housing transactions, the{" "}
          <Link href="/calculators/mortgage-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Mortgage Calculator
          </Link>{" "}
          is the more appropriate model.
        </p>
      </section>

      {/* 8. LEASE VS BUY */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          7. Lease vs. Buy: How to Compare the Real Economic Cost
        </h2>
        <p>
          Lease-versus-buy decisions are often distorted because people compare monthly payments instead of total economics. A lease can show a lower monthly payment because the customer is paying for the portion of the asset&apos;s value consumed during the lease, while a purchase loan requires repayment of the entire financed amount. At the same time, buying creates ownership equity and leaves the buyer with an asset that may have resale value. A fair comparison therefore has to define the same asset, the same relevant taxes, a comparable time horizon, the initial cash required, the ongoing payment stream and the value that remains at the end.
        </p>
        <p>
          The audited comparison scenario illustrates this approach. It uses a $40,000 vehicle, $3,000 down payment and 7% tax. The lease has a 36-month term, 5.5% rate and $22,000 residual. The purchase side uses a 60-month loan at 6.5% and assumes a $20,000 future resale value. The reference result shows a $592.54 lease payment, $24,331.29 lease net cost, $778.73 loan payment and $29,723.96 loan net cost, producing a $5,392.67 modeled difference.
        </p>
        <p>
          A lower lease payment does not automatically prove leasing is the better economic choice. The lease payment does not buy the customer an asset. At the end of the term, the asset is normally returned or purchased under the contract. The financed purchase, by contrast, usually results in ownership once the loan is satisfied, and the buyer can continue using or selling the vehicle.
        </p>
      </section>

      {/* 9. EQUIPMENT & COMMERCIAL LEASING */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          8. Equipment and Commercial Leasing: Present Value, Accounting Context and Tax Qualifications
        </h2>
        <p>
          Businesses may use leasing for machinery, technology, vehicles, office equipment or other productive assets. In a commercial setting, the key question often changes from &ldquo;What is my monthly payment?&rdquo; to &ldquo;What is the present value of the lease cash flows, and how might the arrangement be treated under the applicable accounting framework?&rdquo; The audited equipment module uses a $100,000 fair market value, $22,000 annual payment, five-year term, six-year asset life and 6% discount rate. It calculates a present value of approximately $92,672 and a PV/FMV ratio of approximately 92.7%, then classifies the scenario as a finance/capital lease under the production criteria. The regression audit marks this module as PASS but explicitly QUALIFIED because commercial accounting classification is framework- and contract-dependent.
        </p>
        <p>
          The mathematical present-value component can be explained independently. If the lease payments occur annually at the end of each year and no additional residual or purchase obligation is included, the standard annuity present-value equation is <code>PV = Payment × [1 − (1 + r)^−n] / r</code>. Applying a $22,000 annual payment, 6% discount rate and five years gives approximately $92,672. The PV/FMV ratio is then about 92.7%. The important thing is to distinguish the financial math from the accounting conclusion.
        </p>
      </section>

      {/* 10. ASSET DEPRECIATION AND RESIDUAL SOLVER */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          9. Asset Depreciation and Residual Value Solver
        </h2>
        <p>
          A residual-value solver answers a different question from the standard lease-payment calculator. Instead of starting with a lease payment and asking what the contract costs, it starts with a starting asset value, depreciation assumption and holding period and calculates a modeled residual. This is especially useful because residual assumptions are among the strongest drivers of lease payments. The audited example begins with a $30,000 asset, a three-year term and a 15% annual depreciation rate. The production formula is <code>Residual = P × (1 − d)^t</code>, producing $30,000 × 0.85^3 = $18,423.75. The residual is 61.4% of the starting value and cumulative modeled depreciation is $11,576.25.
        </p>
      </section>

      {/* 11. HOW TO USE THE LEASE CALCULATOR */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          10. How to Use the Lease Calculator from Start to Finish
        </h2>
        <p>
          The best way to use the Lease Calculator is to treat each module as a step in a decision process:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
          <li><strong>Step 1:</strong> Begin with the Standard Lease Calculator when the basic question is &ldquo;What is the payment under these assumptions?&rdquo; Enter asset value, residual value, term, rate, down payment, tax and payment timing.</li>
          <li><strong>Step 2:</strong> Use the Fixed Payment/Rate Solver when the unknown is the financing rate rather than the payment to recover the effective APR and equivalent money factor.</li>
          <li><strong>Step 3:</strong> Move to Auto Lease when the transaction has vehicle-specific fields such as agreed price, acquisition fee, documentation fee, money factor, down payment and sales tax.</li>
          <li><strong>Step 4:</strong> Use Lease vs Buy when the decision is between continuing to lease and financing the asset, comparing monthly cash flow and total net cost.</li>
          <li><strong>Step 5:</strong> For commercial machinery and office assets, open the Equipment module to review present value and ASC 842 / IFRS 16 classification criteria.</li>
        </ul>
      </section>

      {/* 12. COMMON LEASE CALCULATION MISTAKES */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          11. Common Lease Calculation Mistakes and How to Interpret Results Safely
        </h2>
        <p>
          The most dangerous lease-calculation mistakes are not obvious technical crashes. They are plausible-looking results produced under the wrong economic convention:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
            <strong>1. Treating a lease like an installment loan:</strong> Expecting the balance to fall to zero ignores the terminal residual value.
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
            <strong>2. Ignoring payment timing:</strong> In-advance timing (due at signing) reduces required periodic payments compared to in-arrears.
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
            <strong>3. Confusing money factor with APR:</strong> A money factor of 0.0025 equals 6.00% APR (multiply by 2,400).
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
            <strong>4. Ignoring upfront fees:</strong> Acquisition and doc fees add to initial outlay or capitalized cost.
          </div>
        </div>
      </section>

      {/* 13. HOW TO COMPARE LEASE OFFERS */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          12. How to Compare Lease Offers and Make a Better Decision
        </h2>
        <p>
          A lease comparison is most useful when it begins with the assumptions rather than the payment. Write down the asset value, residual value, term, money factor or rate, payment timing, down payment, sales tax, acquisition fee, documentation fee and any other charges. Then calculate the recurring payment and the total amount paid. The audited examples show why this matters: the standard lease&apos;s $405.06 monthly payment is based on a $20,000 asset, $8,000 residual, 36 months and 6% rate, while the auto example&apos;s $501.76 payment depends on $33,000 agreed price, $19,250 residual, $2,000 down, $650 acquisition fee, $350 documentation fee, 0.00225 money factor, 36 months, 7% tax and payment-in-advance timing. Comparing only $405.06 with $501.76 would tell the reader almost nothing about which contract is cheaper or more appropriate.
        </p>
      </section>

      {/* 14. FREQUENTLY ASKED QUESTIONS (12 CANONICAL FAQS OPEN BY DEFAULT) */}
      <section className="pt-8 space-y-6">
        <div className="flex items-center gap-3">
          <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            13. Frequently Asked Questions About Lease Calculators
          </h2>
        </div>

        <div className="space-y-3">
          {leaseFaqs.map((faq, index) => {
            const isOpen = openFaqIndices.has(index);
            return (
              <div
                key={index}
                className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-4 flex items-center justify-between font-semibold text-sm sm:text-base text-slate-900 dark:text-slate-100 hover:bg-slate-100/50 dark:hover:bg-slate-700/50 transition-colors focus:outline-none cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-bold min-w-[24px]">
                      Q{index + 1}.
                    </span>
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-slate-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </article>
  );
}

export default LeaseContent;

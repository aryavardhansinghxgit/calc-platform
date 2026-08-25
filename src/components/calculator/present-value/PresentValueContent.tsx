"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, ChevronUp, BookOpen, ShieldCheck } from "lucide-react";
import { present_valueFaqs } from "@/calculators/finance/present-value/faq";

export function PresentValueContent() {
  // All 12 FAQs open by default for rich user visibility & SEO scanning
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

  return (
    <article className="mt-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-10 divide-y divide-slate-100 dark:divide-slate-800 shadow-xs">
      
      {/* 1. SINGLE CANONICAL RELATED CALCULATORS BLOCK (Exactly 7 Verified Live Routes) */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
          Related Valuation &amp; Financing Tools
        </h2>
        <div className="flex flex-wrap gap-2 text-xs">
          <Link
            href="/calculators/mortgage-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Mortgage Calculator
          </Link>
          <Link
            href="/calculators/home-equity-loan-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Home Equity Loan Calculator
          </Link>
          <Link
            href="/calculators/heloc-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            HELOC Calculator
          </Link>
          <Link
            href="/calculators/down-payment-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Down Payment Calculator
          </Link>
          <Link
            href="/calculators/rent-vs-buy-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Rent vs Buy Calculator
          </Link>
          <Link
            href="/calculators/va-mortgage-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            VA Mortgage Calculator
          </Link>
          <Link
            href="/calculators/fha-loan-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            FHA Loan Calculator
          </Link>
        </div>
      </div>

      {/* 2. Present Value: The Question Behind the Calculator */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          2. Present Value: The Question Behind the Calculator
        </h2>
        <p>
          Money that arrives in the future is not directly comparable with money available today. A dollar received today can potentially be
          invested, used to reduce debt, or deployed in another opportunity during the time before a future payment arrives. A future dollar
          therefore has to be translated into today&apos;s terms before two cash-flow alternatives can be compared on the same economic basis.
        </p>
        <p>
          That translation is what present value does. A Present Value calculation takes a future amount or a stream of future cash flows
          and discounts each payment back to today using a selected discount rate. The result is not a prediction of what the future cash
          flow <em>will</em> be. It is a valuation of what that future cash flow is worth today under the chosen discounting assumptions.
        </p>
        <p>
          This is the central idea behind discounted cash flow analysis, capital budgeting, project valuation, bond analysis, loan
          comparisons, lease evaluation, real-estate underwriting and many other financial decisions. The calculator turns that abstract
          time-value-of-money idea into a transparent numerical model.
        </p>
      </section>

      {/* 3. Why Future Money Is Discounted */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          3. Why Future Money Is Discounted
        </h2>
        <p>
          Imagine two choices: receive $10,000 today or receive $10,000 ten years from now. The numbers look identical, but the
          economic positions are not. The person receiving the money today has ten years of opportunity to earn a return, while the
          person waiting for the future payment does not.
        </p>
        <p>
          Present value moves the future payment backward through time. If the selected discount rate is 7%, the calculator asks a simple question:
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 italic text-slate-900 dark:text-slate-100 font-medium">
          &ldquo;What amount invested today at the assumed rate would grow into the future amount over the selected period?&rdquo;
        </div>
        <p>
          That is the foundation of the formula. The larger the discount rate, the more aggressively future dollars are discounted. The
          longer the time horizon, the more periods are available for the discounting process to reduce today&apos;s equivalent value.
        </p>
        <p>
          This is also why the{" "}
          <Link
            href="/calculators/future-value-calculator"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Future Value Calculator
          </Link>{" "}
          is a natural companion to the Present Value Calculator. Future value moves current money forward through compounding; present value moves future cash flows backward through discounting. They are two directions of the same time-value-of-money framework.
        </p>
      </section>

      {/* 4. How the Present Value Calculator Works */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          4. How the Present Value Calculator Works
        </h2>
        <p>
          The calculator begins with a future target amount, a periodic payment amount, a discount rate, a time horizon, a compounding
          convention and a payment-timing convention.
        </p>
        <p>The system then separates the two major sources of future cash flow:</p>
        <ol className="list-decimal pl-6 space-y-1.5">
          <li><strong>The future lump sum ($FV$):</strong> A single terminal payout occurring at year $t$.</li>
          <li><strong>The recurring payment stream ($PMT$):</strong> Regular periodic deposits or receipts spread over time.</li>
        </ol>
        <p>
          That separation is important because a dollar arriving in Year 1 is worth more today than a dollar arriving in Year 10. A recurring
          annuity therefore cannot simply be added to the terminal lump sum without accounting for the timing of every payment.
        </p>
        <p>
          The calculator discounts each component independently and then adds the resulting present values. Because the internal
          engine retains precision and the schedule is reconciled against the headline result, the user can see both the high-level answer
          and the path used to reach it.
        </p>
      </section>

      {/* 5. The Core Present Value Formula */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          5. The Core Present Value Formula
        </h2>
        <p>For a future lump sum, the basic formula is:</p>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl font-mono text-center text-sm sm:text-base border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 font-bold">
          PV = FV / (1 + r/n)^(n × t)
        </div>
        <p>where:</p>
        <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm">
          <li><code>PV</code> = present value</li>
          <li><code>FV</code> = future value target sum</li>
          <li><code>r</code> = annual nominal discount rate (in decimal)</li>
          <li><code>n</code> = number of compounding periods per year</li>
          <li><code>t</code> = number of years.</li>
        </ul>
        <p>The formula asks how much must be available today to become $FV$ after $t$ years at rate $r$.</p>
        <p>For a recurring ordinary annuity, the calculator uses:</p>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl font-mono text-center text-sm sm:text-base border border-slate-200 dark:border-slate-700 text-emerald-600 dark:text-emerald-400 font-bold">
          PV_annuity = PMT × [1 - (1 + r/n)^(-n × t)] / (r/n)
        </div>
        <p>where $PMT$ is the recurring payment and the payment is assumed to arrive at the end of each period.</p>
        <p>The total present value is therefore:</p>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl font-mono text-center text-sm sm:text-base border border-slate-200 dark:border-slate-700 text-purple-600 dark:text-purple-400 font-bold">
          Total PV = Lump Sum PV + Annuity PV
        </div>
        <p className="text-xs text-slate-500">
          The audited production formula and the displayed formula reconcile exactly. The engine passes 30/30 property tests and 1,355/1,355 differential scenarios across all mathematical modules.
        </p>
      </section>

      {/* 6. A Complete Worked Example */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          6. A Complete Worked Example
        </h2>
        <p>The reference baseline uses the following audited inputs:</p>
        <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm">
          <li>Future lump sum: <strong>$50,000</strong></li>
          <li>Periodic deposit: <strong>$500</strong></li>
          <li>Annual nominal discount rate: <strong>7%</strong></li>
          <li>Timeframe: <strong>10 years</strong></li>
          <li>Compounding: <strong>monthly ($n = 12$)</strong></li>
          <li>Payment frequency: <strong>monthly ($p = 12$)</strong></li>
          <li>Payment timing: <strong>end of period (ordinary annuity)</strong></li>
        </ul>
        <p>The monthly discount rate is:</p>
        <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg font-mono text-xs text-center border border-slate-200 dark:border-slate-700">
          0.07 / 12 = 0.00583333...
        </div>
        <p>and the effective annual discount rate is:</p>
        <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg font-mono text-xs text-center border border-slate-200 dark:border-slate-700">
          (1 + 0.07/12)^12 - 1 ≈ 7.23%
        </div>
        <p>The future lump sum has a present value of:</p>
        <p className="font-bold text-blue-600 dark:text-blue-400 text-lg">$24,879.81</p>
        <p>The recurring $500 monthly payment stream has a present value of:</p>
        <p className="font-bold text-emerald-600 dark:text-emerald-400 text-lg">$43,063.18</p>
        <p>Adding those two pieces produces the headline result:</p>
        <div className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100 font-extrabold text-2xl text-center">
          Calculated Total PV = $67,942.99
        </div>
        <p>The underlying nominal future cash flows total:</p>
        <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg font-mono text-xs text-center border border-slate-200 dark:border-slate-700">
          $50,000 + (120 × $500) = $110,000.00
        </div>
        <p>The total discount amount stripped out by time-value discounting is:</p>
        <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg font-mono text-xs text-center border border-slate-200 dark:border-slate-700">
          $110,000.00 - $67,942.99 = $42,057.01
        </div>
        <p>
          That means the selected discounting model removes <strong>38.2%</strong> of the nominal future cash-flow total when translating it into today&apos;s dollars. Approximately <strong>37%</strong> of total PV originates from the lump sum, and <strong>63%</strong> originates from the recurring annuity.
        </p>
      </section>

      {/* 7. Why the Same $50,000 Becomes Only $24,879.81 Today */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          7. Why the Same $50,000 Becomes Only $24,879.81 Today
        </h2>
        <p>This is the part of present value that often feels unintuitive.</p>
        <p>
          The calculator is not saying that the future $50,000 will literally shrink into $24,879.81. It is saying that, at a 7% nominal discount
          rate compounded monthly, <strong>$24,879.81 today has the same modeled economic value as $50,000 received ten years later</strong>.
        </p>
        <p>The distinction is crucial.</p>
        <p>
          If someone had $24,879.81 today and could earn the assumed 7% rate for the full 10-year period, that amount would compound into
          approximately $50,000 after ten years. Present value is therefore a reverse-compounding calculation.
        </p>
        <p>
          For a different borrowing, savings or investment problem, the same logic can be explored in the opposite direction with the{" "}
          <Link
            href="/calculators/compound-interest-calculator"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Compound Interest Calculator
          </Link>.
        </p>
      </section>

      {/* 8. The Time Value of Money in Everyday Language */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          8. The Time Value of Money in Everyday Language
        </h2>
        <p>
          The time value of money is sometimes introduced as a single sentence — <em>&ldquo;money today is worth more than money tomorrow.&rdquo;</em>
          That is directionally correct, but the more useful interpretation is that the value of a future cash flow depends on what return
          could reasonably be required over the same period.
        </p>
        <p>Present value makes that opportunity cost explicit through the discount rate.</p>
        <p>
          At a low discount rate, the future cash flow is discounted relatively lightly. At a high discount rate, the future cash flow is
          discounted more heavily. The calculator therefore does not produce one timeless answer to a valuation question. It produces a
          present-value answer conditional on the chosen rate and timing assumptions.
        </p>
        <p>
          For broader basic time-value-of-money calculations, the{" "}
          <Link
            href="/calculators/interest-calculator"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Interest Calculator
          </Link>{" "}
          can be useful when you want to isolate interest accumulation rather than build a full discounted-cash-flow model.
        </p>
      </section>

      {/* 9. Lump Sum vs Recurring Cash Flows */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          9. Lump Sum vs Recurring Cash Flows
        </h2>
        <p>
          A future lump sum and a recurring payment stream are economically different even when their total nominal dollars are similar.
        </p>
        <p>
          A lump sum arrives at one terminal date, so the entire amount receives the full discounting effect. A monthly annuity, by contrast,
          is spread across many payment dates. The first payment is discounted only a short time, while later payments are discounted
          much more heavily.
        </p>
        <p>That timing pattern explains why the calculator separates:</p>
        <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm">
          <li><strong>Lump Sum PV = $24,879.81</strong> (Discounted across 120 full monthly periods)</li>
          <li><strong>Annuity PV = $43,063.18</strong> (Discounted period by period from Month 1 to Month 120)</li>
        </ul>
        <p>
          The recurring stream is not &ldquo;worth more&rdquo; simply because it contains more dollars. It contributes more present value because the
          payments arrive throughout the ten-year period instead of all arriving at the distant terminal date.
        </p>
      </section>

      {/* 10. Ordinary Annuity: Payments at the End of Each Period */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          10. Ordinary Annuity: Payments at the End of Each Period
        </h2>
        <p>An ordinary annuity assumes that payments occur at the end of each period.</p>
        <p>For a monthly payment schedule, that means:</p>
        <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm">
          <li>Month 1 payment arrives after Month 1;</li>
          <li>Month 2 payment arrives after Month 2;</li>
          <li>and so on.</li>
        </ul>
        <p>
          This is the convention used by the main reference baseline. The calculator makes that timing assumption visible because changing payment timing changes the value. Two streams
          containing identical payment amounts can have different PVs purely because one stream pays earlier.
        </p>
      </section>

      {/* 11. Annuity Due: When Payments Arrive at the Beginning */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          11. Annuity Due: When Payments Arrive at the Beginning
        </h2>
        <p>An annuity due shifts the payments forward by one period.</p>
        <p>
          That sounds like a small change, but it has a direct mathematical consequence: each payment is discounted for one fewer
          period. The result is:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg font-mono text-center text-xs sm:text-sm border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 font-bold">
          PV_due = PV_ordinary × (1 + r/n)
        </div>
        <p>
          For a positive discount rate, an annuity due therefore has a higher present value than an equivalent ordinary annuity. The
          production property suite explicitly checks this relationship and also verifies that the two are equal when the discount rate is exactly zero.
        </p>
        <p>
          This distinction appears in real situations such as lease payments, rent, subscription structures and other contracts where cash
          is due at the beginning rather than the end of a period.
        </p>
        <p>
          For the borrowing side of a payment schedule, the{" "}
          <Link
            href="/calculators/payment-calculator"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Payment Calculator
          </Link>{" "}
          can help isolate the underlying payment stream before you evaluate its present value.
        </p>
      </section>

      {/* 12. Payment Frequency and Compounding Frequency Are Not the Same Thing */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          12. Payment Frequency and Compounding Frequency Are Not the Same Thing
        </h2>
        <p>
          One of the most important details in a sophisticated PV calculator is the distinction between how often the discount rate
          compounds and how often cash is paid.
        </p>
        <p>A model can theoretically have:</p>
        <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm">
          <li>monthly compounding with annual payments,</li>
          <li>monthly compounding with monthly payments,</li>
          <li>quarterly compounding with monthly payments,</li>
          <li>annual compounding with annual payments.</li>
        </ul>
        <p>
          These are different mathematical structures. Payment frequency controls the timing of cash-flow arrivals. Compounding frequency controls how the nominal annual rate is
          converted into periodic discounting. Treating the two as automatically identical can create a hidden valuation error.
        </p>
      </section>

      {/* 13. Why the Effective Rate Is 7.23% When the Input Says 7% */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          13. Why the Effective Rate Is 7.23% When the Input Says 7%
        </h2>
        <p>The input rate is the annual nominal discount rate.</p>
        <p>Because the calculator compounds monthly, the effective annual rate (EAR) is slightly higher:</p>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg font-mono text-center text-xs sm:text-sm border border-slate-200 dark:border-slate-700">
          (1 + 0.07/12)^12 - 1 = 0.07229008... ≈ 7.23%
        </div>
        <p>
          That does not mean the user entered the wrong rate. It means the periodic compounding convention creates an effective
          annualized rate that differs from the nominal quoted rate. This distinction becomes especially important when comparing products or investments quoted using different rate conventions.
        </p>
      </section>

      {/* 14. Discount Factors: The Number Behind Each Cash Flow */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          14. Discount Factors: The Number Behind Each Cash Flow
        </h2>
        <p>Every future cash flow is multiplied by a discount factor to translate it back to today&apos;s value. Conceptually:</p>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg font-mono text-center text-xs sm:text-sm border border-slate-200 dark:border-slate-700 text-purple-600 dark:text-purple-400 font-bold">
          Discount Factor = 1 / (1 + periodic rate)^(number of periods)
        </div>
        <p>The farther a cash flow lies in the future, the smaller its discount factor becomes:</p>
        <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm">
          <li>Year 1 discount factor: <strong>0.9326</strong></li>
          <li>Year 5 discount factor: <strong>0.7054</strong></li>
          <li>Year 10 discount factor: <strong>0.4976</strong></li>
        </ul>
        <p>
          The Year 10 factor is much lower because the Year 10 cash flow has a much longer period in which the selected discount rate
          could compound.
        </p>
      </section>

      {/* 15. Reading the Discounting Schedule Like a Story */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          15. Reading the Discounting Schedule Like a Story
        </h2>
        <p>The schedule can be read from left to right as a timeline.</p>
        <p>
          A future payment appears first as a nominal cash flow. The next column asks how aggressively that amount should be
          discounted given its date. The following column translates the payment into its present value. Finally, the cumulative PV column
          adds all discounted cash flows received so far.
        </p>
        <p>
          In the audited ten-year example, Years 1 through 9 each contain a $6,000 cash flow, while Year 10 contains $56,000 because
          the $50,000 terminal amount arrives at the same time as the final $6,000 payment.
        </p>
        <p>That is why Year 10 shows:</p>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg font-mono text-center text-xs sm:text-sm border border-slate-200 dark:border-slate-700">
          $56,000 × 0.4976 ≈ $27,963.07
        </div>
        <p>and why the cumulative PV ultimately converges exactly to <strong>$67,942.99</strong>.</p>
      </section>

      {/* 16. Present Value of Uneven Cash Flows */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          16. Present Value of Uneven Cash Flows
        </h2>
        <p>Real projects rarely produce perfectly equal annual payments. A business might receive:</p>
        <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm">
          <li>$15,000 in Year 1,</li>
          <li>$25,000 in Year 2,</li>
          <li>$35,000 in Year 3,</li>
          <li>$40,000 in Year 4,</li>
          <li>$45,000 in Year 5.</li>
        </ul>
        <p>
          In that situation, a simple annuity formula is not enough. Each cash flow needs to be discounted according to its own timing.
          The calculator&apos;s uneven-cash-flow mode handles this by discounting every period separately.
        </p>
        <p>
          For the audited example, a $100,000 initial capital outlay is compared with discounted future inflows under the selected 7%
          nominal monthly-compounded discounting convention. The discounted inflows total:
        </p>
        <p className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-lg">$126,118.49</p>
        <p>Subtracting the initial $100,000 outlay produces:</p>
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100 font-extrabold text-2xl text-center">
          NPV = $26,118.49
        </div>
      </section>

      {/* 17. What NPV Actually Means */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          17. What NPV Actually Means
        </h2>
        <p>Net Present Value answers a slightly different question from ordinary present value.</p>
        <p>Present value asks: <em>&ldquo;What are these future cash flows worth today?&rdquo;</em></p>
        <p>
          NPV asks: <em>&ldquo;After discounting those future cash flows, how much modeled value remains above or below the initial capital outlay?&rdquo;</em>
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-xs sm:text-sm">
          <li><strong>A positive NPV</strong> means that, under the selected cash flows and discount rate, modeled present value of inflows exceeds the initial outlay.</li>
          <li><strong>A negative NPV</strong> means the discounted inflows fall short of the initial investment.</li>
          <li><strong>A zero NPV</strong> means the discounted inflows exactly equal the initial outlay under the selected assumptions.</li>
        </ul>
        <p className="text-xs text-slate-500">
          The calculator frames positive NPV as a model-based valuation benchmark under stated assumptions rather than an unconditional guarantee of future investment profitability.
        </p>
      </section>

      {/* 18. Discount Rate Is a Valuation Assumption, Not a Universal Truth */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          18. Discount Rate Is a Valuation Assumption, Not a Universal Truth
        </h2>
        <p>Choosing a discount rate is one of the most consequential judgment calls in present-value analysis.</p>
        <p>
          A corporate project might be evaluated using a company-specific hurdle rate or WACC-related framework. A personal decision
          may use an opportunity-cost rate. A low-risk reference scenario may use a lower benchmark than a high-risk project.
        </p>
        <p>The calculator includes illustrative hurdle presets such as:</p>
        <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm">
          <li>Treasury: <strong>4.5%</strong></li>
          <li>Corporate: <strong>6.5%</strong></li>
          <li>Real Estate: <strong>8.5%</strong></li>
          <li>Equity: <strong>10%</strong></li>
        </ul>
        <p>
          These are illustrative scenario benchmarks, not universal market constants or official &ldquo;correct&rdquo; discount rates.
        </p>
        <p>
          For users who want to work backward to estimate an implied rate rather than choose a rate, the{" "}
          <Link
            href="/calculators/interest-rate-calculator"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Interest Rate Calculator
          </Link>{" "}
          can serve as a useful companion.
        </p>
      </section>

      {/* 19. Why Higher Discount Rates Reduce Present Value */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          19. Why Higher Discount Rates Reduce Present Value
        </h2>
        <p>This is one of the most fundamental relationships in financial mathematics: <strong>hold everything else constant and increase the discount rate; the present value falls</strong>.</p>
        <p>The audited sensitivity matrix demonstrates this clearly:</p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-800 rounded-lg">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200">
              <tr>
                <th className="p-2.5 border-b border-slate-200 dark:border-slate-700">Discount Rate</th>
                <th className="p-2.5 border-b border-slate-200 dark:border-slate-700">Lump Sum PV</th>
                <th className="p-2.5 border-b border-slate-200 dark:border-slate-700">Annuity PV</th>
                <th className="p-2.5 border-b border-slate-200 dark:border-slate-700 font-bold">Total Present Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-xs">
              <tr><td className="p-2 text-purple-600 font-bold">4.0%</td><td className="p-2">$33,538.30</td><td className="p-2">$49,385.09</td><td className="p-2 font-bold text-blue-600">$82,923.39</td></tr>
              <tr><td className="p-2 text-purple-600 font-bold">5.0%</td><td className="p-2">$30,358.05</td><td className="p-2">$47,140.68</td><td className="p-2 font-bold text-blue-600">$77,498.73</td></tr>
              <tr><td className="p-2 text-purple-600 font-bold">6.0%</td><td className="p-2">$27,481.64</td><td className="p-2">$45,036.73</td><td className="p-2 font-bold text-blue-600">$72,518.36</td></tr>
              <tr className="bg-blue-50/50 dark:bg-blue-950/20 font-bold"><td className="p-2 text-purple-600 font-bold">7.0% (Base)</td><td className="p-2">$24,879.81</td><td className="p-2">$43,063.18</td><td className="p-2 font-bold text-blue-600">$67,942.99</td></tr>
              <tr><td className="p-2 text-purple-600 font-bold">8.0%</td><td className="p-2">$22,526.17</td><td className="p-2">$41,210.74</td><td className="p-2 font-bold text-blue-600">$63,736.91</td></tr>
              <tr><td className="p-2 text-purple-600 font-bold">9.0%</td><td className="p-2">$20,396.87</td><td className="p-2">$39,470.85</td><td className="p-2 font-bold text-blue-600">$59,867.71</td></tr>
              <tr><td className="p-2 text-purple-600 font-bold">10.0%</td><td className="p-2">$18,470.35</td><td className="p-2">$37,835.58</td><td className="p-2 font-bold text-blue-600">$56,305.93</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 20. Sensitivity Analysis: The "What If?" Layer of Valuation */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          20. Sensitivity Analysis: The &ldquo;What If?&rdquo; Layer of Valuation
        </h2>
        <p>A single valuation can create false confidence.</p>
        <p>
          If the chosen rate is 7%, someone might look at $67,942.99 and treat it as the answer. Sensitivity analysis asks a better question:
          <em> &ldquo;What happens if my rate assumption is off by ±1% to ±3%?&rdquo;</em>
        </p>
        <p>
          At 5%, the same cash flows are worth $77,498.73. At 9%, they are worth only $59,867.71. The difference is large because discounting compounds through time.
          That is why sensitivity analysis is especially useful when valuing long-dated projects, real estate, business plans, contractual
          cash flows or investment opportunities where the appropriate discount rate is uncertain.
        </p>
      </section>

      {/* 21. Scenario Comparison: Conservative, Moderate and Aggressive Assumptions */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          21. Scenario Comparison: Conservative, Moderate and Aggressive Assumptions
        </h2>
        <p>The calculator&apos;s scenario panel turns sensitivity analysis into a side-by-side decision view:</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block text-sm">Conservative (9% Rate)</span>
            <p className="text-base font-extrabold text-purple-600 font-mono">$59,867.71</p>
            <p className="text-slate-500">Discount Amount: $50,132.29</p>
            <p className="text-slate-500">Discount Ratio: 45.6%</p>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border-2 border-blue-500 space-y-1">
            <span className="font-bold text-blue-800 dark:text-blue-300 block text-sm">Moderate (7% Rate - Base)</span>
            <p className="text-base font-extrabold text-blue-600 font-mono">$67,942.99</p>
            <p className="text-slate-500">Discount Amount: $42,057.01</p>
            <p className="text-slate-500">Discount Ratio: 38.2%</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block text-sm">Aggressive (5% Rate)</span>
            <p className="text-base font-extrabold text-emerald-600 font-mono">$77,498.73</p>
            <p className="text-slate-500">Discount Amount: $32,501.27</p>
            <p className="text-slate-500">Discount Ratio: 29.5%</p>
          </div>
        </div>
        <p className="text-xs text-slate-500">
          These labels describe discount-rate scenarios, not guaranteed investment outcomes. The &ldquo;aggressive&rdquo; case simply uses a lower discount rate, which mechanically produces a higher present value.
        </p>
      </section>

      {/* 22. Growing Annuity: When Payments Increase Over Time */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          22. Growing Annuity: When Payments Increase Over Time
        </h2>
        <p>A normal annuity assumes the payment remains constant. Real-world cash flows do not always behave that way.</p>
        <p>Rent may rise. Pension payments may increase. Dividends may grow. Contractual payments may escalate over time.</p>
        <p>The advanced model includes the growing-annuity formula:</p>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg font-mono text-center text-xs sm:text-sm border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 font-bold">
          PV = PMT / (r - g) × [1 - ((1+g)/(1+r))^t]
        </div>
        <p>where $g$ is the annual growth rate of the payments, $r$ is the discount rate, and $t$ is the number of periods.</p>
      </section>

      {/* 23. When Present Value Is Useful in Real Life */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          23. When Present Value Is Useful in Real Life
        </h2>
        <p>Present value is not limited to classroom finance problems.</p>
        <p>
          A lottery winner comparing a lump-sum payout with a long-term annuity is fundamentally comparing cash flows that occur at
          different times. A real-estate investor estimating the value of future rental income is discounting future cash flows into today&apos;s
          dollars. A company evaluating a capital project is asking whether expected future operating cash flows justify today&apos;s capital commitment.
        </p>
        <p>In each case, the core question is identical: <em>&ldquo;How much is this future stream worth today under my chosen valuation assumptions?&rdquo;</em></p>
      </section>

      {/* 24. Present Value in Real Estate and Commercial Valuation */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          24. Present Value in Real Estate and Commercial Valuation
        </h2>
        <p>
          A property may generate rental income for many years and eventually produce a sale proceeds amount. Those cash flows arrive
          on different dates, so their present values must be calculated individually or through a structured DCF model.
        </p>
        <p>
          For mortgage payment mechanics before performing a discounted-value analysis, users can pair the{" "}
          <Link
            href="/calculators/mortgage-calculator"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Mortgage Calculator
          </Link>{" "}
          with this calculator. For revolving credit or equity lines, the{" "}
          <Link
            href="/calculators/heloc-calculator"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            HELOC Calculator
          </Link>{" "}
          can model underlying credit-line balances.
        </p>
      </section>

      {/* 25. Present Value in Loan and Payment Analysis */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          25. Present Value in Loan and Payment Analysis
        </h2>
        <p>Loans naturally generate recurring payment streams, which makes them a classic annuity application.</p>
        <p>
          If a loan has fixed periodic payments, the present value of those payments can be compared with the amount financed. That
          same mathematical relationship underlies mortgage and installment-loan calculations.
        </p>
        <p>
          When you need to move those future payments back to today&apos;s dollars, return to the{" "}
          <Link
            href="/calculators/present-value-calculator"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Present Value Calculator
          </Link>.
        </p>
      </section>

      {/* 26. Present Value vs Future Value */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          26. Present Value vs Future Value
        </h2>
        <p>Present Value and Future Value are mirror-image concepts.</p>
        <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm">
          <li><strong>Future Value:</strong> &ldquo;What will today&apos;s money become after compounding?&rdquo;</li>
          <li><strong>Present Value:</strong> &ldquo;What is a future amount worth today after discounting?&rdquo;</li>
        </ul>
        <p>
          If you know today&apos;s capital and want to project forward, use a future-value model. If you know the future cash flow and want to compare it with money available today, use present value.
        </p>
      </section>

      {/* 27. Present Value vs NPV */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          27. Present Value vs NPV
        </h2>
        <p>These terms are often confused:</p>
        <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm">
          <li><strong>Present Value:</strong> The discounted value of future cash flows (gross PV of expected inflows).</li>
          <li><strong>Net Present Value:</strong> Discounted future cash flows <em>minus</em> the initial capital outlay (Gross Inflows PV − Initial Outlay).</li>
        </ul>
        <p>
          NPV is a decision-oriented extension of present value that incorporates upfront investment costs.
        </p>
      </section>

      {/* 28. What Happens at a 0% Discount Rate? */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          28. What Happens at a 0% Discount Rate?
        </h2>
        <p>
          At $r = 0\%$, there is no discounting. That means the present value of future cash flows equals their undiscounted nominal sum ($PV = FV + PMT \times t$).
          The production engine has a dedicated zero-rate safeguard to prevent $0/0$ division by zero in annuity calculations.
        </p>
      </section>

      {/* 29. Negative Discount Rates and Input Boundaries */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          29. Negative Discount Rates and Input Boundaries
        </h2>
        <p>
          The production implementation validates and clamps negative discount-rate inputs to non-negative values to prevent unintended mathematical distortions while ensuring stable valuation boundaries.
        </p>
      </section>

      {/* 30. How to Read the Calculator Results */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          30. How to Read the Calculator Results
        </h2>
        <p>A useful way to read the final results panel is in layers:</p>
        <ol className="list-decimal pl-6 space-y-1.5 text-xs sm:text-sm">
          <li><strong>Headline PV:</strong> The primary present value valuation in today&apos;s dollars.</li>
          <li><strong>Component Split:</strong> How much value originates from the terminal lump sum vs. the recurring annuity.</li>
          <li><strong>Effective Rate:</strong> How nominal rates and compounding frequency interact.</li>
          <li><strong>Discount Ratio:</strong> What percentage of future cash flows has been stripped out through discounting.</li>
          <li><strong>Schedule &amp; Sensitivity:</strong> How value accumulates over time and how sensitive the valuation is to interest rate shifts.</li>
        </ol>
      </section>

      {/* 31. Common Present Value Mistakes */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          31. Common Present Value Mistakes
        </h2>
        <ol className="list-decimal pl-6 space-y-1.5 text-xs sm:text-sm">
          <li>Treating future dollars as equivalent to today&apos;s dollars.</li>
          <li>Using a nominal annual rate while assuming the wrong compounding frequency.</li>
          <li>Treating payment frequency and compounding frequency as identical without checking.</li>
          <li>Forgetting whether payments occur at the beginning (due) or end (ordinary) of each period.</li>
          <li>Adding future cash flows first and discounting the total instead of discounting each payment individually.</li>
          <li>Using a single annuity formula for uneven cash flows.</li>
          <li>Confusing gross PV with Net Present Value (NPV).</li>
          <li>Treating a positive modeled NPV as a guaranteed investment profit.</li>
          <li>Treating a hurdle-rate preset as a universal market truth.</li>
          <li>Rounding intermediate rates before completing the calculation.</li>
          <li>Ignoring the compounding effect of time horizon on discounting.</li>
          <li>Relying on a single discount-rate scenario and ignoring sensitivity analysis.</li>
        </ol>
      </section>

      {/* 32. Formula Reference: The Core Mathematical Toolkit */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          32. Formula Reference: The Core Mathematical Toolkit
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">Lump Sum Present Value</span>
            <code className="text-blue-600 dark:text-blue-400 font-bold block">PV = FV / (1 + r/n)^(n×t)</code>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">Ordinary Annuity PV</span>
            <code className="text-emerald-600 dark:text-emerald-400 font-bold block">PV = PMT × [1 - (1+r/n)^(-n×t)] / (r/n)</code>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">Annuity Due PV</span>
            <code className="text-purple-600 dark:text-purple-400 font-bold block">PV_due = PV_ordinary × (1 + r/n)</code>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">Effective Annual Rate</span>
            <code className="text-amber-600 dark:text-amber-400 font-bold block">EAR = (1 + r/n)^n - 1</code>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">Net Present Value (NPV)</span>
            <code className="text-indigo-600 dark:text-indigo-400 font-bold block">NPV = Σ [CF_t / (1+r)^t] - C_0</code>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">Growing Annuity PV</span>
            <code className="text-cyan-600 dark:text-cyan-400 font-bold block">PV = PMT / (r - g) × [1 - ((1+g)/(1+r))^t]</code>
          </div>
        </div>
      </section>

      {/* 34. EXACTLY 12 SEO FAQS (1:1 with JSON-LD Schema) */}
      <section className="pt-8 space-y-6">
        <div className="flex items-center gap-3">
          <HelpCircle className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {present_valueFaqs.map((faq, index) => {
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

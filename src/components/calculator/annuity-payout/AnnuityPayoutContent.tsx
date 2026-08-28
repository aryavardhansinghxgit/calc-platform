"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  BookOpen,
  ShieldCheck,
  Clock,
  DollarSign,
  Award,
  Users,
  Layers,
  TrendingUp,
  Percent,
  Calculator,
  ArrowRight,
  Scale,
  Calendar,
} from "lucide-react";
import { annuityPayoutFaqs } from "@/calculators/finance/annuity-payout/faq";

export function AnnuityPayoutContent() {
  // All 15 FAQs open by default (matching 401(k) / Traditional IRA / Pension calculator formatting)
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: annuityPayoutFaqs.length }, (_, i) => i))
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
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
      {/* 1. EXPANDED MAIN EDUCATIONAL CONTENT */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        
        {/* Section 1: Title & Introduction */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Annuity Payout Calculator – Calculate Monthly Income, Payout Duration &amp; Retirement Withdrawals
          </h2>
          <p>
            An annuity payout calculator helps you estimate how much income a fixed pool of money could generate over a selected period, how long a planned monthly withdrawal could last, and how payout timing changes the result.
          </p>
          <p>
            This calculator is designed for retirement-income planning and lets you examine several different payout questions in one place. You can calculate a fixed monthly payment for a specified term, start with a desired monthly payment and estimate when the account will be depleted, model income over an expected life span, compare a joint-life payout for two people, and compare immediate versus deferred income.
          </p>
          <p>
            The calculations are based on the principal, assumed interest or investment return, payment frequency, payout period, inflation and life-expectancy assumptions that you enter. They are useful for understanding the mathematics behind income withdrawals, but they are not an insurance-company quote or a guarantee that an actual annuity contract will make a particular payment.
          </p>
        </section>

        {/* Section 2: What Is an Annuity Payout? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is an Annuity Payout?
          </h2>
          <p>
            An annuity payout is a series of payments generated from money placed into an annuity or from a modeled pool of retirement assets.
          </p>
          <p>Depending on the product and payout structure, payments may be:</p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300">
            <li>fixed for a specified number of years,</li>
            <li>fixed at a chosen monthly amount until funds are depleted,</li>
            <li>payable for the life of one person,</li>
            <li>payable for the joint lives of two people,</li>
            <li>immediate, with payments starting soon, or</li>
            <li>deferred, with payments beginning at a later date.</li>
          </ul>
          <p>
            In a real annuity contract, the payment amount depends on the contract terms, interest assumptions, mortality assumptions, fees, payout option and the financial strength of the issuing insurer. FINRA describes an annuity as a contract with an insurance company under which the insurer agrees to make periodic payments beginning immediately or at a future date.
          </p>
          <p>
            This calculator focuses on the mathematics of the payout stream so you can understand the relationship between starting principal, return, payment size and duration.
          </p>
        </section>

        {/* Section 3: How the Annuity Payout Calculator Works */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How the Annuity Payout Calculator Works
          </h2>
          <p>
            The calculator contains several different payout models because there is no single way to answer the question, <em>&ldquo;How much can I withdraw?&rdquo;</em>
          </p>
          <div className="space-y-2 pl-1">
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block text-xs">1. Fixed Length Payout</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                You specify starting principal, annual interest or return, number of years, and payment frequency. The calculator then solves for the periodic payment that amortizes the balance over the selected term.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block text-xs">2. Fixed Payment Payout</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                You specify starting principal, interest rate, and desired periodic payment. The calculator determines how long the money can support that payment.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block text-xs">3. Life Expectancy Payout</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                You provide your current age, the modeled life-expectancy assumption, expected return and inflation. The calculator estimates a sustainable payout over the selected planning horizon.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block text-xs">4. Joint Life Payout</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                The calculator evaluates a payout horizon for two people rather than a single individual.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block text-xs">5. Immediate vs. Deferred</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                The calculator compares income beginning now with income beginning after a selected deferral period, allowing the underlying balance to grow during the deferral period.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Fixed-Length Annuity Payment Formula */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Fixed-Length Annuity Payment Formula
          </h2>
          <p>
            For a standard amortizing payout with equal periodic payments, the core formula is:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-center text-xs sm:text-sm">
            PMT = P &times; r &times; (1 + r)<sup>n</sup> / [(1 + r)<sup>n</sup> &minus; 1]
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            where: <strong>PMT</strong> = payment per period, <strong>P</strong> = starting principal, <strong>r</strong> = interest rate per payment period, and <strong>n</strong> = total number of payments.
          </p>
          <p>
            The annual interest rate must be converted to the appropriate periodic rate:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-xs text-center">
            Monthly rate = Annual rate &divide; 12 | Number of payments = Years &times; 12
          </div>
          <p>
            This periodic conversion is critical. Applying a 6% annual rate as though it were a 6% monthly rate would massively overstate the interest and produce an incorrect payout.
          </p>
        </section>

        {/* Section 5: Example: $500,000 Annuity at 6% for 10 Years */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Example: $500,000 Annuity at 6% for 10 Years
          </h2>
          <p>Consider:</p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300">
            <li><strong>Starting principal:</strong> $500,000</li>
            <li><strong>Annual return:</strong> 6%</li>
            <li><strong>Payout period:</strong> 10 years (10 &times; 12 = 120 payments)</li>
            <li><strong>Frequency:</strong> Monthly</li>
          </ul>
          <p>
            Using the standard amortization formula, the modeled monthly payout is <strong>$5,551.03 per month</strong>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60">
              <span className="text-slate-500 block">Total Payments</span>
              <strong className="text-sm font-bold text-slate-900 dark:text-slate-100">$666,123.01</strong>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60">
              <span className="text-slate-500 block">Total Interest Earned</span>
              <strong className="text-sm font-bold text-emerald-600">$166,123.01</strong>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60">
              <span className="text-slate-500 block">Ending Balance</span>
              <strong className="text-sm font-bold text-blue-600">$0.00</strong>
            </div>
          </div>
          <p>
            This illustrates an important point: the total amount received can exceed the original principal because the remaining balance earns interest throughout the payout period.
          </p>
        </section>

        {/* Section 6: Why Payment Frequency Matters */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why Payment Frequency Matters
          </h2>
          <p>
            Changing the payment frequency changes both the periodic rate and the number of payments:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300">
            <li><strong>Monthly payments:</strong> r<sub>m</sub> = r<sub>a</sub> / 12</li>
            <li><strong>Quarterly payments:</strong> r<sub>q</sub> = r<sub>a</sub> / 4</li>
            <li><strong>Semi-annual payments:</strong> r<sub>s</sub> = r<sub>a</sub> / 2</li>
            <li><strong>Annual payments:</strong> r<sub>a</sub> = annual rate</li>
          </ul>
          <p>
            Because both the rate and number of periods affect the annuity formula, payment frequency changes the resulting periodic payment.
          </p>
        </section>

        {/* Section 7: Fixed Payment Payout: How Long Will $500,000 Last? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Fixed Payment Payout: How Long Will $500,000 Last?
          </h2>
          <p>
            The reverse problem is also important. Suppose you have <strong>$500,000</strong> and want to withdraw <strong>$5,000 per month</strong> while assuming <strong>6% annual interest</strong>.
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-2">
            <div className="font-mono text-xs sm:text-sm text-center">
              Depletion Horizon: 11.6 Years (139 Months) | Total Withdrawn: $694,878.90 | Interest: $194,878.90
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              The additional amount above the original $500,000 comes from the assumed investment return during the withdrawal period.
            </p>
          </div>
        </section>

        {/* Section 8: When Will an Account Never Deplete? & Zero Rate Identity */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            When Will an Account Never Deplete? &amp; 0% Interest Scenarios
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2">
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-emerald-600 dark:text-emerald-400 block text-xs font-bold uppercase tracking-wider">
                Non-Depleting Boundary
              </strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                If the requested periodic payment is no greater than the interest generated (PMT &le; P &times; r), the withdrawal does not consume principal. The calculator treats this as a non-depleting state rather than producing an invalid negative time.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-blue-600 dark:text-blue-400 block text-xs font-bold uppercase tracking-wider">
                0% Interest Identity
              </strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                When rate is 0%, there is no growth. The payout is simply principal divided by number of payments: $120,000 &divide; 120 = $1,000/month. The calculator handles zero-rate cases cleanly to prevent division-by-zero errors.
              </p>
            </div>
          </div>
        </section>

        {/* Section 9: Annuity Payout Schedule & Balance Continuity */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How the Payout Schedule Works
          </h2>
          <p>
            An annuity-style payout consists of two economic components: <strong>return of principal</strong> plus <strong>interest or investment return</strong>. During a payout period, the balance updates as:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-center text-xs sm:text-sm">
            Ending Balance = Beginning Balance + Interest Earned &minus; Payment
          </div>
          <p>
            For the $500,000, 6%, 10-year example, Year 1 begins with $500,000, earns $28,976.19 in interest, withdraws $66,612.30, and finishes with $462,363.89. Year 2 begins with the previous year&apos;s ending balance:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-xs text-center">
            Beginning Balance(next period) = Ending Balance(previous period)
          </div>
          <p>By the end of Year 10, the modeled balance reaches exactly $0.00.</p>
        </section>

        {/* Section 10: Life Expectancy & Joint Life Payouts */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Life Expectancy &amp; Joint Life Payout Solvers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2">
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-rose-600 dark:text-rose-400 block text-xs font-bold uppercase tracking-wider">
                Single Life Expectancy (Age 65 Male)
              </strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Modeled planning horizon: 18 years (to Age 83) @ 6% return &rarr; <strong>$3,790.81/month</strong>. Modeled inflation purchasing-power loss at 2.5% inflation: <strong>-35.9%</strong>.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-purple-600 dark:text-purple-400 block text-xs font-bold uppercase tracking-wider">
                Joint Life Payout (Primary 65 + Spouse 63)
              </strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Joint survival duration: 26 years (Joint End Age: 91) @ 6% return &rarr; <strong>$3,168.38/month</strong> for extended household longevity protection.
              </p>
            </div>
          </div>
        </section>

        {/* Section 11: Immediate vs. Deferred Annuities */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Immediate vs. Deferred Annuities
          </h2>
          <p>
            An immediate annuity begins distributing income shortly after purchase, while a deferred annuity delays income, allowing the underlying value to accumulate before payments begin:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <strong>Immediate Payout ($500k @ 6%, 10 yrs):</strong> $5,551.03/mo ($666,123.01 total payments)
              </div>
              <div>
                <strong>Deferred Payout (10-Yr Deferral @ 6%):</strong> $9,941.04/mo ($1,192,924.86 total payments)
              </div>
            </div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
              Modeled Advantage: +$526,801.85 (Accumulated Balance: $895,423.85)
            </p>
          </div>
        </section>

        {/* Section 12: Fees, 1035 Exchanges, Taxes & Product Types */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Annuity Fees, 1035 Exchanges, Taxes &amp; Product Types
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block">Fees &amp; Surrender Charges</strong>
              <p className="text-slate-600 dark:text-slate-400">Actual contracts may include M&amp;E charges, administrative fees, rider costs, and surrender charges that reduce net payments.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block">1035 Exchanges</strong>
              <p className="text-slate-600 dark:text-slate-400">IRC Section 1035 permits tax-free contract rollovers, but exchanging contracts can restart surrender periods or introduce new fees.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block">Taxation Rules</strong>
              <p className="text-slate-600 dark:text-slate-400">Non-qualified annuities follow exclusion ratio rules (cost basis vs earnings), while qualified plans are 100% ordinary taxable income.</p>
            </div>
          </div>
        </section>

        {/* Section 13: Disclaimers */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Important Financial Disclaimer
          </h2>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
            <div className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
              Actuarial &amp; Planning Notice
            </div>
            <p>
              This calculator is provided for educational and planning purposes only. Results are mathematical estimates based on the assumptions entered by the user and should not be interpreted as guaranteed investment performance, an insurance-company quote, actuarial certification, tax advice or individualized financial advice.
            </p>
            <p>
              Actual annuity contracts can differ substantially in interest-crediting methods, fees, mortality assumptions, surrender charges, guarantees, riders, payout options and insurer-specific terms. Annuity guarantees are subject to the claims-paying ability and financial strength of the issuing insurer. Before purchasing, exchanging or annuitizing an actual contract, review the complete contract and insurer illustration and consider obtaining appropriate financial, tax and legal advice.
            </p>
          </div>
        </section>

        {/* Section 14: Related Calculators */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Related Retirement &amp; Financial Calculators
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            For comprehensive retirement income roadmap planning, explore these companion financial tools:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            <Link
              href="/calculators/pension-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">Pension Calculator</span>
              <span className="text-slate-500 text-[11px]">Compare defined benefit lump sums vs monthly lifetime checks.</span>
            </Link>
            <Link
              href="/calculators/retirement-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">Retirement Calculator</span>
              <span className="text-slate-500 text-[11px]">Model complete retirement spending, nest egg targets, and asset longevity.</span>
            </Link>
            <Link
              href="/calculators/401k-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">401(k) Calculator</span>
              <span className="text-slate-500 text-[11px]">Estimate employer match, salary deferrals, and tax-deferred growth.</span>
            </Link>
            <Link
              href="/calculators/traditional-ira-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">Traditional IRA Calculator</span>
              <span className="text-slate-500 text-[11px]">Calculate pre-tax growth, tax optimization, and Roth comparisons.</span>
            </Link>
            <Link
              href="/calculators/social-security-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">Social Security Calculator</span>
              <span className="text-slate-500 text-[11px]">Determine optimal claiming ages (62, 67, 70) alongside annuity income.</span>
            </Link>
            <Link
              href="/calculators/rmd-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">RMD Calculator</span>
              <span className="text-slate-500 text-[11px]">Estimate mandatory IRS distributions from qualified annuity plans.</span>
            </Link>
          </div>
        </section>
      </div>

      {/* 2. FAQ SECTION (All 15 FAQs, Open by Default) */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {annuityPayoutFaqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2 pr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-sans tabular-nums text-xs font-bold shrink-0">
                      Q{idx + 1}.
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-zinc-50/50 dark:bg-zinc-900/50 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
}

export default AnnuityPayoutContent;

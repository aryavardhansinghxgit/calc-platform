"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, BookOpen, ShieldCheck, Calculator, Table, Percent, CheckCircle2, TrendingUp, AlertTriangle } from "lucide-react";
import { traditionalIraFaqs } from "@/calculators/finance/traditional-ira/faq";

export function TraditionalIraContent() {
  // All 18 FAQs open by default (like 401(k) calculator formatting)
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: traditionalIraFaqs.length }, (_, i) => i))
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
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Traditional IRA Calculator: Estimate Growth, Taxes, Contributions and Retirement Value
          </h2>
          <p>
            A Traditional IRA can provide tax advantages while you are saving for retirement, but the value of those advantages depends on more than the investment return. Your current tax rate, expected retirement tax rate, contribution amount, investment horizon, contribution timing and eligibility for a deduction can all change the result.
          </p>
          <p>
            This Traditional IRA Calculator estimates how an IRA could grow over time and then compares the modeled after-tax retirement value with a Roth IRA and a regular taxable savings account. It also provides a year-by-year accumulation schedule, contribution-limit checks and a visual comparison of the modeled outcomes.
          </p>
          <p>
            The calculator is designed to answer a practical question: <em>How much could my Traditional IRA be worth at retirement, and how does its potential after-tax value compare with other ways of saving?</em>
          </p>
          <p>
            For example, the supplied reference scenario uses a $30,000 starting balance, $7,500 annual contribution, age 30, retirement at 65, 6% annual return, a 25% current marginal tax rate and a 15% expected retirement tax rate. Under the calculator&apos;s beginning-of-year contribution convention, the modeled Traditional IRA reaches approximately $1.116 million before retirement taxes. The same scenario produces a modeled after-tax Traditional IRA value of about $949,016, compared with approximately $837,367 for the Roth comparison. The taxable-account comparison is approximately $584,063.
          </p>
          <p>
            These figures are not predictions. They are outputs produced from the assumptions entered into the calculator. Changing the contribution, return, retirement age or tax-rate assumptions can materially change the result.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is a Traditional IRA?
          </h2>
          <p>
            A Traditional IRA, or Individual Retirement Arrangement, is a retirement account that can provide tax advantages for eligible contributors. The most important distinction from a Roth IRA is generally when taxation occurs.
          </p>
          <p>
            A Traditional IRA contribution may be deductible depending on the taxpayer&apos;s circumstances. The money can then remain invested in the account, with taxes generally deferred until taxable distributions are taken.
          </p>
          <p>
            A Roth IRA generally works in the opposite direction: contributions are made with after-tax dollars, and qualified distributions are generally tax-free.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2">
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-blue-600 dark:text-blue-400 block text-xs font-bold uppercase tracking-wider">
                Traditional IRA Path
              </strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Current contribution &rarr; possible deduction &rarr; tax-deferred growth &rarr; taxable retirement distributions
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-emerald-600 dark:text-emerald-400 block text-xs font-bold uppercase tracking-wider">
                Roth IRA Path
              </strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                After-tax contribution &rarr; tax-free qualified growth &rarr; tax-free qualified retirement distributions
              </p>
            </div>
          </div>
          <p>
            The difference means the same nominal investment return can produce very different after-tax outcomes depending on when the tax is paid. The IRS does not treat every Traditional IRA contribution as automatically deductible. Deductibility can depend on modified adjusted gross income, filing status and whether the taxpayer or spouse is covered by a retirement plan at work.
          </p>
          <p>
            For that reason, this calculator distinguishes between <em>&ldquo;Traditional IRA contribution&rdquo;</em> and <em>&ldquo;deductible Traditional IRA contribution.&rdquo;</em> Those are not universally identical concepts.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How the Traditional IRA Calculator Works
          </h2>
          <p>
            The calculator uses several stages rather than treating retirement savings as a single compound-interest calculation:
          </p>
          <ol className="list-decimal list-inside space-y-2 pl-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <li>
              <strong>Start with the current balance:</strong> Your existing IRA balance is the starting principal (e.g., Current balance = $30,000).
            </li>
            <li>
              <strong>Add annual contributions:</strong> The calculator adds your planned yearly contribution during the accumulation period (e.g., Annual contribution = $7,500).
            </li>
            <li>
              <strong>Apply the investment return:</strong> The calculator compounds the balance using the entered annual return (e.g., 6% per year).
            </li>
            <li>
              <strong>Continue until the retirement age:</strong> The difference between current age and retirement age determines how many projection periods are modeled (Age 30 to 65 = 35 years).
            </li>
            <li>
              <strong>Apply retirement-tax assumptions:</strong> The Traditional IRA balance is pre-tax. The calculator therefore applies the entered expected retirement tax rate to estimate an after-tax value.
            </li>
            <li>
              <strong>Compare the result:</strong> The calculator then compares the Traditional IRA with a Roth IRA and regular taxable savings to show how the assumptions affect the modeled outcome.
            </li>
          </ol>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Traditional IRA Growth Formula
          </h2>
          <p>
            The calculator&apos;s reference scenario uses beginning-of-year contributions, equivalent to an annuity-due timing convention. For a starting balance <span className="font-serif italic">P</span>, annual contribution <span className="font-serif italic">C</span>, annual return <span className="font-serif italic">r</span>, and number of years <span className="font-serif italic">n</span>:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-center text-xs sm:text-sm">
            FV = P &middot; (1 + r)<sup>n</sup> + C &middot; (1 + r) &middot; [((1 + r)<sup>n</sup> &minus; 1) / r]
          </div>
          <p>
            For the supplied reference example (<span className="font-serif italic">P</span> = $30,000, <span className="font-serif italic">C</span> = $7,500, <span className="font-serif italic">r</span> = 0.06, <span className="font-serif italic">n</span> = 35), this produces an internal ending balance of approximately <strong>$1,116,488.75</strong>, rounded in the interface to <strong>$1,116,489</strong>.
          </p>
          <p>
            The distinction between beginning-of-year and end-of-year contributions matters. Investing each annual contribution earlier gives it more time in the market and therefore generally produces a higher ending value than depositing the same contribution at the end of the year. The calculator documents its contribution timing rather than hiding the assumption.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Worked Example: $30,000 Starting Balance and $7,500 Annual Contributions
          </h2>
          <p>
            Consider a saver who starts with $30,000, contributes $7,500 per year, is age 30, retires at 65, assumes a 6% annual return, has a 25% current marginal tax rate and expects a 15% retirement tax rate.
          </p>
          <p>
            The total amount contributed over 35 years is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-xs sm:text-sm text-center">
            $30,000 + (35 &times; $7,500) = $292,500 total principal
          </div>
          <p>
            The modeled pre-tax Traditional IRA value grows to roughly <strong>$1,116,489</strong>. The difference between principal and ending balance represents investment growth.
          </p>
          <p>
            The calculator then applies its retirement-tax assumption to produce an estimated after-tax Traditional IRA value of roughly <strong>$949,016</strong>. The Roth comparison produces approximately <strong>$837,367</strong>, while the regular taxable-account comparison produces approximately <strong>$584,063</strong>.
          </p>
          <p>
            These numbers demonstrate why tax assumptions matter. A Traditional IRA can potentially benefit from receiving the tax deduction at a higher current marginal rate while distributions are taxed later under the user&apos;s retirement-tax assumption.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Traditional IRA vs. Roth IRA: Why Tax Rates Matter
          </h2>
          <p>
            The central issue in the Traditional-versus-Roth decision is often the difference between your current marginal tax rate and the tax rate you expect to face when withdrawing retirement money.
          </p>
          <p>
            Suppose: Current marginal tax rate = 25%, Expected retirement tax rate = 15%. The modeled assumption says you receive the tax benefit while your marginal rate is relatively high and pay tax later at a lower rate. Under that particular scenario, the calculator&apos;s Traditional IRA comparison produces a larger after-tax value than the Roth comparison, showing an approximately <strong>$111,649</strong> modeled advantage for the Traditional IRA.
          </p>
          <p>
            Reverse the tax assumptions (Current rate = 15%, Retirement rate = 25%), and the tax advantage shifts toward the Roth comparison. For pure Roth mechanics and phase-out ranges, explore our{" "}
            <Link href="/calculators/roth-ira-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Roth IRA Calculator
            </Link>
            .
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 text-xs leading-relaxed">
            <strong>Strategic Tax Rule of Thumb:</strong> Traditional Advantage increases as <span className="font-mono text-xs">(t<sub>current</sub> &minus; t<sub>retirement</sub>)</span> increases, assuming other economic assumptions are held consistent.
          </div>
          <p>
            The actual decision can also involve tax diversification, future tax legislation, required minimum distributions (RMDs), estate planning, employer plans, and conversion strategies.
          </p>
        </section>

        {/* Section 7 & 8 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How Much Can You Contribute to a Traditional IRA?
          </h2>
          <p>
            The annual IRA limit applies across your Traditional IRA and Roth IRA contributions combined, rather than giving you a separate full annual limit for each type.
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <li><strong>2026 Limit:</strong> $7,500 ($8,600 for age 50+ including $1,100 catch-up)</li>
            <li><strong>2025 Limit:</strong> $7,000 ($8,000 for age 50+ including $1,000 catch-up)</li>
          </ul>
          <p>
            <strong>IRA Contributions Cannot Normally Exceed Taxable Compensation:</strong> The IRS states that the total contribution to Traditional and Roth IRAs generally cannot exceed the applicable annual IRA limit or your taxable compensation for the year, if lower. For example, if your eligible taxable compensation is $4,000, your allowable IRA contribution is capped at $4,000 regardless of the statutory maximum.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Are Traditional IRA Contributions Tax Deductible?
          </h2>
          <p>
            This is one of the most commonly misunderstood parts of Traditional IRA planning. A Traditional IRA contribution may be deductible, but the deduction is not automatically available to every taxpayer.
          </p>
          <p>
            The IRS explains that deduction eligibility depends on:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <li>Whether you or your spouse are covered by a retirement plan at work</li>
            <li>Modified adjusted gross income (MAGI)</li>
            <li>Filing status and applicable IRS phase-out ranges</li>
          </ul>
          <p>
            If neither you nor your spouse is covered by a retirement plan at work, a Traditional IRA contribution can generally be fully deductible. When workplace-plan coverage exists, income limitations can reduce or eliminate the deduction. For 2026, for a married couple filing jointly where the contributor is covered by a workplace plan, the phase-out range begins at $129,000 of modified AGI. For a single taxpayer or head of household covered by a workplace plan, the corresponding starting point is $81,000.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Happens if You Are Age 50 or Older?
          </h2>
          <p>
            People approaching retirement may be able to make additional catch-up contributions. For IRAs, the 2026 catch-up amount is $1,100, bringing the potential 2026 IRA contribution limit to $8,600.
          </p>
          <p>
            The catch-up applies to both Traditional and Roth IRAs because the annual IRA contribution limit is shared between those account types. However, IRA catch-up contributions should not be confused with catch-up rules for 401(k) plans ($8,000 catch-up in 2026) or SIMPLE IRAs ($3,500 catch-up). To test workplace plan growth, check our{" "}
            <Link href="/calculators/401k-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              401(k) Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Traditional IRA vs. Taxable Savings
          </h2>
          <p>
            The calculator also compares the modeled Traditional IRA with a regular taxable savings or investment account. The fundamental difference is when taxes interfere with compounding.
          </p>
          <p>
            In a Traditional IRA, investment gains generally remain inside the tax-deferred account until taxable distributions occur. In a taxable investment account, taxable income such as interest, dividends and realized gains can create tax drag during the accumulation period. Even if the nominal investment return is identical, the effective growth rate after taxes differs. The calculator models this tax drag rather than assuming that taxable and retirement accounts grow identically after tax.
          </p>
        </section>

        {/* Section 12 & 13 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What the Age-by-Age Schedule Shows &amp; Why Starting Earlier Matters
          </h2>
          <p>
            The calculator tracks the accumulation path across the projection period. For every year, the model reconciles through:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-center text-xs">
            Starting Balance &rarr; Contribution &rarr; Investment Growth &rarr; Ending Balance
          </div>
          <p>
            The schedule verifies that Row <span className="font-serif italic">N</span> Ending Balance &equiv; Row <span className="font-serif italic">N+1</span> Starting Balance throughout the full projection.
          </p>
          <p>
            <strong>Why Starting Earlier Can Matter So Much:</strong> Compound growth rewards time. An investor starting at age 25 vs age 35 gives each contribution an additional 10 years of compounding, often doubling the ultimate retirement nest egg for identical lifetime cash contributions. To isolate pure compound math, see our{" "}
            <Link href="/calculators/compound-interest-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Compound Interest Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 14 & 15 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Investment Returns and Employer Retirement Plans
          </h2>
          <p>
            The annual return assumption is one of the most sensitive inputs in the model. A change from 4% to 6% may look small, but compounded over 35 years, the ending balance expands exponentially. We recommend testing conservative (4%), reference (6%), and growth (8%) scenarios.
          </p>
          <p>
            Having a workplace 401(k) does not prevent you from contributing to a Traditional IRA, but workplace-plan participation affects whether your Traditional IRA contribution is tax-deductible based on MAGI limits.
          </p>
        </section>

        {/* Section 16 & 17 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Traditional IRA, Roth IRA, and Tax Diversification Planning
          </h2>
          <p>
            Choosing between Traditional and Roth savings is not necessarily an all-or-nothing decision. Having both tax-deferred (Traditional) and tax-free (Roth) retirement assets provides valuable tax diversification when managing future tax brackets in retirement.
          </p>
          <div className="space-y-2 text-xs">
            <p><strong>Required Minimum Distributions (RMDs):</strong> Traditional IRA owners are subject to mandatory RMDs starting at age 73 (age 75 starting in 2033). Estimate your distribution schedules with our{" "}
              <Link href="/calculators/rmd-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
                RMD Calculator
              </Link>
              .
            </p>
            <p><strong>Roth Conversions:</strong> Converting pre-tax Traditional IRA balances creates taxable income in the conversion year, but allows future tax-free growth.</p>
          </div>
        </section>

        {/* Section 18: Reference Table */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2025 vs. 2026 IRA Contribution Limits
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold">
                  <th className="p-3 border-b border-slate-200 dark:border-slate-700">Tax Year</th>
                  <th className="p-3 border-b border-slate-200 dark:border-slate-700">Regular IRA Limit</th>
                  <th className="p-3 border-b border-slate-200 dark:border-slate-700">Age 50+ Catch-Up</th>
                  <th className="p-3 border-b border-slate-200 dark:border-slate-700">Potential Age 50+ Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-sans">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">2025</td>
                  <td className="p-3">$7,000</td>
                  <td className="p-3">$1,000</td>
                  <td className="p-3 font-bold text-blue-600">$8,000</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">2026</td>
                  <td className="p-3 text-emerald-600 font-semibold">$7,500</td>
                  <td className="p-3 text-emerald-600 font-semibold">$1,100</td>
                  <td className="p-3 font-bold text-emerald-600">$8,600</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-slate-500">
            Source: Official IRS Notice 2024-80 &amp; 2026 Cost-of-Living Adjustments. The annual limit is shared across Traditional and Roth IRAs combined.
          </p>
        </section>

        {/* Section 19: SEP & SIMPLE IRAs */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            SEP IRA and SIMPLE IRA: Why Their Limits Are Different
          </h2>
          <p>
            SEP and SIMPLE IRAs are employer-sponsored and self-employed vehicles with distinct statutory rules:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <li>
              <strong>SEP IRA (2026):</strong> Maximum contribution is <strong>$72,000</strong> (or up to 25% of net self-employment earnings), up from $70,000 in 2025.
            </li>
            <li>
              <strong>SIMPLE IRA (2026):</strong> Standard employee salary-reduction limit is <strong>$17,000</strong> ($20,500 for age 50+ catch-up), up from $16,500 in 2025.
            </li>
          </ul>
          <p className="text-xs">
            Therefore: <em>Traditional/Roth IRA limits &ne; SEP IRA limits &ne; SIMPLE IRA limits.</em>
          </p>
        </section>

        {/* Section 20 & 21: Summary & Methodology */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Formula Summary &amp; Planning Disclaimers
          </h2>
          <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <BookOpen className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Calculation Methodology
              </div>
              <p>
                Core methodology: The calculator compounds initial balance and annual beginning-of-year contributions using discrete exponential growth. Traditional IRA after-tax value is modeled using the entered expected retirement tax rate: <span className="font-mono text-xs">FV<sub>after-tax</sub> = FV<sub>pre-tax</sub> &middot; (1 &minus; t<sub>retirement</sub>)</span>. Roth IRA balances reflect identical out-of-pocket net funding with 100% tax-free growth. Taxable savings accounts reflect continuous annual tax drag: <span className="font-mono text-xs">r<sub>net</sub> = r &middot; (1 &minus; t<sub>current</sub>)</span>.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Important Planning Assumptions and Limitations
              </div>
              <p>
                This calculator is an educational simulation, not formal tax or financial advice. Traditional IRA deductibility depends on individual income, filing status, and workplace retirement plan coverage under IRS Publication 590. Actual investment returns vary, future tax rates are uncertain, and RMD rules apply starting at age 73. Verify current statutory limits with the IRS or a qualified tax professional.
              </p>
            </div>
          </div>
        </section>

        {/* Section 22: Related Calculators */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Related Financial Calculators
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            For a comprehensive retirement and wealth-building workflow, use these companion tools:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            <Link
              href="/calculators/roth-ira-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">Roth IRA Calculator</span>
              <span className="text-slate-500 text-[11px]">Model after-tax contributions, 100% tax-free growth, and MAGI limits.</span>
            </Link>
            <Link
              href="/calculators/401k-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">401(k) Calculator</span>
              <span className="text-slate-500 text-[11px]">Estimate workplace matching, higher $24,500 limits, and salary deferrals.</span>
            </Link>
            <Link
              href="/calculators/rmd-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">RMD Calculator</span>
              <span className="text-slate-500 text-[11px]">Calculate mandatory IRS distributions starting at age 73.</span>
            </Link>
            <Link
              href="/calculators/retirement-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">Retirement Calculator</span>
              <span className="text-slate-500 text-[11px]">Model overall retirement portfolio longevity and withdrawal rates.</span>
            </Link>
            <Link
              href="/calculators/compound-interest-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">Compound Interest Calculator</span>
              <span className="text-slate-500 text-[11px]">Isolate pure discrete compounding equations over time.</span>
            </Link>
            <Link
              href="/calculators/inflation-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">Inflation Calculator</span>
              <span className="text-slate-500 text-[11px]">Translate nominal future dollars into today&apos;s purchasing power.</span>
            </Link>
          </div>
        </section>
      </div>

      {/* 2. FAQ SECTION (All 18 Approved FAQs, Open by Default like 401(k)) */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {traditionalIraFaqs.map((faq, idx) => {
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

export default TraditionalIraContent;

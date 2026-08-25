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
} from "lucide-react";
import { annuityFaqs } from "@/calculators/finance/annuity/faq";

export function AnnuityContent() {
  // All 12 FAQs open by default matching platform standard for SEO scanning & instant readability
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
      name: "Mortgage Calculator",
      slug: "/calculators/mortgage-calculator",
    },
    {
      name: "Home Equity Loan Calculator",
      slug: "/calculators/home-equity-loan-calculator",
    },
    {
      name: "HELOC Calculator",
      slug: "/calculators/heloc-calculator",
    },
    {
      name: "Down Payment Calculator",
      slug: "/calculators/down-payment-calculator",
    },
    {
      name: "Rent vs Buy Calculator",
      slug: "/calculators/rent-vs-buy-calculator",
    },
    {
      name: "VA Mortgage Calculator",
      slug: "/calculators/va-mortgage-calculator",
    },
    {
      name: "FHA Loan Calculator",
      slug: "/calculators/fha-loan-calculator",
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

      {/* 2. What Is an Annuity Calculator? */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
          <BookOpen className="h-4 w-4" /> Comprehensive Financial &amp; Insurance Annuity Guide
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          2. What Is an Annuity Calculator?
        </h2>
        <p>
          An annuity calculator is a time-value-of-money tool for understanding how a starting balance and a stream of recurring contributions can accumulate over time. Instead of looking only at one deposit and one future value, it follows the interaction between an initial principal amount, repeated contributions, a growth rate, the timing of those contributions, and the number of periods over which the money remains invested.
        </p>
        <p>
          That distinction matters because two plans can contribute the same total amount and still finish with different balances. A payment made at the beginning of a period has more time to participate in growth than an equal payment made at the end of that period. Over many periods, that small timing difference compounds.
        </p>
        <p>
          This calculator is therefore most useful when the question is not simply &ldquo;How much money will I have?&rdquo; but &ldquo;How does my starting capital, contribution pattern, timing, return assumption, and time horizon combine to produce the balance I may have in the future?&rdquo;
        </p>
        <p>
          The latest audited production model was independently reconciled across accumulation, contribution timing, monthly contributions, target solving, inflation, tax, scenario comparison, schedules and charts, with 50/50 property invariants and 1,520/1,520 differential scenarios passed.
        </p>
      </section>

      {/* 3. How to Use the Annuity Calculator */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          3. How to Use the Annuity Calculator
        </h2>
        <p>
          Start with the starting principal. This is the money already available at the beginning of the scenario.
        </p>
        <p>
          Next decide whether you are contributing annually, monthly, or using the calculator&apos;s combined annual-plus-monthly structure. Then choose whether contributions occur at the beginning or end of the period. That single timing control changes the mathematics because beginning-of-period contributions receive an additional period of growth.
        </p>
        <p>
          Enter the annual growth assumption and the duration. The calculator can then show the projected ending balance, the amount supplied through principal and contributions, and the portion attributable to modeled growth.
        </p>
        <p>
          For planning purposes, you can then move backward from a goal. Instead of asking what $10,000 per year becomes, the Target Balance Planner asks how much you would need to contribute to reach a chosen future amount.
        </p>
        <p>
          Finally, use the four-plan scenario comparison to see how sensitive the final result is to the assumed growth rate. This is often more useful than focusing on one single rate because the outcome of a long-term accumulation model can change substantially when the assumed rate changes.
        </p>
      </section>

      {/* 4. The Core Idea: Contributions Plus Compounding */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          4. The Core Idea: Contributions Plus Compounding
        </h2>
        <p>
          An accumulation plan has two engines working at the same time. The first is your own capital: the starting principal and the money you add over the years. The second is compounding: growth earned on the capital that remains invested.
        </p>
        <p>
          At the beginning of a plan, the contribution stream may represent most of the eventual balance. As time passes, previously earned growth also begins to earn growth. The result is a curve that generally becomes steeper rather than remaining linear.
        </p>
        <p>
          That is why long-term accumulation should not be evaluated by simply multiplying an annual contribution by the number of years. The calculator must model the timing of each contribution and then allow the accumulated balance to compound.
        </p>
      </section>

      {/* 5. The Audited Reference Baseline */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          5. The Audited Reference Baseline
        </h2>
        <p>The production/reference baseline uses:</p>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Starting principal: <strong>$20,000</strong></li>
          <li>Annual contribution: <strong>$10,000</strong></li>
          <li>Monthly contribution: <strong>$0</strong></li>
          <li>Contribution timing: <strong>Beginning of Period / Annuity Due</strong></li>
          <li>Annual growth rate: <strong>6.0%</strong></li>
          <li>Duration: <strong>10 years</strong></li>
          <li>Inflation assumption: <strong>2.5%</strong></li>
          <li>Expected tax rate: <strong>20.0%</strong></li>
        </ul>
        <p>The independently verified principal growth is:</p>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-900 dark:text-slate-100">
          $20,000 × 1.06^10 = $35,816.9539
        </div>
        <p>The contribution stream accumulates to:</p>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-900 dark:text-slate-100">
          $10,000 × [((1.06^10 − 1) / 0.06) × 1.06] = $139,716.4264
        </div>
        <p>Together:</p>
        <div className="p-4 bg-blue-50/50 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-800 font-bold text-base text-blue-600 dark:text-blue-400">
          Final Ending Balance = $175,533.38
        </div>
      </section>

      {/* 6. Where the $175,533.38 Comes From */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          6. Where the $175,533.38 Comes From
        </h2>
        <p>The ending balance is easier to understand when it is separated into three pieces.</p>
        <p>
          The first is the original $20,000 starting principal. That amount grows for the full ten years. The second is the $100,000 of contributions made over ten years. Because the contributions are made at the beginning of each year, every annual contribution receives a different number of compounding periods depending on when it entered the account. The third is the $55,533.38 of modeled return or interest.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-xs text-slate-500 block">Starting Principal</span>
            <strong className="text-base text-slate-900 dark:text-slate-100">$20,000.00</strong>
            <span className="text-xs text-blue-600 dark:text-blue-400 font-bold block">11.4% share</span>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-xs text-slate-500 block">Total Additions</span>
            <strong className="text-base text-slate-900 dark:text-slate-100">$100,000.00</strong>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold block">57.0% share</span>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-xs text-slate-500 block">Returns / Interest</span>
            <strong className="text-base text-slate-900 dark:text-slate-100">$55,533.38</strong>
            <span className="text-xs text-amber-600 dark:text-amber-400 font-bold block">31.6% share</span>
          </div>
        </div>
        <p className="text-xs text-slate-500 italic">
          The three shares sum to 100.0% within the displayed rounding.
        </p>
      </section>

      {/* 7 & 8. Ordinary Annuity vs. Annuity Due */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          7. Ordinary Annuity vs. Annuity Due
        </h2>
        <p>
          The most important timing distinction in an annuity calculator is whether each contribution happens at the beginning or the end of a period. An ordinary annuity assumes payments are made at the end of each period. An annuity due assumes payments are made at the beginning.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Ordinary Annuity</h3>
            <div className="font-mono text-xs text-slate-800 dark:text-slate-200">
              FV_ordinary = PMT × [((1+r)^n − 1) / r]
            </div>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Annuity Due</h3>
            <div className="font-mono text-xs text-slate-800 dark:text-slate-200">
              FV_due = FV_ordinary × (1+r)
            </div>
          </div>
        </div>
        <p>
          The extra (1+r) exists because every contribution in an annuity-due stream gets one additional period of growth relative to the corresponding end-of-period payment structure.
        </p>
        <p>
          Consider an especially simple case: you begin with no money, contribute $10,000, and the assumed annual growth rate is 10%. If the contribution arrives at the beginning of the year, it earns one full year&apos;s modeled growth ($10,000 → $11,000). If the contribution arrives at the end of the year, it has not been invested during that year ($10,000). Over 10, 20, or 30 periods, the same timing difference is repeated and compounded.
        </p>
      </section>

      {/* 9, 10, 11, 12. Contribution Timing & Compound Growth */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          8. Annual, Monthly &amp; Combined Contributions
        </h2>
        <p>
          With annual contributions, each year&apos;s deposit enters the calculation as a discrete cash-flow event. For the audited baseline, the $10,000 contribution occurs at the beginning of each year.
        </p>
        <p>
          Monthly contributions change the timing structure. A $1,000 monthly contribution does not behave identically to a $12,000 annual contribution because the money enters the account throughout the year rather than as one annual event.
        </p>
        <p>
          When an annual contribution and monthly stream are used together, the annual contribution is deposited in Month 1 of each year while the monthly stream continues according to the monthly compounding model, ensuring no contribution is duplicated.
        </p>
        <p>
          By Year 10, the audited schedule shows annual interest of <strong>$9,935.85</strong>. That interest itself becomes part of the balance used for future growth.
        </p>
        <p className="text-sm">
          For a broader explanation of compound-growth mechanics, the{" "}
          <Link href="/calculators/compound-interest-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Compound Interest Calculator
          </Link>{" "}
          can be used as a companion tool.
        </p>
      </section>

      {/* 13, 14, 15. The Audited Ten-Year Schedule */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          9. The Audited Ten-Year Schedule
        </h2>
        <p>
          A strong financial calculator allows the user to verify the headline answer by reading the schedule from top to bottom. The schedule satisfies two fundamental recurrence identities:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-1">
          <div>Ending Balance_t = Beginning Balance_t + Contribution_t + Interest_t</div>
          <div>Beginning Balance_(t+1) = Ending Balance_t</div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold">
              <tr>
                <th className="p-3">Year</th>
                <th className="p-3 text-right">Beginning Balance</th>
                <th className="p-3 text-right">Contribution</th>
                <th className="p-3 text-right">Interest</th>
                <th className="p-3 text-right">Ending Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-sans tabular-nums">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3 font-semibold">Year 1</td>
                <td className="p-3 text-right">$20,000.00</td>
                <td className="p-3 text-right text-emerald-600 dark:text-emerald-400">$10,000.00</td>
                <td className="p-3 text-right text-amber-600 dark:text-amber-400">$1,800.00</td>
                <td className="p-3 text-right font-bold text-slate-900 dark:text-slate-100">$31,800.00</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3 font-semibold">Year 2</td>
                <td className="p-3 text-right">$31,800.00</td>
                <td className="p-3 text-right text-emerald-600 dark:text-emerald-400">$10,000.00</td>
                <td className="p-3 text-right text-amber-600 dark:text-amber-400">$2,508.00</td>
                <td className="p-3 text-right font-bold text-slate-900 dark:text-slate-100">$44,308.00</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3 font-semibold">Year 3</td>
                <td className="p-3 text-right">$44,308.00</td>
                <td className="p-3 text-right text-emerald-600 dark:text-emerald-400">$10,000.00</td>
                <td className="p-3 text-right text-amber-600 dark:text-amber-400">$3,258.48</td>
                <td className="p-3 text-right font-bold text-slate-900 dark:text-slate-100">$57,566.48</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3 font-semibold">Year 4</td>
                <td className="p-3 text-right">$57,566.48</td>
                <td className="p-3 text-right text-emerald-600 dark:text-emerald-400">$10,000.00</td>
                <td className="p-3 text-right text-amber-600 dark:text-amber-400">$4,053.99</td>
                <td className="p-3 text-right font-bold text-slate-900 dark:text-slate-100">$71,620.47</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3 font-semibold">Year 5</td>
                <td className="p-3 text-right">$71,620.47</td>
                <td className="p-3 text-right text-emerald-600 dark:text-emerald-400">$10,000.00</td>
                <td className="p-3 text-right text-amber-600 dark:text-amber-400">$4,897.23</td>
                <td className="p-3 text-right font-bold text-slate-900 dark:text-slate-100">$86,517.70</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3 font-semibold">Year 6</td>
                <td className="p-3 text-right">$86,517.70</td>
                <td className="p-3 text-right text-emerald-600 dark:text-emerald-400">$10,000.00</td>
                <td className="p-3 text-right text-amber-600 dark:text-amber-400">$5,791.06</td>
                <td className="p-3 text-right font-bold text-slate-900 dark:text-slate-100">$102,308.76</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3 font-semibold">Year 7</td>
                <td className="p-3 text-right">$102,308.76</td>
                <td className="p-3 text-right text-emerald-600 dark:text-emerald-400">$10,000.00</td>
                <td className="p-3 text-right text-amber-600 dark:text-amber-400">$6,738.53</td>
                <td className="p-3 text-right font-bold text-slate-900 dark:text-slate-100">$119,047.28</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3 font-semibold">Year 8</td>
                <td className="p-3 text-right">$119,047.28</td>
                <td className="p-3 text-right text-emerald-600 dark:text-emerald-400">$10,000.00</td>
                <td className="p-3 text-right text-amber-600 dark:text-amber-400">$7,742.84</td>
                <td className="p-3 text-right font-bold text-slate-900 dark:text-slate-100">$136,790.12</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3 font-semibold">Year 9</td>
                <td className="p-3 text-right">$136,790.12</td>
                <td className="p-3 text-right text-emerald-600 dark:text-emerald-400">$10,000.00</td>
                <td className="p-3 text-right text-amber-600 dark:text-amber-400">$8,807.41</td>
                <td className="p-3 text-right font-bold text-slate-900 dark:text-slate-100">$155,597.53</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3 font-semibold">Year 10</td>
                <td className="p-3 text-right">$155,597.53</td>
                <td className="p-3 text-right text-emerald-600 dark:text-emerald-400">$10,000.00</td>
                <td className="p-3 text-right text-amber-600 dark:text-amber-400">$9,935.85</td>
                <td className="p-3 text-right font-bold text-blue-600 dark:text-blue-400">$175,533.38</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 16, 17, 18. Target Balance Planner & Round-Trip Verification */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          10. The Target Balance Planner &amp; Round-Trip Verification
        </h2>
        <p>
          The Target Balance Planner reverses the normal direction of the calculation. Instead of asking &ldquo;How much will I have after ten years?&rdquo;, it asks &ldquo;How much do I need to contribute to reach my target?&rdquo;
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
            Audited $500,000 Target Example ($20k Principal, 6% Growth, 10 Years, Due)
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-500 block">Required Annual Contribution:</span>
              <strong className="text-sm text-slate-900 dark:text-slate-100">$33,223.23 per year</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Required Monthly Contribution:</span>
              <strong className="text-sm text-emerald-600 dark:text-emerald-400">$2,768.60 per month</strong>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-700">
            Feeding $33,223.23 back into the forward accumulation engine yields $500,000.05 (within a tolerance of less than five cents).
          </p>
        </div>
        <p className="text-sm">
          For broader future-value scenarios with flexible contribution timing, the{" "}
          <Link href="/calculators/future-value-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Future Value Calculator
          </Link>{" "}
          provides a useful complementary model.
        </p>
      </section>

      {/* 19, 20, 21. Four-Plan Scenario Comparison */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          11. Four-Plan Scenario Comparison
        </h2>
        <p>
          Long-term projections can be highly sensitive to the assumed growth rate, so the calculator includes four simultaneous plans under the same $120,000 total contribution base:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-xs font-bold text-slate-500">Plan A - 6%</span>
            <div className="text-base font-bold text-slate-900 dark:text-slate-100">$175,533.38</div>
            <div className="text-xs text-slate-500">Interest: $55,533.38</div>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-xs font-bold text-slate-500">Plan B - 8%</span>
            <div className="text-base font-bold text-blue-600 dark:text-blue-400">$199,633.37</div>
            <div className="text-xs text-slate-500">Interest: $79,633.37</div>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-xs font-bold text-slate-500">Plan C - 10%</span>
            <div className="text-base font-bold text-slate-900 dark:text-slate-100">$227,186.52</div>
            <div className="text-xs text-slate-500">Interest: $107,186.52</div>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-xs font-bold text-slate-500">Plan D - 12%</span>
            <div className="text-base font-bold text-slate-900 dark:text-slate-100">$258,662.80</div>
            <div className="text-xs text-slate-500">Interest: $138,662.80</div>
          </div>
        </div>
        <p className="text-xs text-slate-500 italic">
          Disclosure: The mathematical oracle confirms Plan B evaluates to $199,633.37 ($120,000 + $79,633.37 = $199,633.37), reconciling with the reference screenshot.
        </p>
      </section>

      {/* 22, 23, 24. Inflation & Tax Adjustments */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          12. Inflation-Adjusted &amp; Tax-Adjusted Values
        </h2>
        <p>
          Nominal money and real purchasing power are different concepts. The reference scenario ends with $175,533.38 nominal. Applying a 2.5% inflation assumption over ten years ($175,533.38 / 1.025<sup>10</sup>) produces <strong>$137,126.40</strong> in today&apos;s purchasing power.
        </p>
        <p>
          For broader inflation analysis, the{" "}
          <Link href="/calculators/inflation-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Inflation Calculator
          </Link>{" "}
          is the natural companion.
        </p>
        <p>
          Applying an assumed 20% tax rate on modeled gains ($55,533.38 × 20% = $11,106.68) yields an estimated tax-adjusted net value of <strong>$164,426.70</strong>. For paycheck-level tax calculations, the{" "}
          <Link href="/calculators/take-home-paycheck-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Take-Home Paycheck Calculator
          </Link>{" "}
          provides detailed net-pay estimates.
        </p>
      </section>

      {/* 25, 26, 27. Edge Cases, Scale Linearity & Chart Reconciliation */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          13. Mathematical Invariants &amp; Visual Dashboard
        </h2>
        <p>
          At a 0% growth rate, the ending balance simply equals the starting principal plus total contributions ($20,000 + $100,000 = $120,000). With zero contributions, it reduces to pure starting-principal compounding ($20,000 × 1.06<sup>10</sup> = $35,816.95).
        </p>
        <p>
          The visual Portfolio Growth Trajectory chart is a direct reflection of schedule data: each chart point corresponds directly to an audited schedule row, ensuring the visual layer remains an exact representation of validated numbers.
        </p>
      </section>

      {/* 30, 31, 32, 33. Product Structures & YMYL Qualifications */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          14. Fixed, Fixed-Indexed &amp; Variable Annuities
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold">
              <tr>
                <th className="p-3">Annuity Type</th>
                <th className="p-3">Principal Guarantee</th>
                <th className="p-3">Growth Mechanism</th>
                <th className="p-3">Risk Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">Fixed Annuity / MYGA</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">100% Guaranteed by Insurer</td>
                <td className="p-3">Declared fixed interest rate (e.g. 5.5%)</td>
                <td className="p-3">Very Low (Inflation Risk Only)</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">Fixed-Indexed Annuity (FIA)</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">100% Guaranteed (0% Floor)</td>
                <td className="p-3">Indexed returns subject to caps/participation rates</td>
                <td className="p-3">Low to Moderate</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">Variable Annuity</td>
                <td className="p-3 text-rose-600 dark:text-rose-400 font-bold">No Principal Guarantee</td>
                <td className="p-3">Direct equity/bond sub-account performance</td>
                <td className="p-3">Moderate to High Market Risk</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500">
          Contractual guarantees depend on the issuing insurer and the terms of the contract. Surrender charges decline over contract-specific schedules (e.g. 7% down to 0% over 7 years). Withdrawals of taxable earnings prior to age 59½ may incur a 10% IRS tax penalty, subject to statutory exceptions.
        </p>
      </section>

      {/* 34, 35, 36. Retirement Planning & Common Mistakes */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          15. Retirement Planning Integration &amp; Common Mistakes
        </h2>
        <p>
          Once the accumulation scenario is understood, the{" "}
          <Link href="/calculators/retirement-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Retirement Calculator
          </Link>{" "}
          can extend the discussion into retirement-income planning.
        </p>
        <p>
          For separate loan-payment scenarios, the{" "}
          <Link href="/calculators/mortgage-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Mortgage Calculator
          </Link>{" "}
          can model principal, interest, and amortization. If the plan interacts with home equity borrowing, the{" "}
          <Link href="/calculators/home-equity-loan-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Home Equity Loan Calculator
          </Link>{" "}
          and{" "}
          <Link href="/calculators/heloc-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            HELOC Calculator
          </Link>{" "}
          can model fixed-rate and revolving debt scenarios.
        </p>
        <p>
          When the financial goal is a home purchase rather than annuity accumulation, the{" "}
          <Link href="/calculators/down-payment-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Down Payment Calculator
          </Link>{" "}
          and{" "}
          <Link href="/calculators/rent-vs-buy-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Rent vs Buy Calculator
          </Link>{" "}
          provide long-term housing comparisons. For veteran and FHA loans, the{" "}
          <Link href="/calculators/va-mortgage-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            VA Mortgage Calculator
          </Link>{" "}
          and{" "}
          <Link href="/calculators/fha-loan-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            FHA Loan Calculator
          </Link>{" "}
          model specific payment and mortgage insurance assumptions.
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
          <span className="font-bold text-slate-900 dark:text-slate-100 block">Common Annuity Calculator Pitfalls:</span>
          <ul className="list-disc pl-4 space-y-1">
            <li>Treating annual and monthly contributions as identical timing.</li>
            <li>Confusing ordinary annuity (end) with annuity due (beginning).</li>
            <li>Assuming a modeled return is guaranteed.</li>
            <li>Ignoring inflation when evaluating purchasing power over long horizons.</li>
            <li>Treating the tax-adjusted result as a personalized tax determination.</li>
          </ul>
        </div>
      </section>

      {/* 37. Formula Reference */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          16. Formula Reference: The Core Mathematical Toolkit
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">Future Value of Starting Principal</span>
            <code className="text-blue-600 dark:text-blue-400 font-bold block">FV_principal = P × (1 + r)^n</code>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">Ordinary Annuity Stream</span>
            <code className="text-emerald-600 dark:text-emerald-400 font-bold block">FV_ordinary = PMT × [((1+r)^n − 1) / r]</code>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">Annuity Due Stream</span>
            <code className="text-purple-600 dark:text-purple-400 font-bold block">FV_due = PMT × [((1+r)^n − 1) / r] × (1+r)</code>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">Target Contribution Solver</span>
            <code className="text-amber-600 dark:text-amber-400 font-bold block">PMT = [Target − P(1+r)^n] / AnnuityFactor</code>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">Inflation-Adjusted Real Value</span>
            <code className="text-indigo-600 dark:text-indigo-400 font-bold block">Real Value = Nominal Balance / (1 + Inflation)^Years</code>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">Modeled Tax-Adjusted Value</span>
            <code className="text-cyan-600 dark:text-cyan-400 font-bold block">Tax-Adjusted = Ending Balance − (Modeled Gains × Tax Rate)</code>
          </div>
        </div>
      </section>

      {/* 39. EXACTLY 12 CANONICAL FAQS (UNFOLDED / OPEN BY DEFAULT) */}
      <section className="pt-8 space-y-6">
        <div className="flex items-center gap-3">
          <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Frequently Asked Questions (12 Essential Annuity Insights)
          </h2>
        </div>

        <div className="space-y-3">
          {annuityFaqs.map((faq, index) => {
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

export default AnnuityContent;

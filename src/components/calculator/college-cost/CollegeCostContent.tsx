"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  DollarSign,
  PieChart as PieIcon,
  BookOpen,
  HelpCircle,
  ShieldCheck,
  Zap,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Target,
  Scale,
  Calculator,
  FileText,
  Clock,
  Layers,
  Sparkles,
  TrendingUp,
  Building2,
  Landmark,
} from "lucide-react";

export const collegeCostFaqs = [
  {
    question: "What is the average total cost of college including tuition, room, and board?",
    answer:
      "According to the College Board's Trends in College Pricing, average annual published costs are ~$28,000–$30,000 for in-state public four-year universities, ~$44,000–$48,000 for out-of-state public institutions, and ~$58,000–$62,000+ for private non-profit universities. These figures encompass tuition, mandatory fees, housing, meal plans, books, and basic living supplies.",
  },
  {
    question: "What is a 529 College Savings Plan and what are its tax advantages?",
    answer:
      "A 529 plan is a state-sponsored, tax-advantaged investment vehicle designed specifically for education savings. Contributions grow 100% free of federal and state capital gains taxes, and withdrawals for qualified higher-education expenses (tuition, room, board, books, computers) are completely income-tax-free. Over 30 states also provide state income tax deductions or credits for contributions.",
  },
  {
    question: "How does higher education tuition inflation compare to general CPI?",
    answer:
      "Historically, college tuition inflation has compounded at an average annual rate of 4.5% to 6.0% over the past three decades—approximately 1.5x to 2x the standard Consumer Price Index (CPI). At a 5% inflation rate, college costs double roughly every 14.4 years.",
  },
  {
    question: "What is the '1/3 Rule' of college funding?",
    answer:
      "The 1/3 Rule is a classic financial planning guideline recommending that families target funding 1/3 of total degree costs from past savings (529 plans, taxable accounts), 1/3 from current income and cash flow during the enrollment years, and 1/3 from future earnings via manageable student loans and grants.",
  },
  {
    question: "What is the Student Aid Index (SAI) and how does the FAFSA treat 529 assets?",
    answer:
      "The Student Aid Index (SAI, formerly Expected Family Contribution or EFC) is calculated by the Free Application for Federal Student Aid (FAFSA). 529 accounts owned by parents are treated favorably as parental assets, assessed at a maximum rate of 5.64% of asset value, whereas student-owned non-529 assets (like UTMA/UGMA accounts) are assessed at a steep 20%.",
  },
  {
    question: "What happens to leftover money in a 529 plan if the child gets a scholarship or does not attend?",
    answer:
      "Under the SECURE 2.0 Act, up to $35,000 in unused 529 funds can be rolled over tax-free and penalty-free into a Roth IRA in the beneficiary's name (subject to account tenure and annual Roth IRA contribution limits). Additionally, you can transfer the beneficiary designation to another qualifying family member without tax consequences, or withdraw penalty-free up to the amount of any scholarship received.",
  },
  {
    question: "What is the difference between Direct Subsidized and Unsubsidized Federal Student Loans?",
    answer:
      "Direct Subsidized Loans are need-based undergraduate loans where the federal government pays all accruing interest while the student is enrolled at least half-time. Direct Unsubsidized Loans are non-need-based, and interest begins accruing immediately upon loan disbursement.",
  },
  {
    question: "How much total student loan debt is considered safe to borrow?",
    answer:
      "A standard financial planning rule of thumb dictates that a student's total cumulative undergraduate student loan debt should never exceed their anticipated first-year post-graduation starting salary. This keeps monthly loan repayments below 10% of gross entry-level income.",
  },
  {
    question: "Can 529 plan funds be used for off-campus apartment rent and groceries?",
    answer:
      "Yes. Qualified 529 expenses include off-campus rent and food, up to the university's official published Cost of Attendance (COA) room-and-board allowance for that academic year.",
  },
  {
    question: "What is 529 plan 'Superfunding' (5-year gift tax averaging)?",
    answer:
      "IRS rules allow individuals to frontload up to 5 years of annual gift-tax exclusions into a 529 plan in a single year without triggering gift taxes (e.g., up to $90,000 per individual or $180,000 for married couples filing jointly in 2024), maximizing decades of compound tax-free growth.",
  },
  {
    question: "What is the difference between published sticker price and net price?",
    answer:
      "The published sticker price is the full advertised cost of tuition and fees before financial aid. The net price is the actual amount a family pays out of pocket after deducting non-repayable gift aid, institutional grants, and merit scholarships.",
  },
  {
    question: "How do college savings compare inside a 529 vs. a standard taxable brokerage account?",
    answer:
      "In a taxable brokerage account, annual dividends, interest distributions, and capital gains are subject to taxes (typically 15%–20% federal plus state taxes), creating an annual 1.0%–1.5% drag on compound returns. Over 18 years, a tax-free 529 plan typically generates 20% to 30% more spendable education capital for the exact same monthly contribution.",
  },
];

export function CollegeCostContent() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="space-y-10 text-slate-900 dark:text-slate-100 font-sans">
      {/* 1. INTRODUCTION */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
          <BookOpen className="h-4 w-4" /> Comprehensive Higher Education Guide
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
          1. Introduction to College Cost Planning
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Funding higher education represents one of the largest financial commitments a family will undertake. Unlike standard consumer goods, college expenses compound at inflation rates that have historically exceeded general consumer price index (CPI) measures. Successfully preparing for a 4-year degree requires analyzing the interplay between <strong>future tuition inflation</strong>, <strong>tax-advantaged 529 investment compounding</strong>, <strong>expected financial aid</strong>, and <strong>sustainable student debt thresholds</strong>.
        </p>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          This calculator provides an end-to-end higher education planning suite. It projects future total attendance costs across distinct institutional tiers, computes the required monthly sinking-fund contributions to meet target savings goals, quantifies the tax alpha generated by 529 accounts over taxable accounts, and models student loan repayment schedules to ensure future graduates avoid unmanageable debt burdens.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">In-State Public</span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              ~$28,000–$30,000/yr published cost. State taxpayer subsidies make this the most cost-effective 4-year pathway.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Out-of-State Public</span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              ~$44,000–$48,000/yr published cost. Non-resident tuition premiums add $60,000–$80,000+ over 4 years.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">Private Non-Profit</span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              ~$58,000–$62,000+/yr published cost. High sticker prices are often offset by significant institutional endowment grants.
            </p>
          </div>
        </div>
      </section>

      {/* 2. MATHEMATICAL CONCEPT */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Scale className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          2. Mathematical Concept: Tuition Inflation &amp; Sinking-Fund Compounding
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The mathematics of college planning operates across two competing exponential curves:
        </p>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 list-disc pl-5">
          <li>
            <strong>Cost Escalation Curve:</strong> If a university currently costs $C_0$ annually and inflation compounds at rate $r_c$, the cost during year $k$ of attendance (where college starts in $y$ years) is:
            <br />
            <span className="font-mono text-xs text-blue-600 dark:text-blue-400">
              Cost(k) = C_0 × (1 + r_c)^(y + k - 1)
            </span>
          </li>
          <li>
            <strong>Sinking-Fund Investment Accumulation:</strong> Monthly savings deposits $PMT$ invested at an annual expected return $r_i$ (monthly rate $i = r_i / 12$) over $n = 12 \times y$ months accumulate according to the future value of an ordinary annuity:
            <br />
            <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400">
              FV_savings = PMT × [((1 + i)^n − 1) / i] + PV_0 × (1 + i)^n
            </span>
          </li>
          <li>
            <strong>Tax Drag Advantage (529 vs Taxable):</strong> In a taxable account, returns are reduced by annual taxes on dividends and capital gains (r_taxable = r_i × (1 − t)), reducing accumulated capital by 15%–30% over an 18-year horizon.
          </li>
        </ul>
      </section>

      {/* 3. FORMULAS SECTION */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Calculator className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          3. Core Formulas &amp; Variable Definitions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Total 4-Year College Cost Sum
            </h3>
            <div className="space-y-1.5 font-mono text-xs text-slate-800 dark:text-slate-200">
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                Total Projected Cost = Sum from k=1 to D [ C_0 × (1 + r_c)^(y + k - 1) ]
              </div>
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                Target Savings Goal = Total Cost × Savings Target % − Financial Aid
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Required Monthly Sinking-Fund Contribution
            </h3>
            <div className="space-y-1.5 font-mono text-xs text-slate-800 dark:text-slate-200">
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                Net Target Shortfall = Target Goal − [ PV_savings × (1 + i)^n ]
              </div>
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                Required PMT = Net Shortfall ÷ [ ((1 + i)^n − 1) ÷ i ]
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW THE CALCULATION WORKS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          4. How the Calculation Works (Step-by-Step)
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex gap-3 items-start">
            <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">Step 1:</span>
            <div>
              <strong>Establish Today's Baseline Cost:</strong> Determine today's annual cost of attendance including tuition, mandatory fees, housing, meal plans, books, and transportation.
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex gap-3 items-start">
            <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">Step 2:</span>
            <div>
              <strong>Compound Costs Over the Time Horizon:</strong> Apply the annual higher education inflation rate (e.g., 5.0%) across each year until college matriculation and through all 4 enrollment years.
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex gap-3 items-start">
            <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">Step 3:</span>
            <div>
              <strong>Project Existing Savings Growth:</strong> Calculate the future balance of current 529 / college savings assuming compound market growth over the savings timeframe.
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex gap-3 items-start">
            <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">Step 4:</span>
            <div>
              <strong>Solve for Required Monthly Deposits &amp; Loan Gaps:</strong> Determine the monthly contribution needed to meet the family's target coverage percentage, and calculate the remaining funding gap to be addressed through student loans, grants, or work-study.
            </div>
          </div>
        </div>
      </section>

      {/* 5. WORKED EXAMPLES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          5. Worked Numerical Examples
        </h2>

        <div className="space-y-4">
          {/* Example 1 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Example 1: In-State Public University (College in 3 Years, 4-Year Degree)
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-semibold">
                In-State Public
              </span>
            </div>
            <div className="text-xs font-mono space-y-1 text-slate-800 dark:text-slate-200">
              <div>1. Current Annual Cost = $30,990 | Inflation Rate = 5.0% | Horizon = 3 Years</div>
              <div>2. Year 1 Cost = $30,990 × (1.05)^3 = $35,875</div>
              <div>3. Year 2 Cost = $35,875 × 1.05 = $37,668</div>
              <div>4. Year 3 Cost = $37,668 × 1.05 = $39,552</div>
              <div>5. Year 4 Cost = $39,552 × 1.05 = $41,529</div>
              <div className="text-blue-600 dark:text-blue-400 font-bold pt-1">
                6. Total 4-Year Projected Cost = $154,624
              </div>
              <div className="text-slate-600 dark:text-slate-400 font-sans text-[11px]">
                35% Target Savings Goal = $54,118. At 5% return, required monthly savings = $1,400/month.
              </div>
            </div>
          </div>

          {/* Example 2 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wider text-purple-600 dark:text-purple-400">
                Example 2: Newborn Child to Private University (College in 18 Years)
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 font-semibold">
                Private 18-Year Plan
              </span>
            </div>
            <div className="text-xs font-mono space-y-1 text-slate-800 dark:text-slate-200">
              <div>1. Current Annual Cost = $60,000 | Inflation Rate = 5.0% | Horizon = 18 Years</div>
              <div>2. Year 1 Projected Cost = $60,000 × (1.05)^18 = $144,397/year</div>
              <div>3. Total 4-Year Projected Cost ≈ $622,370</div>
              <div>4. 50% Savings Target = $311,185</div>
              <div className="text-emerald-600 dark:text-emerald-400 font-bold pt-1">
                5. Required Monthly Savings (at 7% return over 18 years) ≈ $725/month
              </div>
              <div className="text-slate-600 dark:text-slate-400 font-sans text-[11px]">
                Total Contributions = $156,600 | Compound Investment Growth = $154,585 (Tax-Free in 529 Plan).
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. VISUAL UNDERSTANDING & COMPARISON MATRIX */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          6. Visual Understanding: 4-Year Projected Total Cost by Horizon
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The table below illustrates total 4-year undergraduate projected outlays based on 5% annual tuition inflation across different college start horizons:
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-100 dark:bg-slate-800 font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3">College Horizon</th>
                <th className="p-3">Today's Annual Cost</th>
                <th className="p-3">In-State Public (4-Yr Total)</th>
                <th className="p-3">Out-of-State Public (4-Yr Total)</th>
                <th className="p-3">Private Non-Profit (4-Yr Total)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[11px]">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-sans font-medium text-slate-900 dark:text-slate-100">Starts Today (Year 0)</td>
                <td className="p-3">$30k / $46k / $60k</td>
                <td className="p-3">$133,560</td>
                <td className="p-3">$198,260</td>
                <td className="p-3">$258,600</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 bg-blue-50/50 dark:bg-blue-950/20 font-semibold">
                <td className="p-3 font-sans text-blue-700 dark:text-blue-300">Starts in 3 Years</td>
                <td className="p-3">$30k / $46k / $60k</td>
                <td className="p-3 text-blue-700 dark:text-blue-300">$154,624</td>
                <td className="p-3 text-blue-700 dark:text-blue-300">$229,510</td>
                <td className="p-3 text-blue-700 dark:text-blue-300">$299,360</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-sans font-medium text-slate-900 dark:text-slate-100">Starts in 7 Years</td>
                <td className="p-3">$30k / $46k / $60k</td>
                <td className="p-3">$187,950</td>
                <td className="p-3">$278,980</td>
                <td className="p-3">$363,890</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-sans font-medium text-slate-900 dark:text-slate-100">Starts in 12 Years</td>
                <td className="p-3">$30k / $46k / $60k</td>
                <td className="p-3">$239,880</td>
                <td className="p-3">$356,060</td>
                <td className="p-3">$464,430</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-sans font-medium text-slate-900 dark:text-slate-100">Starts in 18 Years (Newborn)</td>
                <td className="p-3">$30k / $46k / $60k</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400">$321,460</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400">$477,150</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400">$622,370</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          7. Critical College Planning Pitfalls
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
            <h3 className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              1. Underestimating Tuition Inflation
            </h3>
            <p className="text-amber-800/90 dark:text-amber-300/90 text-xs">
              Using general CPI (2%–3%) instead of higher education inflation (4%–6%) leaves savings shortfalls of $50,000 to $150,000+ per student by matriculation.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
            <h3 className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              2. Borrowing More Than Expected Starting Salary
            </h3>
            <p className="text-amber-800/90 dark:text-amber-300/90 text-xs">
              Graduating with student loan debt exceeding entry-level salary forces monthly debt service beyond 15%–20% of net take-home pay, delaying homeownership and retirement savings.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
            <h3 className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              3. Holding Savings in Student UGMA/UTMA Accounts
            </h3>
            <p className="text-amber-800/90 dark:text-amber-300/90 text-xs">
              Custodial UGMA/UTMA assets penalize FAFSA aid packages at a steep 20% rate, whereas parent-owned 529 plans are assessed at only 5.64%.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
            <h3 className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              4. Waiting for High School to Begin Saving
            </h3>
            <p className="text-amber-800/90 dark:text-amber-300/90 text-xs">
              Starting at age 14 requires saving ~$2,200/month for an in-state degree, whereas starting at birth requires only ~$300/month due to 18 years of compound market growth.
            </p>
          </div>
        </div>
      </section>

      {/* 8. PRACTICAL APPLICATIONS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Landmark className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          8. Practical Strategies &amp; Advanced 529 Optimization
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">529 Superfunding</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Grandparents and parents can frontload 5 years of gift tax exclusions in a single deposit ($90,000 individual, $180,000 joint) to accelerate decades of compound tax-free growth.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">SECURE 2.0 Roth Rollover</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Unused 529 balances up to $35,000 can be rolled penalty-free into the beneficiary's Roth IRA after 15 years, jumpstarting retirement wealth.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Institutional Merit Grants</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Private universities frequently offer $15,000–$35,000/yr tuition discounts based on GPA and standardized tests, bringing net cost close to public flagship rates.
            </p>
          </div>
        </div>
      </section>

      {/* 9. FREQUENTLY ASKED QUESTIONS */}
      <section className="space-y-4 pt-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
            9. Frequently Asked Questions (FAQ)
          </h2>
        </div>

        <div className="space-y-3">
          {collegeCostFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-100 flex items-start gap-2.5">
                    <span className="text-blue-600 dark:text-blue-400 font-bold shrink-0">
                      Q{idx + 1}.
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  <div className="shrink-0 text-slate-400">
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/80 leading-relaxed font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 10. SUMMARY & KEY TAKEAWAYS */}
      <section className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-3">
        <h3 className="font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          10. Educational Key Takeaways
        </h3>
        <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 list-disc pl-5 leading-relaxed">
          <li><strong>Compound Inflation:</strong> College expenses double approximately every 14 years at 5% tuition inflation.</li>
          <li><strong>The 1/3 Framework:</strong> Aim for 1/3 past savings, 1/3 current cash flow, and 1/3 financial aid and manageable loans.</li>
          <li><strong>529 Efficiency:</strong> Tax-free growth eliminates annual dividend tax drag, increasing terminal savings by 20%–30%.</li>
          <li><strong>Borrowing Boundary:</strong> Keep total undergraduate borrowing below first-year expected entry salary.</li>
          <li><strong>FAFSA Optimization:</strong> Maintain college savings under parent ownership (5.64% assessment) rather than student ownership (20%).</li>
        </ul>
      </section>
    </div>
  );
}

export default CollegeCostContent;

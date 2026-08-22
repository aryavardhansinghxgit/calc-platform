"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  HelpCircle,
  TrendingUp,
  ShieldCheck,
  DollarSign,
  PieChart,
  Clock,
  ArrowRight,
  Calculator,
} from "lucide-react";

export function RetirementContent() {
  const faqs = [
    {
      question: "What is the 4% Rule for retirement withdrawals?",
      answer:
        "Historical research such as the Trinity Study has examined 4% initial withdrawal scenarios over 30-year retirement periods under specific portfolio, market-return, inflation, and rebalancing assumptions. The 4% figure is a historical planning benchmark, not a guarantee of future portfolio survival.",
    },
    {
      question: "How is an income-replacement percentage used in retirement planning?",
      answer:
        "Many retirement-planning frameworks use 70% to 80% of pre-retirement gross income as a starting assumption to account for eliminated work-related expenses, payroll taxes, and ongoing savings contributions. Actual post-retirement spending needs vary substantially depending on lifestyle, debt, housing, and healthcare requirements.",
    },
    {
      question: "Is saving 10% of income enough for retirement?",
      answer:
        "Saving 10%–15% of income is a commonly cited planning rule of thumb, but an appropriate savings rate depends on retirement age, current assets, income growth, expected investment returns, employer matching benefits, and personal spending targets.",
    },
    {
      question: "How does inflation impact my retirement savings?",
      answer:
        "Inflation erodes purchasing power over time. Under an illustrative 3% annual inflation rate over 32 years, prices double roughly every 24 years, meaning $1,000,000 at age 67 will purchase what approximately $500,000 purchases today in real terms.",
    },
    {
      question: "What is the difference between a Traditional IRA and a Roth IRA?",
      answer:
        "Traditional IRAs allow tax-deductible contributions today, with withdrawals in retirement taxed as ordinary income. Roth IRAs are funded with after-tax dollars today, and qualified distributions of contributions and earnings (after meeting the 5-year holding period and reaching age 59½) are tax-free.",
    },
    {
      question: "How does an employer 401(k) match work?",
      answer:
        "Employer matching contributions provide an immediate benefit on matched employee contributions, depending on the plan's specific matching formula, annual contribution limits, and vesting schedule.",
    },
    {
      question: "What is Full Retirement Age (FRA) for Social Security?",
      answer:
        "In the United States, Full Retirement Age (FRA) is between age 66 and 67 depending on birth year. Claiming before Full Retirement Age permanently reduces the monthly benefit; the exact reduction depends on your birth year and claiming age, while delaying claiming to age 70 increases monthly benefits through delayed retirement credits.",
    },
    {
      question: "What is a Defined Benefit Pension vs. a Defined Contribution Plan?",
      answer:
        "A defined benefit pension provides a predetermined monthly benefit formula paid by an employer based on salary and service years. A defined contribution plan (like a 401k or 403b) depends on employee and employer contributions and market investment performance.",
    },
    {
      question: "What is an Immediate Annuity vs. a Deferred Annuity?",
      answer:
        "An immediate annuity converts a lump-sum premium into ongoing monthly income payments starting immediately. A deferred annuity accumulates investment growth on a tax-deferred basis until an agreed future distribution date.",
    },
    {
      question: "Should I count Social Security when calculating my nest egg?",
      answer:
        "You can include an estimated Social Security benefit as other retirement income in the model. Social Security benefits generally receive annual cost-of-living adjustments, but actual benefit amounts depend on earnings history, claiming age, and applicable rules.",
    },
    {
      question: "How does the retirement savings gap affect my required monthly contributions?",
      answer:
        "A retirement savings gap indicates that your projected accumulation falls short of your capitalized target nest egg. To eliminate the gap, you can increase your monthly contributions, extend your planned retirement age, or adjust your expected post-retirement living expenses.",
    },
    {
      question: "What is Sequence of Returns Risk?",
      answer:
        "Sequence of returns risk occurs when poor market returns happen in the years immediately before or early in retirement, accelerating portfolio depletion if fixed withdrawals continue during market downturns.",
    },
    {
      question: "What is the FIRE Movement (Financial Independence, Retire Early)?",
      answer:
        "FIRE practitioners target high annual savings rates (often 50% or more) to accumulate approximately 25 times their annual living expenses, aiming to achieve financial independence before traditional retirement ages.",
    },
    {
      question: "How does asset allocation change as you approach retirement?",
      answer:
        "Investors frequently adjust asset allocation from aggressive equity growth during early working years toward more conservative allocations (incorporating fixed income and cash reserves) near retirement to reduce portfolio volatility.",
    },
    {
      question: "What is a Required Minimum Distribution (RMD)?",
      answer:
        "Under federal tax law (SECURE 2.0), traditional 401(k) and traditional IRA owners must begin taking mandatory annual taxable withdrawals (RMDs) starting at age 73 (increasing to age 75 in 2033).",
    },
    {
      question: "Can I withdraw from my 401(k) or IRA without penalty before age 59½?",
      answer:
        "Early distributions before age 59½ may be subject to income tax and a 10% additional federal tax, although numerous account-specific exceptions exist. The applicable exceptions differ between IRAs and employer plans.",
    },
    {
      question: "How much healthcare expense should I plan for in retirement?",
      answer:
        "Healthcare can represent a substantial retirement expense, including Medicare premiums, supplemental coverage, prescriptions, and out-of-pocket costs. Actual costs vary by health status, coverage, location, and longevity.",
    },
    {
      question: "What is a Health Savings Account (HSA) for retirement?",
      answer:
        "HSAs offer triple-tax advantages: tax-deductible contributions, tax-free growth, and tax-free withdrawals for qualified medical expenses. After age 65, nonmedical distributions are subject to ordinary income tax without the 20% penalty.",
    },
    {
      question: "What is the Catch-up Contribution limit?",
      answer:
        "Catch-up contribution limits vary by account type and age and are adjusted under federal law. For current contribution limits, see the applicable 401(k), IRA, or other retirement-plan rules.",
    },
    {
      question: "Why use an online Retirement Calculator?",
      answer:
        "An online retirement calculator projects compounding wealth growth, models inflation and salary progression, evaluates post-retirement withdrawal capacities, and illustrates accumulation schedules for financial planning.",
    },
  ];

  return (
    <div className="space-y-12 mt-8 pt-8 text-slate-800 dark:text-slate-200">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex items-center gap-3 text-blue-400 font-semibold text-xs tracking-wider uppercase mb-2">
          <BookOpen className="h-4 w-4" /> Retirement Planning &amp; Wealth Projection Guide
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-3">
          The Mathematics of Retirement: Capital Accumulation, Inflation &amp; Portfolio Decumulation
        </h2>
        <p className="text-zinc-300 text-sm leading-relaxed max-w-4xl">
          Building a secure retirement requires balancing compounding growth during your working years against inflation, income replacement ratios, other recurring income sources, and systematic decumulation in retirement.
        </p>
      </div>

      {/* 15 Educational Content Sections */}
      <div className="space-y-10 text-sm leading-relaxed">
        
        {/* Section 1: What Is a Retirement Calculator? */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Calculator className="h-5 w-5 text-blue-600" />
            1. What Is a Retirement Calculator?
          </h2>
          <p>
            A <strong>retirement calculator</strong> is a quantitative financial-planning model designed to help individuals project their long-term wealth trajectory, estimate future capital requirements, identify potential savings shortfalls, and evaluate sustainable withdrawal strategies. Rather than treating retirement as a single fixed event, comprehensive retirement modeling divides financial life into two distinct mathematical phases: the <strong>accumulation phase</strong> (working years dedicated to saving and compound investment growth) and the <strong>decumulation phase</strong> (retirement years dedicated to asset preservation and systematic liquidation).
          </p>
          <p>
            This retirement calculator features four dedicated calculation modes:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <li><strong>Mode 1: Target Retirement Nest Egg &amp; Savings Gap:</strong> Calculates the total capital needed at retirement based on salary growth, income replacement targets, inflation, and external income, comparing this target directly against your projected savings.</li>
            <li><strong>Mode 2: Required Retirement Savings Contribution:</strong> Solves the exact annual and monthly savings amounts required to reach a specific target nest egg by a planned retirement age.</li>
            <li><strong>Mode 3: Modeled Retirement Income / Withdrawal Capacity:</strong> Projects the sustainable annual and monthly cash flow a given nest egg can support across an assumed retirement lifespan under customizable real investment returns.</li>
            <li><strong>Mode 4: Modeled Retirement Portfolio Longevity:</strong> Simulates monthly portfolio depletion under a specified spending budget, identifying how many years and months savings may last before balance exhaustion.</li>
          </ul>
          <p className="text-xs bg-blue-50 dark:bg-blue-950/40 p-3.5 rounded-lg border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200">
            <strong>Model Transparency:</strong> Because every financial projection relies on baseline inputs—including annual salary growth, inflation, investment returns, and life expectancy—the results produced by this calculator are mathematical simulations under user-selected assumptions rather than guarantees of real-world portfolio performance. The calculations use a pre-tax baseline to illustrate asset growth principles.
          </p>
        </section>

        {/* Section 2: How Much Do You Need to Retire? */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-blue-600" />
            2. How Much Do You Need to Retire?
          </h2>
          <p>
            Determining your target retirement nest egg requires calculating the present value of all post-retirement living expenses that must be funded from your investment portfolio over your expected retirement horizon. This calculation accounts for salary increases during your career, the proportion of income needed after leaving the workforce, other recurring income sources, and the mathematical relationship between investment returns and inflation.
          </p>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-2">
            <div className="font-bold text-slate-900 dark:text-slate-100">Mode 1: Target Nest Egg Capitalization Formula</div>
            <div>Projected Final Salary = Current Salary × (1 + g)<sup>n</sup></div>
            <div>Gross Annual Need = Projected Final Salary × Income Replacement Ratio</div>
            <div>Inflated Other Income = (Monthly Other Income × 12) × (1 + i)<sup>n</sup></div>
            <div>Net Annual Need = Max(0, Gross Annual Need − Inflated Other Income)</div>
            <div>Fisher Real Return (r<sub>real</sub>) = (1 + r<sub>ret</sub>) / (1 + i) − 1</div>
            <div>Target Nest Egg = Net Annual Need × [1 − (1 + r<sub>real</sub>)<sup>−m</sup>] / r<sub>real</sub></div>
          </div>
          <div className="text-xs space-y-1 text-slate-600 dark:text-slate-400">
            <p><strong>Variables:</strong> <em>g</em> = annual salary growth rate; <em>n</em> = years to retirement; <em>i</em> = annual inflation rate; <em>r<sub>ret</sub></em> = annual return during retirement; <em>m</em> = retirement duration in years.</p>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs space-y-2">
            <div className="font-bold text-slate-900 dark:text-slate-100">Reconciled Benchmark Example (Baseline Scenario):</div>
            <p>For an individual aged 35 retiring at 67 with a life expectancy of 85 (<em>n</em> = 32, <em>m</em> = 18), earning $70,000 with 3% salary growth, 75% income replacement, 5% retirement return, 3% inflation, and $0 other income:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Projected Final Salary: $70,000 × (1.03)<sup>32</sup> = $180,255.79</li>
              <li>Gross Annual Need: $180,255.79 × 0.75 = $135,191.84 ($11,265.99/month)</li>
              <li>Fisher Real Return: (1 + 0.05) / (1 + 0.03) − 1 = 1.94174757%</li>
              <li>Target Nest Egg: $135,191.84 × [1 − (1.0194174757)<sup>−18</sup>] / 0.0194174757 = <strong>$2,037,219.54</strong> (Engine displays $2,037,220)</li>
            </ul>
          </div>
        </section>

        {/* Section 3: How Retirement Savings Grow Before Retirement */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            3. How Retirement Savings Grow Before Retirement
          </h2>
          <p>
            During the accumulation phase, your wealth expands through the simultaneous interaction of two financial forces: <strong>compound investment growth on existing assets</strong> and <strong>ongoing annual contributions from earned income</strong>.
          </p>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-2">
            <div>Future Value of Existing Savings: FV = PV × (1 + r)<sup>n</sup></div>
            <div>Annual Contribution in Year t: Contribution<sub>t</sub> = Salary<sub>t</sub> × Savings Rate %</div>
            <div>Mid-Year Compounding Balance: Balance<sub>t</sub> = Balance<sub>t−1</sub> + Contribution<sub>t</sub> + (Balance<sub>t−1</sub> + Contribution<sub>t</sub> / 2) × r</div>
          </div>
          <p>
            By assuming contributions occur evenly throughout the year, the mid-year compounding convention applies a full year of growth to the opening balance and half a year of growth to the current year&apos;s contributions. In our baseline scenario (starting with $30,000, saving 10% of an escalating $70,000 salary at a 6% annual return), total projected savings reach <strong>$1,125,687.31</strong> by age 67. To model asset accumulation independently of retirement dates, explore our <Link href="/calculators/investment-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-700">compound investment calculator</Link>.
          </p>
        </section>

        {/* Section 4: Inflation and Future Retirement Spending */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            4. Inflation and Future Retirement Spending
          </h2>
          <p>
            <strong>Inflation</strong> is the steady erosion of purchasing power over time. A dollar saved today will buy fewer goods and services decades from now. When modeling retirement needs spanning 30 to 50 years into the future, ignoring inflation produces severe underestimates of required capital.
          </p>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-2">
            <div>Future Living Expense = Current Living Expense × (1 + i)<sup>n</sup></div>
            <div>Purchasing Power Doubling Time (Rule of 72) ≈ 72 / (Annual Inflation Rate %)</div>
            <div>Exact Fisher Equation: r<sub>real</sub> = (1 + r<sub>nominal</sub>) / (1 + i) − 1</div>
          </div>
          <p>
            Under an illustrative 3% annual inflation rate over 32 years, prices double roughly every 24 years (72 / 3 = 24). Consequently, an annual budget of $60,000 today requires approximately $154,500 in nominal dollars 32 years from now to maintain identical purchasing power. To accurately account for this, the engine calculates the <strong>real investment return</strong> (r<sub>real</sub>), which strips out inflation to evaluate true purchasing power during decumulation.
          </p>
        </section>

        {/* Section 5: Income Replacement and Retirement Spending */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <PieChart className="h-5 w-5 text-blue-600" />
            5. Income Replacement and Retirement Spending
          </h2>
          <p>
            The <strong>income replacement ratio</strong> is a widely used financial-planning assumption that estimates the percentage of pre-retirement gross earnings needed to maintain your living standards in retirement. A range of <strong>70% to 80%</strong> is commonly used as a starting planning benchmark, but actual post-retirement spending needs vary substantially.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="font-bold text-emerald-600 dark:text-emerald-400 block">Expenses That Commonly Decrease:</span>
              <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
                <li><strong>Payroll Taxes:</strong> FICA taxes (6.2% Social Security + 1.45% Medicare) cease on earned income.</li>
                <li><strong>Retirement Savings:</strong> You no longer direct 10%–20% of income toward retirement accounts.</li>
                <li><strong>Work-Related Costs:</strong> Commuting, professional attire, lunches, and professional dues are eliminated.</li>
                <li><strong>Housing Debt:</strong> Many homeowners pay off primary mortgages before or near retirement.</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="font-bold text-rose-600 dark:text-rose-400 block">Expenses That Commonly Increase:</span>
              <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
                <li><strong>Healthcare &amp; Insurance:</strong> Medicare premiums, supplemental coverage, dental, vision, and out-of-pocket medical reserves.</li>
                <li><strong>Leisure &amp; Travel:</strong> Increased discretionary spending during early, active retirement years.</li>
                <li><strong>Home Maintenance &amp; Services:</strong> Outsourcing home upkeep, landscaping, and domestic tasks.</li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            The calculator defaults to a 75% replacement ratio, but allows full customization. Retirees planning an active travel schedule or carrying debt may require 85%–100% of final salary, whereas debt-free retirees with modest lifestyles may maintain their standard on 60%–70%.
          </p>
        </section>

        {/* Section 6: How Much Should You Save Each Month? */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-blue-600" />
            6. How Much Should You Save Each Month?
          </h2>
          <p>
            Mode 2 solves the <strong>Required Retirement Savings Contribution</strong> by calculating the fixed periodic savings needed to bridge the gap between the future value of existing assets and a specific target nest egg.
          </p>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-2">
            <div>Future Value of Existing Savings: FV<sub>current</sub> = Current Savings × (1 + r)<sup>n</sup></div>
            <div>Remaining Capital Needed: Remaining Need = Max(0, Target Nest Egg − FV<sub>current</sub>)</div>
            <div>Required Annual Contribution (Ordinary Annuity): PMT = [Remaining Need × r] / [(1 + r)<sup>n</sup> − 1]</div>
            <div>Required Monthly Contribution: Monthly PMT = PMT / 12</div>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs space-y-2">
            <div className="font-bold text-slate-900 dark:text-slate-100">Reconciled Benchmark Example (Mode 2):</div>
            <p>Target Nest Egg: $1,000,000 | Current Age: 35 | Retirement Age: 67 (<em>n</em> = 32) | Current Savings: $30,000 | Expected Return: 6%:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>FV of Current Savings: $30,000 × (1.06)<sup>32</sup> = $193,601.07</li>
              <li>Remaining Capital Needed: $1,000,000 − $193,601.07 = $806,398.93</li>
              <li>Required Annual Contribution: [$806,398.93 × 0.06] / [(1.06)<sup>32</sup> − 1] = <strong>$8,872.30/year</strong></li>
              <li>Required Monthly Contribution: $8,872.30 / 12 = <strong>$739.36/month</strong> (Matches Engine: $739.36)</li>
            </ul>
          </div>
        </section>

        {/* Section 7: Calculating the Retirement Savings Gap */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-blue-600" />
            7. Calculating the Retirement Savings Gap
          </h2>
          <p>
            The <strong>retirement savings gap</strong> measures the difference between your projected accumulated wealth at retirement and your calculated target nest egg.
          </p>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-2">
            <div>Savings Gap = Projected Savings − Target Nest Egg</div>
            <div>• Shortfall (Negative Gap): Projected Savings &lt; Target Nest Egg (shortfall requiring adjustment)</div>
            <div>• Break-Even (Zero Gap): Projected Savings = Target Nest Egg (meets target exactly)</div>
            <div>• Surplus (Positive Gap): Projected Savings &gt; Target Nest Egg (exceeds target)</div>
          </div>
          <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
            <p className="font-semibold text-slate-900 dark:text-slate-100">Strategic Levers to Eliminate a Savings Shortfall:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li><strong>Increase Annual Savings Rate:</strong> Directing an additional 2% to 5% of salary toward retirement accounts accelerates compounding.</li>
              <li><strong>Extend Retirement Age:</strong> Working 2 to 3 years longer delivers a dual benefit: it increases accumulation years while reducing the number of decumulation years that must be funded.</li>
              <li><strong>Adjust Post-Retirement Spending Expectations:</strong> Lowering your income replacement ratio (e.g., from 80% to 70%) reduces your required capital target.</li>
              <li><strong>Reconsider Baseline Assumptions:</strong> Reviewing expected returns, inflation assumptions, and external income sources provides realistic scenario boundaries.</li>
            </ol>
          </div>
        </section>

        {/* Section 8: How Much Monthly Income Can Your Nest Egg Support? */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-blue-600" />
            8. How Much Monthly Income Can Your Nest Egg Support?
          </h2>
          <p>
            Mode 3 estimates your <strong>Modeled Annual Withdrawal Capacity</strong>. Rather than starting with living expenses, it calculates the annual and monthly cash flow that a known portfolio balance can sustain over an assumed retirement timeframe under constant real returns.
          </p>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-2">
            <div>Real Rate of Return: r<sub>real</sub> = (1 + r) / (1 + i) − 1</div>
            <div>Modeled Annual Withdrawal Capacity = [Nest Egg × r<sub>real</sub>] / [1 − (1 + r<sub>real</sub>)<sup>−m</sup>]</div>
            <div>Modeled Monthly Withdrawal Capacity = Modeled Annual Withdrawal Capacity / 12</div>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs space-y-2">
            <div className="font-bold text-slate-900 dark:text-slate-100">Reconciled Benchmark Example (Mode 3):</div>
            <p>Projected Nest Egg: $1,000,000 | Retirement Horizon: 18 years (<em>m</em> = 18) | Return: 5% | Inflation: 3%:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Fisher Real Return: (1 + 0.05) / (1 + 0.03) − 1 = 1.94174757%</li>
              <li>Modeled Annual Withdrawal: [$1,000,000 × 0.0194174757] / [1 − (1.0194174757)<sup>−18</sup>] = <strong>$66,361.35/year</strong></li>
              <li>Modeled Monthly Withdrawal: $66,361.35 / 12 = <strong>$5,530.11/month</strong> (Matches Engine: $5,530.11)</li>
            </ul>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            This calculation represents a mathematical amortization model under constant real returns. For guaranteed lifetime income backed by insurance contracts, explore our <Link href="/calculators/annuity-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-700">commercial annuity calculator</Link>.
          </p>
        </section>

        {/* Section 9: How Long Could Your Retirement Savings Last? */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            9. How Long Could Your Retirement Savings Last?
          </h2>
          <p>
            Mode 4 acts as a <strong>Modeled Retirement Portfolio Longevity Simulator</strong>, projecting how many years and months a portfolio can sustain a chosen fixed monthly withdrawal budget before balance depletion.
          </p>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-2">
            <div>Monthly Balance Iteration: Balance<sub>m+1</sub> = Balance<sub>m</sub> × (1 + r / 12) − Monthly Withdrawal</div>
            <div>• Perpetual Nest Egg Boundary: If Monthly Withdrawal ≤ Balance<sub>0</sub> × (r / 12), balance lasts indefinitely in nominal terms.</div>
            <div>• Finite Depletion: If Monthly Withdrawal &gt; Balance<sub>0</sub> × (r / 12), principal is gradually drawn down to $0.</div>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs space-y-2">
            <div className="font-bold text-slate-900 dark:text-slate-100">Reconciled Benchmark Example (Mode 4):</div>
            <p>Starting Balance: $600,000 | Monthly Withdrawal: $5,000 | Annual Return: 6% (0.5%/month):</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Monthly Interest at Start: $600,000 × (0.06 / 12) = $3,000/month</li>
              <li>Net Monthly Principal Drawdown: $5,000 − $3,000 = $2,000 (accelerating as balance falls)</li>
              <li>Longevity Output: The engine simulates 184 monthly iterations, yielding <strong>15 years and 4 months</strong> of portfolio longevity (Matches Engine: 15 Yrs, 4 Mos).</li>
            </ul>
          </div>
        </section>

        {/* Section 10: The 4% Rule and Historical Safe-Withdrawal Research */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            10. The 4% Rule and Historical Safe-Withdrawal Research
          </h2>
          <p>
            The <strong>4% Rule</strong> originated from research published by financial planner William Bengen in 1994 and was expanded in 1998 by professors Cooley, Hubbard, and Walz in the <strong>Trinity Study</strong>. The methodology evaluated historical 30-year retirement periods in the United States using balanced portfolios of common stocks and intermediate government bonds.
          </p>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-2">
            <div className="font-bold text-slate-900 dark:text-slate-100">The 4% Benchmark Framework:</div>
            <p>1. <strong>Year 1 Withdrawal:</strong> Withdraw 4% of your starting retirement portfolio in your first year.</p>
            <p>2. <strong>Subsequent Years:</strong> Adjust that dollar amount annually for CPI inflation, regardless of portfolio market fluctuations.</p>
            <p>3. <strong>Historical Context:</strong> Historical research such as the Trinity Study examined 4% initial withdrawals under specific portfolio, inflation, and historical-market assumptions. The 4% figure is a historical planning benchmark, not a guarantee of future portfolio survival.</p>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            <strong>Sequence of Returns Risk:</strong> Experiencing market downturns in the initial years of retirement accelerates portfolio depletion if fixed withdrawals continue. In practice, many retirees adopt variable withdrawal strategies, adjusting spending dynamically in response to market performance.
          </p>
        </section>

        {/* Section 11: Social Security, Pensions, and Other Retirement Income */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-blue-600" />
            11. Social Security, Pensions, and Other Retirement Income
          </h2>
          <p>
            Other retirement income entered by the user, such as estimated Social Security, pension, or other recurring income, can reduce the amount that must be funded from the investment portfolio.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="font-bold text-blue-600 dark:text-blue-400 block">Social Security:</span>
              <p>Social Security retirement benefits can generally begin at age 62. Full Retirement Age depends on birth year, and delayed retirement credits generally increase benefits through age 70. Actual benefits depend on earnings history, claiming age, and applicable rules.</p>
              <Link href="/calculators/social-security-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline inline-flex items-center gap-1 hover:text-blue-700">
                Social Security benefit calculator <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="font-bold text-blue-600 dark:text-blue-400 block">Defined Benefit Pensions:</span>
              <p>Employer plans providing formulaic retirement income based on service years, final average pay, and benefit multipliers.</p>
              <Link href="/calculators/pension-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline inline-flex items-center gap-1 hover:text-blue-700">
                defined benefit pension calculator <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="font-bold text-blue-600 dark:text-blue-400 block">Commercial Annuities:</span>
              <p>Some life annuities can provide contractual lifetime income in exchange for a premium; guarantees depend on the contract and insurer.</p>
              <Link href="/calculators/annuity-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline inline-flex items-center gap-1 hover:text-blue-700">
                commercial annuity calculator <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            <em>Disclosure:</em> This calculator models other income as a user-entered cash flow offset and does not independently calculate official Social Security benefits or complex pension formulas.
          </p>
        </section>

        {/* Section 12: Retirement Accounts and Tax Considerations */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <PieChart className="h-5 w-5 text-blue-600" />
            12. Retirement Accounts and Tax Considerations
          </h2>
          <p>
            Understanding the tax characteristics and withdrawal rules of different retirement accounts is essential for structuring your savings during accumulation and managing tax liability during decumulation.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse border border-zinc-200 dark:border-zinc-800">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Account Type</th>
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Contribution Tax Advantage</th>
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Withdrawal Rules &amp; Taxation</th>
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Key Feature &amp; Tool</th>
                </tr>
              </thead>
              <tbody className="dark:divide-zinc-800">
                <tr>
                  <td className="p-3 font-semibold text-blue-600">Employer 401(k) / 403(b)</td>
                  <td className="p-3">Pre-tax payroll deferrals reduce current taxable income</td>
                  <td className="p-3">Taxable as ordinary income; 10% penalty before age 59½ (with statutory exceptions)</td>
                  <td className="p-3 text-slate-900 dark:text-slate-100">
                    Employer matching contributions depend on plan formula and vesting. Explore our <Link href="/calculators/401k-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline">dedicated 401(k) calculator</Link>.
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-blue-600">Roth IRA</td>
                  <td className="p-3">Funded with after-tax dollars (no upfront deduction)</td>
                  <td className="p-3">Investment earnings can grow without current federal income tax; qualified Roth IRA distributions can be tax-free when applicable requirements are met (including the five-tax-year rule and age 59½)</td>
                  <td className="p-3 text-slate-900 dark:text-slate-100">
                    No RMDs during the original account owner&apos;s lifetime. Explore our <Link href="/calculators/roth-ira-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline">Roth IRA retirement calculator</Link>.
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-blue-600">Traditional IRA</td>
                  <td className="p-3">Contributions may be tax-deductible based on income limits</td>
                  <td className="p-3">Taxable as ordinary income upon distribution; mandatory RMDs apply under federal law</td>
                  <td className="p-3 text-slate-900 dark:text-slate-100">
                    Individual pre-tax accumulation. Explore our <Link href="/calculators/traditional-ira-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline">traditional IRA calculator</Link>.
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-blue-600">Health Savings Account (HSA)</td>
                  <td className="p-3">Triple-tax-advantaged: deductible contributions and tax-free growth</td>
                  <td className="p-3">Tax-free for qualified medical expenses. After age 65, nonmedical distributions generally become subject to ordinary income tax, while the additional 20% tax generally no longer applies</td>
                  <td className="p-3 text-slate-900 dark:text-slate-100">
                    Medical expense reserve in retirement.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-amber-50 dark:bg-amber-950/40 p-3.5 rounded-lg border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200">
            <strong>Tax Engine Disclosure:</strong> The calculator uses a pre-tax income baseline and does not contain a full federal/state retirement tax engine. It does not automatically model federal/state income taxes, capital gains taxes, Roth conversion taxation, Social Security benefit taxation, or RMD tax effects.
          </div>
        </section>

        {/* Section 13: Retirement Planning by Age: Career Milestones */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            13. Retirement Planning by Age: Career Milestones
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="font-bold text-blue-600 dark:text-blue-400 block">In Your 20s &amp; 30s (Early Accumulation)</span>
              <p>Focus on establishing consistent savings habits, capturing employer 401(k) matches, and maximizing long-term compound growth. Saving 10%–15% of income is a commonly cited planning rule of thumb, with many benchmark frameworks targeting roughly 1x salary saved by age 30.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="font-bold text-blue-600 dark:text-blue-400 block">In Your 40s (Mid-Career Acceleration)</span>
              <p>Peak earning years often allow higher contributions. Planning frameworks frequently use 3x salary saved by age 40 as a reference benchmark while balancing mortgage and family expenses.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="font-bold text-blue-600 dark:text-blue-400 block">In Your 50s (Pre-Retirement Transition)</span>
              <p>Take advantage of IRS catch-up contribution limits on 401(k)s and IRAs. Benchmark frameworks often reference 6x salary saved by age 50 and 8x by age 60 while evaluating portfolio risk management.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="font-bold text-blue-600 dark:text-blue-400 block">In Your 60s (Decumulation &amp; Claiming Strategy)</span>
              <p>Coordinate Social Security claiming ages (62 to 70), Medicare enrollment at age 65, cash buffer allocations, and mandatory RMD schedules (age 73+). Many frameworks target approximately 10x salary saved by Full Retirement Age.</p>
            </div>
          </div>
        </section>

        {/* Section 14: Frequently Asked Questions (Header) */}
        <section className="space-y-4 pt-2">
          <div className="flex items-center gap-3">
            <HelpCircle className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              14. Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-1.5"
              >
                <h3 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-100">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">Q{index + 1}.</span>
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 15: Calculation Methodology & Educational Disclaimer */}
        <section className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-blue-600" />
            15. Calculation Methodology &amp; Educational Disclaimer
          </h2>
          <div className="text-xs space-y-2 text-slate-700 dark:text-slate-300">
            <p className="font-semibold text-slate-900 dark:text-slate-100">Mathematical Methodology Summary:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Salary Growth:</strong> Projected final income is calculated via compound growth: Salary<sub>final</sub> = Current Salary × (1 + g)<sup>n</sup>.</li>
              <li><strong>Fisher Real Return:</strong> Real purchasing power is capitalized using the exact relation r<sub>real</sub> = (1 + r<sub>ret</sub>) / (1 + i) − 1.</li>
              <li><strong>Mid-Year Compounding:</strong> Annual accumulation contributions receive half a year of growth during deposit years to model continuous payroll deferrals.</li>
              <li><strong>Pre-Tax Baseline:</strong> Calculations are performed on a gross pre-tax basis. Taxes on contributions, investment gains, and retirement withdrawals depend on account classification and individual tax brackets.</li>
            </ul>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
              <strong>Educational Disclaimer:</strong> This retirement calculator is designed strictly for educational and personal financial-planning simulation purposes. It does not constitute individualized financial, investment, legal, or tax advice. Market investment returns, inflation rates, salary trajectories, and tax laws are uncertain and subject to change. Consult a qualified financial advisor, CPA, or tax professional before making significant retirement decisions.
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default RetirementContent;

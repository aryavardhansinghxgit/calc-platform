"use client";

import React from "react";
import {
  BookOpen,
  PieChart,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  ShieldCheck,
  DollarSign,
  Layers,
} from "lucide-react";

export function BudgetContent() {
  return (
    <div className="space-y-10 mt-10 text-zinc-800 dark:text-zinc-200">
      {/* 1. Master SEO Overview */}
      <section className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2.5">
          <BookOpen className="h-7 w-7 text-blue-600 dark:text-blue-400" />
          Mastering Personal Budgeting: The Complete Financial Blueprint
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-900 dark:text-zinc-300">
          A personal budget is the foundational architecture of long-term financial freedom.
          Whether your objective is escaping consumer credit card debt, purchasing a home, funding higher education, or achieving early retirement (FIRE), a structured budget converts passive income into intentional wealth building. By carefully tracking all household cash inflows alongside fixed and variable expenses, you eliminate financial anxiety and gain complete control over your money.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-900 dark:text-zinc-300">
          Our advanced <strong>Budget Calculator</strong> goes far beyond primitive single-field spending logs. It analyzes multi-stream gross incomes, calculates precise net after-tax take-home pay, evaluates front-end and back-end Debt-to-Income (DTI) ratios, benchmarks allocations against the famous <strong>50/30/20 Rule</strong>, and provides real-time sensitivity stress testing for unexpected inflation spikes or income changes.
        </p>
      </section>

      {/* 2. Key Budgeting Frameworks Compared */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Layers className="h-6 w-6 text-blue-600" />
          Popular Budgeting Methodologies Compared
        </h2>
        <p className="text-sm leading-relaxed text-slate-900 dark:text-zinc-300">
          No single budgeting framework fits every lifestyle. Understanding the mechanics of the leading financial philosophies enables you to choose the strategy best suited to your risk tolerance and goals.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Framework 1 */}
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
            <div className="flex items-center gap-2">
              <PieChart className="h-4 w-4 text-blue-500" />
              <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">The 50/30/20 Rule</h3>
            </div>
            <p className="text-slate-900 dark:text-slate-100">
              Popularized by Senator Elizabeth Warren, this rule allocates net take-home pay into three proportional buckets: <strong>50% Needs</strong> (housing, food, utilities), <strong>30% Wants</strong> (dining, hobbies, travel), and <strong>20% Savings & Debt Repayment</strong>.
            </p>
            <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 block">
              Best for: Beginners seeking balanced flexibility without rigid receipt tracking.
            </span>
          </div>

          {/* Framework 2 */}
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-blue-600" />
              <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Zero-Based Budgeting</h3>
            </div>
            <p className="text-slate-900 dark:text-slate-100">
              Every single dollar of income is assigned a specific job (expense, investment, debt payoff, or savings) before the month begins, ensuring:
            </p>
            <div className="font-sans tabular-nums bg-zinc-100 dark:bg-zinc-800 p-2 rounded text-center text-zinc-800 dark:text-zinc-200 font-bold">
              Income - Expenses = $0
            </div>
            <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 block">
              Best for: Detail-oriented planners and aggressive debt payoff strategies.
            </span>
          </div>

          {/* Framework 3 */}
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Pay Yourself First</h3>
            </div>
            <p className="text-slate-900 dark:text-slate-100">
              Reverse-budgeting where automated savings (401k, IRA, emergency fund) are deducted immediately upon receiving your paycheck. Whatever cash remains is spent freely without micro-categorization.
            </p>
            <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 block">
              Best for: High earners who consistently meet savings targets.
            </span>
          </div>
        </div>
      </section>

      {/* 3. Formulas Explained */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-blue-500" />
          Budget Formulas & Debt-to-Income (DTI) Mathematics
        </h2>

        <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 space-y-3 text-xs">
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">1. Net Monthly Take-Home Pay Formula</h3>
            <p className="text-slate-900 dark:text-slate-100">
              Net income converts gross income streams to after-tax monthly purchasing power:
            </p>
            <div className="bg-white dark:bg-zinc-800 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-zinc-800 dark:text-zinc-200">
              Net Monthly Income = [ (Salary + Pension + Investments + Other) × (1 - Effective Tax Rate) ] / 12
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">2. Back-End Debt-to-Income (DTI) Ratio</h3>
            <p className="text-slate-900 dark:text-slate-100">
              DTI evaluates debt burden relative to gross earnings. Mortgage underwriters enforce strict thresholds (typically &lt; 36% for prime approval):
            </p>
            <div className="bg-white dark:bg-zinc-800 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-zinc-800 dark:text-zinc-200">
              Total DTI (%) = [ (Housing Costs + Auto Loans + Credit Cards + Student Loans) / Gross Monthly Income ] × 100
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">3. Net Cash Flow Surplus / Deficit</h3>
            <div className="bg-white dark:bg-zinc-800 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-zinc-800 dark:text-zinc-200">
              Net Monthly Cash Flow = After-Tax Monthly Income - Total Monthly Expenses
            </div>
          </div>
        </div>
      </section>

      {/* 4. Step-by-Step Calculation Example */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-blue-600" />
          Step-by-Step Calculation Example
        </h2>

        <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3 text-xs leading-relaxed">
          <p className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
            Case Study: Household Earns $83,000 Gross Salary with 28% Tax Rate
          </p>

          <ol className="list-decimal pl-5 space-y-2 text-slate-900 dark:text-zinc-300">
            <li>
              <strong>Gross Income:</strong> $83,000 / 12 = <strong>$6,916.67 / month</strong>.
            </li>
            <li>
              <strong>After-Tax Income:</strong> $83,000 × (1 - 0.28) = $59,760 annual / 12 = <strong>$4,980 / month</strong>.
            </li>
            <li>
              <strong>Fixed Expenses:</strong> Housing ($1,667/mo), Transit ($478/mo), Student Debt ($250/mo), Auto Loan ($250/mo), Utilities ($250/mo), Groceries ($400/mo) = <strong>$3,295 / month</strong>.
            </li>
            <li>
              <strong>Discretionary & Savings:</strong> Dining out ($200/mo), Hobbies/Travel ($350/mo), 401k/IRA ($833/mo) = <strong>$1,383 / month</strong>.
            </li>
            <li>
              <strong>Net Surplus:</strong> $4,980 - ($3,295 + $1,383) = <strong>+$302 / month</strong>.
            </li>
            <li>
              <strong>DTI Calculation:</strong> Monthly debt service ($1,667 housing + $250 auto + $250 student loan) = $2,167 / $6,916.67 gross = <strong>31.33% DTI (Good)</strong>.
            </li>
          </ol>
        </div>
      </section>

      {/* 5. Common Budgeting Pitfalls */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-blue-600" />
          Common Budgeting Mistakes & How to Avoid Them
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-1.5">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
              1. Forgetting Irregular & Annual Expenses
            </h3>
            <p className="text-slate-900 dark:text-slate-100">
              Car insurance paid semi-annually, holiday gifts, or annual property taxes frequently wreck monthly budgets. Convert annual costs to monthly recurring reserves using our frequency selectors.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-1.5">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
              2. Underestimating "Small" Daily Expenses
            </h3>
            <p className="text-slate-900 dark:text-slate-100">
              Daily $6 lattes, subscription services, and food delivery add up to $300-$500/month. Grouping dining out into your 30% Wants bucket reveals true discretionary impact.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-1.5">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
              3. Treating Emergency Funds as Optional
            </h3>
            <p className="text-slate-900 dark:text-slate-100">
              Without a 3-6 month liquid emergency fund, unexpected medical bills or vehicle repairs force reliance on high-interest credit cards (20%+ APR).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-1.5">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
              4. Unrealistic Rigid Restrictions
            </h3>
            <p className="text-slate-900 dark:text-slate-100">
              Cutting all fun, dining out, and hobbies causes "budget burnout." Allocating 30% to Wants ensures long-term psychological sustainability.
            </p>
          </div>
        </div>
      </section>

      {/* 6. FAQ Section (20 Snippet-Optimized FAQs) */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-blue-500" />
          Frequently Asked Questions (FAQ)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {[
            {
              q: "What is a budget?",
              a: "A budget is a quantitative financial plan that tracks income, fixed living expenses, variable discretionary spending, and savings over a specific timeframe (usually monthly or annually).",
            },
            {
              q: "How does the 50/30/20 rule work?",
              a: "The 50/30/20 rule divides your after-tax take-home pay into three target categories: 50% for essential Needs, 30% for discretionary Wants, and 20% for Savings and debt repayment.",
            },
            {
              q: "What counts as a 'Need' in budgeting?",
              a: "Needs include non-negotiable living expenses: rent or mortgage payments, basic groceries, utilities (electricity, water, heat), health insurance, and minimum debt payments.",
            },
            {
              q: "What counts as a 'Want' in budgeting?",
              a: "Wants include discretionary lifestyle choices: restaurant dining, takeout, vacations, streaming services, gym memberships, entertainment tickets, and luxury apparel.",
            },
            {
              q: "What percentage of income should go to housing?",
              a: "Financial experts recommend keeping total housing costs (mortgage/rent, property tax, insurance, utilities) under 28% to 30% of your gross monthly income.",
            },
            {
              q: "How much should I save each month?",
              a: "Aim to save at least 15% to 20% of your net monthly income. Prioritize building a 3-6 month emergency fund, followed by 401k employer match and IRA investing.",
            },
            {
              q: "What is Debt-to-Income (DTI) ratio?",
              a: "DTI is the percentage of your gross monthly income allocated to debt payments. Lenders require a DTI under 36% for prime mortgage interest rates.",
            },
            {
              q: "What is Front-End DTI vs Back-End DTI?",
              a: "Front-End DTI measures housing costs alone divided by gross income. Back-End DTI includes housing plus auto loans, student loans, and credit cards divided by gross income.",
            },
            {
              q: "How do I budget with an irregular income?",
              a: "Base your baseline budget on your lowest expected monthly earnings. During higher income months, direct surplus funds into a buffer account or emergency savings.",
            },
            {
              q: "What is Zero-Based Budgeting?",
              a: "Zero-based budgeting assigns every incoming dollar a specific purpose (spending, saving, debt payoff) until Income minus Expenses equals exactly zero.",
            },
            {
              q: "How do I handle annual or bi-annual expenses?",
              a: "Divide annual bills (such as car insurance or property taxes) by 12 and set aside that amount monthly into a designated high-yield savings 'sinking fund.'",
            },
            {
              q: "Is 401k contribution calculated before or after tax?",
              a: "Traditional 401k contributions are pre-tax (reducing taxable gross income), while Roth 401k/IRA contributions are post-tax from your net take-home pay.",
            },
            {
              q: "What is a sinking fund?",
              a: "A sinking fund is a strategic savings pool set aside monthly for a planned future expense, such as a vacation, car repair, or home maintenance.",
            },
            {
              q: "How often should I update my budget?",
              a: "Review your budget monthly to adjust for spending changes, and perform a major audit annually or whenever a major life event occurs (job change, marriage, baby).",
            },
            {
              q: "What should I do if my budget has a monthly deficit?",
              a: "Identify variable 'Wants' (dining out, subscriptions) to cut immediately. If fixed costs exceed income, explore refinancing loans or downsizing housing.",
            },
            {
              q: "How big should my emergency fund be?",
              a: "Maintain 3 to 6 months of essential living expenses in a liquid High-Yield Savings Account (HYSA) to cover job loss or medical emergencies.",
            },
            {
              q: "Can I print or export my budget calculations?",
              a: "Yes! Use our 'Print PDF Report' button to generate a clean, professional financial consultant report suitable for loan applications or personal review.",
            },
            {
              q: "How does inflation affect my budget?",
              a: "Inflation erodes purchasing power over time. Use our Sensitivity Stress Test tool to simulate a 5% to 15% surge in utility, food, and fuel prices.",
            },
            {
              q: "Why is tracking meals out separate from groceries important?",
              a: "Groceries represent essential 'Needs', whereas restaurant dining and coffee shops represent discretionary 'Wants'. Splitting them prevents budget distortion.",
            },
            {
              q: "How do I stick to my budget long-term?",
              a: "Automate bill payments and retirement savings on payday. Give yourself a reasonable discretionary 'Wants' allowance to prevent spending fatigue.",
            },
          ].map((faq, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-1.5">
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-xs flex items-start gap-1.5">
                <span className="text-blue-500 font-sans tabular-nums font-extrabold">Q:</span>
                {faq.q}
              </h3>
              <p className="text-slate-900 dark:text-slate-100 pl-4">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

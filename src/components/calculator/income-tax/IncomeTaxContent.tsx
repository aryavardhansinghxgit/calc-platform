import React from "react";
import Link from "next/link";
import {
  HelpCircle,
  FileText,
  DollarSign,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Layers,
  TrendingUp,
  Landmark,
  Scale,
  Briefcase,
  Users,
  Award,
  Calendar,
  Percent,
} from "lucide-react";

export function IncomeTaxContent() {
  const faqs = [
    {
      question: "How does the U.S. progressive income tax bracket system work?",
      answer:
        "The federal income tax system divides your taxable income into tiers (brackets), taxing each portion at progressively higher statutory rates (10%, 12%, 22%, 24%, 32%, 35%, 37%). Entering a higher bracket does not tax your entire income at that higher rate; only the specific dollars falling within that higher bracket range are taxed at the higher marginal rate.",
    },
    {
      question: "What is the Standard Deduction for 2026?",
      answer:
        "Under IRS Revenue Procedure 2025-32, the standard deduction for Tax Year 2026 is $16,100 for Single filers and Married Filing Separately, $32,200 for Married Filing Jointly and Qualifying Surviving Spouses, and $24,150 for Head of Household.",
    },
    {
      question: "What is the Standard Deduction for 2025?",
      answer:
        "Under IRS Revenue Procedure 2024-40 and current enacted statutes, the standard deduction for Tax Year 2025 is $15,750 for Single filers and Married Filing Separately, $31,500 for Married Filing Jointly and Qualifying Surviving Spouses, and $23,625 for Head of Household.",
    },
    {
      question: "What is the difference between Marginal Tax Rate and Effective Tax Rate?",
      answer:
        "Your Marginal Tax Rate is the tax percentage applied to your highest dollar of taxable income (your top tax bracket). Your Effective Tax Rate is the actual percentage of your total gross income paid in federal income tax, calculated by this tool as Total Federal Tax Liability divided by Total Gross Income. Because of progressive lower brackets and standard deductions, your effective rate is almost always significantly lower than your marginal rate.",
    },
    {
      question: "Should I claim the Standard Deduction or Itemize Deductions on Schedule A?",
      answer:
        "Taxpayers should claim whichever deduction amount is larger. If the sum of your itemized deductions—including mortgage interest on qualifying debt, State and Local Taxes (SALT capped at $40,400 for 2026 and $40,000 for 2025), charitable donations, and unreimbursed medical expenses exceeding 7.5% of AGI—is greater than your statutory standard deduction, itemizing on Schedule A will lower your taxable income more.",
    },
    {
      question: "How does the Child Tax Credit (CTC) work for 2026?",
      answer:
        "The Child Tax Credit provides up to $2,200 per qualifying child under age 17 at the close of the tax year. Up to $1,700 of the credit is refundable as the Additional Child Tax Credit (ACTC) if earned income exceeds $2,500. The credit phases out at a rate of $50 for each $1,000 of Modified AGI exceeding $400,000 for Married Filing Jointly and $200,000 for all other filing statuses.",
    },
    {
      question: "What is the Credit for Other Dependents (ODC)?",
      answer:
        "The Credit for Other Dependents is a $500 nonrefundable federal tax credit for qualifying dependents age 17 and older, college students, or elderly relatives who do not qualify for the Child Tax Credit. It is subject to the same $200,000 / $400,000 MAGI phaseout thresholds.",
    },
    {
      question: "What is the SALT deduction cap for 2026 and 2025?",
      answer:
        "The State and Local Tax (SALT) deduction limitation allows itemizers to deduct combined state income/sales taxes plus real estate and property taxes up to $40,400 for Tax Year 2026 ($20,200 for Married Filing Separately) and $40,000 for Tax Year 2025 ($20,000 for Married Filing Separately).",
    },
    {
      question: "What additional tax deductions are available to seniors age 65 and older?",
      answer:
        "Taxpayers age 65 and older qualify for both the traditional additional standard deduction ($2,050 for unmarried filers / $1,650 per spouse for married filers in 2026; $2,000 / $1,600 in 2025) and the enacted $6,000 Enhanced Senior Deduction, which phases out at $50 per $1,000 of MAGI above $75,000 for unmarried filers and $150,000 for Married Filing Jointly.",
    },
    {
      question: "What is an Above-the-Line (ATL) deduction?",
      answer:
        "Above-the-line deductions (reported on Form 1040 Schedule 1, Part II) are subtracted directly from gross income to determine Adjusted Gross Income (AGI). Examples include traditional IRA contributions, HSA contributions, 50% of self-employment tax, student loan interest (up to $2,500), and qualified tip and overtime deductions.",
    },
    {
      question: "How is Self-Employment Tax (Schedule SE) calculated?",
      answer:
        "Self-employment tax is assessed at 15.3% (12.4% Social Security up to the wage base of $184,500 for 2026 / $176,100 for 2025, plus 2.9% Medicare with no ceiling) on 92.35% of net profit reported on Schedule C. Taxpayers deduct 50% of their total SE tax as an above-the-line adjustment on Form 1040.",
    },
    {
      question: "How are Long-Term Capital Gains and Qualified Dividends taxed?",
      answer:
        "Net long-term capital gains (assets held longer than one year) and qualified dividends receive preferential federal rates of 0%, 15%, or 20%. Preferential income is stacked on top of ordinary taxable income to determine which rate threshold applies ($49,450 / $545,500 for 2026 Single; $98,900 / $613,700 for 2026 MFJ).",
    },
    {
      question: "How are Short-Term Capital Gains taxed?",
      answer:
        "Short-term capital gains (from assets held one year or less) and non-qualified ordinary dividends do not receive preferential tax treatment and are taxed as ordinary income at standard progressive tax bracket rates (10% to 37%).",
    },
    {
      question: "Why do I owe taxes instead of receiving a tax refund?",
      answer:
        "You owe taxes if the federal income tax withheld from your paychecks (W-2 Box 2) or quarterly estimated tax payments was less than your total calculated federal tax liability on Form 1040 Line 24.",
    },
    {
      question: "Does this calculator include state and local income taxes?",
      answer:
        "The core calculation engine models federal income tax liability. While state and local withholding can be entered as an itemized deduction or prepayment offset, state-specific tax returns require separate calculations based on individual state tax codes.",
    },
    {
      question: "Does this calculator file or submit my tax return to the IRS?",
      answer:
        "No. This calculator is an independent computational model for educational and planning purposes. It does not file, prepare, or submit tax returns to the Internal Revenue Service or state tax departments.",
    },
  ];

  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200">
      {/* 1. The Federal Income Tax Pipeline */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <TrendingUp className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            1. How Federal Income Tax Is Calculated (The IRS Pipeline)
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Federal income tax liability is computed through a progressive pipeline established under the Internal Revenue Code (IRC).
          The calculation transforms gross earnings into final net tax liability or refund through structured statutory milestones:
        </p>

        <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-5 font-mono text-xs text-slate-900 dark:text-slate-100 overflow-x-auto space-y-1">
          <div>[Total Gross Income] (W-2 Box 1, 1099 Net Profit, Interest, Dividends, Capital Gains)</div>
          <div className="text-blue-600 dark:text-blue-400">   − [Above-the-Line Adjustments (Schedule 1 Part II: 50% SE Tax, IRA, HSA, Tips, Overtime)]</div>
          <div className="font-bold">= [Adjusted Gross Income (AGI) — Form 1040 Line 11]</div>
          <div className="text-blue-600 dark:text-blue-400">   − [Allowable Deduction: Max(Standard Deduction, Itemized Schedule A)]</div>
          <div className="font-bold text-emerald-600 dark:text-emerald-400">= [Taxable Income — Form 1040 Line 15]</div>
          <div>   → [Progressive Tax Brackets (10% to 37%) + Preferential Cap Gains Rates (0%/15%/20%)]</div>
          <div>   + [Self-Employment Tax (Schedule SE 15.3% on 92.35% profit)]</div>
          <div className="font-bold text-purple-600 dark:text-purple-400">= [Total Tax Before Credits — Form 1040 Line 16]</div>
          <div className="text-blue-600 dark:text-blue-400">   − [Total Tax Credits (Child Tax Credit, ODC, Child Care, Education, Energy)]</div>
          <div className="font-bold">= [Total Federal Tax Liability (Calculator Scope) — Form 1040 Line 24]</div>
          <div className="text-blue-600 dark:text-blue-400">   − [Federal Tax Withholding & Prepayments — Form 1040 Line 25]</div>
          <div className="font-bold text-emerald-600 dark:text-emerald-400">= [Estimated Refund (Line 34)  OR  Estimated Tax Owed (Line 37)]</div>
        </div>

        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          To convert wage frequencies—such as hourly rates or biweekly pay—into annualized gross wages for Form 1040 Line 1, use our{" "}
          <Link href="/calculators/salary-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
            salary calculator
          </Link>
          . For an analysis of periodic paycheck net pay factoring in mandatory payroll withholdings, including Social Security (6.2%) and Medicare (1.45%) taxes, explore our{" "}
          <Link href="/calculators/take-home-pay-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
            take-home pay calculator
          </Link>
          .
        </p>
      </section>

      {/* 2. 2026 Federal Tax Brackets */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <Calendar className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            2. 2026 Federal Income Tax Brackets (IRS Rev. Proc. 2025-32)
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          For Tax Year 2026 (returns filed in early 2027), tax brackets are indexed for inflation under IRS Revenue Procedure 2025-32.
          Tax rates remain progressive across seven statutory tiers: <strong>10%, 12%, 22%, 24%, 32%, 35%, and 37%</strong>.
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold">
                <th className="p-3">Rate</th>
                <th className="p-3">Single (2026)</th>
                <th className="p-3">Married Filing Jointly (2026)</th>
                <th className="p-3">Married Filing Separately (2026)</th>
                <th className="p-3">Head of Household (2026)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-900 font-sans tabular-nums text-slate-700 dark:text-slate-300">
              <tr>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">10%</td>
                <td className="p-3">$0 – $12,400</td>
                <td className="p-3">$0 – $24,800</td>
                <td className="p-3">$0 – $12,400</td>
                <td className="p-3">$0 – $17,650</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">12%</td>
                <td className="p-3">&gt;$12,400 – $50,400</td>
                <td className="p-3">&gt;$24,800 – $100,800</td>
                <td className="p-3">&gt;$12,400 – $50,400</td>
                <td className="p-3">&gt;$17,650 – $67,450</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">22%</td>
                <td className="p-3">&gt;$50,400 – $105,700</td>
                <td className="p-3">&gt;$100,800 – $211,400</td>
                <td className="p-3">&gt;$50,400 – $105,700</td>
                <td className="p-3">&gt;$67,450 – $105,700</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">24%</td>
                <td className="p-3">&gt;$105,700 – $201,775</td>
                <td className="p-3">&gt;$211,400 – $403,550</td>
                <td className="p-3">&gt;$105,700 – $201,775</td>
                <td className="p-3">&gt;$105,700 – $201,750</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">32%</td>
                <td className="p-3">&gt;$201,775 – $256,225</td>
                <td className="p-3">&gt;$403,550 – $512,450</td>
                <td className="p-3">&gt;$201,775 – $256,225</td>
                <td className="p-3">&gt;$201,750 – $256,200</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">35%</td>
                <td className="p-3">&gt;$256,225 – $640,600</td>
                <td className="p-3">&gt;$512,450 – $768,700</td>
                <td className="p-3">&gt;$256,225 – $384,350</td>
                <td className="p-3">&gt;$256,200 – $640,600</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">37%</td>
                <td className="p-3">&gt;$640,600</td>
                <td className="p-3">&gt;$768,700</td>
                <td className="p-3">&gt;$384,350</td>
                <td className="p-3">&gt;$640,600</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. 2025 Federal Tax Brackets */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <Calendar className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            3. 2025 Federal Income Tax Brackets (IRS Rev. Proc. 2024-40)
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          For Tax Year 2025 (returns filed in early 2026), tax brackets are governed by Revenue Procedure 2024-40:
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold">
                <th className="p-3">Rate</th>
                <th className="p-3">Single (2025)</th>
                <th className="p-3">Married Filing Jointly (2025)</th>
                <th className="p-3">Married Filing Separately (2025)</th>
                <th className="p-3">Head of Household (2025)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-900 font-sans tabular-nums text-slate-700 dark:text-slate-300">
              <tr>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">10%</td>
                <td className="p-3">$0 – $11,925</td>
                <td className="p-3">$0 – $23,850</td>
                <td className="p-3">$0 – $11,925</td>
                <td className="p-3">$0 – $17,000</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">12%</td>
                <td className="p-3">&gt;$11,925 – $48,475</td>
                <td className="p-3">&gt;$23,850 – $96,950</td>
                <td className="p-3">&gt;$11,925 – $48,475</td>
                <td className="p-3">&gt;$17,000 – $64,850</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">22%</td>
                <td className="p-3">&gt;$48,475 – $103,350</td>
                <td className="p-3">&gt;$96,950 – $206,700</td>
                <td className="p-3">&gt;$48,475 – $103,350</td>
                <td className="p-3">&gt;$64,850 – $103,350</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">24%</td>
                <td className="p-3">&gt;$103,350 – $197,300</td>
                <td className="p-3">&gt;$206,700 – $394,600</td>
                <td className="p-3">&gt;$103,350 – $197,300</td>
                <td className="p-3">&gt;$103,350 – $197,300</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">32%</td>
                <td className="p-3">&gt;$197,300 – $250,525</td>
                <td className="p-3">&gt;$394,600 – $501,050</td>
                <td className="p-3">&gt;$197,300 – $250,525</td>
                <td className="p-3">&gt;$197,300 – $250,500</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">35%</td>
                <td className="p-3">&gt;$250,525 – $626,350</td>
                <td className="p-3">&gt;$501,050 – $751,600</td>
                <td className="p-3">&gt;$250,525 – $375,800</td>
                <td className="p-3">&gt;$250,500 – $626,350</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">37%</td>
                <td className="p-3">&gt;$626,350</td>
                <td className="p-3">&gt;$751,600</td>
                <td className="p-3">&gt;$375,800</td>
                <td className="p-3">&gt;$626,350</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Standard vs Itemized Deductions */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <Scale className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            4. Standard Deduction vs. Itemized Deductions (Schedule A)
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Taxpayers choose each year between taking the fixed statutory <strong>Standard Deduction</strong> or itemizing qualifying expenses on <strong>Schedule A</strong>.
          The calculator automatically selects the larger deduction amount.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-5 space-y-2">
            <span className="font-bold text-sm text-slate-900 dark:text-slate-100 block">2026 Standard Deductions</span>
            <div className="flex justify-between border-b pb-1"><span>Single:</span> <strong className="font-sans tabular-nums text-blue-600 dark:text-blue-400">$16,100</strong></div>
            <div className="flex justify-between border-b pb-1"><span>Married Filing Jointly:</span> <strong className="font-sans tabular-nums text-blue-600 dark:text-blue-400">$32,200</strong></div>
            <div className="flex justify-between border-b pb-1"><span>Head of Household:</span> <strong className="font-sans tabular-nums text-blue-600 dark:text-blue-400">$24,150</strong></div>
            <div className="flex justify-between"><span>Married Filing Separately:</span> <strong className="font-sans tabular-nums text-blue-600 dark:text-blue-400">$16,100</strong></div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-5 space-y-2">
            <span className="font-bold text-sm text-slate-900 dark:text-slate-100 block">2025 Standard Deductions</span>
            <div className="flex justify-between border-b pb-1"><span>Single:</span> <strong className="font-sans tabular-nums text-blue-600 dark:text-blue-400">$15,750</strong></div>
            <div className="flex justify-between border-b pb-1"><span>Married Filing Jointly:</span> <strong className="font-sans tabular-nums text-blue-600 dark:text-blue-400">$31,500</strong></div>
            <div className="flex justify-between border-b pb-1"><span>Head of Household:</span> <strong className="font-sans tabular-nums text-blue-600 dark:text-blue-400">$23,625</strong></div>
            <div className="flex justify-between"><span>Married Filing Separately:</span> <strong className="font-sans tabular-nums text-blue-600 dark:text-blue-400">$15,750</strong></div>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-5 space-y-2 text-xs leading-relaxed">
          <span className="font-bold text-sm text-slate-900 dark:text-slate-100 block">Qualifying Schedule A Deductions Modeled:</span>
          <ul className="space-y-1.5 list-disc list-inside text-slate-600 dark:text-slate-300">
            <li>
              <strong>Mortgage Interest:</strong> Deductible on up to $750,000 of qualifying acquisition debt incurred after December 15, 2017 ($375,000 for MFS filers). Grandfathered debt incurred on or before December 15, 2017 remains subject to the $1,000,000 limit ($500,000 for MFS). To model monthly home loan principal and interest payments, use our{" "}
              <Link href="/calculators/mortgage-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                mortgage calculator
              </Link>
              .
            </li>
            <li><strong>State & Local Taxes (SALT):</strong> Subject to the statutory annual limitation ($40,400 for 2026; $40,000 for 2025; halved for MFS).</li>
            <li><strong>Charitable Contributions:</strong> Deductible donations made to qualifying 501(c)(3) religious, charitable, or educational organizations.</li>
            <li><strong>Unreimbursed Medical & Dental Expenses:</strong> Deductible only to the extent that qualifying medical expenses exceed 7.5% of AGI.</li>
          </ul>
        </div>
      </section>

      {/* 5. Marginal vs Effective Tax Rate */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <Percent className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            5. Marginal Tax Rate vs. Effective Tax Rate
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          It is essential to distinguish between your marginal tax rate and the effective tax rate calculated by this tool:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-5 space-y-2">
            <strong className="font-bold text-sm text-purple-600 dark:text-purple-400 block">Marginal Tax Rate</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              The tax rate applied to your <em>last dollar of taxable income</em> (the highest bracket you reach). For a single filer with $68,900 of taxable income in 2026, the marginal bracket is 22%.
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-5 space-y-2">
            <strong className="font-bold text-sm text-blue-600 dark:text-blue-400 block">Effective Tax Rate (Calculator Definition)</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              The actual percentage of your total gross income paid in federal income tax:
              <br />
              <code className="font-mono text-[11px] font-bold text-blue-600 dark:text-blue-400">Effective Tax Rate = (Total Federal Tax Liability ÷ Total Gross Income) × 100</code>
            </p>
          </div>
        </div>

        <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 text-xs space-y-2">
          <span className="font-bold text-blue-900 dark:text-blue-100 block">Verified 2026 Example (Single Filer, $85,000 W-2 Wages):</span>
          <p className="text-slate-700 dark:text-slate-300">
            A single filer earning $85,000 in 2026 takes the $16,100 standard deduction, leaving $68,900 in taxable income.
            Taxes are computed as: 10% on $12,400 ($1,240) + 12% on $38,000 ($4,560) + 22% on $18,500 ($4,070) = <strong>$9,870.00</strong>.
            The effective federal tax rate is <strong>11.61%</strong> ($9,870 ÷ $85,000), even though the top marginal bracket is <strong>22%</strong>.
          </p>
        </div>
      </section>

      {/* 6. Tax Deductions vs Tax Credits */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <DollarSign className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            6. Tax Deductions vs. Tax Credits
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Understanding the mathematical difference between deductions and tax credits helps clarify your final tax outcome:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-5 space-y-2">
            <strong className="font-bold text-sm text-slate-900 dark:text-slate-100 block">Tax Deductions (Reduce Taxable Income)</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Deductions reduce total taxable income <em>before</em> tax brackets are applied. The tax savings equals the deduction amount multiplied by your marginal tax bracket. A $1,000 deduction in the 22% bracket reduces tax liability by <strong>$220</strong>.
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-5 space-y-2">
            <strong className="font-bold text-sm text-slate-900 dark:text-slate-100 block">Tax Credits (Dollar-for-Dollar Reductions)</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Tax credits reduce final tax liability directly dollar-for-dollar. A $1,000 tax credit lowers your federal tax bill by exactly <strong>$1,000</strong>. Refundable credits (such as the ACTC) can trigger a refund check even if tax liability is zero.
            </p>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          To model pre-tax retirement savings that lower Adjusted Gross Income (AGI) on Schedule 1, explore our{" "}
          <Link href="/calculators/traditional-ira-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
            traditional IRA calculator
          </Link>{" "}
          and{" "}
          <Link href="/calculators/401k-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
            401(k) calculator
          </Link>
          . To evaluate post-tax compounding and tax-free retirement distributions, see our{" "}
          <Link href="/calculators/roth-ira-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
            Roth IRA calculator
          </Link>
          .
        </p>
      </section>

      {/* 7. Child Tax Credit & Other Dependents */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <Users className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            7. Child Tax Credit (CTC) & Credit for Other Dependents (ODC)
          </h2>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-5 text-xs space-y-2 leading-relaxed">
          <ul className="space-y-2 list-disc list-inside text-slate-600 dark:text-slate-300">
            <li>
              <strong>Child Tax Credit (CTC):</strong> Up to <strong>$2,200</strong> per qualifying child under age 17 with a valid Social Security Number.
            </li>
            <li>
              <strong>Additional Child Tax Credit (ACTC):</strong> Up to <strong>$1,700</strong> per qualifying child is refundable if the credit exceeds total tax liability (calculated as 15% of earned income exceeding $2,500).
            </li>
            <li>
              <strong>Credit for Other Dependents (ODC):</strong> A <strong>$500</strong> nonrefundable credit per qualifying dependent age 17 and older or qualifying relative.
            </li>
            <li>
              <strong>Statutory Phaseout:</strong> The total credit begins phasing out at a rate of <strong>$50 for each $1,000</strong> (or fraction thereof) by which Modified AGI exceeds <strong>$400,000</strong> for Married Filing Jointly and <strong>$200,000</strong> for all other filing statuses.
            </li>
          </ul>
        </div>
      </section>

      {/* 8. SALT Limitation */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <Landmark className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            8. State and Local Tax (SALT) Deduction
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Under Internal Revenue Code § 164(b)(6), taxpayers itemizing on Schedule A can deduct qualifying state and local income (or sales) taxes, plus real estate property taxes, up to the statutory annual limits:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
            <strong className="block text-slate-900 dark:text-slate-100 mb-1">Tax Year 2026 SALT Limitation</strong>
            <span className="font-sans tabular-nums text-blue-600 dark:text-blue-400 font-bold text-base">$40,400</span>
            <span className="text-slate-500 block mt-1">($20,200 for Married Filing Separately)</span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
            <strong className="block text-slate-900 dark:text-slate-100 mb-1">Tax Year 2025 SALT Limitation</strong>
            <span className="font-sans tabular-nums text-blue-600 dark:text-blue-400 font-bold text-base">$40,000</span>
            <span className="text-slate-500 block mt-1">($20,000 for Married Filing Separately)</span>
          </div>
        </div>
      </section>

      {/* 9. Senior Tax Provisions */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <Award className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            9. Senior Tax Provisions (Age 65 and Older)
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Taxpayers age 65 and older qualify for dual statutory tax benefits under federal tax law:
        </p>
        <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-5 text-xs space-y-3 leading-relaxed">
          <div>
            <strong className="text-slate-900 dark:text-slate-100 block">A. Traditional Additional Standard Deduction (IRC § 63(f)):</strong>
            <span className="text-slate-600 dark:text-slate-300">2026: <strong>$2,050</strong> for Single/Head of Household; <strong>$1,650</strong> per spouse for Married filers. (2025: $2,000 / $1,600).</span>
          </div>
          <div>
            <strong className="text-slate-900 dark:text-slate-100 block">B. Enhanced Senior Deduction (2025–2028 Statutes):</strong>
            <span className="text-slate-600 dark:text-slate-300">An additional <strong>$6,000</strong> deduction for eligible individuals age 65+, subject to phaseout at $50 per $1,000 MAGI exceeding <strong>$75,000</strong> (Single/HOH/MFS) and <strong>$150,000</strong> (MFJ).</span>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          To estimate retirement benefit cash flows, use our{" "}
          <Link href="/calculators/social-security-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
            Social Security calculator
          </Link>
          , and calculate mandatory pre-tax retirement distributions with our{" "}
          <Link href="/calculators/rmd-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
            RMD calculator
          </Link>
          .
        </p>
      </section>

      {/* 10. Self-Employment Tax */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <Briefcase className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            10. Self-Employment Tax (Schedule SE)
          </h2>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-5 text-xs space-y-2 leading-relaxed">
          <p className="text-slate-600 dark:text-slate-300">
            Self-employed individuals, freelancers, and 1099 contractors pay federal Self-Employment (SE) tax under IRC §§ 1401 and 1402:
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
            <li><strong>Taxable Base:</strong> Assessed on <strong>92.35%</strong> of net business profit from Schedule C.</li>
            <li><strong>Combined 15.3% Rate:</strong> 12.4% Social Security (capped at the annual wage base of <strong>$184,500 for 2026</strong> / <strong>$176,100 for 2025</strong>) plus 2.9% Medicare with no income cap.</li>
            <li><strong>50% Above-the-Line Deduction:</strong> Taxpayers deduct half of their total calculated SE tax on Form 1040 Schedule 1 (Part II), directly reducing AGI.</li>
          </ul>
        </div>
      </section>

      {/* 11. Capital Gains & Qualified Dividends */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <Layers className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            11. Preferential Capital Gains & Qualified Dividends
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Net long-term capital gains (assets held longer than one year) and qualified dividends (Form 1099-DIV Box 1b) benefit from preferential federal tax rates of <strong>0%, 15%, or 20%</strong> stacked on top of ordinary taxable income:
        </p>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold">
                <th className="p-3">Rate</th>
                <th className="p-3">Single / MFS (2026)</th>
                <th className="p-3">Married Filing Jointly (2026)</th>
                <th className="p-3">Head of Household (2026)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-900 font-sans tabular-nums text-slate-700 dark:text-slate-300">
              <tr>
                <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">0%</td>
                <td className="p-3">Up to $49,450</td>
                <td className="p-3">Up to $98,900</td>
                <td className="p-3">Up to $66,200</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">15%</td>
                <td className="p-3">&gt;$49,450 – $545,500</td>
                <td className="p-3">&gt;$98,900 – $613,700</td>
                <td className="p-3">&gt;$66,200 – $579,600</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-purple-600 dark:text-purple-400">20%</td>
                <td className="p-3">Over $545,500</td>
                <td className="p-3">Over $613,700</td>
                <td className="p-3">Over $579,600</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 12. Enacted 2025-2028 Deductions */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <Zap className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            12. Enacted 2025–2028 Special Deductions
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-4 space-y-1.5">
            <strong className="text-slate-900 dark:text-slate-100 block font-semibold">Qualified Tip Deduction</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Above-the-line deduction up to <strong>$25,000</strong> for documented qualified tip compensation reported on Form 4070 / W-2.
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-4 space-y-1.5">
            <strong className="text-slate-900 dark:text-slate-100 block font-semibold">Overtime Pay Deduction</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Above-the-line deduction up to <strong>$12,500</strong> for Single/HOH/MFS (up to <strong>$25,000</strong> for MFJ) for statutory premium overtime earnings.
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-4 space-y-1.5">
            <strong className="text-slate-900 dark:text-slate-100 block font-semibold">Qualified Auto Loan Interest</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Above-the-line deduction up to <strong>$10,000</strong> for qualifying purchase interest on eligible motor vehicles.
            </p>
          </div>
        </div>
      </section>

      {/* 13. Tax Withholding, Refunds, and Amount Owed */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            13. Tax Withholding, Refunds, and Amount Owed
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Federal income tax withholding (W-2 Box 2) represents prepayment credits applied against your annual federal tax liability.
          Your net year-end position is the mathematical difference between total prepayments (including refundable credits) and calculated liability:
        </p>
        <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-5 text-xs space-y-2">
          <div className="flex justify-between border-b pb-1.5">
            <span className="font-semibold text-slate-900 dark:text-slate-100">Estimated IRS Refund (Line 34):</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">Total Withholding + Refundable Credits &gt; Total Tax Liability</span>
          </div>
          <div className="flex justify-between pt-1">
            <span className="font-semibold text-slate-900 dark:text-slate-100">Estimated Tax Owed (Line 37):</span>
            <span className="text-amber-700 dark:text-amber-400 font-bold">Total Tax Liability &gt; Total Withholding + Nonrefundable Credits</span>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          To verify that your paycheck withholding aligns accurately with your annual liability, use our{" "}
          <Link href="/calculators/take-home-pay-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
            paycheck tax calculator
          </Link>
          .
        </p>
      </section>

      {/* 14. Form 1040 Mapping */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <FileText className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            14. IRS Form 1040 Step-by-Step Reporting Mapping
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          This calculator provides an educational step-by-step mapping to the primary reporting lines on IRS Form 1040:
        </p>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold">
                <th className="p-3">Line</th>
                <th className="p-3">Form 1040 Description</th>
                <th className="p-3">Mathematical Operation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-900 font-sans text-slate-700 dark:text-slate-300">
              <tr><td className="p-3 font-bold text-blue-600 dark:text-blue-400">Line 1</td><td className="p-3">W-2 Wages & Salary</td><td className="p-3">Box 1 compensation</td></tr>
              <tr><td className="p-3 font-bold text-blue-600 dark:text-blue-400">Lines 2–8</td><td className="p-3">Business, Cap Gains & Other Income</td><td className="p-3">Schedule C profit, interest, dividends, capital gains</td></tr>
              <tr className="bg-slate-50 dark:bg-slate-800/50 font-bold text-slate-900 dark:text-slate-100"><td className="p-3 text-blue-600 dark:text-blue-400">Line 9</td><td className="p-3">Total Gross Income</td><td className="p-3">Line 1 + Lines 2–8</td></tr>
              <tr><td className="p-3 font-bold text-blue-600 dark:text-blue-400">Line 10</td><td className="p-3">Above-the-Line Adjustments</td><td className="p-3">Schedule 1 deductions (50% SE tax, IRA, HSA, Tips, Overtime)</td></tr>
              <tr className="bg-slate-50 dark:bg-slate-800/50 font-bold text-slate-900 dark:text-slate-100"><td className="p-3 text-blue-600 dark:text-blue-400">Line 11</td><td className="p-3">Adjusted Gross Income (AGI)</td><td className="p-3">Line 9 − Line 10</td></tr>
              <tr><td className="p-3 font-bold text-blue-600 dark:text-blue-400">Line 12</td><td className="p-3">Standard or Itemized Deduction</td><td className="p-3">Max(Total Standard Deduction, Schedule A)</td></tr>
              <tr className="bg-slate-50 dark:bg-slate-800/50 font-bold text-emerald-600 dark:text-emerald-400"><td className="p-3">Line 15</td><td className="p-3">Taxable Income</td><td className="p-3">Line 11 − Line 12</td></tr>
              <tr><td className="p-3 font-bold text-blue-600 dark:text-blue-400">Line 16</td><td className="p-3">Total Tax Before Credits</td><td className="p-3">Progressive bracket calculation + Cap Gains rates</td></tr>
              <tr><td className="p-3 font-bold text-blue-600 dark:text-blue-400">Lines 19–20</td><td className="p-3">Child & Total Tax Credits</td><td className="p-3">Child Tax Credit ($2,200), ODC ($500), Education, Child Care</td></tr>
              <tr className="bg-blue-50/70 dark:bg-blue-950/40 font-bold text-slate-900 dark:text-slate-100"><td className="p-3 text-blue-600 dark:text-blue-400">Line 24</td><td className="p-3">Total Federal Tax Liability</td><td className="p-3">Line 16 + Self-Employment Tax − Nonrefundable Credits</td></tr>
              <tr><td className="p-3 font-bold text-blue-600 dark:text-blue-400">Line 25</td><td className="p-3">Federal Tax Withheld</td><td className="p-3">W-2 Box 2 + 1099 withholding prepayments</td></tr>
              <tr className="bg-emerald-50/70 dark:bg-emerald-950/40 font-bold text-emerald-600 dark:text-emerald-400"><td className="p-3">Line 34 / 37</td><td className="p-3">Estimated Refund or Balance Due</td><td className="p-3">Line 25 − Line 24</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          To evaluate how combining incomes or filing separately alters these Form 1040 lines, see our{" "}
          <Link href="/calculators/marriage-tax-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
            marriage tax calculator
          </Link>
          .
        </p>
      </section>

      {/* 15. Frequently Asked Questions */}
      <section className="space-y-4 pt-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <HelpCircle className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            15. Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-3 text-xs">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5"
            >
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                {faq.question}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 16. Related Financial & Tax Calculators */}
      <section className="space-y-4">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Related Financial & Tax Calculators
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
          {[
            { title: "Salary Calculator", href: "/calculators/salary-calculator", desc: "Hourly to annual wage converter" },
            { title: "Take-Home Pay Calculator", href: "/calculators/take-home-pay-calculator", desc: "Net paycheck after FICA & state tax" },
            { title: "Mortgage Calculator", href: "/calculators/mortgage-calculator", desc: "Monthly principal & interest payments" },
            { title: "Traditional IRA Calculator", href: "/calculators/traditional-ira-calculator", desc: "Pre-tax retirement AGI savings" },
            { title: "Roth IRA Calculator", href: "/calculators/roth-ira-calculator", desc: "Post-tax compound retirement growth" },
            { title: "401(k) Calculator", href: "/calculators/401k-calculator", desc: "Workplace pre-tax elective deferrals" },
            { title: "Social Security Calculator", href: "/calculators/social-security-calculator", desc: "Retirement benefit cash flow estimates" },
            { title: "RMD Calculator", href: "/calculators/rmd-calculator", desc: "Mandatory pre-tax distributions" },
            { title: "Marriage Tax Calculator", href: "/calculators/marriage-tax-calculator", desc: "Joint vs separate filing comparison" },
            { title: "Estate Tax Calculator", href: "/calculators/estate-tax-calculator", desc: "Federal estate exemption planning" },
          ].map((calc, idx) => (
            <Link
              key={idx}
              href={calc.href}
              className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:border-blue-300 dark:hover:border-blue-700 transition-all space-y-1 block shadow-xs"
            >
              <strong className="font-semibold text-slate-900 dark:text-slate-100 block text-xs">{calc.title}</strong>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block">{calc.desc}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 17. Methodology, Sources & Educational Disclaimer */}
      <section className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-5 text-xs text-slate-600 dark:text-slate-400 space-y-3 leading-relaxed">
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100 text-sm">
          <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span>Authoritative IRS Sources & Educational Disclaimer</span>
        </div>
        <p>
          <strong>Authoritative Sources:</strong> Internal Revenue Code (IRC §§ 1, 24, 63, 164, 1401, 1402); IRS Revenue Procedure 2025-32 (Tax Year 2026 inflation adjustments); IRS Revenue Procedure 2024-40 (Tax Year 2025 inflation adjustments); IRS Form 1040, Schedule 1, Schedule A, Schedule C, Schedule SE, and Schedule 8812 instructions.
        </p>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          <strong>Educational Estimate & Disclaimer:</strong> This calculator is an independent computational model designed for educational and personal financial planning purposes based on published IRS Revenue Procedures and enacted federal tax statutes. It does not provide legal, accounting, or tax advice, nor does it prepare, file, or submit tax returns to the Internal Revenue Service. Individual tax situations vary based on state laws, local ordinances, and specific taxpayer circumstances. Users should consult a qualified Certified Public Accountant (CPA), Enrolled Agent (EA), or tax attorney for professional guidance regarding specific tax filings.
        </p>
      </section>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import {
  Shield,
  Clock,
  Landmark,
  Percent,
  Sparkles,
  AlertTriangle,
  Calculator,
  BookOpen,
  ArrowRight,
  Scale,
  FileSpreadsheet,
  CheckCircle2,
  Calendar,
  Layers,
} from "lucide-react";

export function RmdContent() {
  return (
    <article className="space-y-12 text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
      {/* =========================================================================
          ARTICLE HERO / INTRODUCTION
         ========================================================================= */}
      <section className="space-y-4">
        <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
          Required minimum distributions, usually called RMDs, are minimum amounts that many owners of traditional IRAs and participants in retirement plans are required to withdraw once they reach the applicable starting age. The calculation looks simple at first glance—take the previous December 31 account balance and divide it by an IRS distribution period—but determining the correct age, life-expectancy factor, account treatment, deadline, and tax consequences can make the process considerably more complicated. The <strong>RMD Calculator</strong> brings those pieces together so you can estimate an RMD, understand where the number comes from, and explore what it may mean for your retirement income and taxes.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          At its core, an RMD is generally calculated using the retirement account&apos;s balance at the end of the immediately preceding calendar year divided by an applicable life-expectancy factor from an IRS table. For many individual retirement account owners, the <strong>Uniform Lifetime Table (Table III)</strong> is used. A different table can apply when the owner&apos;s spouse is the sole beneficiary and is more than 10 years younger. The IRS provides the life-expectancy tables and calculation worksheets used for this purpose.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          For example, suppose an IRA owner has a $300,000 balance on December 31 of the previous year and is age 75 during the RMD year. Under the calculator&apos;s reference case, the applicable Uniform Lifetime Table III factor is <strong>24.6</strong>. The basic calculation is therefore:
        </p>

        <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 font-mono text-center text-base sm:text-lg text-indigo-700 dark:text-indigo-300 font-bold">
          RMD = $300,000 ÷ 24.6 = $12,195.12
        </div>

        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          That means the estimated minimum distribution for the modeled year is <strong>$12,195.12</strong> ($1,016.26/month). The calculator then lets you examine that result from several perspectives: a monthly equivalent, estimated tax, net amount after tax, potential QCD offset, account-by-account RMDs, lifetime projections, and future account balances.
        </p>
      </section>

      {/* =========================================================================
          KEY SECURE 2.0 REGULATORY HIGHLIGHTS
         ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
            <Clock className="h-5 w-5" /> SECURE 2.0 Framework
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Applicable starting age is <strong>73</strong> for individuals born 1951–1959 and <strong>75</strong> for individuals born in 1960 or later, confirming IRS 2026 guidance.
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
            <Sparkles className="h-5 w-5" /> 2026 QCD Limit: $111,000
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Eligible IRA owners aged 70½ and older can transfer up to <strong>$111,000 in 2026</strong> directly to qualifying charities, satisfying RMDs while excluding 100% from Adjusted Gross Income (AGI).
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
            <AlertTriangle className="h-5 w-5" /> Reduced Excise Penalties
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Under SECURE 2.0, missed RMD excise penalties were reduced from 50% to <strong>25%</strong>, and down to <strong>10%</strong> if timely corrected via IRS Form 5329.
          </p>
        </div>
      </div>

      {/* =========================================================================
          SECTION 1: WHAT AN RMD IS AND HOW THE CALCULATION WORKS
         ========================================================================= */}
      <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50">
            <Calculator className="h-5 w-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            1. What an RMD Is and How the Basic Calculation Works
          </h2>
        </div>

        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          An RMD is the minimum amount that must generally be distributed each year from an applicable retirement account once the owner or participant reaches the required distribution stage. The purpose of the RMD rules is to prevent retirement accounts from remaining indefinitely sheltered from taxation. For traditional IRAs and many employer retirement plans, the annual minimum is determined using a formula tied to the account balance and a life-expectancy period. The IRS describes the amount as the required minimum distribution and provides specific tables and worksheets for calculating it.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          The most useful way to understand the calculation is to start with the two inputs that drive it: <strong>prior-year-end account balance</strong> and <strong>distribution factor</strong>.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          The account balance is generally the value of the account as of the close of business on December 31 of the year before the RMD year. The IRS&apos;s calculation worksheet uses that prior-year-end value rather than the current year&apos;s balance.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          The second input is the applicable denominator from an IRS life-expectancy table. For a typical account owner using the Uniform Lifetime Table, the factor decreases as age increases. The smaller denominator means the required distribution generally represents a larger percentage of the account balance as the owner gets older.
        </p>

        <div className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 space-y-2 font-mono">
          <div className="text-xs uppercase font-bold text-indigo-900 dark:text-indigo-300 font-sans">
            Primary RMD Formula
          </div>
          <div className="text-base sm:text-lg font-bold text-indigo-600 dark:text-indigo-400">
            RMD = Prior December 31 Account Balance ÷ IRS Distribution Factor
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-sans pt-1">
            Consider the calculator&apos;s reference example: <br />
            Prior-year-end balance: $300,000 | Age: 75 | IRS factor: 24.6 <br />
            <strong>$300,000 ÷ 24.6 = $12,195.12</strong> (Monthly equivalent: $1,016.26/month)
          </p>
        </div>

        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          The monthly number is simply a budgeting representation of the annual RMD. It does not mean the IRS requires twelve equal monthly withdrawals. The legal requirement is expressed as an annual minimum, and account owners can generally take the distribution in one or multiple transactions as long as the required amount is distributed by the applicable deadline.
        </p>
      </section>

      {/* =========================================================================
          SECTION 2: YOUR RMD AGE: 73, 75 AND SECURE 2.0 CHANGES
         ========================================================================= */}
      <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50">
            <Clock className="h-5 w-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            2. Your RMD Age: 73, 75 and the SECURE 2.0 Changes
          </h2>
        </div>

        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          One of the most common RMD mistakes is assuming that everyone begins at the same age. The applicable RMD age has changed through federal legislation, and the transition depends on birth year. SECURE 2.0 changed the framework again by raising the applicable age in stages. The IRS&apos;s 2026 materials confirm the statutory transition between age 73 and age 75.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          Under the current framework, the relevant age for many people is 73, while a later birth cohort is subject to 75. The exact statutory language is based on when an individual reaches the applicable age, so a calculator should use birth year to determine the appropriate rule rather than assuming that every taxpayer reaches an RMD requirement at 73.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          This matters because the RMD age determines the year in which the first RMD is required. A person born in 1951, for example, falls into the age-73 group. That person reaches 73 in 2024, meaning the first RMD year is 2024 even though the person may actually receive that first required distribution as late as April 1, 2025 under the first-year deadline rule.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          By contrast, someone born in 1960 is subject to the later age-75 framework. That person reaches 75 in 2035, so 2035 is the applicable first RMD year under the model.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 block text-xs uppercase tracking-wider">Stage 1: Pre-RMD Phase</span>
            <p className="font-bold text-slate-900 dark:text-white text-sm">Before First RMD Year</p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              No RMD is yet required under the age-based rule being modeled. Opportunity to execute strategic partial Roth conversions.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 block text-xs uppercase tracking-wider">Stage 2: First RMD Year</span>
            <p className="font-bold text-slate-900 dark:text-white text-sm">Initial RMD Year</p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              The individual has an RMD obligation for that calendar year, with the special initial deadline generally extending to April 1 of the following year.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="font-bold text-blue-600 dark:text-blue-400 block text-xs uppercase tracking-wider">Stage 3: Subsequent Years</span>
            <p className="font-bold text-slate-900 dark:text-white text-sm">Ongoing Annual Phase</p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              For all subsequent years, annual RMDs generally must be withdrawn by December 31st of each calendar year.
            </p>
          </div>
        </div>

        {/* Double Distribution Warning Box */}
        <div className="p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs sm:text-sm space-y-2">
          <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            First-Year Tax Planning Warning: The Two-Distribution Situation
          </div>
          <p className="text-amber-900 dark:text-amber-200/90 leading-relaxed text-xs">
            If an owner reaches the applicable RMD age in one year and waits until the following April to take that first RMD, the person can also have a second RMD due by December 31 of that same following year. Having two RMDs in one calendar year can increase taxable income and may affect your marginal tax rate or other income-based considerations.
          </p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: WHICH IRS LIFE-EXPECTANCY TABLE APPLIES
         ========================================================================= */}
      <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50">
            <Layers className="h-5 w-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            3. Which IRS Life-Expectancy Table Applies to Your RMD?
          </h2>
        </div>

        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          Once the applicable RMD age and distribution year are known, the next critical component is the distribution factor. The IRS maintains life-expectancy tables that provide the denominator used to calculate the minimum distribution. For many account owners, the relevant table is the <strong>Uniform Lifetime Table (Table III)</strong>. A different table, the <strong>Joint Life and Last Survivor Table (Table II)</strong>, may apply when the owner&apos;s spouse is the sole beneficiary and is more than 10 years younger.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
          <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3 shadow-xs">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 text-sm block">1. Uniform Lifetime Table (Table III)</span>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              At age 75, the factor is 24.6 ($300k ÷ 24.6 = $12,195.12). At age 80, the factor declines to 20.2 ($300k ÷ 20.2 ≈ $14,851.49), and at age 90 it is 12.2. The factor decreases with age, meaning the required distribution represents a larger percentage over time.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3 shadow-xs">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 text-sm block">2. Joint Life &amp; Last Survivor Table (Table II)</span>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              If your spouse is the <strong>sole primary beneficiary</strong> for the entire tax year AND is <strong>more than 10 years younger</strong> than you, Table II produces a larger denominator and therefore a smaller required minimum distribution, keeping more assets tax-deferred.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: IRA AGGREGATION VS 401(K) DISTRIBUTION RULES
         ========================================================================= */}
      <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50">
            <FileSpreadsheet className="h-5 w-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            4. Multiple Retirement Accounts: IRA Aggregation vs. 401(k) Distribution Rules
          </h2>
        </div>

        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          Many retirees have more than one retirement account, and that creates an important distinction in RMD planning. Not all retirement accounts can simply be combined into one balance and divided by one factor. The IRS specifically distinguishes the treatment of IRAs from defined-contribution employer plans such as 401(k)s and certain 403(b) arrangements.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold">
              <tr>
                <th className="p-3 border-b border-slate-200 dark:border-slate-700">Account Category</th>
                <th className="p-3 border-b border-slate-200 dark:border-slate-700">Subject to RMD?</th>
                <th className="p-3 border-b border-slate-200 dark:border-slate-700">Aggregation Allowed?</th>
                <th className="p-3 border-b border-slate-200 dark:border-slate-700">IRS Rule &amp; Withdrawal Requirement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-sans">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                <td className="p-3 font-semibold">Traditional / SEP / SIMPLE IRA</td>
                <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">YES</td>
                <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">YES (IRA Pool)</td>
                <td className="p-3 text-slate-600 dark:text-slate-400">Calculate RMD for each IRA separately, sum total, and withdraw from any single IRA or combination.</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                <td className="p-3 font-semibold">Employer 401(k) / Profit-Sharing</td>
                <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">YES</td>
                <td className="p-3 font-bold text-rose-600 dark:text-rose-400">NO</td>
                <td className="p-3 text-slate-600 dark:text-slate-400">Must calculate and withdraw the exact RMD separately from each employer 401(k) account.</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                <td className="p-3 font-semibold">403(b) Tax-Sheltered Annuities</td>
                <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">YES</td>
                <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">YES (403b Pool)</td>
                <td className="p-3 text-slate-600 dark:text-slate-400">Can aggregate across multiple 403(b) accounts, but cannot aggregate with IRAs or 401(k) plans.</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                <td className="p-3 font-semibold">Roth IRA (Original Owner)</td>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">NO (EXEMPT)</td>
                <td className="p-3 text-slate-400">N/A</td>
                <td className="p-3 text-slate-600 dark:text-slate-400">Roth IRAs have zero mandatory lifetime distributions during the owner&apos;s lifetime.</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                <td className="p-3 font-semibold">Designated Roth 401(k) / 403(b)</td>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">NO (Starting 2024)</td>
                <td className="p-3 text-slate-400">N/A</td>
                <td className="p-3 text-slate-600 dark:text-slate-400">SECURE 2.0 eliminated lifetime RMDs for designated Roth employer accounts effective 2024.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: QUALIFIED CHARITABLE DISTRIBUTIONS (QCDS)
         ========================================================================= */}
      <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50">
            <Sparkles className="h-5 w-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            5. Qualified Charitable Distributions and the RMD Tax Effect
          </h2>
        </div>

        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          A Qualified Charitable Distribution (QCD) can be an important part of RMD planning for an eligible IRA owner who intends to make charitable gifts. A qualifying QCD is generally a direct distribution from an IRA to an eligible charity and can count toward the owner&apos;s RMD while generally being excluded from gross income when the statutory requirements are satisfied.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          One important point is that QCD eligibility is separate from the RMD starting age. The IRS requires the IRA owner to be <strong>at least age 70½</strong> when the QCD is made. That age is not changed simply because the RMD age was later increased by SECURE 2.0.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          For an eligible RMD year, a qualifying QCD can satisfy all or part of the RMD. Consider the calculator&apos;s reference RMD of $12,195.12 with a $5,000 qualifying QCD:
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 font-mono text-xs sm:text-sm space-y-1">
          <div>Gross RMD: $12,195.12 | Qualifying QCD: $5,000.00</div>
          <div className="text-indigo-600 dark:text-indigo-400 font-bold">Taxable RMD Remaining: $12,195.12 − $5,000 = $7,195.12</div>
          <div className="text-emerald-600 dark:text-emerald-400 font-bold">Estimated Tax at 22%: $1,582.93 (Estimated Tax Savings: $1,100.00)</div>
        </div>

        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          The IRS&apos;s inflation-adjustment guidance increased the <strong>2026 annual QCD exclusion to $111,000</strong>, up from $108,000 for 2025. For a qualifying QCD, the amount excluded from gross income is not simultaneously claimed as a separate itemized charitable contribution deduction for that same excluded amount.
        </p>
      </section>

      {/* =========================================================================
          SECTION 6: RMD TAXES, NET INCOME AND MISSED RMD PENALTIES
         ========================================================================= */}
      <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50">
            <Percent className="h-5 w-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            6. RMD Taxes, Net Income and the Cost of Missing an RMD
          </h2>
        </div>

        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          RMDs from traditional retirement accounts are generally included in taxable income to the extent the distribution is taxable. The exact tax result depends on the account, the owner&apos;s tax basis where applicable, other income, deductions, filing status, and the taxpayer&apos;s complete federal and state tax situation.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          Using the calculator&apos;s baseline case ($12,195.12 RMD at 22% marginal tax rate):
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span className="text-zinc-500 block text-xs">Estimated Federal + State Tax (22%)</span>
            <span className="text-base font-bold text-rose-600 dark:text-rose-400">$2,682.93</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span className="text-zinc-500 block text-xs">Estimated Net After-Tax Cash Flow</span>
            <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">$9,512.19</span>
          </div>
        </div>

        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          Missing an RMD triggers an IRS excise tax. Under SECURE 2.0, the standard excise tax is <strong>25%</strong> ($3,048.78 on a $12,195.12 RMD), which drops to <strong>10%</strong> ($1,219.51) if corrected within the applicable 2-year window via IRS Form 5329.
        </p>
      </section>

      {/* =========================================================================
          SECTION 7: LIFETIME RMD PROJECTION
         ========================================================================= */}
      <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50">
            <Landmark className="h-5 w-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            7. Lifetime RMD Projection: How Your Balance and Future Distributions Can Evolve
          </h2>
        </div>

        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          An RMD is an annual requirement, but retirement planning is inherently long-term. A retiree who is 75 today may want to understand not just this year&apos;s required distribution but how the account could behave over the next decade or several decades. That is why the calculator includes an annual schedule and lifetime projection.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          The projection combines a starting account balance with a modeled annual growth assumption, then calculates future RMDs using the appropriate age-specific factor. The calculator uses a specific timing convention:
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 font-mono text-center text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400">
          Ending Balance = (Starting Balance − RMD) × (1 + Growth Rate)
        </div>

        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          In our baseline ($300,000 starting balance, 5% growth, age 75), the first year produces an RMD of $12,195.12 and an ending balance of <strong>$302,195.12</strong>. The following year (age 76, factor 23.7) produces a modeled RMD of <strong>$12,750.85</strong>. This illustrates that an account can continue growing even while taking mandatory RMDs if annual portfolio growth exceeds distributed amounts.
        </p>
      </section>

      {/* =========================================================================
          SECTION 8: HOW TO USE AN RMD CALCULATOR
         ========================================================================= */}
      <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            8. How to Use an RMD Calculator Without Treating the Result as a Tax Decision
          </h2>
        </div>

        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          The best way to use an RMD calculator is to treat it as a structured planning tool. Start with the December 31 balance from the previous year, confirm the applicable RMD age from your birth year, identify the correct distribution table, and then verify whether your account falls under IRA or employer-plan rules. Once the basic RMD is calculated, layer in QCDs, modeled taxes, and future growth assumptions only when they are relevant to your planning question.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          The most reliable workflow is: <br />
          <strong>Verify account balance → Verify RMD age → Verify IRS table → Calculate RMD → Check deadline → Consider QCDs → Estimate tax → Review broader retirement plan.</strong>
        </p>
      </section>

      {/* =========================================================================
          RMD FORMULA & CALCULATION METHOD
         ========================================================================= */}
      <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          RMD Formula &amp; Calculation Method
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 font-sans block text-xs">Standard Annual RMD</span>
            <div>RMD = Prior Dec 31 Balance ÷ Applicable IRS Factor</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 font-sans block text-xs">Monthly Equivalent</span>
            <div>Monthly Equivalent = Annual RMD ÷ 12</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 font-sans block text-xs">Taxable RMD Remaining</span>
            <div>Taxable RMD = max(0, Gross RMD − Qualifying QCD)</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 font-sans block text-xs">Net After-Tax Income</span>
            <div>Net Cash Flow = Gross RMD − Estimated Tax</div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          WORKED STEP-BY-STEP CALCULATION EXAMPLE
         ========================================================================= */}
      <section className="bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-5 border border-indigo-800/40">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
              Worked Example: $300,000 IRA at Age 75
            </h2>
            <p className="text-xs text-indigo-200/80 mt-0.5">
              Step-by-step mathematical walkthrough matching tested baseline.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-black/30 p-4 rounded-xl border border-white/10 font-sans tabular-nums">
          <div><span className="text-indigo-300 block text-[10px] uppercase font-bold">Birth Year</span><span className="font-bold text-white text-sm">1951</span></div>
          <div><span className="text-indigo-300 block text-[10px] uppercase font-bold">RMD Tax Year</span><span className="font-bold text-white text-sm">2026 (Age 75)</span></div>
          <div><span className="text-indigo-300 block text-[10px] uppercase font-bold">Prior Dec 31 Balance</span><span className="font-bold text-white text-sm">$300,000.00</span></div>
          <div><span className="text-indigo-300 block text-[10px] uppercase font-bold">Table III Factor</span><span className="font-bold text-white text-sm">24.6</span></div>
        </div>

        <div className="space-y-3 text-xs leading-relaxed text-indigo-100/90 pt-1 font-mono">
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <span className="font-bold text-indigo-300 block text-xs font-sans">Step 1: Calculate Mandatory Annual &amp; Monthly RMD</span>
            <p className="text-slate-300">RMD = $300,000.00 ÷ 24.6 = $12,195.12195...</p>
            <p className="text-white font-bold">Annual RMD = $12,195.12 | Monthly Equivalent = $1,016.26 / month</p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <span className="font-bold text-indigo-300 block text-xs font-sans">Step 2: Compute Modeled Tax &amp; Net After-Tax Income (22% Tax Rate)</span>
            <p className="text-slate-300">Estimated Tax = $12,195.12 × 22.0% = $2,682.93</p>
            <p className="text-emerald-400 font-black text-base pt-1 font-sans">
              Net After-Tax Income = $12,195.12 − $2,682.93 = $9,512.19
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          METHODOLOGY & LIMITATIONS
         ========================================================================= */}
      <section className="space-y-3 pt-6 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          Methodology &amp; Limitations
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          This RMD Calculator is designed to estimate required minimum distributions using the prior-year-end account balance and applicable IRS distribution factors. It can also model account aggregation, spouse-based table selection, QCD offsets, estimated taxes, penalty scenarios, lifetime account projections, charts, and schedules. The calculator&apos;s tax calculation is a planning estimate and does not model every deduction, credit, taxable-income interaction, state tax, or individual circumstance. Always compare results with RMD statements provided by your financial institution or plan administrator before taking action.
        </p>
      </section>

      {/* =========================================================================
          CONTEXTUAL RELATED CALCULATORS NAVIGATION
         ========================================================================= */}
      <section className="space-y-3 pt-6 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white">
          Related Calculators
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Explore complementary retirement, investment, and tax estimation tools:
        </p>
        <div className="flex flex-wrap gap-2 pt-1 text-xs">
          <Link href="/calculators/retirement-calculator" className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-200 dark:border-slate-700 transition-colors">
            Retirement Calculator →
          </Link>
          <Link href="/calculators/401k-calculator" className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-200 dark:border-slate-700 transition-colors">
            401(k) Calculator →
          </Link>
          <Link href="/calculators/roth-ira-calculator" className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-200 dark:border-slate-700 transition-colors">
            Roth IRA Calculator →
          </Link>
          <Link href="/calculators/investment-calculator" className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-200 dark:border-slate-700 transition-colors">
            Investment Calculator →
          </Link>
          <Link href="/calculators/inflation-calculator" className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-200 dark:border-slate-700 transition-colors">
            Inflation Calculator →
          </Link>
          <Link href="/calculators/annuity-calculator" className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-200 dark:border-slate-700 transition-colors">
            Annuity Calculator →
          </Link>
        </div>
      </section>
    </article>
  );
}

export default RmdContent;

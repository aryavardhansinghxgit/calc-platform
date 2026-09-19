"use client";

import React from "react";
import Link from "next/link";
import { Landmark, ShieldCheck, Scale, Calculator, BookOpen, AlertCircle, FileText, CheckCircle2, TrendingUp } from "lucide-react";

export function EstateTaxContent() {
  return (
    <article className="mt-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-10 divide-y divide-slate-100 dark:divide-slate-800 shadow-xs">
      
      {/* 1. INTRODUCTION */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase">
          <Landmark className="w-4 h-4" />
          <span>Foundational Overview</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          1. Introduction to the Estate Tax
        </h2>
        <p>
          The <strong>Federal Estate Tax</strong> (frequently referred to in public discourse as the &quot;death tax&quot;) is a progressive excise tax levied by the United States Internal Revenue Service (IRS) on the transfer of wealth from a deceased person’s estate to their beneficiaries. Rather than taxing individual heirs on what they receive, the federal estate tax is assessed directly against the cumulative net value of the decedent’s entire property before any testamentary distributions occur.
        </p>
        <p>
          This calculator provides high-net-worth individuals, estate planning attorneys, certified financial planners (CFPs), accountants, and family executors with a mathematically precise model of federal and state death tax liabilities. It accounts for gross asset inventories, allowable administrative and debt deductions, marital and charitable bequests, lifetime taxable gifts, and the Deceased Spousal Unused Exemption (DSUE portability election).
        </p>
        <p>
          Understanding estate tax mechanics is vital because federal statutory tax rates reach <strong>40%</strong> on wealth exceeding the lifetime exemption limit. Without strategic planning, substantial portions of family businesses, real estate holdings, and investment portfolios can be lost to forced liquidation to settle federal and state tax obligations within nine months of death.
        </p>
      </section>

      {/* 2. MATHEMATICAL CONCEPT & UNIFIED SYSTEM */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase">
          <Scale className="w-4 h-4" />
          <span>Underlying Theory</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          2. Mathematical Concept: The IRC Unified Gift and Estate Tax System
        </h2>
        <p>
          Under Internal Revenue Code (IRC) Title 26, Chapter 11 (§ 2001 through § 2210), lifetime gifts and testamentary wealth transfers at death are integrated into a single <strong>Unified Transfer Tax System</strong>.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              The Gross Estate (IRC § 2031)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Includes the fair market value (FMV) of all worldwide property owned or controlled by the decedent at the exact date of death: real estate, publicly traded and private equities, retirement accounts, cash, business interests, and life insurance policies where the decedent retained &quot;incidents of ownership.&quot;
            </p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              The Unified Credit (IRC § 2010)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Rather than a direct deduction, the law provides a dollar-for-dollar tax credit equivalent to the tax on the statutory exemption amount ($13.61M in 2024, $13.99M in 2025, and $15.00M in 2026). The credit eliminates tax on amounts below the threshold.
            </p>
          </div>
        </div>
        <p>
          Any taxable gifts made during life that exceeded the annual gift exclusion ($18,000 for 2024, $19,000 for 2025/2026) were reported on IRS Form 709. These &quot;adjusted taxable gifts&quot; are added back to the taxable estate to determine the tentative tax base, preventing individuals from avoiding progressive estate tax brackets through lifetime transfers.
        </p>
      </section>

      {/* 3. FORMULA SECTION */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase">
          <Calculator className="w-4 h-4" />
          <span>Mathematical Formulation</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          3. Estate Tax Formulas &amp; Variable Definitions
        </h2>
        <p>
          The federal estate tax liability is computed through a standardized six-stage sequence established by IRS Form 706:
        </p>

        <div className="p-5 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs sm:text-sm space-y-3 shadow-inner">
          <div className="text-slate-400 font-sans text-xs uppercase tracking-wider border-b border-slate-700 pb-1">
            Core Computational Equations
          </div>
          <div>
            <span className="text-blue-400">Adjusted Gross Estate (AGE)</span> = Gross Estate - (Debts + Mortgages + Funeral &amp; Administrative Expenses)
          </div>
          <div>
            <span className="text-emerald-400">Taxable Estate</span> = AGE - (Marital Deduction + Charitable Bequests)
          </div>
          <div>
            <span className="text-amber-400">Tentative Tax Base</span> = Taxable Estate + Adjusted Lifetime Taxable Gifts
          </div>
          <div>
            <span className="text-purple-400">Tentative Tax</span> = ProgressiveTaxTable(Tentative Tax Base)
          </div>
          <div>
            <span className="text-rose-400">Net Federal Estate Tax</span> = max(0, Tentative Tax - Unified Credit - Gift Taxes Paid - DSUE Credit)
          </div>
          <div>
            <span className="text-cyan-400">Net Transferred to Heirs</span> = Gross Estate - Debts - Administrative Costs - Net Estate Tax - State Death Tax
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-100 dark:bg-slate-800 font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3">Variable</th>
                <th className="p-3">Definition &amp; Statutory Reference</th>
                <th className="p-3">Impact on Final Liability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr>
                <td className="p-3 font-mono font-semibold text-blue-600 dark:text-blue-400">Gross Estate</td>
                <td className="p-3">Total fair market value of all real property, liquid capital, businesses, and life insurance benefits owned at death (IRC § 2033).</td>
                <td className="p-3">Direct positive baseline for tax calculation.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-emerald-600 dark:text-emerald-400">Marital Deduction</td>
                <td className="p-3">Unlimited deduction for outright transfers to a surviving U.S. citizen spouse or into a Qualified Domestic Trust (QDOT) for non-citizens (IRC § 2056).</td>
                <td className="p-3">Reduces taxable estate dollar-for-dollar to $0 on spousal transfer.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-amber-600 dark:text-amber-400">Charitable Deduction</td>
                <td className="p-3">Bequests made to qualifying 501(c)(3) religious, charitable, scientific, or educational entities (IRC § 2055).</td>
                <td className="p-3">Reduces taxable estate dollar-for-dollar.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-purple-600 dark:text-purple-400">Unified Credit</td>
                <td className="p-3">Statutory tax credit offset equal to the progressive tax on the basic exclusion amount ($5,389,800 credit on $13.61M in 2024; $5,945,800 on $15.0M in 2026).</td>
                <td className="p-3">Directly reduces tentative tax liability to $0 below exemption.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-rose-600 dark:text-rose-400">DSUE Portability</td>
                <td className="p-3">Deceased Spousal Unused Exemption transferred to surviving spouse via timely Form 706 election (IRC § 2010(c)(5)).</td>
                <td className="p-3">Doubles sheltered threshold up to $30.0M+ for surviving spouse.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. HOW THE CALCULATION WORKS */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase">
          <BookOpen className="w-4 h-4" />
          <span>Step-by-Step Procedure</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          4. How the Calculation Works (Execution Mechanics)
        </h2>
        <p>
          When you enter values into the Estate Tax Calculator, the underlying calculation engine executes the following progressive algorithm:
        </p>

        <ol className="list-decimal list-inside space-y-3 pl-2 text-sm">
          <li>
            <strong>Asset Aggregation:</strong> Sums all asset categories (primary residence, investment properties, stocks, retirement accounts, private business interests, cash, personal property, and owned life insurance policies).
          </li>
          <li>
            <strong>Deduction Subtraction:</strong> Deducts funeral costs, probate legal fees, executor commissions, outstanding mortgages, and personal unsecured debts to determine the <em>Adjusted Gross Estate</em>.
          </li>
          <li>
            <strong>Tax-Free Transfers:</strong> Applies the 100% unlimited marital deduction (for transfers to a citizen spouse) and all charitable bequests, producing the <em>Taxable Estate</em>.
          </li>
          <li>
            <strong>Lifetime Gift Addback:</strong> Adds any post-1976 cumulative taxable gifts to arrive at the <em>Tentative Tax Base</em>.
          </li>
          <li>
            <strong>Progressive Rate Application:</strong> Computes the preliminary tax across the statutory 12-tier rate brackets (ranging from 18% on the first $10,000 to 40% on amounts exceeding $1,000,000).
          </li>
          <li>
            <strong>Credit Application &amp; Net Liability:</strong> Subtracts the applicable Unified Credit and any DSUE election credits. If the tentative tax is less than the credit, net federal tax is exactly $0. If greater, the excess is the net estate tax owed.
          </li>
          <li>
            <strong>Net Transfer Calculation:</strong> Subtracts federal and state taxes from the gross assets to establish the net wealth transferred to heirs.
          </li>
        </ol>
      </section>

      {/* 5. WORKED EXAMPLES */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase">
          <FileText className="w-4 h-4" />
          <span>Mathematical Demonstrations</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          5. Worked Examples: Step-by-Step Mathematical Solutions
        </h2>

        <div className="space-y-6">
          {/* Example 1 */}
          <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
              Example 1: Single Decedent Below Exemption Threshold ($8,500,000 Estate)
            </h3>
            <p className="text-xs sm:text-sm">
              An unmarried individual dies in 2025 with $8,500,000 in total assets and $300,000 in debts/expenses. No lifetime taxable gifts were made.
            </p>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-1">
              <div>1. Adjusted Gross Estate = $8,500,000 - $300,000 = $8,200,000</div>
              <div>2. Taxable Base = $8,200,000</div>
              <div>3. 2025 Exemption Limit = $13,990,000</div>
              <div>4. Taxable Base ($8.2M) &lt; Exemption Limit ($13.99M)</div>
              <div className="text-emerald-600 dark:text-emerald-400 font-bold">5. Net Federal Estate Tax = $0.00 (Effective Rate: 0.00%)</div>
              <div className="text-blue-600 dark:text-blue-400 font-bold">6. Net Wealth to Heirs = $8,200,000</div>
            </div>
          </div>

          {/* Example 2 */}
          <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
              Example 2: Moderate High-Net-Worth Estate Exceeding Exemption ($20,000,000 Estate)
            </h3>
            <p className="text-xs sm:text-sm">
              An unmarried entrepreneur dies in 2026 with a $20,000,000 gross estate, $1,000,000 in debts, and a $1,000,000 charitable gift to an endowment fund. 2026 individual exemption is $15,000,000.
            </p>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-1">
              <div>1. Gross Estate: $20,000,000</div>
              <div>2. Deductions: $1,000,000 (debts) + $1,000,000 (charity) = $2,000,000</div>
              <div>3. Net Taxable Estate: $20,000,000 - $2,000,000 = $18,000,000</div>
              <div>4. Taxable Overhang above Exemption: $18,000,000 - $15,000,000 = $3,000,000</div>
              <div>5. Top Marginal Tax Calculation: $3,000,000 × 40.0% = $1,200,000</div>
              <div className="text-rose-600 dark:text-rose-400 font-bold">6. Net Federal Estate Tax = $1,200,000 (Effective Rate: 6.00% of gross)</div>
              <div className="text-blue-600 dark:text-blue-400 font-bold">7. Net Wealth to Heirs = $20,000,000 - $2,000,000 - $1,200,000 = $16,800,000</div>
            </div>
          </div>

          {/* Example 3 */}
          <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
              Example 3: Married Couple Utilizing DSUE Portability ($35,000,000 Estate)
            </h3>
            <p className="text-xs sm:text-sm">
              A surviving spouse dies in 2026 with a $35,000,000 gross estate and $1,000,000 in deductions. When the first spouse died in 2024, an election on Form 706 ported the full unused $13,610,000 exemption (DSUE).
            </p>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-1">
              <div>1. Net Taxable Estate: $35,000,000 - $1,000,000 = $34,000,000</div>
              <div>2. Surviving Spouse Basic Exemption (2026): $15,000,000</div>
              <div>3. Ported Deceased Spousal Unused Exemption (DSUE): $13,610,000</div>
              <div>4. Combined Exemption Shelter: $15,000,000 + $13,610,000 = $28,610,000</div>
              <div>5. Taxable Overhang: $34,000,000 - $28,610,000 = $5,390,000</div>
              <div>6. Net Federal Estate Tax (40% Bracket): $5,390,000 × 40% = $2,156,000</div>
              <div className="text-emerald-600 dark:text-emerald-400 font-bold">7. Tax Saved via DSUE Portability Election: $13,610,000 × 40% = $5,444,000 in saved tax!</div>
              <div className="text-blue-600 dark:text-blue-400 font-bold">8. Net Wealth Transferred to Heirs: $31,844,000</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. VISUAL UNDERSTANDING & COMPARATIVE TABLES */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase">
          <TrendingUp className="w-4 h-4" />
          <span>Statutory Rates &amp; State Comparisons</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          6. Visual Understanding: Federal Brackets &amp; State-Level Taxes
        </h2>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-100 dark:bg-slate-800 font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3">Taxable Estate Bracket</th>
                <th className="p-3">Marginal Tax Rate</th>
                <th className="p-3">Cumulative Base Tax</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr><td className="p-2.5 font-mono">$0 – $10,000</td><td className="p-2.5">18%</td><td className="p-2.5 font-mono">$0</td></tr>
              <tr><td className="p-2.5 font-mono">$10,000 – $20,000</td><td className="p-2.5">20%</td><td className="p-2.5 font-mono">$1,800</td></tr>
              <tr><td className="p-2.5 font-mono">$20,000 – $40,000</td><td className="p-2.5">22%</td><td className="p-2.5 font-mono">$3,800</td></tr>
              <tr><td className="p-2.5 font-mono">$40,000 – $60,000</td><td className="p-2.5">24%</td><td className="p-2.5 font-mono">$8,200</td></tr>
              <tr><td className="p-2.5 font-mono">$60,000 – $80,000</td><td className="p-2.5">26%</td><td className="p-2.5 font-mono">$13,000</td></tr>
              <tr><td className="p-2.5 font-mono">$80,000 – $100,000</td><td className="p-2.5">28%</td><td className="p-2.5 font-mono">$18,200</td></tr>
              <tr><td className="p-2.5 font-mono">$100,000 – $150,000</td><td className="p-2.5">30%</td><td className="p-2.5 font-mono">$23,800</td></tr>
              <tr><td className="p-2.5 font-mono">$150,000 – $250,000</td><td className="p-2.5">32%</td><td className="p-2.5 font-mono">$38,800</td></tr>
              <tr><td className="p-2.5 font-mono">$250,000 – $500,000</td><td className="p-2.5">34%</td><td className="p-2.5 font-mono">$70,800</td></tr>
              <tr><td className="p-2.5 font-mono">$500,000 – $750,000</td><td className="p-2.5">37%</td><td className="p-2.5 font-mono">$155,800</td></tr>
              <tr><td className="p-2.5 font-mono">$750,000 – $1,000,000</td><td className="p-2.5">39%</td><td className="p-2.5 font-mono">$248,300</td></tr>
              <tr className="bg-blue-50/50 dark:bg-blue-950/20 font-bold"><td className="p-2.5 font-mono">Over $1,000,000</td><td className="p-2.5 text-rose-600 dark:text-rose-400">40%</td><td className="p-2.5 font-mono">$345,800 + 40% of excess over $1M</td></tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
          <h4 className="font-bold text-slate-900 dark:text-slate-100">States with Standalone Estate or Inheritance Taxes:</h4>
          <p>
            While the federal threshold is high ($15.0M in 2026), 12 states plus Washington D.C. impose separate estate taxes with thresholds as low as $1.0M (Oregon, Massachusetts) and top rates up to 20% (Washington State). Additionally, 6 states levy inheritance taxes directly on recipients (Pennsylvania, New Jersey, Maryland, Nebraska, Iowa, Kentucky).
          </p>
        </div>
      </section>

      {/* 7. COMMON MISTAKES & EDGE CASES */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2.5 text-amber-600 dark:text-amber-400 font-semibold text-xs tracking-wider uppercase">
          <AlertCircle className="w-4 h-4" />
          <span>Pitfalls &amp; Edge Cases</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          7. Common Mistakes &amp; Critical Edge Cases
        </h2>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="p-4 bg-amber-50/60 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span className="text-amber-600 font-extrabold">✕</span>
              Failing to File Form 706 for DSUE Portability
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              When the first spouse dies with an estate below the exemption, families often skip filing IRS Form 706 because no tax is due. However, portability is <em>not automatic</em>; it is lost forever if not affirmatively elected on a timely filed Form 706 return within 9 months (or 15 months with extension) of death.
            </p>
          </div>

          <div className="p-4 bg-amber-50/60 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span className="text-amber-600 font-extrabold">✕</span>
              Retaining &quot;Incidents of Ownership&quot; in Life Insurance
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Many people assume life insurance is completely tax-free. While death benefits pass income-tax-free to beneficiaries, they are <strong>100% included in your taxable gross estate</strong> if you own the policy or have the right to change beneficiaries. Using an Irrevocable Life Insurance Trust (ILIT) solves this.
            </p>
          </div>

          <div className="p-4 bg-amber-50/60 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span className="text-amber-600 font-extrabold">✕</span>
              Gifting Appreciated Assets vs. Step-Up in Basis at Death
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Gifting highly appreciated stock or real estate during your lifetime transfers your historical low cost basis to the recipient. In contrast, bequeathing assets at death grants a full <strong>Step-Up in Basis (IRC § 1014)</strong> to fair market value, completely eliminating all accumulated capital gains for heirs.
            </p>
          </div>
        </div>
      </section>

      {/* 8. PRACTICAL WEALTH PRESERVATION STRATEGIES */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase">
          <ShieldCheck className="w-4 h-4" />
          <span>Strategic Wealth Preservation</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          8. Practical Applications &amp; Wealth Preservation Strategies
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">
              Annual Exclusion Gifting ($19,000/year)
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Individuals can gift up to $19,000 per year per recipient ($38,000 for married couples) to an unlimited number of beneficiaries without filing Form 709 or reducing their lifetime exemption threshold.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">
              Spousal Lifetime Access Trusts (SLATs)
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              An irrevocable trust created by one spouse for the benefit of the other, locking in current high exemption limits while removing all future asset appreciation from the taxable gross estate.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">
              Grantor Retained Annuity Trusts (GRATs)
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Allows grantors to transfer rapid future investment growth to heirs with minimal or zero gift tax liability by retaining an annuity stream based on the IRS § 7520 hurdle rate.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">
              Direct Tuition &amp; Medical Payments (IRC § 2503(e))
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Payments made directly to educational institutions for tuition or to medical providers for healthcare expenses are 100% exempt from gift taxes with no dollar limits.
            </p>
          </div>
        </div>
      </section>

      {/* 9. RELATED FINANCIAL CONCEPTS */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase">
          <BookOpen className="w-4 h-4" />
          <span>Interconnected Topics</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          9. Related Mathematical &amp; Financial Concepts
        </h2>
        <p>
          Estate tax optimization is intimately connected with several other areas of wealth management and tax modeling:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <Link
            href="/calculators/capital-gains-tax-calculator"
            className="p-3 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors block space-y-1"
          >
            <div className="font-bold text-blue-600 dark:text-blue-400">Capital Gains Tax</div>
            <p className="text-slate-600 dark:text-slate-300">Compare the step-up in basis at death versus immediate lifetime asset liquidation.</p>
          </Link>

          <Link
            href="/calculators/income-tax-calculator"
            className="p-3 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors block space-y-1"
          >
            <div className="font-bold text-blue-600 dark:text-blue-400">Income Tax Suite</div>
            <p className="text-slate-600 dark:text-slate-300">Evaluate Income in Respect of a Decedent (IRD) on inherited 401(k) and traditional IRAs.</p>
          </Link>

          <Link
            href="/calculators/future-value-calculator"
            className="p-3 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors block space-y-1"
          >
            <div className="font-bold text-blue-600 dark:text-blue-400">Future Value Calculator</div>
            <p className="text-slate-600 dark:text-slate-300">Project long-term compound growth of assets to forecast future estate tax exposure.</p>
          </Link>
        </div>
      </section>

      {/* 10. SUMMARY & EDUCATIONAL RECAP */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400 font-semibold text-xs tracking-wider uppercase">
          <CheckCircle2 className="w-4 h-4" />
          <span>Key Takeaways</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          10. Summary &amp; Educational Key Takeaways
        </h2>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs sm:text-sm">
          <ul className="list-disc list-inside space-y-1.5 text-slate-700 dark:text-slate-300">
            <li><strong>Progressive 40% Surcharge:</strong> Federal estate taxes apply a 40% top marginal rate to taxable estate values exceeding the statutory lifetime exemption.</li>
            <li><strong>Portability Doubling:</strong> Married couples can shelter up to $30.0M+ by filing Form 706 to elect spousal portability (DSUE).</li>
            <li><strong>Deductions &amp; Bequests:</strong> The unlimited marital deduction and qualifying charitable bequests reduce taxable estate balances dollar-for-dollar.</li>
            <li><strong>Step-Up in Basis:</strong> Bequeathing appreciated property eliminates capital gains tax via date-of-death fair market value adjustments.</li>
            <li><strong>State Considerations:</strong> Check state laws—12 states impose independent death taxes with lower thresholds than the federal baseline.</li>
          </ul>
        </div>
      </section>

    </article>
  );
}

export default EstateTaxContent;

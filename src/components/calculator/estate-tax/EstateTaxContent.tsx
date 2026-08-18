"use client";

import React from "react";

export function EstateTaxContent() {
  return (
    <div className="space-y-10 text-black dark:text-slate-100 font-medium leading-relaxed">
      {/* 1. WHAT IS THE ESTATE TAX */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          1. What is the Estate Tax? (Foundations &amp; Unified System)
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          The <strong>Federal Estate Tax</strong> (commonly termed the &quot;death tax&quot;) is an excise tax imposed on the right to transfer property at death. It is calculated based on the fair market value of all assets owned by the decedent at the date of death, minus allowable debts, administrative costs, and deductions.
        </p>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          In the United States, the federal government integrates lifetime gifts and testamentary estate bequests into a single <strong>Unified Gift and Estate Tax System</strong>. Under this unified framework, taxable gifts made during your life reduce your available lifetime estate tax exemption dollar-for-dollar upon death.
        </p>
      </section>

      {/* 2. FEDERAL BRACKETS & UNIFIED CREDIT */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          2. Federal Estate Tax Brackets &amp; The Unified Credit
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          Under Internal Revenue Code (IRC) § 2001, federal estate tax rates are technically progressive from <strong>18% up to 40%</strong> for taxable amounts exceeding $1,000,000. However, because the <strong>Unified Credit</strong> shelters up to the statutory exemption threshold ($15.0 million for 2026, or $30.0 million for married couples utilizing portability), any taxable overhang above the exemption is taxed at the top <strong>40% marginal bracket</strong>.
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-sans">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-100 dark:bg-slate-800 font-bold border-b border-slate-300 dark:border-slate-700 text-black dark:text-slate-100">
              <tr>
                <th className="p-2.5">Tax Year</th>
                <th className="p-2.5">Individual Lifetime Exemption</th>
                <th className="p-2.5">Married Couple Exemption (with DSUE)</th>
                <th className="p-2.5">Top Federal Tax Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-black dark:text-slate-100">
              <tr>
                <td className="p-2 font-bold">2026 (Projected)</td>
                <td className="p-2">$15,000,000</td>
                <td className="p-2">$30,000,000</td>
                <td className="p-2">40%</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">2025</td>
                <td className="p-2">$13,990,000</td>
                <td className="p-2">$27,980,000</td>
                <td className="p-2">40%</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">2024</td>
                <td className="p-2">$13,610,000</td>
                <td className="p-2">$27,220,000</td>
                <td className="p-2">40%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. ESTATE TAX VS INHERITANCE TAX */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          3. Estate Tax vs. Inheritance Tax: The Crucial Distinction
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              Estate Tax (Paid by the Estate)
            </h3>
            <p className="text-black dark:text-slate-100">
              Levied on the <strong>total fair market value</strong> of the decedent&apos;s estate before any distributions are made to beneficiaries. It is paid directly out of the estate funds by the executor or personal representative.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              Inheritance Tax (Paid by the Beneficiary)
            </h3>
            <p className="text-black dark:text-slate-100">
              Levied on the <strong>individual beneficiary</strong> who receives the inherited assets. Tax rates vary based on state law and the heir&apos;s familial relationship (e.g., spouses pay 0%, siblings pay moderate rates, non-relatives pay highest rates).
            </p>
          </div>
        </div>

        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 space-y-1.5 text-xs">
          <h4 className="font-extrabold text-black dark:text-slate-100">States with Local Death Taxes:</h4>
          <ul className="list-disc list-inside space-y-1 text-black dark:text-slate-100">
            <li><strong>States with Separate Estate Taxes:</strong> Washington (WA), Oregon (OR), Massachusetts (MA), Minnesota (MN), Illinois (IL), New York (NY), Connecticut (CT), Rhode Island (RI), Vermont (VT), Maine (ME), Hawaii (HI), District of Columbia (DC).</li>
            <li><strong>States with Separate Inheritance Taxes:</strong> Pennsylvania (PA), New Jersey (NJ), Maryland (MD), Nebraska (NE), Iowa (IA), Kentucky (KY).</li>
          </ul>
        </div>
      </section>

      {/* 4. KEY DEDUCTIONS & PORTABILITY */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          4. Key Deductions &amp; The Power of Spousal Portability
        </h2>
        <div className="space-y-3 text-xs">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 space-y-1">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              1. Unlimited Marital Deduction
            </h3>
            <p className="text-black dark:text-slate-100">
              You can transfer an <strong>unlimited dollar amount</strong> of assets to a surviving spouse who is a U.S. citizen completely free of federal estate taxes upon death.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 space-y-1">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              2. Unlimited Charitable Deduction
            </h3>
            <p className="text-black dark:text-slate-100">
              Bequests made to qualifying 501(c)(3) charitable organizations are 100% deductible against the gross estate, reducing taxable value dollar-for-dollar.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 space-y-1">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              3. Spousal Portability (DSUE Election on Form 706)
            </h3>
            <p className="text-black dark:text-slate-100">
              When a spouse dies, any unused portion of their federal estate tax exemption can be transferred to the surviving spouse by filing a timely Form 706 estate tax return. This effectively gives the surviving spouse a <strong>doubled exemption ($30.0M+)</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* 5. STEP-UP IN BASIS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          5. The Step-Up in Basis Tax Advantage
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          When an individual inherits appreciated assets (such as real estate, stocks, or private business equity), the tax basis of the property is automatically adjusted to the <strong>Fair Market Value (FMV) at the date of death</strong>.
        </p>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          This &quot;step-up&quot; wipes out all lifetime capital gains accumulated during the decedent&apos;s life. If the heir sells the property immediately after inheriting it, they pay <strong>$0 in capital gains taxes</strong>. In contrast, gifting appreciated assets during life carries over the original low cost basis, resulting in substantial capital gains tax liability for the recipient.
        </p>
      </section>

      {/* 6. ADVANCED STRATEGIES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          6. Advanced Wealth Preservation Techniques
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              Annual Exclusion Gifting ($19,000+ Rule)
            </h3>
            <p className="text-black dark:text-slate-100">
              You can gift up to <strong>$19,000 per year per recipient ($38,000 for a married couple)</strong> to an unlimited number of beneficiaries without filing a gift tax return or using any lifetime exemption.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              Irrevocable Life Insurance Trust (ILIT)
            </h3>
            <p className="text-black dark:text-slate-100">
              Holding life insurance policies inside an ILIT removes the death benefit from your taxable gross estate, delivering 100% tax-free liquidity for heirs to settle estate taxes.
            </p>
          </div>
        </div>
      </section>

      {/* 7. WORKED MATHEMATICAL EXAMPLE */}
      <section className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          7. Worked Mathematical Example ($16,000,000 Estate)
        </h2>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-xs space-y-2 font-sans">
          <p className="text-black dark:text-slate-100">
            Consider an unmarried individual who dies with a gross estate of <strong>$16,000,000</strong>:
          </p>
          <ul className="list-disc list-inside space-y-1 text-black dark:text-slate-100">
            <li><strong>Gross Estate:</strong> $16,000,000</li>
            <li><strong>Debts &amp; Administrative Fees:</strong> $500,000 &rarr; Adjusted Estate = $15,500,000</li>
            <li><strong>Charitable Bequest:</strong> $500,000 &rarr; Net Taxable Estate = $15,000,000</li>
            <li><strong>Federal Exemption Threshold:</strong> $13,610,000 &rarr; Taxable Overhang = $1,390,000</li>
            <li><strong>Net Federal Estate Tax (40% Bracket):</strong> $1,390,000 &times; 40% = <strong>$556,000</strong></li>
            <li><strong>Effective Tax Rate:</strong> $556,000 / $16,000,000 = <strong>3.48%</strong></li>
            <li><strong>Net Wealth Transferred to Heirs:</strong> $16,000,000 - $500,000 - $500,000 - $556,000 = <strong>$14,444,000</strong></li>
          </ul>
        </div>
      </section>

      {/* 8. 12 FAQS */}
      <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          Frequently Asked Questions (FAQ)
        </h2>
        <div className="space-y-3 text-xs leading-relaxed text-black dark:text-slate-100">
          {/* FAQ 1 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              1. What is the federal estate tax exemption amount for the current tax year?
            </h3>
            <p className="text-black dark:text-slate-100">
              For 2025, the federal estate tax exemption is $13.99 million per individual ($27.98 million for a married couple). For 2026, the projected baseline is $15.00 million ($30.00 million for married couples).
            </p>
          </div>

          {/* FAQ 2 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              2. What is the difference between an estate tax and an inheritance tax?
            </h3>
            <p className="text-black dark:text-slate-100">
              An estate tax is paid out of the deceased person&apos;s estate before any distributions are made, while an inheritance tax is paid by the individual beneficiary who receives the inherited assets.
            </p>
          </div>

          {/* FAQ 3 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              3. How does the unlimited marital deduction protect married couples?
            </h3>
            <p className="text-black dark:text-slate-100">
              It allows a spouse to transfer 100% of their estate to a surviving U.S. citizen spouse with zero federal estate tax liability, deferring all tax until the surviving spouse passes away.
            </p>
          </div>

          {/* FAQ 4 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              4. What is portability (DSUE) and why must Form 706 be filed to claim it?
            </h3>
            <p className="text-black dark:text-slate-100">
              Portability allows a surviving spouse to claim the unused portion of their deceased spouse&apos;s lifetime exemption (DSUE). A federal estate tax return (Form 706) must be filed timely to make this election, even if no tax is due.
            </p>
          </div>

          {/* FAQ 5 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              5. How does the step-up in basis work on inherited real estate and stocks?
            </h3>
            <p className="text-black dark:text-slate-100">
              Inherited property receives a new cost basis equal to its fair market value on the date of death. This eliminates all accumulated capital gains, allowing heirs to sell without paying tax on past appreciation.
            </p>
          </div>

          {/* FAQ 6 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              6. Which US states have their own state estate or inheritance taxes?
            </h3>
            <p className="text-black dark:text-slate-100">
              Twelve states plus DC impose separate estate taxes (WA, OR, MN, IL, NY, MA, CT, ME, RI, VT, HI, DC) with thresholds as low as $1M–$2M, while six states impose inheritance taxes (PA, NJ, MD, NE, IA, KY).
            </p>
          </div>

          {/* FAQ 7 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              7. Are life insurance death benefits included in my taxable gross estate?
            </h3>
            <p className="text-black dark:text-slate-100">
              Yes, if you own the policy or possess &quot;incidents of ownership&quot; at death. However, holding the policy inside an Irrevocable Life Insurance Trust (ILIT) removes the proceeds from your gross estate.
            </p>
          </div>

          {/* FAQ 8 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              8. How can I use annual gifting to lower my taxable estate during my lifetime?
            </h3>
            <p className="text-black dark:text-slate-100">
              You can gift up to the annual exclusion ($19,000 per recipient for 2026) to an unlimited number of people each year without reducing your lifetime exemption or triggering gift taxes.
            </p>
          </div>

          {/* FAQ 9 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              9. What is the Generation-Skipping Transfer (GST) tax and when does it apply?
            </h3>
            <p className="text-black dark:text-slate-100">
              The GST tax applies a flat 40% tax on direct transfers to grandchildren or unrelated beneficiaries more than 37.5 years younger, preventing families from avoiding estate tax across intermediate generations.
            </p>
          </div>

          {/* FAQ 10 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              10. What happens to the federal estate tax exemption if current tax laws sunset?
            </h3>
            <p className="text-black dark:text-slate-100">
              Under current statutory sunset provisions, the lifetime exemption would revert to pre-2018 TCJA levels of approximately $7.0 million per individual ($14.0 million per married couple), adjusted for inflation.
            </p>
          </div>

          {/* FAQ 11 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              11. What assets are included in my gross estate inventory?
            </h3>
            <p className="text-black dark:text-slate-100">
              Your gross estate includes all real estate, bank accounts, brokerage stocks, retirement plans (401k/IRA), privately owned business equity, life insurance death benefits, and personal property (vehicles, jewelry, art).
            </p>
          </div>

          {/* FAQ 12 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              12. How do irrevocable trusts like an ILIT or SLAT shield assets from estate taxes?
            </h3>
            <p className="text-black dark:text-slate-100">
              Irrevocable trusts legally remove assets and future appreciation from the grantor&apos;s ownership, preventing those assets from being counted in the decedent&apos;s gross estate at death.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EstateTaxContent;

"use client";

import React from "react";

export function MarriageTaxContent() {
  return (
    <div className="space-y-10 text-black dark:text-slate-100 font-medium leading-relaxed">
      {/* 1. WHAT IS MARRIAGE TAX PENALTY AND BONUS */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          1. What is the Marriage Tax Penalty and Marriage Bonus?
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          In the United States federal tax code, the <strong>Marriage Tax Penalty</strong> and <strong>Marriage Bonus</strong> refer to the difference between the total income taxes a couple pays when filing together as <strong>Married Filing Jointly (MFJ)</strong> compared to the combined taxes they would pay if they were unmarried and filed as two <strong>Single</strong> individuals.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              The Marriage Bonus (Tax Savings)
            </h3>
            <p className="text-black dark:text-slate-100">
              Occurs when spouses have <strong>unequal incomes</strong> (e.g., one primary earner and one stay-at-home or lower-earning spouse). Combining incomes pulls the higher earner&apos;s income into lower marginal married tax brackets, resulting in substantial annual tax savings.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              The Marriage Penalty (Higher Tax Bill)
            </h3>
            <p className="text-black dark:text-slate-100">
              Occurs primarily when both spouses are <strong>dual high earners</strong> with similar incomes, or when combined income triggers statutory deduction caps (such as the $10,000 SALT limit) or surtax thresholds (such as the 3.8% NIIT and 0.9% Medicare surtax).
            </p>
          </div>
        </div>
      </section>

      {/* 2. THE 4 KEY CAUSES OF THE MARRIAGE PENALTY */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          2. The 4 Key Causes of the Marriage Tax Penalty
        </h2>
        <div className="space-y-3 text-xs">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 space-y-1">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              1. The $10,000 SALT Cap Marriage Trap
            </h3>
            <p className="text-black dark:text-slate-100">
              Under the Tax Cuts and Jobs Act (TCJA), single filers can deduct up to <strong>$10,000 each ($20,000 combined)</strong> in State and Local Taxes (SALT) including state income and property taxes. However, married couples filing jointly are restricted to the exact same <strong>$10,000 total cap</strong>, immediately eliminating up to $10,000 in itemized deductions.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 space-y-1">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              2. Surtax Threshold Compression (NIIT &amp; Additional Medicare Tax)
            </h3>
            <p className="text-black dark:text-slate-100">
              Single taxpayers face the 3.8% Net Investment Income Tax (NIIT) and 0.9% Additional Medicare Tax on income over <strong>$200,000 ($400,000 combined)</strong>. For married couples, however, the statutory threshold is only <strong>$250,000</strong>—a $150,000 penalty window that subjects more investment and wage income to federal surtaxes.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 space-y-1">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              3. Top 37% Federal Bracket Compression
            </h3>
            <p className="text-black dark:text-slate-100">
              While the lower tax brackets (10%, 12%, 22%, 24%, and 32%) are doubled for married couples, the top 37% tax bracket begins at <strong>$609,350 for single filers ($1,218,700 for two singles)</strong>, but kicks in at just <strong>$731,200 for married joint filers</strong>.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 space-y-1">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              4. Credit and Deduction Phaseout Cliffs
            </h3>
            <p className="text-black dark:text-slate-100">
              Combining incomes can push low-to-middle income couples over strict phaseout limits for the <strong>Earned Income Tax Credit (EITC)</strong>, student loan interest deductions ($2,500 max), and education tuition tax credits.
            </p>
          </div>
        </div>
      </section>

      {/* 3. MFJ VS MFS COMPARISON */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          3. Married Filing Jointly (MFJ) vs. Married Filing Separately (MFS)
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          Couples who face a marriage penalty often ask: <em>&quot;Can we just file separately to lower our tax bill?&quot;</em> In the vast majority of cases, <strong>Married Filing Separately (MFS)</strong> results in higher overall taxes because the tax code penalizes separate returns by:
        </p>
        <div className="overflow-x-auto rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-sans">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-100 dark:bg-slate-800 font-bold border-b border-slate-300 dark:border-slate-700 text-black dark:text-slate-100">
              <tr>
                <th className="p-2.5">Tax Feature / Benefit</th>
                <th className="p-2.5">Married Filing Jointly (MFJ)</th>
                <th className="p-2.5">Married Filing Separately (MFS)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-black dark:text-slate-100">
              <tr>
                <td className="p-2 font-bold">Standard Deduction</td>
                <td className="p-2">$30,000</td>
                <td className="p-2">$15,000 each (Must both itemize or both use standard)</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Student Loan Interest Deduction</td>
                <td className="p-2">Allowed (up to $2,500)</td>
                <td className="p-2 text-red-600 font-bold">Completely Disallowed ($0)</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Earned Income Tax Credit (EITC)</td>
                <td className="p-2">Full eligibility based on income</td>
                <td className="p-2 text-red-600 font-bold">Generally Disallowed</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Child &amp; Dependent Care Credit</td>
                <td className="p-2">Available</td>
                <td className="p-2 text-red-600 font-bold">Disallowed</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Roth IRA Direct Contributions</td>
                <td className="p-2">Phaseout $230,000 - $240,000</td>
                <td className="p-2 text-red-600 font-bold">Phases out at $0 - $10,000 MAGI</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. STRATEGIES TO MINIMIZE PENALTY */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          4. Strategies to Minimize or Eliminate the Marriage Tax Penalty
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              1. Max Out Pre-Tax Retirement Accounts
            </h3>
            <p className="text-black dark:text-slate-100">
              Contributing the maximum allowable annual limit to traditional 401(k), 403(b), or deductible traditional IRAs ($23,000+ each) reduces joint Modified AGI, pulling income below surtax thresholds.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              2. Fully Fund Health Savings Accounts (HSA)
            </h3>
            <p className="text-black dark:text-slate-100">
              Family coverage HSAs allow up to $8,300+ in 100% pre-tax contributions that reduce taxable income and bypass FICA payroll withholdings when funded via employer payroll.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              3. Strategic Charitable Bunching
            </h3>
            <p className="text-black dark:text-slate-100">
              Bunch multiple years of charitable contributions into a single tax year using a Donor-Advised Fund (DAF) to surpass the $30,000 standard deduction hurdle.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              4. Utilize Pass-Through Entity (PTE) Tax Workarounds
            </h3>
            <p className="text-black dark:text-slate-100">
              For business owners and 1099 independent contractors, elective state Pass-Through Entity (PTE) taxes allow business-level state tax deductions that effectively bypass the $10,000 personal SALT cap.
            </p>
          </div>
        </div>
      </section>

      {/* 5. SUMMARY */}
      <section className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          5. Educational Summary
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          The financial impact of marriage on federal and state taxes depends directly on your income split, deduction profile, and surtax exposure. Single-earner households experience substantial marriage bonuses, while equal high-earners should proactively utilize pre-tax optimization strategies to mitigate potential marriage penalties.
        </p>
      </section>

      {/* 6. FREQUENTLY ASKED QUESTIONS (12 FAQS) */}
      <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          Frequently Asked Questions (FAQ)
        </h2>
        <div className="space-y-3 text-xs leading-relaxed text-black dark:text-slate-100">
          {/* FAQ 1 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              1. Does getting married automatically lower our federal income taxes?
            </h3>
            <p className="text-black dark:text-slate-100">
              No. Marriage only lowers taxes when there is a significant income disparity between spouses. If both spouses earn similar incomes, their taxes may remain the same or increase due to surtax thresholds and deduction caps.
            </p>
          </div>

          {/* FAQ 2 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              2. When does a couple receive a Marriage Tax Bonus?
            </h3>
            <p className="text-black dark:text-slate-100">
              A marriage bonus occurs when one spouse earns the majority of the household income (e.g., an 80/20 or 100/0 split). Filing jointly allows the higher earner&apos;s income to fill the lower-earner&apos;s unused lower tax brackets.
            </p>
          </div>

          {/* FAQ 3 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              3. When does a couple experience a Marriage Tax Penalty?
            </h3>
            <p className="text-black dark:text-slate-100">
              A marriage penalty occurs when dual high earners with equal salaries marry and exceed statutory thresholds such as the $10,000 SALT cap, the $250,000 NIIT limit, or the top 37% tax bracket.
            </p>
          </div>

          {/* FAQ 4 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              4. What is the $10,000 SALT cap marriage trap?
            </h3>
            <p className="text-black dark:text-slate-100">
              Two single individuals can deduct up to $10,000 each in state and local taxes ($20,000 combined). When married filing jointly, the IRS limits the combined couple to a single $10,000 cap, losing up to $10,000 in itemized deductions.
            </p>
          </div>

          {/* FAQ 5 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              5. Can married couples choose to file as Single on their tax returns?
            </h3>
            <p className="text-black dark:text-slate-100">
              No. If you are legally married on December 31 of the tax year, IRS rules require you to file as either <strong>Married Filing Jointly (MFJ)</strong> or <strong>Married Filing Separately (MFS)</strong>. You cannot choose the Single filing status.
            </p>
          </div>

          {/* FAQ 6 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              6. How do children and the Child Tax Credit (CTC) affect the marriage tax calculation?
            </h3>
            <p className="text-black dark:text-slate-100">
              The Child Tax Credit provides up to $2,000 per qualifying child. The phaseout begins at $200,000 for single filers and $400,000 for married couples, effectively protecting couples from CTC-related marriage penalties.
            </p>
          </div>

          {/* FAQ 7 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              7. Why do dual high-earning couples face Net Investment Income Tax (NIIT) penalties?
            </h3>
            <p className="text-black dark:text-slate-100">
              The 3.8% NIIT threshold is $200,000 for singles ($400,000 combined) but only $250,000 for married couples, causing more investment returns to be subject to the surtax upon marriage.
            </p>
          </div>

          {/* FAQ 8 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              8. What are the disadvantages of filing Married Filing Separately (MFS)?
            </h3>
            <p className="text-black dark:text-slate-100">
              Filing separately disqualifies couples from student loan interest deductions, education tax credits, child care credits, and direct Roth IRA contributions while requiring both spouses to use the same deduction method.
            </p>
          </div>

          {/* FAQ 9 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              9. How does student loan interest deduction change after getting married?
            </h3>
            <p className="text-black dark:text-slate-100">
              The student loan interest deduction cap remains $2,500 total for a married couple (not $5,000), and combined income phaseouts may eliminate the deduction entirely for dual-earner couples.
            </p>
          </div>

          {/* FAQ 10 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              10. How can maximizing pre-tax 401(k) and HSA contributions eliminate a marriage tax penalty?
            </h3>
            <p className="text-black dark:text-slate-100">
              Pre-tax retirement and HSA contributions reduce your household Adjusted Gross Income (AGI), helping bring income below surtax thresholds and phaseout limits.
            </p>
          </div>

          {/* FAQ 11 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              11. How does the Earned Income Tax Credit (EITC) phase out for low-income married couples?
            </h3>
            <p className="text-black dark:text-slate-100">
              Combining incomes often disqualifies low-income workers from the EITC because the married phaseout limit is only slightly higher than the single threshold, resulting in substantial marriage penalties for working-class families.
            </p>
          </div>

          {/* FAQ 12 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              12. How do state income taxes treat married couples differently than the federal tax code?
            </h3>
            <p className="text-black dark:text-slate-100">
              Many states do not double their income tax brackets for married joint filers, causing married couples to be pushed into higher state tax brackets more quickly than single filers.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MarriageTaxContent;

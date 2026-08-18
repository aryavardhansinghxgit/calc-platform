"use client";

import React from "react";

export function TakeHomePayContent() {
  return (
    <div className="space-y-10 text-black dark:text-slate-100 font-medium leading-relaxed">
      {/* 1. WHAT IS TAKE-HOME PAY */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          1. What is Take-Home Pay? (Gross vs. Net Income)
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          <strong>Take-Home Pay</strong> (also called <em>net pay</em> or <em>disposable income</em>) is the exact dollar amount an employee receives in their bank account on payday after all mandatory statutory taxes (federal, state, local, FICA) and voluntary pre-tax/post-tax employee benefit deductions are withheld from gross earnings.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-xs space-y-1.5 font-sans">
          <h3 className="font-extrabold text-sm text-black dark:text-slate-100">The Modern Paystub Equation:</h3>
          <p className="text-black dark:text-slate-100 font-bold">
            {"Net Take-Home Pay = Gross Pay - Pre-Tax Deductions - Federal Tax - FICA - State/Local Tax - Post-Tax Deductions"}
          </p>
        </div>
      </section>

      {/* 2. COMPLETE BREAKDOWN OF PAYROLL TAXES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          2. Complete Breakdown of Payroll Tax Deductions
        </h2>
        <div className="space-y-3 text-xs">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 space-y-1">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              1. Federal Income Tax Withholding (FIT)
            </h3>
            <p className="text-black dark:text-slate-100">
              Calculated using IRS Publication 15-T percentage method tables based on your annualized taxable wages, filing status, and Form W-4 adjustments (dependent credits, additional withholding).
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 space-y-1">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              2. FICA Social Security Tax (6.2%)
            </h3>
            <p className="text-black dark:text-slate-100">
              Mandatory 6.2% tax on gross wages up to the statutory annual OASDI wage cap ($168,600 for 2024, $176,100 for 2025, and $184,500 for 2026). Once your year-to-date earnings surpass this limit, Social Security withholding stops completely for the remainder of the calendar year.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 space-y-1">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              3. FICA Medicare Tax (1.45% + 0.9% Surtax)
            </h3>
            <p className="text-black dark:text-slate-100">
              A flat 1.45% tax applied to 100% of gross wages with no income ceiling. Earnings exceeding $200,000 (Single) or $250,000 (Married Filing Jointly) incur an additional 0.9% Medicare surtax.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 space-y-1">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              4. State &amp; Municipal Wage Taxes
            </h3>
            <p className="text-black dark:text-slate-100">
              Eight states impose zero wage tax (TX, FL, WA, NV, TN, WY, SD, AK). Flat-rate tax states (PA, IL, IN, CO, NC, UT, AZ, GA) apply a single rate, while progressive states (CA, NY, NJ, HI, OR, MN) feature multi-tiered progressive brackets up to 13.3%.
            </p>
          </div>
        </div>
      </section>

      {/* 3. PRE-TAX VS POST-TAX */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          3. Pre-Tax vs. Post-Tax Benefit Deductions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              Pre-Tax Deductions (Tax Shield)
            </h3>
            <p className="text-black dark:text-slate-100">
              Subtracted from gross pay <strong>before</strong> income taxes are calculated, immediately lowering your taxable income and tax bill. Examples: Traditional 401(k)/403(b), Health Savings Accounts (HSA), Flexible Spending Accounts (FSA), and employer medical/dental insurance premiums.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              Post-Tax Deductions
            </h3>
            <p className="text-black dark:text-slate-100">
              Subtracted <strong>after</strong> all taxes have been computed from net pay. Examples: Roth 401(k) contributions, court-ordered wage garnishments, child support payments, union dues, and voluntary life insurance.
            </p>
          </div>
        </div>
      </section>

      {/* 4. FORM W-4 5-STEP SYSTEM */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          4. How Form W-4 Affects Your Paycheck Withholding (Post-2020 Rules)
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          The IRS redesigned Form W-4 to replace outdated withholding allowances with a direct dollar-based 5-step system:
        </p>
        <ul className="list-disc list-inside space-y-1.5 text-xs text-black dark:text-slate-100">
          <li><strong>Step 1 (Filing Status):</strong> Determines standard deduction offset and baseline tax bracket tables.</li>
          <li><strong>Step 2 (Multiple Jobs / Working Spouse):</strong> Prevents under-withholding by adjusting tax brackets for dual-income households.</li>
          <li><strong>Step 3 (Claim Dependents):</strong> Directly reduces annual withholding by $2,000 per child under 17 and $500 per other dependent.</li>
          <li><strong>Step 4 (Other Adjustments):</strong> Allows inputs for outside non-job income (4a), itemized deduction credits (4b), or extra flat dollar withholding per paycheck (4c).</li>
        </ul>
      </section>

      {/* 5. 50/30/20 BUDGETING */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          5. Budgeting Your Take-Home Pay with the 50/30/20 Rule
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-medium">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 space-y-1">
            <h3 className="font-extrabold text-black dark:text-slate-100">50% Essential Needs</h3>
            <p className="text-black dark:text-slate-100">Rent/mortgage, utilities, groceries, health insurance, minimum debt payments, and basic transportation.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 space-y-1">
            <h3 className="font-extrabold text-black dark:text-slate-100">30% Lifestyle Wants</h3>
            <p className="text-black dark:text-slate-100">Dining out, entertainment, travel, subscription services, hobbies, and shopping.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 space-y-1">
            <h3 className="font-extrabold text-black dark:text-slate-100">20% Savings &amp; Debt</h3>
            <p className="text-black dark:text-slate-100">Emergency fund cash, extra retirement investing (Roth IRA), and accelerated debt principal payoff.</p>
          </div>
        </div>
      </section>

      {/* 6. FAQS (12 FAQS) */}
      <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          Frequently Asked Questions (FAQ)
        </h2>
        <div className="space-y-3 text-xs leading-relaxed text-black dark:text-slate-100">
          {/* FAQ 1 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              1. How is my net take-home paycheck calculated from my gross salary?
            </h3>
            <p className="text-black dark:text-slate-100">
              Your net pay equals gross earnings minus pre-tax deductions (401k, health insurance), federal income tax withholding, FICA taxes (6.2% Social Security + 1.45% Medicare), state/local wage taxes, and post-tax deductions.
            </p>
          </div>

          {/* FAQ 2 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              2. What percentage of my paycheck goes to federal and state taxes?
            </h3>
            <p className="text-black dark:text-slate-100">
              For most middle-to-high income earners, total tax withholding typically consumes between 20% and 35% of gross earnings, depending on your tax bracket, state of residence, and pre-tax deductions.
            </p>
          </div>

          {/* FAQ 3 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              3. What is FICA tax and why is it deducted from every paycheck?
            </h3>
            <p className="text-black dark:text-slate-100">
              FICA (Federal Insurance Contributions Act) funds federal Social Security (6.2%) and Medicare (1.45%) programs. It is mandatory for virtually all U.S. wage earners and is matched equally by your employer.
            </p>
          </div>

          {/* FAQ 4 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              4. What is the difference between pre-tax and post-tax paycheck deductions?
            </h3>
            <p className="text-black dark:text-slate-100">
              Pre-tax deductions (traditional 401k, HSA, health insurance) lower your taxable income before taxes are calculated. Post-tax deductions (Roth 401k, union dues, garnishments) are withheld after taxes have already been assessed.
            </p>
          </div>

          {/* FAQ 5 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              5. How does changing my Form W-4 increase or decrease my take-home pay?
            </h3>
            <p className="text-black dark:text-slate-100">
              Claiming dependent credits in Step 3 or deduction credits in Step 4b reduces withholding and increases your net paycheck. Adding extra withholding in Step 4c decreases your paycheck to avoid owing taxes at year-end.
            </p>
          </div>

          {/* FAQ 6 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              6. Why are bonuses and commissions taxed differently than regular salary?
            </h3>
            <p className="text-black dark:text-slate-100">
              Bonuses are classified as supplemental wages. The IRS requires employers to withhold a flat 22% federal rate (plus full FICA and state taxes), which can feel higher than your normal paycheck withholding rate.
            </p>
          </div>

          {/* FAQ 7 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              7. Which US states have no state income tax deducted from paychecks?
            </h3>
            <p className="text-black dark:text-slate-100">
              Texas (TX), Florida (FL), Washington (WA), Nevada (NV), Tennessee (TN), Wyoming (WY), South Dakota (SD), and Alaska (AK) impose 0% state income tax on earned wages.
            </p>
          </div>

          {/* FAQ 8 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              8. What happens to my Social Security tax deduction once I hit the annual wage cap?
            </h3>
            <p className="text-black dark:text-slate-100">
              Once your cumulative year-to-date earnings exceed the annual OASDI cap ($168,600+), your employer stops withholding the 6.2% Social Security tax, resulting in a temporary take-home pay raise for the rest of the year.
            </p>
          </div>

          {/* FAQ 9 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              9. How does contributing to a 401(k) or HSA affect my net take-home pay?
            </h3>
            <p className="text-black dark:text-slate-100">
              Because pre-tax contributions reduce your taxable income, every dollar you put into a 401(k) or HSA reduces your take-home pay by only 70 to 80 cents, with the tax savings funding the difference.
            </p>
          </div>

          {/* FAQ 10 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              10. Why is my first paycheck of the year sometimes different from my last paycheck?
            </h3>
            <p className="text-black dark:text-slate-100">
              Differences occur due to annual resets of Social Security wage caps, annual benefit open enrollment premium adjustments, or annual IRS tax bracket inflation updates.
            </p>
          </div>

          {/* FAQ 11 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              11. How does overtime pay (1.5x) affect my tax bracket and net pay?
            </h3>
            <p className="text-black dark:text-slate-100">
              Overtime increases gross earnings at 1.5 times your base wage. While extra pay may push that specific portion of wages into a higher marginal tax bracket, your overall take-home cash increases substantially.
            </p>
          </div>

          {/* FAQ 12 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              12. How can I use the 50/30/20 rule to budget my take-home paycheck?
            </h3>
            <p className="text-black dark:text-slate-100">
              Allocate 50% of your net paycheck to non-negotiable living needs (housing, food, utilities), 30% to personal wants, and 20% to savings, investments, and debt reduction.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TakeHomePayContent;

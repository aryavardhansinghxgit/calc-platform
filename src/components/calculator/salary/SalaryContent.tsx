"use client";

import React from "react";

export function SalaryContent() {
  return (
    <div className="space-y-10 text-black dark:text-slate-100 font-medium leading-relaxed">
      {/* 1. FOUNDATIONS */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          1. What is a Salary &amp; Wage? Foundational Compensation Structures
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          In labor economics and payroll accounting, <strong>salary</strong> and <strong>wages</strong> represent the financial compensation paid by employers to workers in exchange for labor, expertise, and time. Although often used interchangeably, salaried and hourly compensation models have critical legal, tax, and cash-flow distinctions:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              Salaried (FLSA Exempt)
            </h3>
            <p className="text-black dark:text-slate-100">
              Workers receive a predetermined, fixed sum periodically regardless of the specific number of hours logged in a given week. Salaried exempt employees typically receive comprehensive benefits packages but are generally exempt from mandatory federal overtime premiums.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              Hourly Wage (FLSA Non-Exempt)
            </h3>
            <p className="text-black dark:text-slate-100">
              Workers are compensated based strictly on accumulated hours logged at an agreed-upon base hourly rate. Under the Fair Labor Standards Act (FLSA), non-exempt employees must receive overtime compensation ($1.5\times$ base wage) for all hours worked beyond 40 in a single workweek.
            </p>
          </div>
        </div>
      </section>

      {/* 2. THE 2,080 WORK HOURS BENCHMARK */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          2. The 2,080 Work Hours Benchmark (Standard Full-Time Year)
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          The international standard for a full-time working year is defined by <strong>2,080 hours</strong>:
        </p>
        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 text-center font-mono font-bold text-xs text-black dark:text-slate-100">
          40 Hours/Week &times; 52 Weeks/Year = 2,080 Work Hours per Year (260 Working Days &times; 8 Hours/Day)
        </div>
        <div className="space-y-2 text-xs">
          <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
            Quick Mental Math Shortcuts:
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-black dark:text-slate-100">
            <li>
              <strong>Hourly to Annual:</strong> Multiply your hourly wage by 2,000 for a rapid ballpark annual figure (e.g., $35.00/hr &times; 2,000 &approx; $70,000/year; exact is $72,800).
            </li>
            <li>
              <strong>Annual to Hourly:</strong> Divide your annual salary by 2,000 (e.g., $80,000/year &divide; 2,000 &approx; $40.00/hr; exact is $38.46/hr).
            </li>
          </ul>
        </div>
      </section>

      {/* 3. BI-WEEKLY VS SEMI-MONTHLY PAYCHECKS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          3. Bi-Weekly vs. Semi-Monthly Paychecks: The Critical Cash Flow Difference
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          One of the most frequent sources of payroll confusion is the difference between <strong>Bi-Weekly</strong> (every two weeks) and <strong>Semi-Monthly</strong> (twice per month):
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              Bi-Weekly (26 Paychecks / Year)
            </h3>
            <p className="text-black dark:text-slate-100">
              Employees are paid every two weeks (e.g., every other Friday). Because there are 52 weeks in a calendar year, you receive <strong>26 paychecks</strong>. This means 10 months have exactly 2 paychecks, while <strong>2 months per year contain 3 paychecks</strong>.
            </p>
            <div className="p-2 bg-white dark:bg-slate-900 rounded font-mono font-bold text-[11px] text-black dark:text-slate-100">
              Bi-Weekly Paycheck = Annual Salary / 26
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              Semi-Monthly (24 Paychecks / Year)
            </h3>
            <p className="text-black dark:text-slate-100">
              Employees are paid twice a month on specific calendar dates (typically the 1st and 15th, or 15th and last business day). You receive exactly <strong>24 paychecks</strong> per year, resulting in larger individual paychecks with consistent monthly budgeting.
            </p>
            <div className="p-2 bg-white dark:bg-slate-900 rounded font-mono font-bold text-[11px] text-black dark:text-slate-100">
              Semi-Monthly Paycheck = Annual Salary / 24
            </div>
          </div>
        </div>
      </section>

      {/* 4. UNADJUSTED VS ADJUSTED SALARIES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          4. Unadjusted vs. Adjusted Earnings (The Value of Paid Time Off &amp; Holidays)
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          Understanding the true hourly value of employment requires comparing unadjusted and adjusted compensation:
        </p>
        <div className="space-y-3 text-xs">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 space-y-1">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              Unadjusted Calculations (52 Weeks / 260 Workdays)
            </h3>
            <p className="text-black dark:text-slate-100">
              Assumes 52 unbroken working weeks without accounting for non-working paid time off:
            </p>
            <div className="p-2 bg-white dark:bg-slate-900 rounded font-mono font-bold text-center text-black dark:text-slate-100">
              Unadjusted Annual Salary = Hourly Wage &times; Hours/Week &times; 52
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 space-y-1">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              Adjusted Calculations (Accounting for Paid Holidays + PTO)
            </h3>
            <p className="text-black dark:text-slate-100">
              Evaluates the exact number of active on-the-clock working days after deducting official company holidays and earned vacation days:
            </p>
            <div className="p-2 bg-white dark:bg-slate-900 rounded font-mono font-bold text-center text-black dark:text-slate-100">
              Adjusted Working Days = (52 &times; Days/Wk) - (Holidays + Vacation Days)
            </div>
            <p className="text-black dark:text-slate-100">
              For standard 10 holidays and 15 vacation days: 260 - 25 = <strong>235 active working days</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* 5. GROSS PAY VS NET TAKE-HOME PAY */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          5. Gross Pay vs. Net Take-Home Pay (Payroll Taxes &amp; Pre-Tax Deductions)
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          Your <strong>Gross Pay</strong> is your total agreed-upon compensation before any mandatory or voluntary withholdings. Your <strong>Net Take-Home Pay</strong> is the actual amount deposited into your checking account after deducting:
        </p>
        <div className="space-y-2.5 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 space-y-1">
            <h3 className="font-extrabold text-black dark:text-slate-100">
              1. FICA Mandatory Contributions
            </h3>
            <p className="text-black dark:text-slate-100">
              <strong>Social Security:</strong> 6.2% of gross earnings up to the annual wage cap ($168,600). <strong>Medicare:</strong> 1.45% on all earnings, plus an additional 0.9% high-income surtax on earnings exceeding $200,000 for single filers.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 space-y-1">
            <h3 className="font-extrabold text-black dark:text-slate-100">
              2. Federal &amp; State Income Taxes
            </h3>
            <p className="text-black dark:text-slate-100">
              Calculated using progressive tax brackets based on IRS Form W-4 elections and filing status (Single, Married, Head of Household), along with state-specific tax rates (ranging from 0% in states like TX, FL, and WA up to over 10% in high-tax brackets).
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 space-y-1">
            <h3 className="font-extrabold text-black dark:text-slate-100">
              3. Pre-Tax Employee Benefits
            </h3>
            <p className="text-black dark:text-slate-100">
              Elective contributions to traditional 401(k) / 403(b) retirement plans, Health Savings Accounts (HSA), Flexible Spending Accounts (FSA), and employer-sponsored healthcare premiums reduce your adjusted gross income, lowering your overall tax liability.
            </p>
          </div>
        </div>
      </section>

      {/* 6. OVERTIME RULES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          6. Overtime Pay Rules: Time-and-a-Half &amp; Double-Time Standards
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          Under the Fair Labor Standards Act (FLSA), covered non-exempt employees must receive overtime pay for hours worked over 40 in a workweek at a rate not less than <strong>one and one-half times (1.5&times;)</strong> their regular rate of pay:
        </p>
        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 text-center font-mono font-bold text-xs text-black dark:text-slate-100">
          Overtime Hourly Rate = Base Hourly Wage &times; 1.5
        </div>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          <strong>Double-Time (2.0&times;):</strong> While not mandated under federal FLSA law, double-time pay is required under specific state regulations (such as California for shifts exceeding 12 hours in a day or working 7 consecutive days) or specified in union collective bargaining agreements.
        </p>
      </section>

      {/* 7. QUICK REFERENCE SALARY TABLE */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          7. Comprehensive Salary Quick-Reference Matrix
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-sans tabular-nums">
          <table className="w-full text-center border-collapse">
            <thead className="bg-slate-100 dark:bg-slate-800 font-bold border-b border-slate-300 dark:border-slate-700 text-black dark:text-slate-100">
              <tr>
                <th className="p-2.5 text-left">Hourly Wage</th>
                <th className="p-2.5">Daily (8h)</th>
                <th className="p-2.5">Weekly (40h)</th>
                <th className="p-2.5">Bi-Weekly (26x)</th>
                <th className="p-2.5">Monthly (12x)</th>
                <th className="p-2.5">Annual Salary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-black dark:text-slate-100">
              <tr>
                <td className="p-2 text-left font-bold">$15.00 / hr</td>
                <td className="p-2">$120.00</td>
                <td className="p-2">$600.00</td>
                <td className="p-2">$1,200.00</td>
                <td className="p-2">$2,600.00</td>
                <td className="p-2 font-bold">$31,200</td>
              </tr>
              <tr>
                <td className="p-2 text-left font-bold">$20.00 / hr</td>
                <td className="p-2">$160.00</td>
                <td className="p-2">$800.00</td>
                <td className="p-2">$1,600.00</td>
                <td className="p-2">$3,467.00</td>
                <td className="p-2 font-bold">$41,600</td>
              </tr>
              <tr>
                <td className="p-2 text-left font-bold">$25.00 / hr</td>
                <td className="p-2">$200.00</td>
                <td className="p-2">$1,000.00</td>
                <td className="p-2">$2,000.00</td>
                <td className="p-2">$4,333.00</td>
                <td className="p-2 font-bold">$52,000</td>
              </tr>
              <tr>
                <td className="p-2 text-left font-bold">$35.00 / hr</td>
                <td className="p-2">$280.00</td>
                <td className="p-2">$1,400.00</td>
                <td className="p-2">$2,800.00</td>
                <td className="p-2">$6,067.00</td>
                <td className="p-2 font-bold">$72,800</td>
              </tr>
              <tr>
                <td className="p-2 text-left font-bold">$50.00 / hr</td>
                <td className="p-2">$400.00</td>
                <td className="p-2">$2,000.00</td>
                <td className="p-2">$4,000.00</td>
                <td className="p-2">$8,667.00</td>
                <td className="p-2 font-bold">$104,000</td>
              </tr>
              <tr>
                <td className="p-2 text-left font-bold">$75.00 / hr</td>
                <td className="p-2">$600.00</td>
                <td className="p-2">$3,000.00</td>
                <td className="p-2">$6,000.00</td>
                <td className="p-2">$13,000.00</td>
                <td className="p-2 font-bold">$156,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 8. SUMMARY */}
      <section className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          8. Educational Summary
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          Accurate salary conversions empower employees, contractors, and employers to evaluate job offers, negotiate raises, understand the true value of paid time off, and optimize net take-home cash flow for personal financial budgeting.
        </p>
      </section>

      {/* 9. 12 RELEVANT FAQS */}
      <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          Frequently Asked Questions (FAQ)
        </h2>
        <div className="space-y-3 text-xs leading-relaxed text-black dark:text-slate-100">
          {/* FAQ 1 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              1. How do I calculate my annual salary from an hourly wage?
            </h3>
            <p className="text-black dark:text-slate-100">
              Multiply your hourly wage by the number of hours worked per week, then multiply by 52 weeks in a year (e.g., $35/hr &times; 40 hours/week &times; 52 weeks = $72,800 per year).
            </p>
          </div>

          {/* FAQ 2 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              2. What is the difference between bi-weekly and semi-monthly pay periods?
            </h3>
            <p className="text-black dark:text-slate-100">
              <strong>Bi-weekly</strong> pays every 2 weeks resulting in 26 paychecks per year (including two months with 3 paychecks). <strong>Semi-monthly</strong> pays twice a month on fixed dates resulting in exactly 24 paychecks per year.
            </p>
          </div>

          {/* FAQ 3 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              3. How many working hours are in a typical full-time work year?
            </h3>
            <p className="text-black dark:text-slate-100">
              A standard full-time work year consists of <strong>2,080 hours</strong> (40 hours per week &times; 52 weeks). Factoring in 10 holidays and 15 days of PTO reduces active working hours to approximately 1,880 hours.
            </p>
          </div>

          {/* FAQ 4 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              4. How does paid time off (PTO) and paid holidays affect my hourly rate?
            </h3>
            <p className="text-black dark:text-slate-100">
              Paid time off increases your effective hourly worth because you earn your full annual salary while working fewer actual days on the job.
            </p>
          </div>

          {/* FAQ 5 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              5. What is the difference between gross salary and net take-home pay?
            </h3>
            <p className="text-black dark:text-slate-100">
              <strong>Gross salary</strong> is your total contractual compensation before withholdings. <strong>Net take-home pay</strong> is the actual cash deposited after deducting federal taxes, state taxes, FICA (Social Security and Medicare), and pre-tax benefit premiums.
            </p>
          </div>

          {/* FAQ 6 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              6. How is overtime pay calculated under federal Fair Labor Standards Act (FLSA) guidelines?
            </h3>
            <p className="text-black dark:text-slate-100">
              Overtime for non-exempt employees is calculated at <strong>1.5 times the regular hourly rate</strong> for all hours worked beyond 40 in a single standard workweek.
            </p>
          </div>

          {/* FAQ 7 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              7. What percentage of my paycheck goes to FICA taxes (Social Security and Medicare)?
            </h3>
            <p className="text-black dark:text-slate-100">
              FICA taxes total <strong>7.65%</strong> for employees: 6.2% for Social Security (up to the annual wage limit) and 1.45% for Medicare (with an additional 0.9% surtax on income over $200,000).
            </p>
          </div>

          {/* FAQ 8 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              8. How do pre-tax deductions like 401(k) and HSA increase my take-home efficiency?
            </h3>
            <p className="text-black dark:text-slate-100">
              Pre-tax deductions are subtracted from your gross pay before income taxes are calculated, lowering your overall taxable income and reducing the total taxes withheld.
            </p>
          </div>

          {/* FAQ 9 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              9. Why do bi-weekly employees receive three paychecks in two months of the year?
            </h3>
            <p className="text-black dark:text-slate-100">
              Because 52 weeks divided by 2 equals 26 paychecks. Spreading 26 paychecks over 12 calendar months means exactly two months will have three pay dates instead of two.
            </p>
          </div>

          {/* FAQ 10 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              10. How can I convert a salaried compensation package to an equivalent 1099 contractor rate?
            </h3>
            <p className="text-black dark:text-slate-100">
              1099 independent contractors must pay both employee and employer portions of FICA (15.3% self-employment tax) and fund their own health insurance and unpaid PTO. Analysts recommend multiplying your salaried hourly rate by 1.25 to 1.40 to determine an equivalent 1099 billing rate.
            </p>
          </div>

          {/* FAQ 11 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              11. Which US states have zero percent state income tax on earned wages?
            </h3>
            <p className="text-black dark:text-slate-100">
              The 8 states with no individual state income tax on earned wages are <strong>Texas, Florida, Washington, Nevada, Tennessee, Wyoming, South Dakota, and Alaska</strong>.
            </p>
          </div>

          {/* FAQ 12 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              12. How does the 50/30/20 budget rule work with net take-home salary?
            </h3>
            <p className="text-black dark:text-slate-100">
              The 50/30/20 rule allocates your <strong>net take-home pay</strong> into three categories: 50% for essential Needs (housing, groceries, utilities), 30% for discretionary Wants (dining, entertainment, hobbies), and 20% for Savings and debt reduction.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SalaryContent;

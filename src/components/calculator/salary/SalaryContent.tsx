"use client";

import React from "react";
import Link from "next/link";
import {
  Calculator,
  Calendar,
  Clock,
  Coins,
  DollarSign,
  FileSpreadsheet,
  Globe,
  HelpCircle,
  Percent,
  Scale,
  ShieldCheck,
  TrendingUp,
  Users,
  Briefcase,
  Layers,
} from "lucide-react";

export function SalaryContent() {
  const faqs = [
    {
      question: "1. How do I calculate annual salary from hourly pay?",
      answer:
        "Multiply your hourly wage rate by the number of paid hours worked per week, then multiply by 52 weeks in a calendar year (Annual = Hourly Rate × Hours/Week × 52). For a standard 40-hour week, multiply your hourly rate by 2,080.",
    },
    {
      question: "2. How do I calculate hourly wage from annual salary?",
      answer:
        "Divide your contractual annual gross salary by the total annual working hours (Hourly = Annual Salary ÷ (Hours/Week × 52)). For a 40-hour week, divide by 2,080. An $80,000 salary equals $38.46/hour.",
    },
    {
      question: "3. What is the difference between bi-weekly and semi-monthly pay?",
      answer:
        "Bi-weekly employees are paid every two weeks (26 paychecks per year). Semi-monthly employees are paid twice per month on specific dates (24 paychecks per year). For the same annual salary, semi-monthly checks are ~8.33% larger.",
    },
    {
      question: "4. How many work hours are in a typical full-time year?",
      answer:
        "2,080 hours (40 hrs/wk × 52 wks) is a common full-time planning convention. U.S. Federal Government civilian payroll uses a 2,087-hour divisor under 5 U.S.C. § 5504(b) to account for leap years and calendar drift.",
    },
    {
      question: "5. Does taking paid PTO reduce my contractual annual salary?",
      answer:
        "No. Paid PTO and paid holidays preserve 100% of your agreed contractual salary. Salaried workers receive their full contractual pay while working fewer active on-the-clock hours.",
    },
    {
      question: "6. How does PTO affect effective hourly compensation?",
      answer:
        "Because your full salary is earned over fewer active hours, your effective hourly compensation increases (Annual Salary ÷ Active Hours). A $104,000 salary with 25 paid non-working days yields an effective rate of $55.32/hr over 1,880 active hours.",
    },
    {
      question: "7. How is overtime pay calculated under the FLSA?",
      answer:
        "Covered nonexempt employees generally receive at least 1.5× their regular hourly rate for hours worked over 40 in a single 7-day statutory workweek. Overtime cannot be averaged across two weeks in a bi-weekly cycle.",
    },
    {
      question: "8. What is the difference between gross pay and net take-home pay?",
      answer:
        "Gross pay is total compensation earned before any deductions. Net take-home pay is the cash remaining after federal and state income taxes, FICA (Social Security and Medicare), and voluntary benefit deductions are subtracted.",
    },
    {
      question: "9. How are FICA payroll taxes calculated?",
      answer:
        "Employees pay 6.2% Social Security tax on covered wages up to the statutory cap ($176,100 in 2025; $184,500 in 2026) and 1.45% Medicare tax on all covered wages. Employers withhold an extra 0.9% Additional Medicare surtax on wages over $200,000.",
    },
    {
      question: "10. What is an equivalent 1099 contractor billing rate?",
      answer:
        "A 1.25× to 1.40× markup is sometimes used as a rough planning heuristic over an equivalent W-2 hourly rate to account for the 7.65% employer FICA match, self-funded health insurance, unpaid PTO, business expenses, and unbillable administrative hours.",
    },
    {
      question: "11. How does the target salary solver work?",
      answer:
        "The solver algebraically grosses up desired net monthly earnings using an assumed effective tax rate (Gross = (Net Monthly × 12) ÷ (1 - Tax Rate)). The entered tax percentage represents an illustrative user modeling assumption.",
    },
    {
      question: "12. How does cost of living affect required salary across cities?",
      answer:
        "Because housing, goods, and services vary by location, maintaining an equivalent standard of living requires scaling nominal salary by the relative index ratio (Salary × (Target Index ÷ Source Index)).",
    },
  ];

  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
      {/* 1. HOW SALARY AND WAGE CONVERSIONS WORK */}
      <section id="how-salary-conversions-work" className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <Calculator className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            1. How Salary and Wage Conversions Work
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Salary and wage conversion translates compensation across standard pay intervals—hourly, daily, weekly, bi-weekly, semi-monthly, monthly, quarterly, and annual. While compensation may be quoted as an annual salary in an employment agreement or as an hourly rate on a paystub, converting between intervals requires standardizing the number of working hours, scheduled workdays, and pay periods in a calendar year.
        </p>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          In standard U.S. payroll modeling, annual earnings are anchored to a 52-week calendar year. Converting an hourly wage to an annual salary evaluates the total paid hours per week multiplied by 52 weeks. Conversely, converting an annual salary back to an hourly equivalent divides the total gross salary by the annualized working hours. Understanding these mathematical relationships allows workers and employers to evaluate job offers, plan household budgets, and analyze total earnings.
        </p>
      </section>

      {/* 2. CONVERTING HOURLY PAY TO ANNUAL SALARY */}
      <section id="hourly-to-annual-salary" className="space-y-4 pt-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <DollarSign className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            2. Converting Hourly Pay to Annual Salary
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          To convert an hourly wage rate into an annual gross salary, the base hourly rate is multiplied by the scheduled weekly hours and the standard 52 weeks in a calendar year.
        </p>
        
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
          <strong className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
            Core Hourly-to-Annual Formula
          </strong>
          <div className="text-base sm:text-lg font-mono font-bold text-slate-900 dark:text-slate-100">
            Annual Gross Salary = Hourly Rate &times; Hours per Week &times; 52
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Standard Full-Time Formulation (40 Hours/Week)
          </h3>
          <ul className="list-disc pl-5 text-xs text-slate-600 dark:text-slate-300 space-y-1">
            <li><strong>$20.00/hour:</strong> $20.00 &times; 40 &times; 52 = <strong>$41,600.00 per year</strong></li>
            <li><strong>$25.00/hour:</strong> $25.00 &times; 40 &times; 52 = <strong>$52,000.00 per year</strong></li>
            <li><strong>$35.00/hour:</strong> $35.00 &times; 40 &times; 52 = <strong>$72,800.00 per year</strong></li>
            <li><strong>$50.00/hour:</strong> $50.00 &times; 40 &times; 52 = <strong>$104,000.00 per year</strong></li>
          </ul>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-200 dark:border-slate-700 text-xs space-y-1.5">
          <span className="font-bold text-slate-900 dark:text-slate-100 block">Non-Standard &amp; Part-Time Workweeks</span>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            When weekly schedules differ from 40 hours, annualized hours scale directly with the scheduled workload. For example, a part-time position at <strong>$30.00/hour</strong> for <strong>25 hours per week</strong> yields:
            <code className="block mt-1 font-mono font-bold text-blue-600 dark:text-blue-400">$30.00 × 25 × 52 = $39,000.00 annual gross</code>
          </p>
        </div>
      </section>

      {/* 3. CONVERTING ANNUAL SALARY TO HOURLY WAGE */}
      <section id="annual-salary-to-hourly" className="space-y-4 pt-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <Clock className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            3. Converting Annual Salary to Hourly Wage
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          To derive the unadjusted hourly wage equivalent from an annual salary, divide the contractual annual salary by the total planned working hours for the year.
        </p>
        
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
          <strong className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
            Annual-to-Hourly Formula
          </strong>
          <div className="text-base sm:text-lg font-mono font-bold text-slate-900 dark:text-slate-100">
            Hourly Wage = Annual Gross Salary &divide; (Hours per Week &times; 52)
          </div>
        </div>

        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Under the standard full-time assumption of 40 hours per week (2,080 annual hours), an employee earning an <strong>$80,000.00 annual salary</strong> receives an unadjusted hourly equivalent of:
        </p>
        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
          Hourly Wage = $80,000.00 &divide; 2,080 &approx; <strong className="text-blue-600 dark:text-blue-400">$38.46/hour</strong>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          If that same $80,000 salary requires an average of 50 hours per week, the annualized hours increase to 2,600, reducing the effective hourly base to <strong>$30.77/hour</strong> ($80,000 &divide; 2,600).
        </p>
      </section>

      {/* 4. PAY FREQUENCY SCHEDULES */}
      <section id="pay-frequency-schedules" className="space-y-4 pt-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <Calendar className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            4. Pay Frequency Schedules: Weekly, Bi-Weekly, Semi-Monthly &amp; Monthly
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          U.S. employers distribute compensation across several standard payroll frequencies. Because each frequency contains a specific number of pay periods per calendar year, the gross amount per paycheck varies even when total annual compensation is identical.
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold">
                <th className="p-3">Pay Frequency</th>
                <th className="p-3">Periods per Year</th>
                <th className="p-3">Formula</th>
                <th className="p-3">Gross Check ($104,000 Salary)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-900 font-sans tabular-nums text-slate-700 dark:text-slate-300">
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">Weekly</td>
                <td className="p-3">52 paychecks</td>
                <td className="p-3 font-mono">Annual &divide; 52</td>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">$2,000.00</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">Bi-Weekly</td>
                <td className="p-3">26 paychecks</td>
                <td className="p-3 font-mono">Annual &divide; 26</td>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">$4,000.00</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">Semi-Monthly</td>
                <td className="p-3">24 paychecks</td>
                <td className="p-3 font-mono">Annual &divide; 24</td>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">$4,333.33</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">Monthly</td>
                <td className="p-3">12 paychecks</td>
                <td className="p-3 font-mono">Annual &divide; 12</td>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">$8,666.67</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">Quarterly</td>
                <td className="p-3">4 periods</td>
                <td className="p-3 font-mono">Annual &divide; 4</td>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">$26,000.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <strong className="font-bold text-sm text-slate-900 dark:text-slate-100 block">Bi-Weekly (26 Paychecks)</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Paid once every 14 days. Employees receive 2 paychecks per month in 10 months, and <strong>3 paychecks in exactly 2 months of the year</strong>. Each check equals Annual &divide; 26 ($4,000.00 for $104k).
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <strong className="font-bold text-sm text-slate-900 dark:text-slate-100 block">Semi-Monthly (24 Paychecks)</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Paid twice monthly on fixed dates (e.g., 1st &amp; 15th). Because checks are split into 24 periods, each semi-monthly check is <strong>8.33% larger</strong> ($4,333.33 for $104k).
            </p>
          </div>
        </div>
      </section>

      {/* 5. 2,080-HOUR PLANNING CONVENTION */}
      <section id="2080-hour-planning-convention" className="space-y-4 pt-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <Briefcase className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            5. The 2,080-Hour Full-Time Planning Convention
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          In compensation analysis and human resources planning, <strong>2,080 hours is a common full-time planning convention based on 40 hours &times; 52 weeks</strong>. It serves as a standard mathematical benchmark for converting hourly wages to annual salaries.
        </p>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          The 2,080-hour figure is a practical planning convention rather than an immutable legal statute. Actual calendar years contain 365 days (366 in leap years), which equals 52 weeks plus one extra day (or two extra days). Consequently, actual workdays can fluctuate between 260, 261, or 262 days. By comparison, the U.S. Federal Government uses a <strong>2,087-hour divisor</strong> under 5 U.S.C. &sect; 5504(b) for federal civilian payroll to account for calendar drift across 28-year payroll cycles.
        </p>
      </section>

      {/* 6. PAID PTO, HOLIDAYS & EFFECTIVE HOURLY WORTH */}
      <section id="pto-holidays-effective-hourly" className="space-y-4 pt-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <Coins className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            6. Paid Time Off (PTO), Holidays &amp; Effective Hourly Worth
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Employee benefit packages often include paid holidays, paid vacation, and personal time off. Modeling paid leave reveals a vital compensation distinction: <strong>paid time off preserves contractual annual salary while increasing the employee&apos;s effective compensation per active working hour</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <strong className="font-bold text-sm text-slate-900 dark:text-slate-100 block">Contractual Salary Preservation</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              When an employee with an agreed annual salary of <strong>$104,000.00</strong> receives 10 paid holidays and 15 paid PTO days (25 total paid non-working days), their annual contractual compensation remains exactly <strong>$104,000.00</strong>. Paid leave does not reduce gross salary.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl space-y-2">
            <strong className="font-bold text-sm text-emerald-900 dark:text-emerald-300 block">Effective Hourly Rate Calculation</strong>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Active working hours = (260 &minus; 25) &times; 8 = <strong>1,880 active hours</strong>.
              <br />
              <code className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-300">
                Effective Rate = $104,000.00 ÷ 1,880 hrs = $55.32/hour
              </code>
            </p>
          </div>
        </div>
      </section>

      {/* 7. GROSS PAY VS. TAKE-HOME PAY */}
      <section id="gross-vs-take-home-pay" className="space-y-4 pt-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <Percent className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            7. Gross Pay vs. Take-Home Pay
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Understanding the difference between gross compensation and net take-home pay is central to managing personal finances:
        </p>
        <ul className="list-disc pl-5 text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
          <li><strong>Gross Pay:</strong> Total compensation earned before any taxes, statutory contributions, or voluntary benefit deductions are subtracted.</li>
          <li><strong>Net Take-Home Pay:</strong> The actual cash deposited into an employee&apos;s bank account after federal income tax, state income tax, FICA payroll withholdings, and pre-tax benefit deductions are subtracted. For detailed paycheck stub modeling, users can consult a dedicated <Link href="/calculators/take-home-pay-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">take-home pay calculator</Link>.</li>
        </ul>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <strong className="font-bold text-sm text-slate-900 dark:text-slate-100 block">Statutory FICA Deductions</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Social Security (6.2%):</strong> Capped at <strong>$176,100 (2025)</strong> and <strong>$184,500 (2026)</strong>. Estimate retirement income with a <Link href="/calculators/social-security-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">Social Security calculator</Link>.
              <br />
              <strong>Medicare (1.45%):</strong> Uncapped. Additional 0.9% surtax applies to wages exceeding $200,000 for employer withholding.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <strong className="font-bold text-sm text-slate-900 dark:text-slate-100 block">Pre-Tax Deductions (401k &amp; HSA)</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Traditional 401(k)/403(b):</strong> Reduces Box 1 taxable wages, remains subject to FICA. Model compounding in our <Link href="/calculators/401k-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">401(k) calculator</Link> or <Link href="/calculators/traditional-ira-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">traditional IRA calculator</Link>.
              <br />
              <strong>Section 125 HSA/FSA:</strong> Pre-tax for federal income and FICA taxes when eligible. Reconcile year-end taxes with a <Link href="/calculators/income-tax-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">federal income tax calculator</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* 8. OVERTIME AND PREMIUM PAY UNDER THE FLSA */}
      <section id="flsa-overtime-premium-pay" className="space-y-4 pt-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <Scale className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            8. Overtime and Premium Pay Under the FLSA
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Under the Fair Labor Standards Act (FLSA), 29 U.S.C. &sect; 207(a)(1), covered nonexempt employees generally receive overtime pay of at least <strong>1.5&times; their regular rate of pay</strong> for all hours worked exceeding 40 hours in a single statutory workweek.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <strong className="font-bold text-sm text-slate-900 dark:text-slate-100 block">Single 7-Day Workweek Standard</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Overtime is evaluated on a fixed 7-day workweek (168 hours). Averaging hours over two weeks in a bi-weekly cycle is prohibited. 50 hours in Week 1 and 30 in Week 2 requires 10 overtime hours.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <strong className="font-bold text-sm text-slate-900 dark:text-slate-100 block">FLSA Exemption Requirements</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Salary alone does not determine exemption. White-collar exemptions require salary-basis, salary-level, and duties tests (29 C.F.R. Part 541), with exceptions such as outside-sales roles.
            </p>
          </div>
        </div>
      </section>

      {/* 9. ANNUAL BONUSES, COMMISSIONS & INCENTIVES */}
      <section id="bonuses-commissions-incentives" className="space-y-4 pt-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <TrendingUp className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            9. Annual Bonuses, Commissions &amp; Incentive Earnings
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Incentive pay structures such as annual performance bonuses, sales commissions, and profit-sharing distributions increase total gross earnings above the base wage.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-1 text-slate-800 dark:text-slate-200">
          <div>Base Pay (40 hrs &times; 52 wks @ $35/hr): $72,800.00</div>
          <div>Overtime Pay (5 hrs &times; 1.5 &times; $35 &times; 52): $13,650.00</div>
          <div>Double-Time Pay (2 hrs &times; 2.0 &times; $35 &times; 52): $7,280.00</div>
          <div>Annual Bonus: $5,000.00</div>
          <div className="pt-1 border-t border-slate-300 dark:border-slate-600 font-bold text-blue-600 dark:text-blue-400">
            Total Annual Gross: $98,730.00 (Effective Rate: $40.40/hr across 2,444 hours)
          </div>
        </div>
      </section>

      {/* 10. TARGET SALARY SOLVER */}
      <section id="target-salary-solver" className="space-y-4 pt-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <FileSpreadsheet className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            10. Target Salary Solver: Gross-Up for Desired Take-Home Pay
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          When establishing personal living budgets or planning installment debt service with a <Link href="/calculators/personal-loan-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">personal loan calculator</Link>, individuals often know their target net monthly cash flow and need to solve for the required gross annual salary.
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
          <strong className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
            Gross-Up Target Salary Formula
          </strong>
          <div className="text-base sm:text-lg font-mono font-bold text-slate-900 dark:text-slate-100">
            Required Gross Annual Salary = (Desired Net Monthly &times; 12) &divide; (1 - Assumed Effective Tax Rate)
          </div>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          For a $6,000 monthly net target at an assumed 25% effective tax/deduction rate: ($6,000 &times; 12) &divide; 0.75 = <strong>$96,000.00 gross annual salary ($46.15/hr at 40 hrs/wk)</strong>.
        </p>
      </section>

      {/* 11. COST-OF-LIVING RELOCATION */}
      <section id="cost-of-living-relocation" className="space-y-4 pt-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <Globe className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            11. Cost-of-Living Salary Relocation Comparison
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Evaluating job offers across different geographic markets requires adjusting nominal salaries for regional differences in purchasing power, housing costs, transportation, and consumer goods.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
          <strong className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
            Equivalent Relocation Salary Formula
          </strong>
          <div className="text-base sm:text-lg font-mono font-bold text-slate-900 dark:text-slate-100">
            Equivalent Salary = Current Salary &times; (Destination City Index &divide; Source City Index)
          </div>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Relocating from <strong>Austin, TX</strong> (Index 104) to <strong>New York, NY</strong> (Index 185) with an <strong>$85,000 salary</strong> requires <strong>$151,202.00</strong> to maintain equivalent purchasing power (+77.9% overall COLI differential).
        </p>
      </section>

      {/* 12. 1099 CONTRACTOR VS. W-2 */}
      <section id="1099-contractor-vs-w2" className="space-y-4 pt-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <Users className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            12. Evaluating 1099 Contractor Rates vs. Salaried W-2 Positions
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          A <strong>1.25&times;–1.40&times; markup</strong> is sometimes used as a rough planning heuristic over an equivalent W-2 hourly rate to account for employer-side FICA (7.65%), self-funded health insurance, unpaid PTO/holidays, and business overhead. Individuals building independent retirement assets can model self-funded growth using a <Link href="/calculators/retirement-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">retirement calculator</Link>.
        </p>
      </section>

      {/* 13. RELATED FINANCIAL & TAX CALCULATORS */}
      <section id="related-calculators" className="space-y-4 pt-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <Layers className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            13. Related Financial &amp; Tax Calculators
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          To explore related compensation, tax, debt, and retirement calculations, explore our verified financial tools suite:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
          {[
            { title: "Take-Home Pay Calculator", href: "/calculators/take-home-pay-calculator", desc: "Detailed paycheck stub net pay estimator" },
            { title: "Federal Income Tax Calculator", href: "/calculators/income-tax-calculator", desc: "Form 1040 federal tax liability & refunds" },
            { title: "401(k) Calculator", href: "/calculators/401k-calculator", desc: "Pre-tax retirement growth & employer matching" },
            { title: "Traditional IRA Calculator", href: "/calculators/traditional-ira-calculator", desc: "Tax-deferred compounding for IRA accounts" },
            { title: "Social Security Calculator", href: "/calculators/social-security-calculator", desc: "Monthly retirement benefit payment estimates" },
            { title: "Personal Loan Calculator", href: "/calculators/personal-loan-calculator", desc: "Installment loan amortization & monthly payments" },
            { title: "Retirement Calculator", href: "/calculators/retirement-calculator", desc: "Long-term nest egg accumulation & milestones" },
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

      {/* 14. FREQUENTLY ASKED QUESTIONS (FAQS) */}
      <section id="faqs" className="space-y-4 pt-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <HelpCircle className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            14. Frequently Asked Questions
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

      {/* 15. METHODOLOGY, LIMITATIONS & YMYL DISCLAIMER */}
      <section className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-5 text-xs text-slate-600 dark:text-slate-400 space-y-3 leading-relaxed">
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100 text-sm">
          <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span>Authoritative Sources, Payroll Limitations &amp; Educational Disclaimer</span>
        </div>
        <p>
          <strong>Authoritative Sources:</strong> Fair Labor Standards Act (29 U.S.C. &sect; 201 et seq.; 29 C.F.R. Parts 541 &amp; 778); Internal Revenue Code (IRC &sect;&sect; 3101, 3102, 3402); Social Security Administration (SSA 2025/2026 OASDI wage bases); U.S. Office of Personnel Management (5 U.S.C. &sect; 5504(b) 2,087-hour federal work year).
        </p>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          <strong>Educational Estimate &amp; Disclaimer:</strong> This calculator provides mathematical conversions and illustrative payroll estimates for general educational and financial planning purposes. Actual paycheck withholdings depend on employee Form W-4 elections, multi-job allowances, local/municipal wage taxes, and employer benefit plan structures. This platform does not provide legal, accounting, tax, or employment advice. Consult a certified payroll specialist, CPA, or labor attorney for specific wage and compensation determinations.
        </p>
      </section>
    </div>
  );
}

export default SalaryContent;

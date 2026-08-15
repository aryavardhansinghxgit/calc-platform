"use client";

import React, { useState } from "react";
import {
  BookOpen,
  HelpCircle,
  FileText,
  DollarSign,
  PieChart as PieIcon,
  ShieldCheck,
  Zap,
  Info,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Award,
  Clock,
  Layers,
  ArrowRight,
} from "lucide-react";

export function IncomeTaxContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What is the difference between Marginal Tax Rate and Effective Tax Rate?",
      answer: "Your Marginal Tax Rate is the tax percentage applied to your highest dollar of taxable income (your top tax bracket). Your Effective Tax Rate is the actual percentage of your total gross income paid in taxes (Total Tax / Gross Income). Because of progressive tax brackets, your effective rate is almost always lower than your marginal rate.",
    },
    {
      question: "What are the 2026 Federal Income Tax Brackets?",
      answer: "For tax year 2026, the seven IRS progressive tax rates remain 10%, 12%, 22%, 24%, 32%, 35%, and 37%. Tax bracket income thresholds are indexed upward annually for inflation.",
    },
    {
      question: "What is the Standard Deduction for 2026?",
      answer: "The projected 2026 Standard Deduction is $15,000 for Single filers and Married Filing Separately, $30,000 for Married Filing Jointly, and $22,500 for Head of Household. Seniors (65+) receive an additional standard deduction bonus.",
    },
    {
      question: "Should I claim the Standard Deduction or Itemize Deductions (Schedule A)?",
      answer: "You should choose whichever deduction amount is larger. If the sum of your itemized deductions—such as mortgage interest, state and local taxes (SALT capped at $10,000), charitable donations, and medical expenses—exceeds your standard deduction threshold, itemizing will reduce your taxable income more.",
    },
    {
      question: "What is the difference between a Tax Deduction and a Tax Credit?",
      answer: "A Tax Deduction reduces your total taxable income before tax brackets are applied (saving you a percentage equal to your marginal rate). A Tax Credit directly reduces your final tax dollar-for-dollar. For example, a $1,000 tax credit lowers your tax bill by exactly $1,000.",
    },
    {
      question: "How does the Child Tax Credit (CTC) work for 2026?",
      answer: "The Child Tax Credit provides up to $2,200 per qualifying child under age 17. Up to $1,700 of the credit is refundable (the Additional Child Tax Credit), meaning you can receive it as a tax refund even if your tax liability is zero.",
    },
    {
      question: "What is Above-the-Line (ATL) Deduction?",
      answer: "Above-the-line deductions (Adjustments to Income) are subtracted from Gross Income to calculate your Adjusted Gross Income (AGI). Examples include traditional IRA contributions, student loan interest (up to $2,500), HSA contributions, and 50% of self-employment tax.",
    },
    {
      question: "How are Qualified Dividends and Long-Term Capital Gains taxed?",
      answer: "Qualified dividends and long-term capital gains (assets held over 1 year) enjoy preferential tax rates of 0%, 15%, or 20%, depending on your total taxable income. These rates are significantly lower than ordinary income tax rates.",
    },
    {
      question: "How does Self-Employment Tax (Schedule SE) work?",
      answer: "Self-employed individuals and 1099 contractors pay Self-Employment Tax of 15.3% (12.4% Social Security + 2.9% Medicare) on 92.35% of net profit. However, 50% of your SE tax can be deducted as an above-the-line adjustment on Form 1040.",
    },
    {
      question: "What is the SALT Deduction cap?",
      answer: "The State and Local Tax (SALT) deduction cap limits the amount of state income tax, local tax, and property real estate taxes you can itemize on Schedule A to a maximum of $10,000 ($5,000 for Married Filing Separately).",
    },
    {
      question: "What is the Alternative Minimum Tax (AMT)?",
      answer: "The Alternative Minimum Tax (AMT) is a parallel tax system designed to ensure high-income earners with significant deductions pay a minimum amount of tax. Taxpayers calculate both regular tax and AMT, paying whichever is higher.",
    },
    {
      question: "Why do I owe taxes instead of getting a tax refund?",
      answer: "You owe taxes if the federal income tax withheld from your paychecks (W-2 Box 2) or quarterly estimated tax payments were less than your total tax liability calculated on Form 1040.",
    },
    {
      question: "How can I adjust my tax withholding to avoid owing taxes or getting a huge refund?",
      answer: "Submit an updated IRS Form W-4 to your employer. Adjusting your filing status, dependent count, or extra withholding amount ensures your paychecks withhold the exact tax needed.",
    },
    {
      question: "Is Social Security income taxable?",
      answer: "Depending on your combined income (AGI + non-taxable interest + half of SS benefits), up to 50% or 85% of your Social Security benefits may be subject to federal income tax.",
    },
    {
      question: "What is the Student Loan Interest Deduction?",
      answer: "You can deduct up to $2,500 of interest paid on qualified student loans as an above-the-line deduction, subject to modified AGI phaseout limits.",
    },
    {
      question: "How does the Saver's Credit work?",
      answer: "The Saver's Credit (Retirement Savings Contributions Credit) offers a non-refundable tax credit of 10%, 20%, or 50% of up to $2,000 in retirement contributions for low-to-moderate-income taxpayers.",
    },
    {
      question: "What is the Earned Income Tax Credit (EITC)?",
      answer: "The EITC is a major refundable federal tax credit for working individuals and families with low-to-moderate incomes, boosting refunds substantially.",
    },
    {
      question: "What expenses qualify for the Child and Dependent Care Expense Credit?",
      answer: "You can claim a credit for eligible expenses paid for daycare, preschool, day camps, or after-school care for children under age 13 while you work or look for work.",
    },
    {
      question: "How are short-term capital gains taxed?",
      answer: "Short-term capital gains (assets sold after being held for 1 year or less) are taxed as ordinary income at your standard progressive tax bracket rate (10% to 37%).",
    },
    {
      question: "When are estimated quarterly tax payments required?",
      answer: "Self-employed individuals, freelancers, landlords, and investors must pay quarterly estimated taxes if they expect to owe $1,000 or more in federal tax when filing their annual return.",
    },
  ];

  return (
    <div className="space-y-10 mt-8  dark:border-zinc-800 pt-8 text-zinc-700 dark:text-zinc-300">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex items-center gap-3 text-blue-400 font-semibold text-xs tracking-wider uppercase mb-2">
          <BookOpen className="h-4 w-4" /> IRS Tax Authority Masterclass
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-3">
          Demystifying US Federal Income Tax: The Complete Strategic Guide
        </h2>
        <p className="text-zinc-300 text-sm leading-relaxed max-w-4xl">
          The US progressive income tax system can seem complex. Understanding how W-2 income, 1099 self-employment profits, 
          tax brackets, above-the-line deductions, standard vs. itemized deductions, and tax credits interact empowers taxpayers 
          to optimize tax returns, minimize liabilities, and maximize IRS refunds.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="space-y-8 text-sm leading-relaxed">
        {/* Section 1 & 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-base">
              <DollarSign className="h-5 w-5" /> 1. How Progressive Tax Brackets Work
            </div>
            <p>
              The US federal income tax system uses <strong>progressive tax brackets</strong>. This means your income is divided 
              into chunks, and each chunk is taxed at a progressively higher rate (10%, 12%, 22%, 24%, 32%, 35%, 37%).
            </p>
            <p>
              Entering a higher tax bracket does <em>not</em> mean all your income is taxed at that higher rate—only the dollars 
              falling within that specific range are taxed at the higher marginal rate.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-base">
              <Zap className="h-5 w-5" /> 2. Marginal vs. Effective Tax Rate
            </div>
            <p>
              It is critical to distinguish between your marginal rate and effective rate:
            </p>
            <ul className="text-xs space-y-1.5 text-slate-900 dark:text-slate-100">
              <li>• <strong>Marginal Tax Rate:</strong> The rate paid on your last dollar of income (top bracket).</li>
              <li>• <strong>Effective Tax Rate:</strong> Total Tax Paid divided by Total Gross Income.</li>
            </ul>
            <p className="text-xs italic text-blue-600 dark:text-blue-400">
              Example: A single filer earning $85,000 has a 22% marginal rate, but an effective tax rate of only ~11.5%!
            </p>
          </div>
        </div>

        {/* Section 3 & 4: Deductions */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">3. Standard Deduction vs. Itemized Deductions (Schedule A)
          </h3>
          <p>
            Taxpayers must choose between taking the fixed IRS <strong>Standard Deduction</strong> or itemizing specific qualifying expenses on <strong>Schedule A</strong>.
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse border border-zinc-200 dark:border-zinc-800">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Filing Status</th>
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">2026 Standard Deduction</th>
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Key Itemized Deductions</th>
                </tr>
              </thead>
              <tbody className=" dark:divide-zinc-800">
                <tr>
                  <td className="p-3 font-semibold">Single</td>
                  <td className="p-3 font-sans tabular-nums text-blue-600 font-bold">$15,000</td>
                  <td className="p-3 text-slate-900 dark:text-slate-100">Mortgage Interest ($750k cap)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Married Filing Jointly</td>
                  <td className="p-3 font-sans tabular-nums text-blue-600 font-bold">$30,000</td>
                  <td className="p-3 text-slate-900 dark:text-slate-100">SALT Cap ($10,000 max state/property tax)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Head of Household</td>
                  <td className="p-3 font-sans tabular-nums text-blue-600 font-bold">$22,500</td>
                  <td className="p-3 text-slate-900 dark:text-slate-100">Charitable Donations &amp; Medical (&gt;7.5% AGI)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 5, 6 & 7: Deductions vs Credits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-2">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-base flex items-center gap-1.5">Tax Deductions
            </h4>
            <p className="text-xs">
              Deductions reduce taxable income before tax is calculated. A $1,000 deduction in the 22% bracket saves you <strong>$220</strong> in taxes.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-2">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-base flex items-center gap-1.5">Tax Credits
            </h4>
            <p className="text-xs">
              Tax credits reduce final tax bill dollar-for-dollar. A $1,000 tax credit saves you exactly <strong>$1,000</strong> in taxes.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-2">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-base flex items-center gap-1.5">Refundable Credits
            </h4>
            <p className="text-xs">
              Refundable credits (like the Additional Child Tax Credit & EITC) can trigger an IRS tax refund check even if your tax liability is zero!
            </p>
          </div>
        </div>

        {/* Real-World Use Cases */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Real-World Applications & Tax Lowering Strategies
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-2">
              <span className="font-bold text-zinc-900 dark:text-zinc-100 block">401(k) & Traditional IRA Contributions</span>
              <p className="text-slate-900 dark:text-slate-100">
                Contributing pre-tax dollars to a 401(k) or Traditional IRA reduces your AGI dollar-for-dollar, lowering your tax bracket immediately.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-bold text-zinc-900 dark:text-zinc-100 block">Health Savings Accounts (HSA)</span>
              <p className="text-slate-900 dark:text-slate-100">
                HSAs provide a triple tax advantage: pre-tax contributions, tax-free growth, and tax-free withdrawals for medical expenses.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 20 SEO FAQs Section */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center gap-3">
          <HelpCircle className="h-6 w-6 text-blue-600" />
          <h3 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
            Frequently Asked Questions (FAQ)
          </h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-4 flex items-center justify-between font-semibold text-sm text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors focus:outline-none"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-bold min-w-[20px]">
                      Q{index + 1}.
                    </span>
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-zinc-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-zinc-400 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs text-slate-900 dark:text-slate-100  dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

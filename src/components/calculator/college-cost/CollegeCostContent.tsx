"use client";

import React from "react";

export function CollegeCostContent() {
  const faqs = [
    {
      question: "1. What is the average total cost of college per year in the United States?",
      answer:
        "According to current College Board data, the average annual cost for 2025–2026 (including tuition, fees, room, and board) is $30,990 for a 4-year in-state public university, $50,920 for an out-of-state public university, $65,470 for a private non-profit university, and $21,320 for a 2-year public community college.",
    },
    {
      question: "2. What is a 529 College Savings Plan and how does it work?",
      answer:
        "A 529 plan is a state-sponsored, tax-advantaged investment account designed specifically for education savings. Earnings grow 100% federal income tax-free, and withdrawals are tax-free when used for qualified educational expenses (tuition, fees, room & board, books, and computers). Many states also provide state income tax deductions or tax credits for contributions.",
    },
    {
      question: "3. How does annual college cost inflation affect future college savings?",
      answer:
        "Historically, college tuition has increased at an average rate of 4% to 6% per year—roughly double general consumer price inflation (CPI). For a newborn entering college in 18 years, a current $30,000/year college will cost approximately $72,000/year ($288,000 for a 4-year degree) at a 5% annual inflation rate.",
    },
    {
      question: "4. What is the difference between Direct Subsidized and Unsubsidized federal student loans?",
      answer:
        "Direct Subsidized Loans are awarded based on financial need, and the U.S. Department of Education pays the accruing interest while you are enrolled at least half-time and during the 6-month grace period. Direct Unsubsidized Loans are not need-based, and interest begins accruing immediately upon loan disbursement.",
    },
    {
      question: "5. How does a 529 plan impact FAFSA financial aid eligibility?",
      answer:
        "A 529 plan owned by a parent is treated as a parental asset on the FAFSA and is assessed at a maximum rate of only 5.64% towards the Student Aid Index (SAI). In contrast, assets owned directly in a student's name (like UGMA/UTMA accounts) are assessed at a steep 20%, significantly reducing need-based financial aid.",
    },
    {
      question: "6. What expenses qualify for tax-free 529 plan distributions?",
      answer:
        "Qualified expenses include college tuition, mandatory enrollment fees, textbooks, required course supplies, computers and internet access, and room and board for students enrolled at least half-time. Non-qualified withdrawals incur income tax on the earnings portion plus a 10% federal penalty.",
    },
    {
      question: "7. What is the difference between a 529 Savings Plan and a 529 Prepaid Tuition Plan?",
      answer:
        "A 529 Savings Plan invests contributions in mutual funds/ETFs with variable investment returns. A 529 Prepaid Plan allows parents to lock in and purchase future tuition units or semesters at today's prices at participating state public colleges, hedging completely against tuition inflation.",
    },
    {
      question: "8. How much student loan debt is considered safe for a college student?",
      answer:
        "A widely accepted financial rule of thumb is that total student loan debt at graduation should not exceed your expected first-year starting salary. Keeping monthly student loan repayments below 10% to 15% of your gross monthly income ensures manageable debt servicing.",
    },
    {
      question: "9. What is FAFSA and the Student Aid Index (SAI)?",
      answer:
        "The Free Application for Federal Student Aid (FAFSA) is the official application for federal grants, work-study, and federal student loans. The Student Aid Index (SAI, formerly EFC) is the eligibility index number colleges use to calculate how much need-based financial aid you qualify to receive.",
    },
    {
      question: "10. What are Pell Grants and do they have to be repaid?",
      answer:
        "Federal Pell Grants are need-based federal financial aid awarded to undergraduate students displaying exceptional financial need. Unlike student loans, Pell Grants do not have to be repaid except under rare circumstances like early withdrawal from school.",
    },
    {
      question: "11. Can unused 529 funds be rolled over into a Roth IRA?",
      answer:
        "Yes. Under the SECURE 2.0 Act, beneficiaries can roll over up to a lifetime maximum of $35,000 of unused 529 plan funds into a Roth IRA in the beneficiary's name tax-free and penalty-free, provided the 529 account has been open for at least 15 years.",
    },
    {
      question: "12. What is the '2+2' Transfer Pathway and how much money does it save?",
      answer:
        "The 2+2 pathway involves completing the first two years of general education credits at an affordable community college ($3,000–$5,000/yr), then transferring to a 4-year university to complete the bachelor's degree. This strategy routinely cuts total degree costs by 35% to 50% without compromising the final degree diploma.",
    },
  ];

  return (
    <div className="space-y-3 text-black dark:text-zinc-100 font-sans leading-relaxed">
      {/* SECTION 1: HOW MUCH DOES COLLEGE COST */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 p-3.5 shadow-xs space-y-2.5">
        <h2 className="text-sm font-extrabold text-black dark:text-zinc-100">
          How Much Does College Cost? Breakdown of Higher Education Expenses
        </h2>
        <p className="text-xs text-black dark:text-zinc-200">
          Total college costs extend far beyond basic tuition. A student's Cost of Attendance (COA) is comprised of five primary expense categories:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-1">
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-[11px] uppercase text-black dark:text-zinc-100 block">Tuition & Fees</span>
            <p className="text-[11px] text-black dark:text-zinc-300">
              The direct cost of academic instruction, labs, library access, technology fees, and campus facility memberships.
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-[11px] uppercase text-black dark:text-zinc-100 block">Room & Board</span>
            <p className="text-[11px] text-black dark:text-zinc-300">
              On-campus dorm housing and meal plans, or off-campus apartment rent, utilities, and grocery expenses.
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-[11px] uppercase text-black dark:text-zinc-100 block">Books & Course Supplies</span>
            <p className="text-[11px] text-black dark:text-zinc-300">
              College textbooks, specialized software licenses, laptop computers, and scientific calculators ($1,200/yr avg).
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-[11px] uppercase text-black dark:text-zinc-100 block">Transportation & Personal</span>
            <p className="text-[11px] text-black dark:text-zinc-300">
              Travel between home and campus, vehicle maintenance, gas, laundry, clothing, and everyday personal expenses.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: 529 SAVINGS PLANS & TAX ADVANTAGES */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 p-3.5 shadow-xs space-y-2.5">
        <h2 className="text-sm font-extrabold text-black dark:text-zinc-100">
          The 529 College Savings Plan: Tax Mechanics & Investment Strategies
        </h2>
        <p className="text-xs text-black dark:text-zinc-200">
          Created under Section 529 of the Internal Revenue Code, 529 plans represent the gold standard for tax-advantaged college investing. Contributions grow 100% free of federal and state income taxes:
        </p>

        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-[11px] space-y-1 text-black dark:text-zinc-200">
          <div className="font-bold font-sans text-xs text-black dark:text-zinc-100">Core 529 Plan Advantages:</div>
          <div>• Tax-Free Compound Growth: 100% exemption from capital gains tax and dividend tax.</div>
          <div>• State Tax Deductions: Over 30 states provide state income tax deductions or tax credits for contributions.</div>
          <div>• FAFSA Protection: Assessed at only 5.64% as a parental asset versus 20% for student-owned UGMA/UTMA accounts.</div>
          <div>• SECURE 2.0 Rollover: Up to $35,000 of unused funds can be rolled over tax-free into the beneficiary's Roth IRA.</div>
        </div>
      </div>

      {/* SECTION 3: WORKED MATHEMATICAL CASE STUDIES */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 p-3.5 shadow-xs space-y-2.5">
        <h2 className="text-sm font-extrabold text-black dark:text-zinc-100">
          Worked Mathematical Example (Newborn Child Entering College in 18 Years @ 5% Inflation)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-xs uppercase text-black dark:text-zinc-100">College Cost Inflation Projection</h3>
            <div className="font-mono text-[11px] text-black dark:text-zinc-300 space-y-0.5">
              <div>• Today's Annual Cost = $30,990.00</div>
              <div>• Future Year 1 Cost (Age 18) = $30,990 × (1.05)¹⁸ = <strong>$74,583.00</strong></div>
              <div>• Future Year 2 Cost (Age 19) = $74,583 × 1.05 = <strong>$78,312.00</strong></div>
              <div>• Future Year 3 Cost (Age 20) = $78,312 × 1.05 = <strong>$82,228.00</strong></div>
              <div>• Future Year 4 Cost (Age 21) = $82,228 × 1.05 = <strong>$86,339.00</strong></div>
              <div>• Total 4-Year College Cost = <strong>$321,462.00</strong></div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-xs uppercase text-black dark:text-zinc-100">529 Savings Plan Contribution Strategy</h3>
            <div className="font-mono text-[11px] text-black dark:text-zinc-300 space-y-0.5">
              <div>• Target 4-Year Fund = $321,462.00</div>
              <div>• Investment Return Rate = 6.5% Annual (Tax-Free)</div>
              <div>• Preparation Horizon = 18 Years (216 Months)</div>
              <div>• Required Monthly Deposit = <strong>$725.50/month</strong></div>
              <div>• Total Parent Contributions = $156,708.00 (48.8%)</div>
              <div>• Total Tax-Free Compound Growth = <strong>$164,754.00 (51.2%)</strong></div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: 12 FAQS ALWAYS OPEN CARDS */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 p-3.5 shadow-xs space-y-2.5">
        <h2 className="text-sm font-extrabold text-black dark:text-zinc-100">
          Frequently Asked Questions (12 Key College Savings & Loan FAQs)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 bg-slate-50 dark:bg-slate-800/50 space-y-1"
            >
              <h3 className="font-bold text-xs text-black dark:text-zinc-100">
                {faq.question}
              </h3>
              <p className="text-[11px] text-black dark:text-zinc-300 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

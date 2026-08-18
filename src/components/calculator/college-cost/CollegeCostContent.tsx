"use client";

import React from "react";

export function CollegeCostContent() {
  const faqs = [
    {
      question: "1. What is the average total cost of college including tuition, room, and board?",
      answer:
        "According to the College Board, average annual published costs are ~$28,000–$30,000 for in-state public universities, ~$44,000–$48,000 for out-of-state public institutions, and ~$58,000–$62,000+ for private non-profit universities, including tuition, fees, room, board, books, and living supplies.",
    },
    {
      question: "2. What is a 529 College Savings Plan and how does it provide tax advantages?",
      answer:
        "A 529 plan is a state-sponsored, tax-advantaged investment account designed specifically for qualified education expenses. Investments grow 100% tax-free at both federal and state levels, and withdrawals for tuition, housing, and books are completely exempt from income tax. Many states also offer state income tax deductions or credits for contributions.",
    },
    {
      question: "3. What is the historical inflation rate for higher education costs?",
      answer:
        "Higher education inflation has historically outpaced general consumer price inflation (CPI), compounding at an average annual rate of 4.5% to 6.0% over the last three decades, meaning college costs double approximately every 12 to 16 years.",
    },
    {
      question: "4. What is the 1/3 Rule of thumb for funding college education?",
      answer:
        "The 1/3 Rule is a widely recommended financial planning guideline suggesting parents cover 1/3 of total college expenses from past savings (e.g. 529 plans), 1/3 from current income and cash flow during the college years, and 1/3 from future student loans and scholarships.",
    },
    {
      question: "5. What is the difference between Direct Subsidized and Unsubsidized Federal Student Loans?",
      answer:
        "Direct Subsidized Loans are need-based loans for undergraduate students where the federal government pays accrued interest while the student is in school at least half-time. Direct Unsubsidized Loans are available to all students regardless of financial need, but interest begins accruing immediately upon disbursement.",
    },
    {
      question: "6. What is the FAFSA and the Student Aid Index (SAI)?",
      answer:
        "The Free Application for Federal Student Aid (FAFSA) is the official federal form used to determine eligibility for federal grants (Pell Grants), work-study, and loans. It calculates your Student Aid Index (SAI, formerly Expected Family Contribution), which colleges use to build your financial aid package.",
    },
    {
      question: "7. What happens to unused funds in a 529 plan if my child doesn't attend college?",
      answer:
        "Under the SECURE 2.0 Act, beneficiaries can roll over up to $35,000 of unused 529 funds lifetime into a tax-free Roth IRA (subject to account age and annual contribution limits). Alternatively, you can change the account beneficiary to another qualifying family member without penalty.",
    },
    {
      question: "8. How much student loan debt is considered safe to borrow for undergraduate degrees?",
      answer:
        "Financial planners strongly advise that a student's total cumulative undergraduate student loan debt should not exceed their expected starting salary for their chosen field of study in their first year post-graduation.",
    },
    {
      question: "9. Can 529 plan funds be used for off-campus housing and food?",
      answer:
        "Yes. 529 withdrawals can pay for off-campus apartment rent and food up to the official 'Cost of Attendance' room-and-board allowance determined and published by the university's financial aid office for that academic year.",
    },
    {
      question: "10. What is an Income-Share Agreement (ISA)?",
      answer:
        "An Income-Share Agreement is an alternative financing contract where a school or funder covers tuition upfront in exchange for a fixed percentage of the graduate's future earned income (e.g. 5% to 15%) for a set number of years (typically 3 to 10 years).",
    },
    {
      question: "11. How do 529 plan assets impact federal financial aid eligibility on the FAFSA?",
      answer:
        "Parent-owned 529 accounts are assessed favorably as parental assets on the FAFSA at a maximum rate of 5.64% of asset value, compared to student-owned assets (like custodial UGMA/UTMA accounts) which are assessed at 20%.",
    },
    {
      question: "12. What college majors deliver the highest lifetime Return on Investment (ROI)?",
      answer:
        "Engineering, computer science, quantitative finance, nursing, and applied mathematics majors consistently rank highest in starting salary and 20-to-30-year net economic returns, frequently exceeding $1.0M+ in lifetime net wage premiums over a high school diploma.",
    },
  ];

  return (
    <div className="space-y-10 text-black dark:text-slate-100 font-medium leading-relaxed">
      {/* 1. PRINCIPLES OF COLLEGE PLANNING */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          1. Understanding Higher Education Cost Projections
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          Projecting the full cost of a 4-year undergraduate degree requires compounding current annual tuition, mandatory institutional fees, on-campus room and board, course textbooks, and living expenses against higher-education inflation rates (historically 4.5%–6.0% annually).
        </p>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          Starting early allows families to leverage compound investment returns inside tax-advantaged 529 college savings accounts, significantly reducing reliance on high-interest student debt.
        </p>
      </section>

      {/* 2. THE THREE COST TIERS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          2. Published Cost Tiers (In-State vs. Out-of-State vs. Private)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              1. In-State Public Universities
            </h3>
            <p className="text-black dark:text-slate-100">
              Average published cost of ~$28,000–$30,000/year. Heavily subsidized by state tax revenues, providing the most cost-effective path to a 4-year degree.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              2. Out-of-State Public
            </h3>
            <p className="text-black dark:text-slate-100">
              Average cost of ~$44,000–$48,000/year. Non-resident tuition surcharges increase overall 4-year outlays by $60,000 to $80,000+.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              3. Private Non-Profit Universities
            </h3>
            <p className="text-black dark:text-slate-100">
              Average cost of ~$58,000–$62,000+/year. While sticker prices are high, private colleges often provide substantial institutional merit and need-based grant discounts.
            </p>
          </div>
        </div>
      </section>

      {/* 3. 529 TAX BENEFITS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          3. How 529 Plans Maximize Savings Efficiency
        </h2>
        <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-3 text-xs font-medium">
          <p className="text-black dark:text-slate-100">
            A 529 Plan delivers three distinct mathematical advantages over standard taxable brokerage accounts:
          </p>
          <ul className="list-disc list-inside space-y-1 text-black dark:text-slate-100">
            <li><strong>Tax-Free Growth:</strong> 100% of dividends and capital gains compound without annual tax drag.</li>
            <li><strong>Tax-Free Withdrawals:</strong> Qualified distributions for tuition and housing are exempt from income taxes.</li>
            <li><strong>FAFSA Protection:</strong> Parent-owned 529 accounts are assessed at a low 5.64% rate for financial aid eligibility.</li>
          </ul>
        </div>
      </section>

      {/* 4. 12 FAQS */}
      <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          Frequently Asked Questions (FAQ)
        </h2>
        <div className="space-y-3 text-xs leading-relaxed text-black dark:text-slate-100">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5"
            >
              <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
                {faq.question}
              </h3>
              <p className="text-black dark:text-slate-100 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

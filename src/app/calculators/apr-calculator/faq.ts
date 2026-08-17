export interface APRFAQItem {
  question: string;
  answer: string;
}

export const apr_calculatorFaqs: APRFAQItem[] = [
  {
    question: "What is the difference between APR and interest rate?",
    answer:
      "The interest rate is the percentage cost of borrowing the principal loan balance. The Annual Percentage Rate (APR) includes both the interest rate AND all mandatory upfront financing fees (such as origination fees, closing costs, and points). APR provides a standardized baseline for comparing the true cost of different loan offers.",
  },
  {
    question: "What is the difference between APR and APY?",
    answer:
      "APR (Annual Percentage Rate) reflects the annualized cost of borrowing debt without compounding interest within the year. APY (Annual Percentage Yield) reflects the total compounding interest earned or paid over a full year. Because APY accounts for compounding frequency (e.g. monthly or daily), APY is always slightly higher than APR for the same rate.",
  },
  {
    question: "What fees are included in mortgage APR calculations under TILA?",
    answer:
      "Under the federal Truth in Lending Act (TILA), mortgage APR includes origination fees, discount points, processing fees, underwriting fees, escrow fees, and private mortgage insurance (PMI). Optional fees—such as appraisal fees, title search, home inspections, and attorney fees—are typically excluded.",
  },
  {
    question: "Why does APR increase when the loan term is shortened?",
    answer:
      "Upfront financing fees (such as $3,000 in closing costs) are amortized over the life of the loan. When spread over a 15-year loan term instead of a 30-year term, the annual fee allocation is doubled, causing a wider spread between the nominal interest rate and the calculated APR.",
  },
  {
    question: "Can an APR be lower than the interest rate?",
    answer:
      "Yes. If a lender offers negative points (lender credits) that offset your closing costs or lower your principal, the effective amount financed can exceed the loan amount, resulting in an APR lower than the nominal interest rate.",
  },
  {
    question: "How does paying off a loan early impact the actual realized APR?",
    answer:
      "If you pay off a loan early (e.g. refinancing a 30-year mortgage after 5 years), the upfront fees are condensed over a much shorter period. This significantly increases your effective realized APR compared to holding the loan for the full 30 years.",
  },
  {
    question: "What is a good APR for an auto loan vs. credit card?",
    answer:
      "Auto loan APRs for prime borrowers (740+ credit score) typically range between 4.5% and 7.5%. Credit card APRs are significantly higher, averaging between 18.99% and 24.99% for variable revolving lines of credit.",
  },
  {
    question: "How do discount points lower my APR on a mortgage?",
    answer:
      "One mortgage point equals 1% of your loan amount paid upfront to buy down your interest rate (e.g. lowering your rate by 0.25%). Buying points increases upfront fees but reduces monthly interest payments. If you hold the mortgage long enough to break even, points lower your overall APR.",
  },
  {
    question: "How does credit card APR calculation differ from installment loan APR?",
    answer:
      "Installment loans (mortgages, auto loans) calculate APR based on fixed equal monthly payments amortizing principal and interest over a fixed term. Credit cards use daily periodic rates applied to average daily balances, with fluctuating minimum payments and variable rates tied to the Prime Rate.",
  },
  {
    question: "What steps can I take to negotiate a lower APR with lenders?",
    answer:
      "To lower your APR: 1) Boost your credit score above 740 before applying, 2) Shop and compare loan estimates from at least 3 to 5 lenders, 3) Ask lenders to match lower competitor origination fees, 4) Consider buying discount points if you plan to stay in the home long-term, and 5) Increase your down payment to eliminate private mortgage insurance (PMI).",
  },
];

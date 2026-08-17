export interface DTIFAQItem {
  question: string;
  answer: string;
}

export const dti_calculatorFaqs: DTIFAQItem[] = [
  {
    question: "What is a good debt-to-income (DTI) ratio to buy a house?",
    answer:
      "A Debt-to-Income (DTI) ratio of 35% or lower is considered ideal by mortgage underwriters. Ratios between 36% and 43% are manageable and qualify for most Conventional, FHA, and VA home loans. Underwriters may approve ratios up to 45%–50% if you have compensating factors such as a high credit score, cash reserves, or a substantial down payment.",
  },
  {
    question: "How is DTI calculated if I have student loans on an Income-Driven Repayment (IDR) plan?",
    answer:
      "For Conventional Fannie Mae loans, underwriters accept your documented $0 or reduced IDR monthly payment. For FHA loans, underwriters accept the documented IDR payment if greater than $0; if the payment is $0, FHA requires underwriters to calculate 0.5% of the total outstanding loan balance as the monthly debt obligation.",
  },
  {
    question: "What is the maximum DTI ratio allowed for an FHA loan?",
    answer:
      "The standard benchmark DTI ratio for FHA loans is 31% Front-End (housing) and 43% Back-End (total debt). However, through automated underwriting systems (TOTAL Scorecard), FHA guidelines allow Back-End DTI ratios up to 46.9% Front-End and 56.9% Back-End for applicants with strong credit scores and cash reserves.",
  },
  {
    question: "Does my credit score affect the maximum DTI ratio lenders will accept?",
    answer:
      "Yes. Automated Underwriting Systems (AUS) evaluate DTI in tandem with your credit score and liquid assets. Higher credit scores (740+) trigger higher DTI approval ceilings (up to 50% on Conventional loans), whereas lower credit scores (620–660) restrict approval to strict baseline DTI caps (36% to 43%).",
  },
  {
    question: "Why do mortgage lenders use gross income instead of net take-home pay?",
    answer:
      "Lenders evaluate Gross Income (pre-tax) because it provides a standardized, objective baseline uninfluenced by individual tax withholding preferences, voluntary 401(k) contributions, or health insurance deductions. Underwriting benchmarks (such as the 28/36 rule) were specifically engineered based on gross income statistics.",
  },
  {
    question: "How do co-signed loans affect my debt-to-income ratio?",
    answer:
      "If you co-signed a car loan, student loan, or mortgage for someone else, the full monthly payment is included in your DTI calculation unless you can provide 12 consecutive months of canceled checks or bank statements proving the primary borrower paid the obligation in full without your assistance.",
  },
  {
    question: "Do utility bills, groceries, or car insurance count toward my DTI?",
    answer:
      "No. Non-debt monthly living costs—such as electric, gas, water, internet, groceries, health insurance, and auto insurance premiums—are excluded from DTI calculations. Underwriters only include legally binding credit obligations (housing costs, loans, credit card minimums, and court-ordered child support/alimony).",
  },
  {
    question: "What are compensating factors and how can they help approve a high DTI?",
    answer:
      "Compensating factors are positive financial attributes that offset a high DTI ratio (above 43%). Key compensating factors include significant post-closing cash reserves (3 to 6 months of housing payments), a high credit score (740+), low loan-to-value (LTV) ratio with a large down payment, or minimal increase in monthly housing expense compared to current rent.",
  },
  {
    question: "How quickly can I lower my DTI ratio before applying for a mortgage?",
    answer:
      "You can lower your DTI instantly by paying off small installment balances or credit cards with high minimum monthly payments. For example, paying off a car loan with 4 remaining payments of $350/mo immediately reduces your monthly debt by $350, boosting your borrowing capacity by up to $50,000.",
  },
  {
    question: "What is the difference between front-end DTI and back-end DTI?",
    answer:
      "Front-End DTI (Housing Ratio) measures housing costs alone (Principal, Interest, Property Taxes, Hazard Insurance, PMI, HOA) divided by gross monthly income. Back-End DTI (Total Debt Ratio) measures housing costs PLUS all recurring monthly debt payments divided by gross monthly income. Back-End DTI is the primary metric used for loan approval.",
  },
];

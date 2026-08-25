export interface HomeEquityFAQItem {
  question: string;
  answer: string;
}

export const home_equityFaqs: HomeEquityFAQItem[] = [
  {
    question: "What is a home equity loan and how does it work?",
    answer:
      "A home equity loan is a fixed second mortgage that allows a homeowner to borrow against available equity and repay the balance through scheduled installments. The calculator models the loan amount, rate, term, CLTV and closing-cost assumptions.",
  },
  {
    question: "How much can I borrow with a home equity loan?",
    answer:
      "The calculator estimates maximum borrowing capacity by multiplying home value by the selected CLTV limit and subtracting the existing first-mortgage balance. Actual lender limits vary.",
  },
  {
    question: "What is CLTV and how is it calculated?",
    answer:
      "CLTV is the combined loan-to-value ratio. It is calculated as the first-mortgage balance plus the second-mortgage balance, divided by the home's value, multiplied by 100.",
  },
  {
    question: "How is a home equity loan monthly payment calculated?",
    answer:
      "The calculator uses the standard fixed-rate amortization formula using the loan amount, monthly interest rate and number of payments. Closing costs can affect APR and, when financed, can also affect the payment.",
  },
  {
    question: "What credit score is needed for a home equity loan?",
    answer:
      "The calculator's educational material uses credit-score ranges such as 620-680 and 740+ as lender-dependent benchmarks. Actual minimum scores and CLTV limits vary by lender and product.",
  },
  {
    question: "How does a home equity loan compare with a HELOC?",
    answer:
      "A home equity loan is generally a fixed lump-sum installment loan, while a HELOC is a revolving credit line that may have a variable rate and separate draw and repayment phases.",
  },
  {
    question: "How does a home equity loan compare with a cash-out refinance?",
    answer:
      "A home equity loan adds a second lien while leaving the existing first mortgage in place. A cash-out refinance replaces the first mortgage with a new, larger mortgage. The better result depends on rates, balances, fees and the homeowner's goals.",
  },
  {
    question: "Are home equity loan interest payments tax-deductible?",
    answer:
      "The calculator's tax estimator models potentially deductible interest when its qualifying-use state indicates that proceeds are used to buy, build or substantially improve the securing residence. Actual tax treatment depends on applicable law and individual circumstances.",
  },
  {
    question: "Can I pay off a home equity loan early?",
    answer:
      "Many home equity loan products may permit early payoff, but prepayment terms are loan-specific. The actual contract should be checked for penalties or restrictions.",
  },
  {
    question: "What are typical closing costs for a second mortgage?",
    answer:
      "The reference uses a 2%-5% educational range for illustrative second-mortgage closing costs. Actual costs depend on lender, property, state, loan amount and transaction structure.",
  },
  {
    question: "What happens if home values fall and I owe more than the property is worth?",
    answer:
      "You may have negative or underwater equity. That can make selling or refinancing more difficult because the property's value may not fully cover the secured debt.",
  },
  {
    question: "How long does it usually take to get a home equity loan approved and funded?",
    answer:
      "The reference uses an illustrative 2-6 week range, but actual processing depends on appraisal, title, documentation, underwriting and lender workload.",
  },
];

export interface APRFAQItem {
  question: string;
  answer: string;
}

export const apr_calculatorFaqs: APRFAQItem[] = [
  {
    question: "What is APR and how is it different from an interest rate?",
    answer:
      "The nominal interest rate measures the periodic interest charged on the loan balance. APR is a broader annualized borrowing-cost metric that incorporates the interest rate and qualifying finance charges under the calculator's modeled methodology.",
  },
  {
    question: "How does an APR calculator calculate real APR?",
    answer:
      "The calculator determines the amount financed after modeled upfront fees and then solves a present-value equation for the periodic rate that makes the discounted future payments equal that amount. The engine uses Newton-Raphson numerical solving.",
  },
  {
    question: "What fees are included in APR?",
    answer:
      "The calculator's educational model includes specified financing charges such as modeled origination/processing fees and discount points. Actual disclosure treatment depends on the applicable rules and transaction details.",
  },
  {
    question: "Why can APR be higher than the nominal interest rate?",
    answer:
      "When upfront financing fees reduce the net amount received while the contractual payments remain unchanged, the annualized borrowing cost becomes higher than the nominal rate.",
  },
  {
    question: "Can APR be lower than the interest rate?",
    answer:
      "Under some financing structures, lender credits or negative points can reduce the modeled amount of finance charges enough for an effective APR to be lower than the nominal rate. The actual outcome depends on the exact cash flows and fee treatment.",
  },
  {
    question: "How do mortgage points affect APR?",
    answer:
      "Points are upfront charges based on the loan amount. Increasing points increases the modeled financing fees and can therefore increase APR unless the associated reduction in nominal interest is also modeled.",
  },
  {
    question: "How does loan term affect APR?",
    answer:
      "With the same upfront fee, a shorter term can produce a higher APR because the fee is spread across fewer payment periods. APR comparisons across different terms should therefore be interpreted carefully.",
  },
  {
    question: "What happens to APR if I pay off or refinance a loan early?",
    answer:
      "Early payoff can materially change the realized borrowing cost because upfront fees are effectively spread over fewer months. The calculator's prepayment simulator models this through a realized APR calculation.",
  },
  {
    question: "How is credit card APR different from installment-loan APR?",
    answer:
      "Credit cards are revolving accounts with changing balances and minimum-payment rules, while installment loans normally use fixed scheduled payments over a defined term. The cash-flow models are therefore different.",
  },
  {
    question: "How can I compare APRs across different loan offers?",
    answer:
      "Use the APR calculator to compare modeled APR, fees, monthly payment and total cost under identical assumptions. APR is especially useful when nominal rates differ because of upfront fees, but expected holding period also matters.",
  },
  {
    question: "What is the difference between APR and APY?",
    answer:
      "APR is an annualized borrowing-cost measure used for debt, while APY generally measures annualized yield on savings or investments and incorporates compounding.",
  },
  {
    question: "Is calculator APR the same as the APR disclosed by a lender?",
    answer:
      "No. The calculator produces a mathematical estimate under selected assumptions. An official lender APR disclosure depends on the lender's actual fees, transaction details and applicable regulatory disclosure methodology.",
  },
];

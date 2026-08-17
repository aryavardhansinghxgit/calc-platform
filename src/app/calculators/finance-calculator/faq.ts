export interface FinanceFAQItem {
  question: string;
  answer: string;
}

export const financeFaqs: FinanceFAQItem[] = [
  {
    question: "What is the Time Value of Money (TVM)?",
    answer:
      "The Time Value of Money (TVM) is a core financial principle stating that a dollar received today is worth more than a dollar received in the future due to its potential earning capacity (compound interest) and purchasing power loss (inflation).",
  },
  {
    question: "What is the difference between APR and APY?",
    answer:
      "APR (Annual Percentage Rate) is the simple annual interest rate charged or earned without accounting for compounding within the year. APY (Annual Percentage Yield) factors in intra-year compounding, reflecting the true effective annual return.",
  },
  {
    question: "What is the difference between Ordinary Annuity and Annuity Due?",
    answer:
      "An Ordinary Annuity assumes payments or contributions are made at the END of each period (e.g. standard loan payments or month-end savings). An Annuity Due assumes payments occur at the BEGINNING of each period (e.g. rent payments or immediate investment deposits), earning one extra period of interest.",
  },
  {
    question: "How does compounding frequency impact investment growth?",
    answer:
      "More frequent compounding (e.g. monthly vs annually) generates interest on previously earned interest sooner, accelerating wealth accumulation. For instance, $10,000 at 8% compounded monthly yields more than 8% compounded annually.",
  },
  {
    question: "How do I calculate the time required to double my money?",
    answer:
      "You can use the Rule of 72 formula: divide 72 by the annual interest rate. For example, at an 8% annual return, your money will double in approximately 72 / 8 = 9 years.",
  },
  {
    question: "What is the difference between Nominal Return and Real Return?",
    answer:
      "Nominal return is the raw percentage gain on an investment before accounting for inflation. Real return subtracts inflation to reveal the true growth in actual purchasing power.",
  },
  {
    question: "How does tax drag affect long-term compound growth?",
    answer:
      "Taxes paid annually on capital gains, dividends, or interest reduce the compounding base for subsequent years. High tax drag significantly lowers the final net wealth accumulated over 20-30 years.",
  },
  {
    question: "Can I solve for any variable in the TVM equation?",
    answer:
      "Yes! The TVM equation links 5 variables: Present Value (PV), Future Value (FV), Periodic Payment (PMT), Interest Rate (I/Y), and Number of Periods (N). Knowing any 4 variables allows you to solve for the missing 5th variable.",
  },
  {
    question: "Why are some values entered as negative numbers in standard financial calculators?",
    answer:
      "Standard financial calculators (like the BA II Plus or HP 12C) follow cash flow direction conventions: cash outflows (deposits made or loans paid out) are entered as negative numbers, while cash inflows (withdrawals or loan proceeds received) are positive.",
  },
  {
    question: "How does continuous compounding work?",
    answer:
      "Continuous compounding represents the mathematical upper limit of compounding frequency, where interest compounds infinitely many times per second using the exponential constant e (FV = PV * e^(r*t)).",
  },
];

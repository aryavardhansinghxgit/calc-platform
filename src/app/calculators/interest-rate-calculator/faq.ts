import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const interestRateFaqs: CalculatorFAQ[] = [
  {
    question: "How do you calculate the interest rate on a loan when you only know the monthly payment?",
    answer:
      "The calculator solves the amortized loan present-value equation numerically for the periodic rate that makes the scheduled payments equal the loan principal under the selected term and any modeled balloon or fee assumptions.",
  },
  {
    question: "What is the difference between APR and APY?",
    answer:
      "Loan APR is an annualized borrowing-cost measure that may include certain modeled fees, while APY/EAR reflects the effective annual yield resulting from intra-year compounding on a rate.",
  },
  {
    question: "Why does interest compound faster with daily compounding compared to monthly?",
    answer:
      "Daily compounding applies interest more frequently, allowing earned interest to be added to the balance sooner. Under the same nominal rate, that generally produces a higher effective annual yield.",
  },
  {
    question: "What is continuous compounding and how is it calculated using e?",
    answer:
      "Continuous compounding models interest as being applied continuously. The standard equation is A = Pe^(rt), and solving for the rate gives r = ln(A/P)/t.",
  },
  {
    question: "How does inflation affect my real return on interest-bearing investments?",
    answer:
      "Inflation reduces purchasing power. The calculator first applies the selected tax assumption and then uses the Fisher relationship to estimate the remaining real return after inflation.",
  },
  {
    question: "How do upfront fees and points impact the true APR of a mortgage or loan?",
    answer:
      "Upfront fees reduce the net amount financed while scheduled payments remain based on the loan contract. This generally makes the modeled true APR higher than the nominal rate.",
  },
  {
    question: "What is the Rule of 72 and how does it estimate doubling time?",
    answer:
      "The Rule of 72 estimates doubling time by dividing 72 by the annual rate. It is a useful mental-math approximation rather than an exact financial calculation.",
  },
  {
    question: "Why can't the interest rate formula for an amortized loan be solved with basic algebra?",
    answer:
      "The unknown rate appears inside an exponential term and a denominator within the amortization equation, producing a nonlinear problem. Numerical methods such as Newton-Raphson are therefore used to solve it.",
  },
  {
    question: "Are interest earnings from high-yield savings accounts subject to taxes?",
    answer:
      "Interest income from taxable accounts can be subject to tax depending on jurisdiction, account type and individual circumstances. The calculator's tax input is a modeling assumption, not a personal tax determination.",
  },
  {
    question: "How do central bank rate hikes influence consumer credit card and auto loan rates?",
    answer:
      "Policy-rate changes can influence benchmark rates and broader market pricing, but consumer rates do not necessarily move one-for-one. Product structure, lender pricing, credit risk and market conditions also matter.",
  },
  {
    question: "What is the difference between simple and compound interest?",
    answer:
      "Simple interest is based on the original principal, while compound interest periodically adds accrued interest to the balance so future interest can be calculated on the larger amount.",
  },
  {
    question: "How do I calculate the annual return from a lump-sum investment?",
    answer:
      "Given the starting value, ending value, time period and compounding frequency, the calculator solves the annual growth rate using the discrete or continuous compound-growth equation selected by the model.",
  },
];

export default interestRateFaqs;

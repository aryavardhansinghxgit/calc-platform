import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const interestRateFaqs: CalculatorFAQ[] = [
  {
    question: "How do you calculate the interest rate on a loan when you only know the monthly payment?",
    answer:
      "Calculating an amortized loan's interest rate from a known monthly payment requires numerical root-finding algorithms (such as the Newton-Raphson or Bisection method). Because the monthly payment formula M = P * [r(1+r)^n / ((1+r)^n - 1)] cannot be solved for r using simple algebraic isolation, our calculator uses iterative numerical convergence to determine the exact interest rate to 4 decimal places within milliseconds.",
  },
  {
    question: "What is the difference between APR and APY?",
    answer:
      "APR (Annual Percentage Rate) expresses the simple annual cost of borrowing without accounting for intra-year compounding, though true APR incorporates upfront lender fees and points. APY (Annual Percentage Yield, also known as Effective Annual Rate or EAR) includes the compounding effect over a one-year period. Lenders quote APR on loans to show lower nominal numbers, while banks quote APY on savings accounts to display higher compounding returns.",
  },
  {
    question: "Why does interest compound faster with daily compounding compared to monthly?",
    answer:
      "Daily compounding calculates and adds interest to your principal balance 365 times a year instead of 12. Because each day's interest is added to the principal for the next day's calculation, the compounding snowball effect accelerates faster, producing a slightly higher Effective Annual Rate (APY) for the same nominal interest rate.",
  },
  {
    question: "What is continuous compounding and how is it calculated using e?",
    answer:
      "Continuous compounding represents the mathematical upper limit of compound interest, where interest is calculated and reinvested instantaneously at every infinitesimal fraction of a second. It uses Euler's constant e (approximately 2.71828) in the formula A = P * e^(r*t). Continuous compounding produces the maximum possible yield for any given nominal interest rate.",
  },
  {
    question: "How does inflation affect my real return on interest-bearing investments?",
    answer:
      "Inflation erodes the purchasing power of future dollars. The Fisher Equation defines your true purchasing power return as r_real = (1 + r_nominal) / (1 + inflation) - 1. If an investment yields 6% nominal interest while annual inflation is 4%, your real purchasing power growth is approximately 1.92%, not 2.00%.",
  },
  {
    question: "How do upfront fees and points impact the true APR of a mortgage or loan?",
    answer:
      "Upfront origination fees, closing costs, and discount points reduce the net cash principal you receive while leaving monthly payments unchanged. Because you borrow less net money for the same monthly payment, your True APR is higher than the lender's stated nominal interest rate.",
  },
  {
    question: "What is the Rule of 72 and how does it estimate doubling time?",
    answer:
      "The Rule of 72 is a mental math rule of thumb used to estimate how many years it takes for an investment to double at a fixed annual compound interest rate. Dividing 72 by the annual interest rate gives the approximate doubling period in years. For example, at an 8% interest rate, money doubles in approximately 72 / 8 = 9 years.",
  },
  {
    question: "Why can't the interest rate formula for an amortized loan be solved with basic algebra?",
    answer:
      "In amortized loans, the interest rate variable r appears both inside the compounding term (1+r)^n and in the denominator of the present value factor. This creates a high-degree polynomial or transcendental equation that lacks a closed-form algebraic solution, necessitating numerical approximation methods.",
  },
  {
    question: "Are interest earnings from high-yield savings accounts subject to taxes?",
    answer:
      "Yes. Interest earned in standard taxable accounts (such as high-yield savings accounts, CDs, or taxable brokerage accounts) is taxed as ordinary income at your marginal federal and state income tax rates. Tax drag reduces your net nominal yield, making tax-advantaged accounts (like Roth IRAs or 401ks) far more efficient for compound growth.",
  },
  {
    question: "How do central bank rate hikes influence consumer credit card and auto loan rates?",
    answer:
      "Central banks (like the Federal Reserve) adjust benchmark policy rates (such as the Federal Funds Rate), which directly alters the Prime Rate used by commercial banks. Variable-rate debt (like credit cards and HELOCs) adjusts upward automatically, while auto loans and mortgage rates shift based on Treasury bond yield benchmarks.",
  },
];

export default interestRateFaqs;

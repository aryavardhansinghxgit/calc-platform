import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const loan_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is an amortized loan?",
    answer:
      "An amortized loan is an installment debt structure where a borrower repays borrowed principal along with interest charges through regularly scheduled payments over a fixed duration. Each payment covers the interest accrued during the period, with the remainder reducing the outstanding principal balance until the debt is fully retired.",
  },
  {
    question: "How is a monthly loan payment calculated?",
    answer:
      "Monthly payments are calculated using the standard amortization formula: PMT = P × [r(1+r)^n] / [(1+r)^n - 1], where P is the principal loan amount, r is the monthly interest rate (annual rate / 12 / 100), and n is the total number of payment months (years × 12).",
  },
  {
    question: "What is the difference between nominal interest rate and APR?",
    answer:
      "The nominal interest rate is the base percentage charged on the outstanding loan balance. The Annual Percentage Rate (APR) is a standardized regulatory metric under U.S. Truth in Lending Act (TILA) Regulation Z that measures the total cost of credit, incorporating both the nominal rate and applicable prepaid finance charges (such as origination points and processing fees).",
  },
  {
    question: "What is the difference between Regular Biweekly and Accelerated Biweekly payments?",
    answer:
      "Under Regular Biweekly payments, the annual interest rate is divided across 26 equal periods, amortizing the debt over the full scheduled term. Under Accelerated Biweekly payments, the borrower pays exactly half of the standard monthly payment every two weeks, generating 26 half-payments (equal to 13 full monthly payments per year) to retire the loan years ahead of schedule.",
  },
  {
    question: "How do extra monthly payments reduce total loan interest?",
    answer:
      "Extra payments apply directly to the outstanding principal balance. By reducing principal ahead of schedule, less interest accrues in subsequent compounding cycles, shortening the required repayment term and saving thousands in cumulative finance charges.",
  },
  {
    question: "How does loan term length affect monthly payment and total interest?",
    answer:
      "Shorter loan terms require higher monthly payments but generate significantly lower total interest charges because principal is retired faster. Longer loan terms lower required monthly payments, enhancing short-term cash flow flexibility, but increase total interest paid over the life of the debt.",
  },
  {
    question: "Can I estimate how much loan principal I can afford?",
    answer:
      "The Affordability Solver reverse-calculates the estimated loan principal corresponding mathematically to a selected monthly budget, interest rate, and term length. However, this is a mathematical payment capacity model and does not evaluate debt-to-income (DTI) ratios or guarantee lender underwriting approval.",
  },
  {
    question: "What is a balloon payment in a loan structure?",
    answer:
      "A balloon loan features smaller regular installment payments throughout the loan term, followed by a large lump-sum payment (the balloon) due at maturity. This lowers intermediate monthly cash outflow but leaves a substantial principal obligation at the end of the term.",
  },
  {
    question: "What happens in a 0% interest rate loan?",
    answer:
      "In a true 0% interest loan, every dollar paid goes directly toward principal reduction, and the periodic payment is simply the loan amount divided by the number of payment periods (PMT = P / n).",
  },
  {
    question: "What is refinancing break-even?",
    answer:
      "The refinance break-even point is the number of months required for monthly payment savings to recoup the upfront closing costs and financing fees associated with the new loan (Break-Even Months = Upfront Closing Costs / Monthly Payment Savings).",
  },
  {
    question: "What is the difference between secured and unsecured loans?",
    answer:
      "A secured loan requires the borrower to pledge collateral (such as a home or vehicle) that the lender may claim if the debt defaults. An unsecured loan (such as a credit card or personal loan) is backed only by the borrower's creditworthiness and signature, typically carrying higher interest rates.",
  },
  {
    question: "Can I pay off a consumer loan early without prepayment penalties?",
    answer:
      "Whether a loan permits penalty-free early repayment depends on the loan agreement, lender terms, and applicable state or federal statutes. While federal regulations restrict prepayment penalties on most qualified residential mortgages, borrowers should always verify the prepayment clause in their promissory note.",
  },
];

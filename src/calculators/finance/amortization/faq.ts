import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const amortization_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is an amortization calculator?",
    answer:
      "An amortization calculator estimates how a loan balance is paid down over time. It typically shows the monthly payment, how much goes to principal and interest, the remaining balance after each payment, total interest, and the payoff date under the selected assumptions.",
  },
  {
    question: "How is an amortization payment calculated?",
    answer:
      "For a fixed-rate loan, the payment is calculated from the principal, monthly interest rate and total number of payments using the standard fixed-payment annuity formula. The calculator converts the annual rate and loan term into monthly values before generating the schedule.",
  },
  {
    question: "What is an amortization schedule?",
    answer:
      "An amortization schedule is a period-by-period table showing the payment, interest, principal, beginning balance and ending balance. It lets you see how the loan changes over time instead of only viewing one monthly payment.",
  },
  {
    question: "Why is more of my payment interest at the beginning?",
    answer:
      "Interest is calculated from the outstanding balance. Because the balance is largest at the beginning of a typical amortizing loan, the interest component is initially larger. As principal is repaid, the balance falls and the interest component generally falls as well.",
  },
  {
    question: "How much interest will I pay over the life of the loan?",
    answer:
      "Enter the loan amount, interest rate and term. The calculator sums the modeled interest for every payment period. For the validated $200,000, 6%, 15-year example, total modeled interest is $103,788.46.",
  },
  {
    question: "What happens if I pay an extra $100 each month?",
    answer:
      "The effect depends on the loan amount, rate, term and remaining balance. In the validated example, an additional $100 per month substantially reduces the payoff period and total interest. The calculator shows the exact scenario result rather than assuming a universal savings amount.",
  },
  {
    question: "Do extra mortgage payments reduce interest?",
    answer:
      "Extra principal payments can reduce future interest because subsequent interest is calculated from a smaller balance. The actual contractual effect depends on the loan and servicing rules. In this calculator's model, extra payments reduce remaining principal.",
  },
  {
    question: "What is the difference between an extra monthly payment and a lump sum?",
    answer:
      "An extra monthly payment creates a recurring additional principal reduction, while a lump sum makes one larger principal reduction at a specified point. Earlier principal reductions generally have more time to affect later interest calculations.",
  },
  {
    question: "Does a longer loan term lower the monthly payment?",
    answer:
      "Generally, yes, when principal and rate are held constant, because repayment is spread across more periods. The tradeoff is typically higher total interest over the life of the loan. The calculator lets you compare both the payment and lifetime interest.",
  },
  {
    question: "Does an amortization calculator include taxes and insurance?",
    answer:
      "The core amortization calculation focuses on principal and interest. A real mortgage payment may also include property taxes, homeowners insurance, mortgage insurance and other costs. Those items are not the same as the mathematical loan amortization unless a specific calculator models them.",
  },
  {
    question: "Can this calculator calculate an adjustable-rate mortgage?",
    answer:
      "No. This calculator models a standard fixed-rate amortization schedule using the rate you enter as the modeled rate for the schedule. Adjustable-rate loans require separate modeling of index, margin, adjustment periods, caps and contractual rate changes.",
  },
  {
    question: "Is the amortization calculator a guarantee of my actual payoff amount?",
    answer:
      "No. It is a mathematical estimate based on the assumptions entered. Actual payoff amounts and servicing behavior can differ because of payment timing, fees, escrow, contractual terms, prepayment rules and other loan-specific factors. Verify important decisions with your loan documents and servicer.",
  },
];

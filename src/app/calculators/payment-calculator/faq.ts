import { CalculatorFAQ } from "@/calculators/types";

export const paymentFaqs: CalculatorFAQ[] = [
  {
    question: "How is a monthly loan payment calculated?",
    answer:
      "A standard fixed-rate payment is calculated from the principal, periodic interest rate and number of payment periods using the fixed-rate amortization formula. For monthly payments, the annual nominal rate is converted to a monthly rate before the formula is applied.",
  },
  {
    question: "What is an amortized loan?",
    answer:
      "An amortized loan is repaid through scheduled payments that contain both interest and principal. Early payments generally contain a larger interest component because the outstanding balance is larger.",
  },
  {
    question: "What is the difference between an interest rate and APR?",
    answer:
      "The interest rate describes the rate charged to the outstanding balance. APR is a broader borrowing-cost measure that can incorporate certain finance charges under applicable disclosure rules. They can differ when fees are included.",
  },
  {
    question: "What is the difference between regular biweekly and accelerated biweekly payments?",
    answer:
      "Regular biweekly payments divide the payment schedule into 26 periods per year. Accelerated biweekly arrangements commonly use half of the monthly payment every two weeks, creating the equivalent of an additional full monthly payment over a year.",
  },
  {
    question: "How do extra monthly payments reduce total loan interest?",
    answer:
      "Extra principal reduces the outstanding balance faster. Future interest is then calculated on the smaller balance, so the borrower can shorten the payoff period and reduce cumulative interest under the selected model.",
  },
  {
    question: "How does loan term affect monthly payment and total interest?",
    answer:
      "A longer term generally lowers the periodic payment but increases the number of periods over which interest can accrue. A shorter term generally increases the periodic payment while reducing lifetime interest.",
  },
  {
    question: "Can I estimate how much loan principal I can afford?",
    answer:
      "Yes. A payment-based affordability calculation can solve for the principal associated with a target payment, rate and term. The result is a mathematical estimate, not a guarantee of lender approval.",
  },
  {
    question: "Does a high credit score guarantee a lower interest rate?",
    answer:
      "No. A credit score can be one factor in lending decisions, but actual pricing can also depend on loan type, lender, market conditions, collateral, income, debt profile and other underwriting factors.",
  },
  {
    question: "What happens if the payment is too small to cover interest?",
    answer:
      "If the periodic payment is no greater than the interest accruing under the model, the loan may not amortize normally. A correct duration solver should flag the condition rather than inventing a finite payoff term.",
  },
  {
    question: "Can I pay off a loan early without a penalty?",
    answer:
      "That depends on the loan contract and applicable rules. Some loans may allow early repayment without a penalty, while others may contain contractual restrictions or charges. Check the actual agreement.",
  },
  {
    question: "Why is more interest paid during the first years of an amortized loan?",
    answer:
      "Interest is calculated from the outstanding balance. Since the balance is largest near the beginning of the loan, the interest component of the scheduled payment is generally larger in the early periods.",
  },
  {
    question: "How can I lower my monthly loan payment if my budget changes?",
    answer:
      "Possible approaches include extending the term, refinancing, changing the amount borrowed, or negotiating different financing terms. Each option can affect total interest and fees, so the lower monthly payment should be evaluated alongside lifetime cost.",
  },
];

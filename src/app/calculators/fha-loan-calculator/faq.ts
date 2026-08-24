export interface FHAFAQItem {
  question: string;
  answer: string;
}

export const fha_loanFaqs: FHAFAQItem[] = [
  {
    question: "What is an FHA loan and how does it work?",
    answer:
      "An FHA loan is a mortgage insured through the FHA program and made by an approved lender. The calculator models the purchase price, down payment, mortgage payment, mortgage insurance, taxes, insurance, and other selected costs to estimate the monthly payment.",
  },
  {
    question: "What is the minimum down payment for an FHA loan?",
    answer:
      "The calculator's encoded reference scenario uses 3.5% down for the 580+ credit-score band and 10% for the 500-579 band. These are program-reference assumptions in the model, not a guarantee that every lender will approve every borrower on those terms.",
  },
  {
    question: "What credit score is needed for an FHA loan?",
    answer:
      "The calculator distinguishes a 580+ scenario from a 500-579 scenario. Actual underwriting can include lender overlays, documentation requirements and other factors, so the calculator should be treated as an educational planning model.",
  },
  {
    question: "What is FHA Upfront Mortgage Insurance Premium (UFMIP)?",
    answer:
      "The calculator models UFMIP as 1.75% of the base loan under its encoded assumptions. It can be modeled as cash paid at closing or financed into the mortgage.",
  },
  {
    question: "How is the FHA monthly MIP calculated?",
    answer:
      "The calculator uses the base loan amount, multiplies it by the selected annual MIP rate, and divides by 12. The applicable rate depends on the term and down-payment scenario encoded in the model.",
  },
  {
    question: "How long does FHA mortgage insurance last?",
    answer:
      "The calculator's encoded schedule distinguishes life-of-loan and 11-year MIP scenarios based on loan term and down payment. These values are policy-sensitive and should be verified against current FHA requirements.",
  },
  {
    question: "How is the FHA monthly PITI payment calculated?",
    answer:
      "PITI is modeled as principal and interest plus monthly property taxes, insurance, monthly MIP and HOA. The exact result depends on the inputs you enter.",
  },
  {
    question: "Can FHA UFMIP be financed into the loan?",
    answer:
      "Yes, the calculator supports both cash and financed UFMIP scenarios. Financing UFMIP increases the loan balance and modeled P&I while reducing the cash required at closing.",
  },
  {
    question: "What are FHA loan limits and how are they checked?",
    answer:
      "The calculator includes a county-limit reference tool. The supplied reference uses 2024 HUD values, so those figures are time-sensitive and should be checked against current HUD/FHA county limits before relying on them.",
  },
  {
    question: "Can I use an FHA 203(k) loan for renovations?",
    answer:
      "The calculator's 203(k) module models a renovation budget, contingency reserve and resulting financed loan. Actual 203(k) eligibility, contractor requirements and project rules depend on the applicable FHA program requirements.",
  },
  {
    question: "How do extra mortgage payments affect FHA interest and MIP?",
    answer:
      "Additional payments can shorten the modeled payoff period and reduce future interest. They may also reduce modeled MIP if the extra payment changes the period over which MIP is charged. Savings depend on the specific loan and timing.",
  },
  {
    question: "How does an FHA loan compare with a Conventional loan?",
    answer:
      "The calculator provides a scenario comparison using its selected FHA and Conventional assumptions. The result should be interpreted as a model comparison, not a universal statement that FHA or Conventional is always cheaper or better.",
  },
];

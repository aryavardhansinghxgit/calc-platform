export interface FHAFAQItem {
  question: string;
  answer: string;
}

export const fha_loanFaqs: FHAFAQItem[] = [
  {
    question: "What is an FHA loan and how does it work?",
    answer:
      "An FHA loan is a government-backed mortgage insured by the Federal Housing Administration (HUD). Because the federal government guarantees a portion of the loan against borrower default, approved private lenders can offer low down payments (from 3.5%) and flexible credit score requirements (down to 500).",
  },
  {
    question: "How is the FHA monthly mortgage insurance premium (MIP) calculated?",
    answer:
      "FHA annual MIP is calculated as a percentage of the base loan amount and divided into 12 monthly payments. For standard 30-year mortgages with less than 10% down, the annual MIP rate is 0.55% (e.g. $1,925/yr or $160.42/mo on a $350,000 base loan). For down payments of 10% or more, the annual MIP rate drops to 0.50%.",
  },
  {
    question: "Can FHA mortgage insurance ever be removed?",
    answer:
      "If you put down 10% or more at closing, FHA annual MIP automatically drops off after 11 years. If you put down less than 10% (such as 3.5%), the annual MIP remains for the entire life of the loan unless you refinance into a Conventional mortgage once you reach 20% equity.",
  },
  {
    question: "What is the minimum credit score required for an FHA loan?",
    answer:
      "Borrowers with a credit score of 580 or higher qualify for the minimum 3.5% down payment. Borrowers with credit scores between 500 and 579 qualify for an FHA loan with a minimum 10% down payment.",
  },
  {
    question: "What is Upfront MIP (UFMIP) and should I finance it into the loan?",
    answer:
      "Upfront Mortgage Insurance Premium (UFMIP) is a one-time fee equal to 1.75% of your base loan amount charged by the FHA at closing. Over 95% of FHA borrowers choose to finance UFMIP directly into their total loan balance rather than paying it out-of-pocket in cash at closing.",
  },
  {
    question: "How much are FHA loan limits in my county?",
    answer:
      "FHA loan limits are updated annually by HUD based on local median home prices. For 2024, the national single-family low-cost floor is $498,257, while the high-cost ceiling (in areas like California or NYC) is $1,149,825.",
  },
  {
    question: "Can I buy a multi-unit property (duplex, triplex, fourplex) with an FHA loan?",
    answer:
      "Yes! You can purchase up to a 4-unit multi-family property with an FHA loan using only 3.5% down, provided you live in one of the units as your primary residence for at least 12 months. Rental income from the other units can be used to qualify for the loan.",
  },
  {
    question: "How much can a seller contribute toward closing costs on an FHA loan?",
    answer:
      "FHA guidelines permit sellers to contribute up to 6% of the home sale price toward buyer closing costs, prepaid items, and discount points, significantly lowering the out-of-pocket cash needed at closing.",
  },
  {
    question: "When should I choose a Conventional loan over an FHA loan?",
    answer:
      "Choose a Conventional loan if you have a credit score of 720+ and at least 3%–5% down payment. Conventional private mortgage insurance (PMI) is cheaper for high credit scores and automatically cancels once you reach 20% home equity, saving thousands compared to permanent FHA MIP.",
  },
  {
    question: "What is an FHA 203(k) renovation loan?",
    answer:
      "An FHA 203(k) loan allows home buyers to combine the purchase price of a fixer-upper home and its renovation costs into a single 30-year mortgage with just 3.5% down based on the After-Repair Value (ARV).",
  },
];

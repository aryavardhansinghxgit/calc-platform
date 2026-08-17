export interface RentVsBuyFAQItem {
  question: string;
  answer: string;
}

export const rentVsBuyFaqs: RentVsBuyFAQItem[] = [
  {
    question: "How many years do I need to stay in a home to make buying worth it?",
    answer:
      "For most housing markets, the breakeven point between renting and buying is typically 4 to 7 years. Over shorter stays (1 to 3 years), the massive upfront buying closing costs (2%-3%) and selling commission fees (6%-7%) outweigh home appreciation and principal payoff.",
  },
  {
    question: "What is the 5% rule when deciding whether to rent or buy?",
    answer:
      "Popularized by financial analyst Ben Felix, the 5% Rule estimates the annual unrecoverable cost of homeownership as 5% of the property value: 3% for mortgage interest/cost of capital, 1% for property taxes, and 1% for maintenance. If monthly rent for a comparable home is less than (Home Value × 5% / 12), renting is mathematically superior.",
  },
  {
    question: "How does the price-to-rent ratio help decide between renting and buying?",
    answer:
      "The Price-to-Rent Ratio is calculated as: Home Purchase Price ÷ Annual Rent. A ratio of 15 or less signals that buying is favored; 16 to 20 represents a neutral market; and 21 or higher indicates that renting and investing the surplus capital yields greater long-term wealth.",
  },
  {
    question: "Is buying always better than renting in the long run?",
    answer:
      "No. Renting can build equal or greater wealth if the renter strictly invests the initial down payment, closing costs, and monthly cash flow savings into low-cost index funds (e.g. S&P 500 averaging 8-10% CAGR) rather than spending it.",
  },
  {
    question: "How do closing costs and selling fees affect the breakeven point?",
    answer:
      "Transaction fees create a significant financial hurdle. Buying closing costs add 2%-4% upfront, while real estate agent commissions and transfer taxes consume 6%-8% upon sale. A homeowner must accumulate enough home appreciation to absorb these friction fees before breakeven occurs.",
  },
  {
    question: "How does the opportunity cost of a down payment affect the calculation?",
    answer:
      "When you use $100,000 as a home down payment, that capital is locked in home equity rather than earning compound interest in stock market index funds. Our calculator models this opportunity cost to provide a true net worth comparison.",
  },
  {
    question: "Can I deduct my mortgage interest and property taxes on my tax return?",
    answer:
      "Under current IRS rules (Tax Cuts and Jobs Act), mortgage interest and property taxes are deductible ONLY IF your itemized deductions exceed the standard deduction ($15,000 Single / $30,000 Married). Additionally, property tax write-offs are capped at $10,000 under the SALT limit.",
  },
  {
    question: "What percentage should I budget for home maintenance and repairs each year?",
    answer:
      "Financial planners recommend budgeting 1% to 1.5% of the home's total value annually for routine maintenance, repairs, and long-term capital expenditures (e.g., roof replacement, HVAC, plumbing).",
  },
  {
    question: "What happens to the rent vs. buy equation during periods of high inflation or interest rates?",
    answer:
      "High mortgage interest rates increase the unrecoverable cost of owning, pushing the breakeven horizon further out. However, high general inflation also drives up annual rent increases, which makes fixed-rate homeownership more protective over 10 to 30 years.",
  },
  {
    question: "Why is renting often considered 'buying flexibility' rather than 'throwing money away'?",
    answer:
      "Renting provides geographic mobility, zero responsibility for major emergency repairs, and liquid capital. In high-cost metro areas, renting allows individuals to live in desirable locations without taking on concentrated real estate leverage.",
  },
];

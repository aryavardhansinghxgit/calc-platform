export interface HomeEquityFAQItem {
  question: string;
  answer: string;
}

export const home_equityFaqs: HomeEquityFAQItem[] = [
  {
    question: "Are home equity loan interest payments tax deductible?",
    answer:
      "Under current IRS rules (Tax Cuts and Jobs Act), interest paid on a home equity loan is tax-deductible ONLY if the funds are used to buy, build, or substantially improve the home that secures the loan (e.g. major renovations, room additions, or roof replacement). Interest is NOT deductible if used for debt consolidation or personal expenses.",
  },
  {
    question: "What happens if home prices fall below the mortgage and equity loan balance?",
    answer:
      "If property values decline significantly, you may owe more in total mortgage debt than your home is worth (known as being 'underwater' or having negative equity). While your monthly payments remain unchanged, you will not be able to sell or refinance without bringing cash to closing to pay off the remaining balance.",
  },
  {
    question: "Can you pay off a home equity loan early without prepayment penalties?",
    answer:
      "Most modern home equity loans do not charge prepayment penalties, allowing you to make extra principal payments or pay off the entire loan balance early to save on interest.",
  },
  {
    question: "What are typical closing costs on a second mortgage?",
    answer:
      "Closing costs typically range from 2% to 5% of the loan amount ($1,500 to $4,000), covering appraisal fees, origination, title search, and credit reporting fees. You can pay these upfront in cash, deduct them from proceeds, or finance them into your loan balance.",
  },
  {
    question: "How much can I borrow with a home equity loan?",
    answer:
      "Most lenders allow you to borrow up to 80% to 85% of your home's appraised market value, minus your existing first mortgage balance. For example, on a $500,000 home with a $275,000 1st mortgage, an 80% CLTV cap allows up to $125,000 ($500,000 × 0.80 - $275,000).",
  },
  {
    question: "What is the difference between a home equity loan and a HELOC?",
    answer:
      "A home equity loan provides a fixed lump-sum payout with a fixed interest rate and fixed monthly payments over 5 to 30 years. A HELOC (Home Equity Line of Credit) functions like a revolving credit line with a variable interest rate during a 10-year draw period.",
  },
  {
    question: "What credit score is needed to qualify for a home equity loan?",
    answer:
      "Most lenders require a minimum credit score of 620 to 680. Borrowers with credit scores of 740 or higher qualify for the lowest interest rates and highest CLTV borrowing caps (up to 85% or 90%).",
  },
  {
    question: "What is Combined Loan-to-Value (CLTV) and how is it calculated?",
    answer:
      "CLTV is the ratio of all mortgage debts secured by your home divided by its current appraised value: CLTV = (1st Mortgage Balance + 2nd Mortgage Balance) / Home Appraised Value.",
  },
  {
    question: "How long does it take to get approved and funded for a home equity loan?",
    answer:
      "Processing typically takes 2 to 6 weeks from application to funding, as the lender must complete a title search, verify income and DTI ratios, and conduct an appraisal.",
  },
  {
    question: "Is it better to take out a home equity loan or do a cash-out refinance?",
    answer:
      "If your existing first mortgage has a very low interest rate (e.g. 3% to 4%), a Home Equity Loan is usually better because it preserves that low rate. A Cash-Out Refinance replaces your entire first mortgage, which may significantly increase your monthly payment if current rates are higher.",
  },
];

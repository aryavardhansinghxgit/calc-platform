export interface HELOCFAQItem {
  question: string;
  answer: string;
}

export const helocFaqs: HELOCFAQItem[] = [
  {
    question: "How does a HELOC work and what are the draw and repayment periods?",
    answer:
      "A Home Equity Line of Credit (HELOC) is a revolving credit line secured by your home's equity. During the initial Draw Period (typically 10 years), you can borrow funds up to your credit limit as needed and make interest-only minimum payments. When the Draw Period ends, the Repayment Period begins (typically 20 years), during which the draw window closes and you must make monthly principal and interest payments to fully amortize the balance.",
  },
  {
    question: "How is the minimum monthly payment calculated during the draw period?",
    answer:
      "During the draw period, most lenders require interest-only payments calculated as: Monthly Payment = Drawn Balance × (Annual Interest Rate / 12). For example, on a $50,000 balance at an 8.0% interest rate, the draw-period payment is $333.33/month ($50,000 × 0.08 / 12).",
  },
  {
    question: "What is HELOC payment shock and how can I prepare for it?",
    answer:
      "HELOC payment shock is the abrupt monthly payment increase that occurs when transitioning from the interest-only draw period to the amortizing repayment period. Because you begin paying back principal alongside interest over 20 years, your payment can jump significantly (often 25% to 50%+ higher). You can prepare by making voluntary principal payments during the draw period to reduce your balance.",
  },
  {
    question: "Is a HELOC interest rate fixed or variable?",
    answer:
      "Most HELOCs carry variable interest rates tied to a benchmark index (typically the Wall Street Journal Prime Rate) plus a fixed lender margin (e.g. WSJ Prime + 1.0%). As the Prime Rate fluctuates, your monthly interest rate and payment adjust accordingly.",
  },
  {
    question: "How much can I borrow on a HELOC based on my home equity?",
    answer:
      "Most lenders cap maximum combined borrowing at 80% to 85% Combined Loan-to-Value (CLTV). The formula is: Max HELOC Credit Line = (Home Value × Max CLTV %) - Outstanding 1st Mortgage Balance. For example, on a $500,000 home with an 80% cap ($400,000) and a $260,000 1st mortgage, your maximum HELOC line is $140,000.",
  },
  {
    question: "Is the interest on a HELOC tax-deductible?",
    answer:
      "Under current IRS tax rules (Tax Cuts and Jobs Act), interest paid on a HELOC is tax-deductible ONLY if the borrowed funds are used to buy, build, or substantially improve the home securing the loan. Interest is NOT deductible if used for debt consolidation, credit card payoff, or personal expenses.",
  },
  {
    question: "Can a lender freeze or reduce my HELOC credit limit?",
    answer:
      "Yes. Under federal regulations, a lender may temporarily freeze or reduce your HELOC credit line if the value of your home drops significantly below its appraised value at loan origination, or if your financial situation changes drastically affecting your ability to repay.",
  },
  {
    question: "What are the upfront and ongoing fees associated with a HELOC?",
    answer:
      "Upfront fees may include appraisal, title search, origination, and application fees ($500 to $2,000). Ongoing fees often include annual maintenance or inactivity fees ($50 to $100/year) if the credit line remains unused.",
  },
  {
    question: "What happens if I sell my home while having an active HELOC balance?",
    answer:
      "When you sell your property, the active HELOC balance—alongside your primary mortgage—must be paid off in full from the proceeds at closing before you receive any remaining net proceeds.",
  },
  {
    question: "Is it better to choose a HELOC or a fixed-rate home equity loan?",
    answer:
      "A HELOC is ideal if you need flexible, ongoing access to capital over multiple years (e.g. multi-stage home renovations or emergency funds) and prefer paying interest only on what you use. A fixed-rate home equity loan is better if you require a single lump-sum payout with fixed interest rate and payment predictability.",
  },
];

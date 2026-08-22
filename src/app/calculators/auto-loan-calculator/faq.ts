export interface FAQItem {
  question: string;
  answer: string;
}

export const AUTO_LOAN_FAQS: FAQItem[] = [
  {
    question: "How is an auto loan monthly payment calculated?",
    answer:
      "Monthly auto loan payments are calculated using standard fixed-payment amortization based on the net financed principal (vehicle purchase price minus down payment and net trade-in equity, plus any financed taxes and itemized dealer fees), the monthly periodic interest rate (APR divided by 12), and the total number of monthly payment periods.",
  },
  {
    question: "How does sales tax apply to auto loans?",
    answer:
      "State and local sales or vehicle excise taxes are calculated on the taxable purchase price of the vehicle. If you choose to finance sales tax rather than paying it upfront with cash, the tax amount is added directly to your loan principal, where it accrues interest over the duration of the loan term.",
  },
  {
    question: "Does trade-in value reduce sales tax on a vehicle purchase?",
    answer:
      "Trade-in tax treatment varies by state jurisdiction. Many states allow a trade-in tax credit where the agreed value of your trade-in is deducted from the new vehicle's sticker price before calculating sales tax, while other states tax the full vehicle purchase price regardless of trade-in allowance.",
  },
  {
    question: "What happens if I owe more on my trade-in than it is worth?",
    answer:
      "If your outstanding loan balance exceeds your trade-in allowance, you have negative equity (being 'underwater'). If the lender permits, this remaining deficit is added to your new auto loan balance as a negative equity rollover, increasing your financed principal, monthly payment, and total interest charges.",
  },
  {
    question: "What is a good down payment for a car loan?",
    answer:
      "Some buyers use 10%–20% down as an illustrative planning benchmark, but an appropriate down payment depends on the vehicle, loan terms, credit profile, cash reserves, and other financial considerations.",
  },
  {
    question: "How does loan term length affect monthly payment and total interest?",
    answer:
      "Extending your loan term (e.g., from 48 or 60 months to 72 or 84 months) spreads repayment over more months, lowering your required monthly payment. However, because principal amortizes more slowly, extended loan terms increase cumulative interest expense and lengthen the duration spent with negative vehicle equity.",
  },
  {
    question: "Should I finance taxes, registration, and dealer fees in the loan?",
    answer:
      "Paying government registration, documentation fees, and sales taxes upfront with cash prevents those non-asset charges from being added to your principal balance, avoiding interest accumulation on fees over your loan term.",
  },
  {
    question: "How much of my income should go toward a car payment?",
    answer:
      "The 20/4/10 budgeting heuristic suggests allocating no more than 10% of gross monthly income toward vehicle loan payments, accompanied by a 20% down payment and a maximum 4-year (48-month) financing term. This serves as an illustrative budgeting guideline rather than an official underwriting standard.",
  },
  {
    question: "What fees are typically charged when financing a vehicle?",
    answer:
      "Standard vehicle acquisition costs include state title, license, and registration fees, dealer documentation (doc) fees, destination charges, and optional vehicle protection products such as extended service contracts or GAP coverage.",
  },
  {
    question: "How do extra principal payments affect an auto loan?",
    answer:
      "Making additional principal payments reduces the outstanding loan balance faster than scheduled, shortening the remaining payoff timeline and reducing cumulative interest expense without changing the required minimum monthly installment amount.",
  },
  {
    question: "What factors determine auto loan interest rates (APR)?",
    answer:
      "Lenders determine auto loan interest rates based on borrower credit profiles, debt-to-income ratios, vehicle age (new vs. used), loan duration, loan-to-value (LTV) ratio, and broader macroeconomic benchmark interest rate environments.",
  },
  {
    question: "What are the requirements for 0% promotional financing?",
    answer:
      "Promotional 0% offers are generally limited to qualifying borrowers and specific vehicles, terms, and lender/manufacturer programs.",
  },
  {
    question: "Can I refinance an auto loan later?",
    answer:
      "Yes. Borrowers may apply to refinance an existing auto loan with a different lender to secure a lower interest rate, reduce monthly payments, or adjust the remaining repayment term if their credit profile has improved or market rates have declined.",
  },
  {
    question: "What is a Loan-to-Value (LTV) ratio on a car loan?",
    answer:
      "The Loan-to-Value (LTV) ratio compares the financed principal balance to the vehicle's retail or wholesale market value. An LTV over 100% indicates that the loan balance exceeds the vehicle's current market value, which is common when rolling over negative equity or financing substantial upfront fees.",
  },
  {
    question: "What is GAP insurance and when is it useful?",
    answer:
      "Guaranteed Asset Protection (GAP) insurance is designed to cover the financial difference between a vehicle's actual cash value paid out by auto collision insurance and the remaining balance on an auto loan if the vehicle is totaled or stolen.",
  },
  {
    question: "What is the difference between direct bank financing and dealer financing?",
    answer:
      "Borrowers may compare direct bank, credit union, and online lender pre-approvals with dealer-arranged financing across lender networks and captive automaker finance companies.",
  },
  {
    question: "How does vehicle price affect total borrowing cost?",
    answer:
      "A higher vehicle sticker price directly increases the financed loan principal, which compounds the dollar amount of interest accrued across every monthly payment period over the loan term.",
  },
  {
    question: "Are there prepayment penalties on standard auto loans?",
    answer:
      "Many consumer auto loans use simple-interest amortization, and prepayment terms vary by contract and jurisdiction. Review your retail installment contract for any applicable prepayment provisions.",
  },
  {
    question: "How does vehicle depreciation impact loan equity?",
    answer:
      "Vehicles can depreciate rapidly during early ownership, but actual depreciation varies by make, model, condition, mileage, and market. If depreciation outpaces amortization, the borrower temporarily carries negative equity.",
  },
  {
    question: "Should I pay off my car loan early or invest the money?",
    answer:
      "The decision involves evaluating the predictable interest savings achieved by extinguishing auto debt against the uncertain, after-tax expected rate of return from alternative investments, alongside individual risk tolerance and emergency liquidity needs.",
  },
];

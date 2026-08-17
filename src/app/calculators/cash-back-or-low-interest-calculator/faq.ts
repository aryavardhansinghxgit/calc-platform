export interface CashBackFAQItem {
  question: string;
  answer: string;
}

export const cashBackFaqs: CashBackFAQItem[] = [
  {
    question: "Is it better to take cash back or 0% APR on a new car?",
    answer:
      "It depends on the loan term, cash back amount, and interest rate. For longer loan terms (60-84 months), 0% APR usually saves more in interest than the rebate. For shorter loan terms (24-48 months) or large rebates ($3,000+), taking cash back and securing a low outside credit union rate is often better.",
  },
  {
    question: "How do I find my breakeven interest rate between a car rebate and low APR?",
    answer:
      "The breakeven rate is the exact outside loan APR where the total cost of taking the cash back rebate equals the total cost of the low APR offer. If you can get an outside credit union loan below this breakeven rate, choose the cash back.",
  },
  {
    question: "Do you have to pay sales tax on car manufacturer cash back rebates?",
    answer:
      "In most US states (e.g. California, Florida, New York), sales tax is calculated on the full vehicle price BEFORE deducting the rebate. However, in states like Texas and Missouri, sales tax is applied AFTER subtracting the rebate.",
  },
  {
    question: "Can I combine dealer cash back with outside financing from my credit union?",
    answer:
      "Yes! Taking the manufacturer cash rebate and financing through your local credit union or bank at a competitive market rate is one of the most effective strategies to lower your total car purchase cost.",
  },
  {
    question: "Why does a shorter loan term favor taking the cash rebate?",
    answer:
      "Because interest has less time to compound on shorter loan terms (24-36 months). The interest savings from 0% APR over 36 months are usually smaller than a $2,500-$3,500 upfront rebate.",
  },
  {
    question: "What happens to my financing advantage if I pay off the auto loan early?",
    answer:
      "If you plan to pay off the loan early (e.g. at month 24 or 36) or refinance, taking the cash back rebate is superior because you capture 100% of the discount upfront without paying remaining unaccrued interest.",
  },
  {
    question: "What credit score is required to qualify for 0% or low-APR dealer financing?",
    answer:
      "Auto lenders typically require a prime or super-prime credit score (720+ FICO) to qualify for promotional 0% or 0.9% APR dealer financing offers.",
  },
  {
    question: "How does my trade-in equity affect the cash back vs. low interest decision?",
    answer:
      "Trade-in equity reduces the overall loan principal required for both offers. Higher trade-in equity reduces the interest compounding impact, making cash back relatively more attractive.",
  },
  {
    question: "Can I take the cash back rebate and immediately refinance the loan at a lower rate?",
    answer:
      "Yes. Many car buyers take the cash rebate with standard dealer financing and immediately refinance with a credit union within 30-90 days to secure a lower APR while keeping the upfront rebate.",
  },
  {
    question: "Is 0% dealer financing truly free, or is the car price inflated to compensate?",
    answer:
      "0% financing is a legitimate manufacturer subsidy. However, choosing 0% financing requires forfeiting the cash rebate, making the effective cost of 0% financing equal to the lost rebate amount.",
  },
];

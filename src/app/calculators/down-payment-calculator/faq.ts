export interface DownPaymentFAQItem {
  question: string;
  answer: string;
}

export const downPaymentFaqs: DownPaymentFAQItem[] = [
  {
    question: "Can I buy a house with zero down payment?",
    answer:
      "Yes. Qualified military veterans and active-duty service members can purchase a home with 0% down using a VA loan. Buyers purchasing qualifying homes in designated rural areas can also secure 0% down financing through USDA Rural Development loans.",
  },
  {
    question: "Is 20% down payment mandatory for buying a home?",
    answer:
      "No. The 20% down payment requirement is a widespread myth. Conventional loans permit down payments as low as 3% (Conventional 97), FHA loans require 3.5%, and VA/USDA loans require 0%. Putting down 20% simply allows you to avoid paying Private Mortgage Insurance (PMI).",
  },
  {
    question: "How is Private Mortgage Insurance (PMI) calculated and when is it removed?",
    answer:
      "PMI typically costs 0.3% to 1.5% of your total loan balance per year, added to your monthly mortgage payment. Under the Homeowners Protection Act of 1998, you can request PMI cancellation once your loan balance reaches 80% of the original home purchase price (20% equity), and lenders MUST automatically terminate PMI when your loan balance reaches 78% LTV.",
  },
  {
    question: "Is it better to put down a larger down payment or invest the extra money?",
    answer:
      "It depends on your interest rate versus expected investment return. Putting extra cash into a 6.5% mortgage delivers a guaranteed 6.5% return via interest savings. However, investing that capital in an index fund (historical S&P 500 average ~8%–10%) may generate higher long-term wealth despite paying mortgage PMI.",
  },
  {
    question: "What other upfront costs must I prepare for besides the down payment?",
    answer:
      "In addition to the down payment, home buyers must pay upfront closing costs ranging from 2% to 5% of the purchase price. Closing costs include lender origination fees, home appraisals, title insurance, escrow reserves for property taxes and homeowners insurance, and municipal transfer fees.",
  },
  {
    question: "How does my down payment amount affect my mortgage interest rate?",
    answer:
      "Lenders assess risk using Loan-to-Value (LTV) ratios. Putting down a larger down payment (e.g. 20% or 25%) reduces lender risk, often unlocking lower interest rates and reduced origination fees compared to a 3% or 5% down payment.",
  },
  {
    question: "Can I use gift funds or 401(k) withdrawals for my down payment?",
    answer:
      "Yes. Most mortgage programs permit gift funds from immediate family members with an official gift letter. First-time buyers can also withdraw up to $10,000 penalty-free from an IRA or take a 401(k) loan (up to $50,000 or 50% of vested balance) toward a primary home down payment.",
  },
  {
    question: "What is the difference between FHA mortgage insurance and Conventional PMI?",
    answer:
      "Conventional PMI is issued by private insurers and can be cancelled once your equity reaches 20% (80% LTV). FHA mortgage insurance requires both an Upfront MIP (1.75% of loan) AND Annual MIP (0.55%), which remains active for the ENTIRE life of the loan if you put down less than 10%.",
  },
  {
    question: "What is Down Payment Assistance (DPA)?",
    answer:
      "Down Payment Assistance programs are state, county, or municipal grants, forgivable second mortgages, or zero-interest loans designed to assist first-time and low-to-moderate-income homebuyers with upfront down payment and closing cash requirements.",
  },
  {
    question: "How much cash do I need in reserve after paying the down payment?",
    answer:
      "Lenders typically recommend keeping 3 to 6 months of total monthly housing expenses (PITI + HOA) in liquid reserves after paying your down payment and closing costs to cover unexpected home maintenance and income disruptions.",
  },
];

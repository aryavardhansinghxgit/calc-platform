export interface RentFAQItem {
  question: string;
  answer: string;
}

export const rent_calculatorFaqs: RentFAQItem[] = [
  {
    question: "How much rent can I afford on my current salary?",
    answer:
      "A standard financial baseline is the 30% Gross Income Rule, which suggests spending no more than 30% of your pre-tax income on rent. For example, on a $72,000 annual salary ($6,000/month), your maximum target rent is $1,800/month. However, your ideal budget also depends on existing monthly debt payments (student loans, car loans, credit cards) and tax obligations.",
  },
  {
    question: "What is the 30% rule for rent and is it still realistic today?",
    answer:
      "The 30% rule originated from U.S. housing legislation guidelines establishing that households spending over 30% of gross income on housing are 'cost-burdened'. While highly useful in average cost-of-living areas, renters in high-demand metropolitan hubs (like NYC, San Francisco, or London) frequently allocate 35% to 40% of income to rent, compensating by reducing discretionary spending and vehicle ownership costs.",
  },
  {
    question: "What is the 40x rent rule used by landlords?",
    answer:
      "The 40x rule is a strict financial screening standard enforced by landlords and property management companies in high-demand rental markets. To qualify for a lease without a guarantor or co-signer, your annual gross income must equal at least 40 times the monthly rent. Mathematically, dividing your annual salary by 40 yields the exact same maximum rent limit as the 30% gross rule ($72,000 / 40 = $1,800/month).",
  },
  {
    question: "Should I base my rent budget on gross income or net take-home pay?",
    answer:
      "Landlords and property managers evaluate lease applications using pre-tax Gross Income (the 30% and 40x rules). However, for personal budgeting and financial security, you should evaluate your Net Take-Home Pay (after tax, health insurance, and 401k deductions). Under the 50/30/20 rule, your total 'Needs' (rent + utilities + groceries) should stay within 50% of your net income.",
  },
  {
    question: "What is considered a rent-burdened household?",
    answer:
      "According to the U.S. Department of Housing and Urban Development (HUD), households paying more than 30% of gross income on rent and utilities are classified as 'Rent-Burdened'. Households paying more than 50% are classified as 'Severely Rent-Burdened', which significantly limits their ability to build emergency savings, pay down debt, or fund essential healthcare.",
  },
  {
    question: "How much money do I need saved upfront before moving into an apartment?",
    answer:
      "Most landlords require first month's rent, last month's rent, and a security deposit equal to 1 to 2 months' rent. Additionally, you should account for application/screening fees ($30–$75 per applicant), moving truck or hiring professional movers ($300–$1,500), initial furniture/housewares, and utility setup deposits. Expect total upfront liquid cash needs to equal 3 to 4 times one month's base rent.",
  },
  {
    question: "How do debt payments (student loans, car loans) affect how much rent I can afford?",
    answer:
      "High recurring monthly debts reduce your Back-End Debt-to-Income (DTI) ratio limit. Lenders and prudent landlords recommend keeping total monthly housing costs plus recurring minimum debt payments below 43% of gross income. If you earn $6,000 gross monthly and pay $600 in student loans and car payments, your maximum safe rent drops from $1,800 (30% rule) to $1,980 (43% DTI max cap) or lower to maintain healthy savings.",
  },
  {
    question: "How do I calculate a fair rent split with roommates sharing different bedroom sizes?",
    answer:
      "A fair roommate rent split calculates individual shares based on bedroom square footage and premium amenity access (private vs. shared bathroom, balcony access, walk-in closets, assigned parking space). Typically, 50% of the total lease rent is split equally among roommates, while the remaining 50% is weighted by relative bedroom square footage and amenity point additions.",
  },
  {
    question: "What credit score do most landlords require to approve a rental application?",
    answer:
      "Most corporate property management firms look for a minimum credit score of 620 to 650 for unconditional lease approval. Applicants with scores between 580 and 620 may be required to pay an increased security deposit (or prepay extra months), while scores below 580 generally require a lease guarantor or co-signer who earns at least 80x the monthly rent.",
  },
  {
    question: "When does it make more financial sense to buy a house rather than rent?",
    answer:
      "Renting is typically more financial prudent if you plan to stay in an area for under 5 years, want fixed monthly housing costs without maintenance risks, or want to invest saved down-payment capital in index funds. Buying becomes advantageous when you plan to remain in a home for 5 to 10+ years, build long-term home equity, and lock in a fixed mortgage payment against rising rental inflation.",
  },
];

export interface VAFAQItem {
  question: string;
  answer: string;
}

export const va_mortgageFaqs: VAFAQItem[] = [
  {
    question: "What is a VA loan and who can use one?",
    answer:
      "A VA-backed mortgage is designed for eligible borrowers who meet applicable service, entitlement and other requirements. The calculator estimates payment scenarios but does not issue a Certificate of Eligibility or guarantee approval.",
  },
  {
    question: "How does a VA mortgage payment get calculated?",
    answer:
      "The calculator uses standard fixed-rate amortization for principal and interest, then adds property taxes, homeowners insurance and HOA. The funding fee can change the financed balance when it is financed.",
  },
  {
    question: "How much is the VA funding fee?",
    answer:
      "The calculator uses different rates based on down-payment tier and whether the borrower has used a VA loan before. Its current encoded model uses 2.15% and 3.30% for the under-5%-down first-use and subsequent-use scenarios, with lower rates at 5% and 10% down.",
  },
  {
    question: "Can the VA funding fee be financed into the loan?",
    answer:
      "Yes. When financing is selected, the fee is added to the base loan. Paying the fee in cash keeps the financed balance lower but increases upfront cash.",
  },
  {
    question: "Who may qualify for a VA funding-fee exemption?",
    answer:
      "The calculator includes an exemption state that sets the modeled fee to zero. Actual exemption eligibility depends on the applicable VA determination and documentation.",
  },
  {
    question: "Does a VA loan require monthly PMI?",
    answer:
      "The calculator's VA model uses $0 monthly PMI. VA financing uses a separate funding-fee structure rather than the monthly mortgage-insurance structure used by FHA and many conventional loans.",
  },
  {
    question: "How does first-time versus subsequent VA use affect the funding fee?",
    answer:
      "Under the current calculator assumptions, the under-5%-down rate is 2.15% for first use and 3.30% for subsequent use. That difference can change the financed loan and monthly payment.",
  },
  {
    question: "What is VA entitlement and how does remaining entitlement affect borrowing?",
    answer:
      "The calculator uses a simplified guaranty model based on the county-limit input and prior used entitlement. Actual entitlement should be verified through VA records and a Certificate of Eligibility.",
  },
  {
    question: "Can you have more than one VA loan at the same time?",
    answer:
      "The calculator's educational model discusses additional VA financing through remaining entitlement. Actual simultaneous VA loans depend on entitlement, occupancy, lender underwriting and applicable VA rules.",
  },
  {
    question: "What is a VA IRRRL refinance?",
    answer:
      "An IRRRL is a VA interest-rate reduction refinance scenario. The calculator estimates payment savings, funding fee, closing costs, break-even time and five-year net savings under selected assumptions.",
  },
  {
    question: "How does paying bi-weekly or extra payments affect a VA mortgage?",
    answer:
      "The calculator models 26 bi-weekly half-payments per year and can also test fixed extra monthly principal. Earlier principal reduction generally lowers modeled interest and shortens payoff.",
  },
  {
    question: "How does a VA loan compare with FHA or Conventional financing?",
    answer:
      "The calculator compares modeled payment structures, mortgage insurance and upfront costs under selected assumptions. The result is scenario-specific; no program is universally cheaper or better.",
  },
];

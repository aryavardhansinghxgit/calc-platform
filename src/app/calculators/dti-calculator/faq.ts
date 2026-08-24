export interface DTIFAQItem {
  question: string;
  answer: string;
}

export const dti_calculatorFaqs: DTIFAQItem[] = [
  {
    question: "What is a debt-to-income (DTI) ratio?",
    answer:
      "DTI compares recurring monthly debt obligations with gross monthly income. The calculator reports both front-end DTI for housing and back-end DTI for housing plus supported recurring debts.",
  },
  {
    question: "How do you calculate front-end and back-end DTI?",
    answer:
      "Front-end DTI is housing costs divided by gross monthly income. Back-end DTI is housing costs plus recurring debt, divided by gross monthly income. Both are expressed as percentages.",
  },
  {
    question: "What is a good DTI ratio for a mortgage?",
    answer:
      "There is no single universal 'good' DTI for every loan program or borrower. The calculator uses planning bands and program-specific benchmarks, while actual lender requirements can differ based on the full application.",
  },
  {
    question: "What debts are included in DTI?",
    answer:
      "The calculator includes the recurring debt fields available in its interface, such as auto loans, student loans and credit-card minimum payments. Always use the current input fields as the authoritative definition of the modeled debt set.",
  },
  {
    question: "Do utilities, groceries and insurance count toward DTI?",
    answer:
      "DTI is a debt-to-income measure rather than a full household budget. Ordinary living expenses are not automatically treated as recurring debt unless the calculator explicitly provides them as debt-related inputs.",
  },
  {
    question: "How do student loans affect DTI?",
    answer:
      "A supported student-loan payment contributes to the debt numerator. The exact underwriting treatment of very low or zero payments can vary by loan program and documentation.",
  },
  {
    question: "Does credit score affect DTI eligibility?",
    answer:
      "Credit score and DTI are separate measures. This calculator uses credit score as an input to its modeled program-matrix logic, but a lender may use different rules and underwriting factors.",
  },
  {
    question: "What DTI ratios are used for Conventional, FHA, VA and USDA loans?",
    answer:
      "The calculator displays program-specific benchmark values for planning and comparison. These are not universal approval guarantees; actual underwriting can depend on automated systems, documentation, credit, reserves, residual income and other factors.",
  },
  {
    question: "How does paying off debt lower DTI?",
    answer:
      "Paying off a recurring debt reduces the monthly debt amount in the DTI numerator. With income and housing unchanged, removing a monthly obligation generally lowers back-end DTI.",
  },
  {
    question: "How much income do I need to qualify for a target DTI?",
    answer:
      "The reverse solver divides modeled housing plus existing debt by the target DTI expressed as a decimal. For example, $2,400 of combined obligations at a 36% target produces about $6,666.67 monthly income, or $80,000 annually.",
  },
  {
    question: "How much housing payment can I afford at a target DTI?",
    answer:
      "The maximum-housing solver multiplies gross monthly income by the selected target DTI and subtracts existing recurring debt. The result is a modeled housing-payment ceiling, not a lender approval.",
  },
  {
    question: "Why does my DTI calculator result differ from a lender's calculation?",
    answer:
      "Lenders may use different income documentation, debt treatment, student-loan rules, program limits, automated-underwriting systems, reserves, credit requirements and other factors. This calculator is a planning model, not an underwriting system.",
  },
];

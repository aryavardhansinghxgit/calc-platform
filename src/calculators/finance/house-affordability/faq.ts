import { CalculatorFAQ } from "@/calculators/types";

export const houseAffordabilityFaqs: CalculatorFAQ[] = [
  {
    question: "How much house can I afford?",
    answer:
      "The calculator estimates a home price from household income, existing monthly debt, down payment, mortgage rate, term, selected DTI framework or a fixed monthly housing budget. The result is a planning estimate, not a lender approval.",
  },
  {
    question: "What is the 28/36 rule?",
    answer:
      "The 28/36 framework uses 28% of gross monthly income for housing and 36% for total recurring debt as an affordability benchmark. It is not a universal mortgage approval rule. Actual underwriting depends on the loan program, underwriting method and borrower profile.",
  },
  {
    question: "What is the difference between front-end and back-end DTI?",
    answer:
      "Front-end DTI measures qualifying housing costs relative to gross monthly income. Back-end DTI adds other qualifying debt payments. Different mortgage programs can calculate and interpret DTI differently.",
  },
  {
    question: "Does FHA use a 31/43 DTI rule?",
    answer:
      "31/43 is a commonly cited FHA manual-underwriting benchmark in specified scenarios. FHA automated underwriting can produce different outcomes, and eligibility depends on the complete borrower and loan profile.",
  },
  {
    question: "Does VA have a 41% DTI limit?",
    answer:
      "VA uses 41% as a DTI review threshold, not as an automatic approval or denial cutoff. Residual income and other underwriting factors are considered.",
  },
  {
    question: "How does existing debt affect home affordability?",
    answer:
      "Existing monthly debt reduces the portion of a back-end DTI ceiling that can be used for the proposed housing expense. More qualifying debt therefore generally lowers the home price supported by the same income and DTI assumptions.",
  },
  {
    question: "How does a larger down payment change affordability?",
    answer:
      "A larger down payment reduces the mortgage principal for a given home price and can change mortgage-insurance requirements and other financing terms. It also uses cash that could otherwise remain available for reserves or other goals.",
  },
  {
    question: "Does 20% down eliminate PMI?",
    answer:
      "A 20% down payment can avoid certain conventional PMI requirements, but mortgage-insurance rules vary by loan type and lender. FHA mortgage insurance follows separate program rules.",
  },
  {
    question: "What costs should I include besides the mortgage payment?",
    answer:
      "Property taxes, homeowners insurance, HOA fees, mortgage insurance where applicable, maintenance and closing costs can materially affect the total cost of buying a home. The calculator includes selected recurring costs but does not model every possible ownership expense.",
  },
  {
    question: "How much should I budget for home maintenance?",
    answer:
      "There is no universal maintenance percentage. A 1%-2% annual allowance is sometimes used as a planning heuristic, but actual costs depend on the age, condition, size and location of the property.",
  },
  {
    question: "Are these results a mortgage preapproval?",
    answer:
      "No. They are mathematical affordability estimates. Actual preapproval and underwriting can depend on verified income, credit, assets, reserves, property details, loan program and automated underwriting findings.",
  },
  {
    question: "Why can my lender's maximum be different from this calculator?",
    answer:
      "The calculator uses the assumptions and DTI framework you select. A lender may use different qualifying-income definitions, liabilities, underwriting rules, compensating factors, loan limits and property-specific information.",
  },
];

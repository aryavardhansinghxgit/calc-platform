import { CalculatorModuleDefinition } from "../../types";
import { calculateIncomeAffordabilityFormula } from "@/lib/calculator-engine/formulas/house-affordability";
import HouseAffordabilityContentSection from "@/components/calculator/house-affordability/HouseAffordabilityContentSection";

export const HOUSE_AFFORDABILITY_CALCULATOR: CalculatorModuleDefinition = {
  id: "house-affordability",
  title: "House Affordability Calculator",
  slug: "house-affordability-calculator",
  category: "Finance",
  subcategory: "Mortgage and Real Estate",
  description:
    "Estimate how much house you can afford using income, monthly debts, down payment, mortgage rate, housing costs, DTI, or a fixed monthly budget.",
  iconName: "Home",
  featured: true,
  tags: [
    "house affordability calculator",
    "how much house can I afford",
    "home affordability calculator",
    "house affordability calculator by income",
    "house affordability calculator by monthly payment",
    "mortgage affordability calculator",
    "how much mortgage can I afford",
    "home price affordability calculator",
    "DTI home affordability calculator",
    "affordable home price calculator",
    "home buying budget calculator",
  ],
  formulaDescription:
    "Calculates maximum allowable housing payment using Front-End (28%) and Back-End (36%) Debt-to-Income rules or fixed monthly budgets.",
  ContentComponent: HouseAffordabilityContentSection,
  faqs: [
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
  ],
  inputs: [
    { name: "annualIncome", label: "Annual Household Income", type: "currency", defaultValue: 120000, unit: "$", min: 10000, max: 2000000, step: 5000 },
    { name: "interestRate", label: "Mortgage Interest Rate", type: "percentage", defaultValue: 6.5, unit: "%", min: 0.1, max: 20, step: 0.1 },
    { name: "loanTermYears", label: "Loan Term", type: "slider", defaultValue: 30, unit: "years", min: 10, max: 30, step: 5 },
    { name: "monthlyDebt", label: "Monthly Debt Payments", type: "currency", defaultValue: 500, unit: "$", min: 0, max: 20000, step: 100 },
  ],
  outputs: [
    { name: "maxHomePrice", label: "Maximum Home Price", format: "currency", highlight: true },
    { name: "maxLoanAmount", label: "Maximum Loan Amount", format: "currency" },
    { name: "totalMonthlyHousingCost", label: "Total Monthly Housing Cost", format: "currency" },
  ],
  calculate: (inputs) => {
    return calculateIncomeAffordabilityFormula({
      annualIncome: Number(inputs.annualIncome || 120000),
      loanTermYears: Number(inputs.loanTermYears || 30),
      interestRate: Number(inputs.interestRate || 6.5),
      monthlyDebt: Number(inputs.monthlyDebt || 500),
      downPayment: 20,
      downPaymentType: "percent",
    });
  },
};

export default HOUSE_AFFORDABILITY_CALCULATOR;

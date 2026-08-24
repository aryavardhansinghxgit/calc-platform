import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateDTICalculator } from "./calculator";
import { dti_calculatorFaqs } from "./faq";
import { DTICalculator } from "@/components/calculator/dti/DTICalculator";
import { DTIContent } from "@/components/calculator/dti/DTIContent";

export const dti_calculatorConfig: CalculatorModuleDefinition = {
  id: "dti-calculator",
  title: "DTI Calculator",
  slug: "dti-calculator",
  category: "Finance",
  subcategory: "Mortgage and Real Estate",
  description:
    "Calculate front-end and back-end DTI, test mortgage scenarios, find required income, estimate maximum housing payment, and model debt-payoff improvements.",
  iconName: "PieChart",
  featured: true,
  keywords: [
    "DTI calculator",
    "debt-to-income ratio calculator",
    "debt to income calculator",
    "DTI ratio calculator",
    "front-end DTI calculator",
    "back-end DTI calculator",
    "mortgage DTI calculator",
    "mortgage qualification calculator",
    "DTI calculator for home loan",
    "how to calculate DTI",
    "maximum housing payment calculator",
    "required income for DTI"
  ],
  priority: 1,
  relatedCalculators: [
    "house-affordability-calculator",
    "mortgage-calculator",
    "rent-calculator",
    "debt-payoff-calculator",
    "loan-calculator",
    "down-payment-calculator",
    "refinance-calculator"
  ],
  formulaDescription:
    "Front-End DTI = (Total Monthly Housing Costs / Gross Monthly Income) × 100. Back-End DTI = ((Total Monthly Housing Costs + Total Recurring Debt) / Gross Monthly Income) × 100.",
  faqs: dti_calculatorFaqs,
  inputs: [
    {
      name: "primarySalary",
      label: "Gross Salary / Income",
      type: "number",
      defaultValue: 75000,
    },
    {
      name: "incomeFreq",
      label: "Income Frequency",
      type: "select",
      defaultValue: "annual",
      options: [
        { label: "Annual Salary ($/year)", value: "annual" },
        { label: "Monthly Income ($/month)", value: "monthly" },
      ],
    },
    {
      name: "mortgageRentPI",
      label: "Housing Costs (Mortgage/Rent P&I)",
      type: "number",
      defaultValue: 1800,
    },
    {
      name: "autoLoansLeases",
      label: "Auto Loans & Leases",
      type: "number",
      defaultValue: 350,
    },
    {
      name: "studentLoans",
      label: "Student Loans",
      type: "number",
      defaultValue: 250,
    },
  ],
  outputs: [
    {
      name: "frontEndRatio",
      label: "Front-End Ratio (Housing DTI)",
      format: "text",
    },
    {
      name: "backEndRatio",
      label: "Back-End Ratio (Total DTI)",
      format: "text",
      highlight: true,
    },
    {
      name: "disposableIncome",
      label: "Remaining Monthly Buffer",
      format: "currency",
    },
    {
      name: "riskTier",
      label: "Lending Risk Rating",
      format: "text",
    },
  ],
  calculate: calculateDTICalculator,
  CustomComponent: DTICalculator,
  ContentComponent: DTIContent,
};

export default dti_calculatorConfig;

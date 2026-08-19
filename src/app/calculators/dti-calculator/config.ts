import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateDTICalculator } from "./calculator";
import { dti_calculatorFaqs } from "./faq";
import { DTICalculator } from "@/components/calculator/dti/DTICalculator";
import { DTIContent } from "@/components/calculator/dti/DTIContent";

export const dti_calculatorConfig: CalculatorModuleDefinition = {
  id: "dti-calculator",
  title: "Debt-to-Income (DTI) Ratio Calculator — Check Mortgage Qualification",
  slug: "dti-calculator",
  category: "Finance",
  subcategory: "Mortgage and Real Estate",
  description:
    "Free Debt-to-Income (DTI) Ratio Calculator & Mortgage Qualification Suite. Calculate Front-End & Back-End DTI ratios, compare Conventional, FHA, VA, USDA & Jumbo approval limits, solve required income, and simulate debt payoff impacts.",
  iconName: "PieChart",
  featured: true,
  keywords: [
    "debt to income ratio calculator",
    "dti calculator",
    "front end vs back end dti",
    "mortgage dti calculator",
    "how to calculate debt to income ratio",
    "fha dti limits",
    "conventional loan dti limits"
  ],
  priority: 1,
  relatedCalculators: [
    "house-affordability-calculator",
    "mortgage-calculator",
    "rent-calculator",
    "debt-payoff-calculator"
  ],
  formulaDescription:
    "Front-End DTI = (Total Housing / Gross Income) × 100%. Back-End DTI = ((Total Housing + Total Debt) / Gross Income) × 100%.",
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
      label: "Housing Costs (Mortgage/Rent)",
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

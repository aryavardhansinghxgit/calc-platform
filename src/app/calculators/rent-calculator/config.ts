import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateRentCalculator } from "./calculator";
import { rent_calculatorFaqs } from "./faq";
import { RentCalculator } from "@/components/calculator/rent/RentCalculator";
import { RentContent } from "@/components/calculator/rent/RentContent";

export const rent_calculatorConfig: CalculatorModuleDefinition = {
  id: "rent-calculator",
  title: "Rent Calculator — How Much Rent Can You Afford?",
  slug: "rent-calculator",
  category: "Finance",
  subcategory: "Mortgage and Real Estate",
  description:
    "Free advanced Rent Calculator & Budgeting Suite. Calculate maximum affordable rent using the 30% gross rule, 40x landlord rule, 50/30/20 budget framework, Front-End & Back-End DTI, utility cost index, upfront move-in cash, and fair roommate rent splitters.",
  iconName: "Home",
  featured: true,
  keywords: [
    "rent calculator",
    "how much rent can I afford",
    "rent affordability calculator",
    "how much should I spend on rent",
    "30 percent rule rent calculator",
    "40x rent rule calculator",
    "rent to income ratio calculator",
    "roommate rent split calculator",
    "50 30 20 rent calculator"
  ],
  priority: 1,
  relatedCalculators: [
    "house-affordability-calculator",
    "budget-calculator",
    "income-tax-calculator",
    "mortgage-calculator"
  ],
  formulaDescription:
    "Max Monthly Rent = (Gross Annual Salary / 12) × 30%, OR (Gross Annual Salary / 40). DTI Back-End Limit = (Gross Monthly × 43%) - Monthly Debt.",
  faqs: rent_calculatorFaqs,
  inputs: [
    {
      name: "grossIncome",
      label: "Pre-Tax Gross Income",
      type: "number",
      defaultValue: 72000,
    },
    {
      name: "incomeFrequency",
      label: "Income Frequency",
      type: "select",
      defaultValue: "annual",
      options: [
        { label: "Annual Salary ($/year)", value: "annual" },
        { label: "Monthly Income ($/month)", value: "monthly" },
        { label: "Hourly Wage ($/hour)", value: "hourly" },
      ],
    },
    {
      name: "monthlyDebt",
      label: "Monthly Debt Payments",
      type: "number",
      defaultValue: 300,
    },
    {
      name: "rulePreset",
      label: "Affordability Benchmark Rule",
      type: "select",
      defaultValue: "30",
      options: [
        { label: "Standard (30% Rule)", value: "30" },
        { label: "Conservative (25% Rule)", value: "25" },
        { label: "Aggressive / HCOL (35% Rule)", value: "35" },
        { label: "Landlord 40x Salary Rule", value: "40x" },
      ],
    },
  ],
  outputs: [
    {
      name: "maxMonthlyRent",
      label: "Maximum Affordable Rent",
      format: "currency",
      highlight: true,
    },
    {
      name: "recommendedRange",
      label: "Recommended Price Range",
      format: "text",
    },
    {
      name: "frontEndRatio",
      label: "Front-End Ratio (Rent / Income)",
      format: "text",
    },
    {
      name: "backEndRatio",
      label: "Back-End Ratio ((Rent + Debt) / Income)",
      format: "text",
    },
    {
      name: "discretionaryIncome",
      label: "Remaining Discretionary Income",
      format: "currency",
    },
    {
      name: "dtiStatus",
      label: "Rent Burden Status",
      format: "text",
    },
  ],
  calculate: calculateRentCalculator,
  CustomComponent: RentCalculator,
  ContentComponent: RentContent,
};

export default rent_calculatorConfig;

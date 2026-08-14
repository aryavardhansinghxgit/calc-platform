import { CalculatorModuleDefinition } from "../../types";
import { calculateIncomeAffordabilityFormula } from "@/lib/calculator-engine/formulas/house-affordability";
import HouseAffordabilityContentSection from "@/components/calculator/house-affordability/HouseAffordabilityContentSection";

export const HOUSE_AFFORDABILITY_CALCULATOR: CalculatorModuleDefinition = {
  id: "house-affordability",
  title: "House Affordability Calculator",
  slug: "house-affordability-calculator",
  category: "Finance",
  subcategory: "Mortgage & House",
  description: "Determine how much house you can afford based on household income, monthly debts, down payment, and DTI rules or fixed monthly budgets.",
  iconName: "Home",
  featured: true,
  tags: ["house affordability", "how much house can i afford", "dti", "mortgage limit", "home buying budget"],
  formulaDescription: "Calculates maximum allowable housing payment using Front-End (28%) and Back-End (36%) Debt-to-Income rules or fixed monthly budgets.",
  ContentComponent: HouseAffordabilityContentSection,
  faqs: [
    {
      question: "What is the 28/36 Debt-to-Income rule?",
      answer: "The 28/36 rule states that your total monthly housing expenses should not exceed 28% of gross monthly income, and total debt payments (housing + debt) should not exceed 36%.",
    },
    {
      question: "What is the difference between Front-End and Back-End DTI ratio?",
      answer: "The Front-End ratio measures housing costs (mortgage P&I, taxes, insurance, HOA) relative to gross income. The Back-End ratio measures total recurring monthly debt payments relative to gross income.",
    },
    {
      question: "How does a larger down payment increase house affordability?",
      answer: "A larger down payment directly increases your home purchasing budget dollar-for-dollar and reduces loan-to-value (LTV), avoiding costly PMI mortgage insurance fees.",
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

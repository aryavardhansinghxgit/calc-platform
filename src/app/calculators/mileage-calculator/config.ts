import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateMileageCalculator } from "./calculator";
import { mileage_calculatorFaqs } from "./faq";

export const mileage_calculatorConfig: CalculatorModuleDefinition = {
  id: "mileage-calculator",
  title: "Mileage Calculator",
  slug: "mileage-calculator",
  category: "other",
  subcategory: "Transportation",
  description: "Calculate business trip mileage reimbursement and travel driving expenses.",
  iconName: "Navigation",
  featured: true,
  keywords: ["mileage calculator","irs mileage rate","reimbursement calculator","commute cost"],
  priority: 1,
  relatedCalculators: ["fuel-cost-calculator","gas-mileage-calculator"],
  formulaDescription: "Reimbursement = Miles Driven × IRS Rate per Mile",
  faqs: mileage_calculatorFaqs,
  inputs: [
  {
    "name": "distanceMiles",
    "label": "Driven Distance (miles)",
    "type": "number",
    "defaultValue": 120,
    "min": 1,
    "max": 10000,
    "step": 5
  },
  {
    "name": "irsRate",
    "label": "IRS Standard Rate ($/mile)",
    "type": "number",
    "defaultValue": 0.67,
    "min": 0.1,
    "max": 2,
    "step": 0.01
  }
],
  outputs: [
  {
    "name": "reimbursement",
    "label": "Total Reimbursement Amount",
    "format": "currency",
    "highlight": true
  },
  {
    "name": "distanceKm",
    "label": "Distance in Kilometers",
    "format": "number"
  }
],
  calculate: calculateMileageCalculator,
};

export default mileage_calculatorConfig;

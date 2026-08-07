import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateTipCalculator } from "./calculator";
import { tip_calculatorFaqs } from "./faq";

export const tip_calculatorConfig: CalculatorModuleDefinition = {
  id: "tip-calculator",
  title: "Tip Calculator",
  slug: "tip-calculator",
  category: "other",
  subcategory: "Everyday Utility",
  description: "Calculate tip amount, total restaurant bill, and split bill per person.",
  iconName: "DollarSign",
  featured: true,
  keywords: ["tip calculator","split bill","gratuity","restaurant tip"],
  priority: 1,
  relatedCalculators: ["percentage-calculator"],
  formulaDescription: "Tip = Bill × Tip%; Grand Total = Bill + Tip",
  faqs: tip_calculatorFaqs,
  inputs: [
  {
    "name": "billAmount",
    "label": "Bill Subtotal ($)",
    "type": "number",
    "defaultValue": 85,
    "min": 1,
    "max": 10000,
    "step": 5
  },
  {
    "name": "tipPct",
    "label": "Tip Percentage (%)",
    "type": "number",
    "defaultValue": 18,
    "min": 0,
    "max": 50,
    "step": 1
  },
  {
    "name": "peopleCount",
    "label": "Split Between (People)",
    "type": "number",
    "defaultValue": 3,
    "min": 1,
    "max": 50,
    "step": 1
  }
],
  outputs: [
  {
    "name": "tipTotal",
    "label": "Total Tip Amount",
    "format": "currency",
    "highlight": true
  },
  {
    "name": "grandTotal",
    "label": "Grand Total Bill",
    "format": "currency"
  },
  {
    "name": "perPersonTotal",
    "label": "Cost Per Person",
    "format": "currency"
  }
],
  calculate: calculateTipCalculator,
};

export default tip_calculatorConfig;

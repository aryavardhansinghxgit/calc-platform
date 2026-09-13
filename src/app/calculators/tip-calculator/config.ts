import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateTipFromInputs } from "./calculator";
import { tip_calculatorFaqs } from "./faq";
import { TipCalculator } from "@/components/calculator/tip/TipCalculator";
import { TipContent } from "@/components/calculator/tip/TipContent";

export const tip_calculatorConfig: CalculatorModuleDefinition = {
  id: "tip-calculator",
  title: "Tip Calculator",
  slug: "tip-calculator",
  category: "other",
  subcategory: "Everyday & Lifestyle",
  description: "Calculate tips, tax, total bills, equal splits, and itemized group shares with exact-cent rounding.",
  iconName: "DollarSign",
  featured: true,
  keywords: [
    "tip calculator",
    "restaurant tip calculator",
    "tip percentage calculator",
    "tip calculator with tax",
    "tip calculator before tax",
    "tip calculator after tax",
    "bill split calculator",
    "split restaurant bill",
    "split bill by item",
    "itemized bill splitter",
    "tip per person calculator",
    "restaurant bill calculator",
    "18 percent tip calculator",
    "20 percent tip calculator",
    "how much should I tip",
    "tip on pre-tax bill",
    "tip on after-tax bill",
    "restaurant tipping calculator",
    "split check calculator",
    "gratuity calculator",
  ],
  relatedCalculators: [
    "percentage-calculator",
    "discount-calculator",
    "sales-tax-calculator",
  ],
  formulaDescription: "Tip = Subtotal × (Tip% / 100); Total Bill = Subtotal + Tax + Tip",
  faqs: tip_calculatorFaqs,
  CustomComponent: TipCalculator,
  ContentComponent: TipContent,
  inputs: [
    {
      name: "billAmount",
      label: "Bill Subtotal ($)",
      type: "number",
      defaultValue: 50,
      min: 1,
      max: 10000,
      step: 5
    },
    {
      name: "tipPct",
      label: "Tip Percentage (%)",
      type: "number",
      defaultValue: 18,
      min: 0,
      max: 50,
      step: 1
    },
    {
      name: "peopleCount",
      label: "Split Between (People)",
      type: "number",
      defaultValue: 2,
      min: 1,
      max: 50,
      step: 1
    }
  ],
  outputs: [
    {
      name: "tipAmount",
      label: "Total Tip Amount",
      format: "currency",
      highlight: true
    }
  ],
  calculate: calculateTipFromInputs,
} as any;

export default tip_calculatorConfig;

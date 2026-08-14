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
  subcategory: "Everyday Utility",
  description: "Free online tip calculator. Calculate tips pre-tax or post-tax, split restaurant bills, apply smart rounding, and split itemized group checks.",
  iconName: "DollarSign",
  featured: true,
  keywords: [
    "tip calculator",
    "split bill calculator",
    "gratuity calculator",
    "restaurant tip calculator",
    "pre tax tip calculator",
    "itemized bill splitter"
  ],
  priority: 1,
  relatedCalculators: ["percentage-calculator"],
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

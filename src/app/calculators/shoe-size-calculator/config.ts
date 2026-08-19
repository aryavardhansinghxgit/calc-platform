import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateShoeSizeFromInputs } from "./calculator";
import { shoe_size_calculatorFaqs } from "./faq";
import { ShoeSizeCalculator } from "@/components/calculator/shoe/ShoeSizeCalculator";
import { ShoeSizeContent } from "@/components/calculator/shoe/ShoeSizeContent";

export const shoe_size_calculatorConfig: CalculatorModuleDefinition = {
  id: "shoe-size-calculator",
  title: "Shoe Size Calculator",
  slug: "shoe-size-calculator",
  category: "converters",
  subcategory: "Everyday & Lifestyle",
  description: "Free online shoe size calculator and international converter (US, UK, EU, CM, JP, MX, AU). Measure foot length & width, tune by brand, and handle 2-foot asymmetry.",
  iconName: "Footprints",
  featured: true,
  keywords: [
    "shoe size calculator",
    "shoe size converter",
    "us to eu shoe size",
    "uk to us shoe size",
    "foot length calculator",
    "shoe width calculator",
    "mondopoint converter"
  ],
  priority: 1,
  relatedCalculators: ["bra-size-calculator", "conversion-calculator"],
  formulaDescription: "US Men = 3×L(in) - 22; EU = 1.5×(L(cm) + 1.5); Mondopoint = L(mm)",
  faqs: shoe_size_calculatorFaqs,
  CustomComponent: ShoeSizeCalculator,
  ContentComponent: ShoeSizeContent,
  inputs: [
    {
      name: "footLength",
      label: "Foot Length (in)",
      type: "number",
      defaultValue: 10,
      min: 4,
      max: 16,
      step: 0.1
    },
    {
      name: "gender",
      label: "Gender / Group",
      type: "select",
      defaultValue: "men",
      options: [
        { label: "Men's", value: "men" },
        { label: "Women's", value: "women" },
        { label: "Kids'", value: "kids" }
      ]
    }
  ],
  outputs: [
    {
      name: "usSize",
      label: "Recommended US Shoe Size",
      format: "text",
      highlight: true
    }
  ],
  calculate: calculateShoeSizeFromInputs,
} as any;

export default shoe_size_calculatorConfig;

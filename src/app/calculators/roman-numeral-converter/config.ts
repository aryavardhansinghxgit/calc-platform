import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateRomanNumeralConverter } from "./calculator";
import { roman_numeral_converterFaqs } from "./faq";

export const roman_numeral_converterConfig: CalculatorModuleDefinition = {
  id: "roman-numeral-converter",
  title: "Roman Numeral Converter",
  slug: "roman-numeral-converter",
  category: "other",
  subcategory: "Measurements & Units",
  description: "Convert numbers to Roman numerals and convert Roman numerals back to numbers.",
  iconName: "Hash",
  featured: true,
  keywords: ["roman numeral converter","roman to decimal","roman numbers"],
  priority: 1,
  relatedCalculators: ["conversion-calculator"],
  formulaDescription: "Additive & Subtractive Roman Numeral Representation",
  faqs: roman_numeral_converterFaqs,
  inputs: [
  {
    "name": "numberVal",
    "label": "Integer (1 - 3999)",
    "type": "number",
    "defaultValue": 2026,
    "min": 1,
    "max": 3999,
    "step": 1
  }
],
  outputs: [
  {
    "name": "romanNumeral",
    "label": "Roman Numeral",
    "format": "text",
    "highlight": true
  },
  {
    "name": "arabicNumber",
    "label": "Standard Number",
    "format": "number"
  }
],
  calculate: calculateRomanNumeralConverter,
};

export default roman_numeral_converterConfig;

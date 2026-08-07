import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateConversionCalculator } from "./calculator";
import { conversion_calculatorFaqs } from "./faq";

export const conversion_calculatorConfig: CalculatorModuleDefinition = {
  id: "conversion-calculator",
  title: "Conversion Calculator",
  slug: "conversion-calculator",
  category: "other",
  subcategory: "Measurements & Units",
  description: "Universal unit converter for length, mass, volume, temperature, and speed.",
  iconName: "ArrowRightLeft",
  featured: true,
  keywords: ["unit converter","conversion calculator","convert units","metric to imperial"],
  priority: 1,
  relatedCalculators: ["mass-calculator","speed-calculator"],
  formulaDescription: "Standard Unit Factor Conversion",
  faqs: conversion_calculatorFaqs,
  inputs: [
  {
    "name": "value",
    "label": "Value to Convert",
    "type": "number",
    "defaultValue": 100,
    "min": -1000000,
    "max": 1000000,
    "step": 1
  },
  {
    "name": "unitCategory",
    "label": "Category",
    "type": "select",
    "defaultValue": "length",
    "options": [
      {
        "label": "Length (km to miles)",
        "value": "length"
      },
      {
        "label": "Weight (kg to lbs)",
        "value": "weight"
      },
      {
        "label": "Temperature (°C to °F)",
        "value": "temp"
      }
    ]
  }
],
  outputs: [
  {
    "name": "convertedValue",
    "label": "Converted Value",
    "format": "number",
    "highlight": true
  },
  {
    "name": "summary",
    "label": "Conversion Result",
    "format": "text"
  }
],
  calculate: calculateConversionCalculator,
};

export default conversion_calculatorConfig;

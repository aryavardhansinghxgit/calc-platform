import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateMolecularWeightCalculator } from "./calculator";
import { molecular_weight_calculatorFaqs } from "./faq";

export const molecular_weight_calculatorConfig: CalculatorModuleDefinition = {
  id: "molecular-weight-calculator",
  title: "Molecular Weight Calculator",
  slug: "molecular-weight-calculator",
  category: "education",
  subcategory: "Measurements & Units",
  description: "Calculate molar mass and molecular weight of common chemical formulas.",
  iconName: "Atom",
  featured: true,
  keywords: ["molecular weight","molar mass","chemistry calculator","chemical formula"],
  priority: 1,
  relatedCalculators: ["molarity-calculator","density-calculator"],
  formulaDescription: "Molar Mass = Sum of Atomic Weights of Constituent Atoms",
  faqs: molecular_weight_calculatorFaqs,
  inputs: [
  {
    "name": "presetCompound",
    "label": "Chemical Compound",
    "type": "select",
    "defaultValue": "H2O",
    "options": [
      {
        "label": "Water (H₂O)",
        "value": "H2O"
      },
      {
        "label": "Glucose (C₆H₁₂O₆)",
        "value": "C6H12O6"
      },
      {
        "label": "Table Salt (NaCl)",
        "value": "NaCl"
      },
      {
        "label": "Carbon Dioxide (CO₂)",
        "value": "CO2"
      },
      {
        "label": "Sulfuric Acid (H₂SO₄)",
        "value": "H2SO4"
      }
    ]
  }
],
  outputs: [
  {
    "name": "molarMass",
    "label": "Molar Mass (g/mol)",
    "format": "number",
    "highlight": true
  },
  {
    "name": "formula",
    "label": "Chemical Formula",
    "format": "text"
  }
],
  calculate: calculateMolecularWeightCalculator,
};

export default molecular_weight_calculatorConfig;

import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateMolecularWeightCalculator } from "./calculator";
import { molecular_weight_calculatorFaqs } from "./faq";

export const molecular_weight_calculatorConfig: CalculatorModuleDefinition = {
  id: "molecular-weight-calculator",
  title: "Molecular Weight Calculator (Molar Mass)",
  slug: "molecular-weight-calculator",
  category: "other",
  subcategory: "Science & Education",
  description: "Next-Gen Chemical Formula Molar Mass Calculator. Supports nested brackets, crystal hydrates, organic shorthands, monoisotopic mass, empirical formula solver, and moles converter.",
  iconName: "Atom",
  featured: true,
  keywords: [
    "molecular weight calculator",
    "molar mass calculator",
    "chemical formula calculator",
    "monoisotopic mass calculator",
    "empirical formula solver",
    "grams to moles converter",
    "hydrate formula weight",
    "elemental mass percentage",
    "periodic table formula parser",
    "chemistry molar mass"
  ],
  priority: 1,
  relatedCalculators: ["molarity-calculator", "molecular-weight-calculator", "percentage-calculator"],
  formulaDescription: "Molar Mass (M) = Σ(Number of Atoms × Standard Atomic Weight) | Mass % = (Sub-Mass / M) × 100",
  faqs: molecular_weight_calculatorFaqs,
  inputs: [
    {
      name: "mode",
      label: "Calculation Mode",
      type: "select",
      defaultValue: "formula",
      options: [
        { label: "Chemical Formula & Isotopic Mass Mode", value: "formula" },
        { label: "Empirical ↔ Molecular Formula Reverse Solver", value: "empirical_solver" },
        { label: "Moles ↔ Grams ↔ Molecules Instant Converter", value: "mass_converter" },
      ],
    },
    {
      name: "formula",
      label: "Chemical Formula",
      type: "text",
      defaultValue: "C6H12O6",
    },
    {
      name: "isMonoisotopicMode",
      label: "Use Monoisotopic Mass (MS m/z)",
      type: "select",
      defaultValue: "0",
      options: [
        { label: "Standard Average (IUPAC)", value: "0" },
        { label: "Monoisotopic Mass (MS m/z)", value: "1" },
      ],
    },
    {
      name: "inputGrams",
      label: "Mass in Grams (g)",
      type: "number",
      defaultValue: 10.0,
      min: 0,
    },
  ],
  outputs: [
    {
      name: "totalMolarMass",
      label: "Total Molar Mass (g/mol)",
      format: "number",
      highlight: true,
    },
    {
      name: "totalMonoisotopicMass",
      label: "Monoisotopic Mass (Da)",
      format: "number",
    },
  ],
  calculate: calculateMolecularWeightCalculator,
};

export default molecular_weight_calculatorConfig;

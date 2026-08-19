import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateMolarityCalculator } from "./calculator";
import { molarity_calculatorFaqs } from "./faq";

export const molarity_calculatorConfig: CalculatorModuleDefinition = {
  id: "molarity-calculator",
  title: "Molarity Calculator & Dilution Solver",
  slug: "molarity-calculator",
  category: "other",
  subcategory: "Science & Education",
  description: "Next-Gen Molarity Calculator. Calculate mass, volume, concentration, C1V1=C2V2 stock dilution, mass percent to molarity, PPM converter, and generate lab bench protocols.",
  iconName: "FlaskConical",
  featured: true,
  keywords: [
    "molarity calculator",
    "solution preparation calculator",
    "c1v1=c2v2 dilution calculator",
    "mass to molarity calculator",
    "molar mass solver",
    "mass percent to molarity",
    "ppm to molarity converter",
    "normality calculator",
    "hydrate molar mass calculator",
    "chemistry solution calculator"
  ],
  priority: 1,
  relatedCalculators: ["molecular-weight-calculator", "molarity-calculator", "percentage-calculator"],
  formulaDescription: "Molarity (M) = Mass (g) / [Molar Mass (g/mol) × Volume (L)] | Dilution: C1V1 = C2V2",
  faqs: molarity_calculatorFaqs,
  inputs: [
    {
      name: "mode",
      label: "Calculation Mode",
      type: "select",
      defaultValue: "mass_solver",
      options: [
        { label: "Molarity & Mass Solver (Standard Prep)", value: "mass_solver" },
        { label: "Stock Dilution Calculator (C1V1 = C2V2)", value: "dilution" },
        { label: "Mass Percent & Density to Molarity", value: "mass_percent" },
        { label: "PPM / PPB to Molarity & Molality", value: "ppm_converter" },
      ],
    },
    {
      name: "solveVariable",
      label: "Solve For",
      type: "select",
      defaultValue: "molarity",
      options: [
        { label: "Molarity / Concentration (M)", value: "molarity" },
        { label: "Solute Mass (g)", value: "mass" },
        { label: "Solution Volume (L)", value: "volume" },
        { label: "Molar Mass / Formula Weight (g/mol)", value: "molar_mass" },
      ],
    },
    {
      name: "massGrams",
      label: "Solute Mass (g)",
      type: "number",
      defaultValue: 58.44,
      min: 0,
    },
    {
      name: "molarityM",
      label: "Molarity / Concentration (M)",
      type: "number",
      defaultValue: 1.0,
      min: 0,
    },
    {
      name: "volumeLiters",
      label: "Solution Volume (L)",
      type: "number",
      defaultValue: 1.0,
      min: 0,
    },
    {
      name: "molarMass",
      label: "Molar Mass (g/mol)",
      type: "number",
      defaultValue: 58.44,
      min: 0.001,
    },
  ],
  outputs: [
    {
      name: "formattedSolvedValue",
      label: "Calculated Value",
      format: "text",
      highlight: true,
    },
    {
      name: "molarityM",
      label: "Molarity (M)",
      format: "number",
    },
  ],
  calculate: calculateMolarityCalculator,
};

export default molarity_calculatorConfig;

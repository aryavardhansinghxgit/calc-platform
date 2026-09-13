import { CalculatorFAQ } from "@/calculators/types";

export const molarity_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is molarity?",
    answer:
      "Molarity is the amount of solute in moles divided by the volume of the final solution in liters: M = n / V. IUPAC's preferred terminology is amount concentration, commonly expressed in mol/L.",
  },
  {
    question: "How do you calculate molarity from mass?",
    answer:
      "First calculate moles from mass and molar mass: n = m / MW. Then divide by the final solution volume in liters: M = m / (MW × V).",
  },
  {
    question: "How many grams of NaCl are needed for 500 mL of 0.25 M solution?",
    answer:
      "Using a molar mass of 58.44 g/mol: m = (0.25 mol/L) × (0.500 L) × (58.44 g/mol) = 7.305 g. So approximately 7.305 grams of NaCl is required to prepare 500 mL of 0.25 M solution.",
  },
  {
    question: "What is the difference between molarity and molality?",
    answer:
      "Molarity uses moles of solute per liter of final solution (M = n / V), whereas molality uses moles of solute per kilogram of solvent (m = n / m_solvent). Because solution volume changes with temperature while solvent mass remains constant, molality is temperature-independent.",
  },
  {
    question: "What is the dilution formula C₁V₁ = C₂V₂?",
    answer:
      "It expresses the conservation of dissolved solute moles during an ideal dilution: C₁V₁ = C₂V₂ (or M₁V₁ = M₂V₂). You can rearrange the equation to solve for any one of the four variables.",
  },
  {
    question: "Can I dilute a 1 M solution to make a 10 M solution?",
    answer:
      "No. A conventional dilution adds solvent, which can only decrease or maintain concentration. The target concentration must satisfy C₂ ≤ C₁. A higher target concentration requires a more concentrated starting stock or direct dissolution of solid solute.",
  },
  {
    question: "How do I convert mass percentage to molarity?",
    answer:
      "When concentration is given as mass percentage (% w/w) and reagent density (ρ in g/mL) is known: M = (% × ρ × 10) / MW, with percentage as the numerical percent value, density in g/mL, and molar mass in g/mol.",
  },
  {
    question: "Does molarity depend on temperature?",
    answer:
      "Yes. Molarity uses solution volume in its denominator. Because liquids expand or contract with temperature, the numerical molarity of a solution can vary with temperature even when solute amount remains constant.",
  },
  {
    question: "How do hydrates affect molarity calculations?",
    answer:
      "A hydrate contains bound crystallization water molecules, so its formula mass is greater than the anhydrous compound. When weighing a hydrated material, its effective formula weight (MW_anhydrous + n × 18.015 g/mol) must be used to calculate mass accurately.",
  },
  {
    question: "Can PPM be converted directly to molarity?",
    answer:
      "For dilute aqueous solutions where 1 ppm ≈ 1 mg/L: M = (ppm × 10⁻³) / MW. This shortcut applies to dilute aqueous solutions where solution density is approximately 1.00 g/mL.",
  },
  {
    question: "What is normality?",
    answer:
      "Normality (N) is an equivalence-based concentration measure: N = M × n, where n is the reaction equivalence factor (valence). Because the equivalence factor depends on the specific chemical reaction, normality is context-dependent.",
  },
];

export default molarity_calculatorFaqs;

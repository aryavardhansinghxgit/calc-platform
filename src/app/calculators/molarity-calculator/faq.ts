import { CalculatorFAQ } from "@/calculators/types";

export const molarity_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is molarity and what is its formula?",
    answer:
      "Molarity (M) is the concentration of a solution expressed as the number of moles of solute dissolved per liter of total solution. Its core mathematical equation is Molarity (M) = Moles of Solute (n) / Volume of Solution in Liters (V).",
  },
  {
    question: "How do you calculate the mass of solute needed to make a solution?",
    answer:
      "To calculate solute mass, use the mass preparation equation: Mass (g) = Molarity (mol/L) × Volume (L) × Molar Mass (g/mol). For example, preparing 1.0 L of a 1.0 M NaCl solution (molar mass 58.44 g/mol) requires exactly 58.44 grams of NaCl.",
  },
  {
    question: "What is the dilution formula and how do you use C1V1 = C2V2?",
    answer:
      "The dilution equation C1V1 = C2V2 (or M1V1 = M2V2) states that initial stock concentration times initial stock volume equals final diluted concentration times final diluted volume, because the total number of solute moles remains constant when solvent is added.",
  },
  {
    question: "What is the difference between Molarity (M) and Molality (m)?",
    answer:
      "Molarity (M) measures moles of solute per liter of total solution and changes slightly with temperature due to liquid volumetric expansion, whereas Molality (m) measures moles of solute per kilogram of solvent and is temperature-independent.",
  },
  {
    question: "How do you convert Mass Percent (%) and Density into Molarity?",
    answer:
      "Convert mass percentage and reagent density (g/mL) to molarity using the formula: Molarity (M) = [Mass % × Density (g/mL) × 10] / Molar Mass (g/mol). For instance, 37% HCl with density 1.19 g/mL equals 12.08 M.",
  },
  {
    question: "Why should you always add acid to water instead of water to acid?",
    answer:
      "Always add acid to water ('AA' rule) because dissolving concentrated acid releases extreme exothermic hydration heat. If water is poured into concentrated acid, the top layer can instantly boil, causing corrosive acid to splatter dangerously.",
  },
  {
    question: "What is the difference between Molarity (M) and Normality (N)?",
    answer:
      "Normality (N) accounts for reactive equivalence: Normality (N) = Molarity (M) × Equivalence Factor (n). For monoprotic acids like HCl, 1 M = 1 N, but for diprotic sulfuric acid (H2SO4), a 1.0 M solution equals 2.0 N for acid-base reactions.",
  },
  {
    question: "How do you account for hydrates when calculating molarity?",
    answer:
      "When weighing hydrated salts (e.g., Copper(II) sulfate pentahydrate, CuSO4·5H2O), add the mass of all bound crystallization water molecules (5 × 18.015 g/mol = 90.075 g/mol) to the anhydrous molar mass (159.60 g/mol) to get the total formula weight (249.68 g/mol).",
  },
  {
    question: "How do you convert Parts Per Million (PPM) to Molarity?",
    answer:
      "In dilute aqueous solutions, 1 PPM equals 1 mg/L. Convert PPM to Molarity by dividing the PPM value by (1,000 × Molar Mass in g/mol) to yield moles per liter (M).",
  },
  {
    question: "Why does temperature affect molarity but not molality?",
    answer:
      "Temperature causes liquid solutions to expand or contract, altering the solution volume denominator in Molarity (mol/L). In contrast, solvent mass in Molality (mol/kg) remains invariant regardless of temperature.",
  },
];

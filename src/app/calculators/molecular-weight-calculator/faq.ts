import { CalculatorFAQ } from "@/calculators/types";

export const molecular_weight_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is the difference between molecular weight and molar mass?",
    answer:
      "Molecular weight (relative molecular mass, MW) is a dimensionless ratio or the mass of a single molecule expressed in unified atomic mass units (u or Da), whereas molar mass (M) is the mass of one mole (6.022 × 10²³ entities) of a substance expressed in grams per mole (g/mol). Both share the same numerical value.",
  },
  {
    question: "How do you calculate the molecular weight of a chemical formula?",
    answer:
      "To calculate molecular weight, multiply the standard atomic weight of each element by the number of atoms of that element in the chemical formula subscript, and sum all elemental masses together.",
  },
  {
    question: "What units are used for molecular weight and molar mass?",
    answer:
      "Molecular weight uses unified atomic mass units (u or amu) or Daltons (Da). Molar mass is expressed in grams per mole (g/mol) or kilograms per mole (kg/mol).",
  },
  {
    question: "How do you convert grams to moles using molar mass?",
    answer:
      "To convert mass in grams to moles, use the formula: Moles (n) = Mass in grams (m) / Molar Mass (M). For example, 18.015 grams of water (H2O, molar mass 18.015 g/mol) equals exactly 1.0 mole.",
  },
  {
    question: "How do you account for hydrates (e.g., CuSO4·5H2O) in molar mass?",
    answer:
      "The dot in a hydrate formula represents the addition of bound crystallization water molecules. Add the molar mass of all water molecules (5 × 18.015 g/mol = 90.075 g/mol) to the anhydrous salt molar mass (159.60 g/mol for CuSO4) to obtain the total hydrate formula weight (249.68 g/mol).",
  },
  {
    question: "Why is chemical formula capitalization important in a calculator?",
    answer:
      "Chemical formula capitalization is critical because uppercase letters denote new element symbols. For example, 'Co' is Cobalt (molar mass 58.93 g/mol), whereas 'CO' is Carbon Monoxide (molar mass 28.01 g/mol).",
  },
  {
    question: "What is Avogadro's number and how does it relate to molar mass?",
    answer:
      "Avogadro's constant (6.02214076 × 10²³ mol⁻¹) represents the exact number of atoms, molecules, or ions contained in one mole of any chemical substance. One mole of any compound has a mass in grams equal to its formula weight.",
  },
  {
    question: "What is the difference between an empirical formula and a molecular formula?",
    answer:
      "An empirical formula represents the simplest whole-number integer ratio of elements in a compound (e.g., CH2O for glucose), while a molecular formula represents the actual number of atoms of each element in a molecule (e.g., C6H12O6).",
  },
  {
    question: "Why do atomic weights on the periodic table have decimals?",
    answer:
      "Standard atomic weights on the periodic table contain decimals because they represent the terrestrial weighted average mass of all naturally occurring stable isotopes of an element based on their relative abundances.",
  },
  {
    question: "How do you calculate the mass percent of an individual element in a compound?",
    answer:
      "Calculate elemental mass percentage using the formula: Mass % = [(Total Mass of Element in 1 mole) / Total Molar Mass of Compound] × 100. For example, in H2O (18.015 g/mol), Oxygen contributes (15.999 / 18.015) × 100 = 88.81% of the total mass.",
  },
];

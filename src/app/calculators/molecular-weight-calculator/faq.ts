import { CalculatorFAQ } from "@/calculators/types";

export const molecular_weight_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is a molecular weight calculator?",
    answer:
      "A molecular weight calculator determines the mass associated with a chemical formula by adding the atomic-mass contributions of all constituent atoms. In precise IUPAC terminology, relative molecular mass is dimensionless, while molar mass is expressed in units such as g/mol.",
  },
  {
    question: "What is the molar mass of H₂O?",
    answer:
      "Using standard atomic-weight values, the molar mass of water is approximately 18.015 g/mol.",
  },
  {
    question: "What is the molecular weight of NaCl?",
    answer:
      "Using the standard atomic-weight convention, sodium chloride has a molecular weight of approximately 58.443 and a corresponding molar mass of approximately 58.443 g/mol. NIST lists the molecular weight as 58.443.",
  },
  {
    question: "What is the molar mass of C₆H₁₂O₆?",
    answer:
      "For glucose, C₆H₁₂O₆, the molar mass is approximately 180.156 g/mol. NIST lists its molecular weight as 180.1559.",
  },
  {
    question: "How do I calculate molar mass from a chemical formula?",
    answer:
      "Multiply the number of atoms of each element by its atomic-weight value and add all contributions: M = Σ(Nᵢ × Aᵢ). For example, H₂O contains two hydrogen atoms and one oxygen atom.",
  },
  {
    question: "What is the difference between molecular weight and molar mass?",
    answer:
      "Relative molecular mass is a dimensionless ratio, while molar mass is the mass per mole and is commonly expressed in g/mol. IUPAC lists 'molecular weight' as a synonym of relative molecular mass in its terminology.",
  },
  {
    question: "What is an empirical formula?",
    answer:
      "An empirical formula is the simplest whole-number ratio of elements in a compound. For example, the empirical formula of glucose C₆H₁₂O₆ is CH₂O.",
  },
  {
    question: "What is the difference between empirical and molecular formula?",
    answer:
      "The empirical formula gives the simplest composition ratio, whereas the molecular formula gives the actual molecular composition for a compound consisting of discrete molecules.",
  },
  {
    question: "How do I find a molecular formula from an empirical formula?",
    answer:
      "First calculate the empirical formula mass. Then divide the target molecular mass by the empirical formula mass: k = M_molecular / M_empirical. If k is a compatible positive integer within measurement/calculation tolerance, multiply every empirical subscript by k.",
  },
  {
    question: "How do hydrates affect molar mass?",
    answer:
      "A hydrate includes water of crystallization in its formula. For example, CuSO₄·5H₂O has a greater formula mass than anhydrous CuSO₄ because five water molecules are included in the crystal lattice (adding 90.075 g/mol).",
  },
  {
    question: "What is monoisotopic mass?",
    answer:
      "Monoisotopic mass is calculated using a specified single isotope of each constituent element rather than the abundance-weighted average used for ordinary elemental atomic-weight calculations. It is especially relevant to exact-mass and mass-spectrometry applications.",
  },
  {
    question: "Why can my molecular-weight result differ slightly from another calculator?",
    answer:
      "Small differences can result from the atomic-weight dataset, the precision carried internally and the number of displayed decimal places. For example, NIST lists glucose at 180.1559, while a calculator displaying three decimal places will show approximately 180.156.",
  },
  {
    question: "How do I convert grams to moles?",
    answer:
      "Use: n = m / M, where m is the mass in grams and M is the molar mass in g/mol.",
  },
  {
    question: "How do I convert moles to molecules?",
    answer:
      "Multiply the amount in moles by the Avogadro constant: N = n × N_A, where N_A = 6.02214076 × 10²³ mol⁻¹ exactly under the SI revision.",
  },
  {
    question: "Why is chemical formula capitalization important?",
    answer:
      "Element symbols are case-sensitive. CO₂ represents carbon dioxide, whereas Co₂ contains cobalt. A formula parser must therefore preserve or correctly resolve capitalization rather than treating the formula as ordinary case-insensitive text.",
  },
  {
    question: "Can this calculator handle parentheses and hydrates?",
    answer:
      "Yes. The current implementation supports grouped formulas and several hydrate representations, and its validation suite includes compounds such as K₄[Fe(CN)₆], CuSO₄·5H₂O, Na₂CO₃·10H₂O and MgSO₄·7H₂O.",
  },
];

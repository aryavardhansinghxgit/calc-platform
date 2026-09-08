import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const density_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is the formula for density?",
    answer: "The formula is ρ = m/V. Density equals mass divided by volume.",
  },
  {
    question: "How do I calculate density from mass and volume?",
    answer:
      "Divide mass by volume after ensuring that both quantities use compatible units. For example, 4.45 kg / 500 cm³ = 8,900 kg/m³ after converting 500 cm³ to 0.0005 m³.",
  },
  {
    question: "How do I calculate mass from density?",
    answer: "Use m = ρV. Multiply density by volume.",
  },
  {
    question: "How do I calculate volume from density?",
    answer: "Use V = m/ρ. Divide mass by density.",
  },
  {
    question: "What is the SI unit of density?",
    answer: "The SI unit is kg/m³ (kilograms per cubic metre).",
  },
  {
    question: "How many kg/m³ is 1 g/cm³?",
    answer: "1 g/cm³ = 1,000 kg/m³.",
  },
  {
    question: "Is g/mL the same as g/cm³?",
    answer: "Yes. For volume units, 1 mL = 1 cm³, so 1 g/mL = 1 g/cm³.",
  },
  {
    question: "What is specific gravity?",
    answer:
      "Specific gravity is the ratio of a substance's density to the density of a reference substance (usually pure water at 4°C for solids and liquids).",
  },
  {
    question: "What is the specific gravity of water?",
    answer:
      "When water is compared with water under the same reference condition, its specific gravity is approximately 1.0.",
  },
  {
    question: "Why does ice float?",
    answer:
      "Ice is less dense than liquid water (approximately 917 kg/m³ vs 999.97 kg/m³), so its average density is lower than that of liquid water near common reference conditions.",
  },
  {
    question: "What is the density of water?",
    answer:
      "It depends on temperature and conditions. Near its maximum liquid density around 4°C, pure water is close to 1,000 kg/m³ (specifically 999.97 kg/m³).",
  },
  {
    question: "Why is water densest around 4°C?",
    answer:
      "Hydrogen bonding and the open tetrahedral crystal structure of liquid water cause water to behave differently from ordinary liquids as it cools. Thermal contraction competes with open cage structure formation, resulting in a maximum liquid density close to 4°C.",
  },
  {
    question: "What is the density of air at 20°C?",
    answer:
      "Under standard sea-level pressure (101.325 kPa) and with dry-air assumptions, air density at 20°C is approximately 1.204 kg/m³. The exact value depends on pressure, temperature, composition, and humidity.",
  },
  {
    question: "What is the ideal-gas density formula?",
    answer:
      "ρ = PM/RT, where P is absolute pressure in pascals, M is molar mass in kg/mol, R is the universal gas constant (8.31446 J/(mol·K)), and T is absolute temperature in kelvin.",
  },
  {
    question: "What happens to gas density when pressure increases?",
    answer:
      "At constant temperature and molar mass, ideal-gas density increases in direct proportion to absolute pressure.",
  },
  {
    question: "What happens to gas density when temperature increases?",
    answer:
      "At constant pressure and molar mass, ideal-gas density decreases as absolute temperature increases.",
  },
  {
    question: "What is hydrostatic pressure?",
    answer:
      "Hydrostatic pressure is the pressure produced by the weight of a stationary fluid column. For gauge pressure: P = ρgh.",
  },
  {
    question: "What is the pressure 10 m underwater?",
    answer:
      "For water at 1,000 kg/m³ and using standard gravitational acceleration g = 9.80665 m/s²: P ≈ 98.07 kPa gauge, or about 14.22 psi.",
  },
  {
    question: "What is API gravity?",
    answer:
      "API gravity is a petroleum-industry scale related inversely to specific gravity. A commonly used relationship is °API = 141.5/SG − 131.5 at the defined 60°F reference basis.",
  },
  {
    question: "Is API gravity the same as specific gravity?",
    answer:
      "No. Specific gravity is a dimensionless density ratio, whereas API gravity is a derived petroleum scale based on specific gravity.",
  },
  {
    question: "Can density change?",
    answer:
      "Yes. Density can vary with temperature, pressure, composition, phase, moisture, porosity, and other physical conditions.",
  },
  {
    question: "Does the calculator's material density represent an exact laboratory value?",
    answer:
      "Not necessarily. Material-library values are reference estimates associated with standard conditions used by the calculator. For specification-controlled work, use the appropriate technical standard or laboratory measurement.",
  },
  {
    question: "Why does my density result differ from another calculator?",
    answer:
      "Possible causes include different unit definitions, material densities, reference temperatures, pressure assumptions, rounding precision, and conversion factors. Always compare underlying assumptions.",
  },
  {
    question: "Can density be zero?",
    answer:
      "Zero density is mathematically meaningful in some abstract calculations (a true vacuum), but physical materials are not zero-density substances. The calculator validates its supported physical domain rather than silently converting invalid inputs.",
  },
  {
    question: "Can density be negative?",
    answer:
      "Ordinary physical mass density is not negative. The calculator therefore treats negative density as invalid rather than taking its absolute value.",
  },
];

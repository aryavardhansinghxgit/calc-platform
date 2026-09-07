import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const weight_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is the formula for calculating mass from density and volume?",
    answer: "The formula is m = ρ × V. Multiply density by volume after ensuring both quantities use compatible units.",
  },
  {
    question: "What is the difference between mass and weight?",
    answer: "Mass is a physical quantity measured in kilograms. In technical physics, weight is a gravitational force measured in newtons. NIST specifically distinguishes these meanings.",
  },
  {
    question: "How do I calculate weight from mass?",
    answer: "Use W = m × g, where m is mass in kilograms and g is local gravitational acceleration in m/s².",
  },
  {
    question: "Does my mass change on the Moon?",
    answer: "No. Your mass remains the same. Your gravitational weight force changes because the Moon has a different gravitational acceleration (1.622 m/s² vs Earth's 9.807 m/s²).",
  },
  {
    question: "How much does 70 kg weigh on Mars?",
    answer: "Using the calculator's Mars gravitational value (g ≈ 3.711 m/s²), a 70 kg mass has a gravitational weight force of approximately 259.77 N, or 58.4 lbf.",
  },
  {
    question: "How many pounds are in 1 kilogram?",
    answer: "Using the international avoirdupois pound relationship, 1 kg ≈ 2.20462262 lb, or approximately 2.2046 lb. NIST lists the corresponding pound-to-kilogram conversion factor.",
  },
  {
    question: "How many kilograms are in a pound?",
    answer: "1 lb = 0.45359237 kg exactly, under the 1959 international avoirdupois pound agreement.",
  },
  {
    question: "Is a pound a unit of mass or force?",
    answer: "In common mass measurements, lb generally denotes a pound of mass (avoirdupois). lbf denotes pound-force. The distinction matters in technical calculations. NIST defines pound-force separately from the pound mass.",
  },
  {
    question: "What is density?",
    answer: "Density is mass divided by volume: ρ = m / V. It tells you how much mass occupies a given volume.",
  },
  {
    question: "Can I use grams per cubic centimeter with cubic meters?",
    answer: "Yes, but you must convert the units consistently before applying m = ρ × V. For example, 1 g/cm³ = 1000 kg/m³.",
  },
  {
    question: "What is the difference between a metric tonne and a short ton?",
    answer: "A metric tonne is exactly 1000 kg. A US short ton is 2000 avoirdupois pounds, equal to about 907.18474 kg. NIST lists them separately.",
  },
  {
    question: "What is the difference between a short ton and a long ton?",
    answer: "A short ton is 2000 lb (907.18 kg), while a long ton (UK Imperial) is 2240 lb (1016.05 kg). Their kilogram equivalents therefore differ.",
  },
  {
    question: "What is the SI unit of mass?",
    answer: "The SI base unit of mass is the kilogram, symbol kg, anchored to the fixed numerical value of the Planck constant (h).",
  },
  {
    question: "What is the SI unit of weight?",
    answer: "When weight is used in its technical sense as a gravitational force, its SI unit is the newton, N (equal to 1 kg·m/s²).",
  },
  {
    question: "Why does the calculator show both kilograms and pounds?",
    answer: "Because kilograms and pounds are different units for expressing mass. Providing both makes the result useful across metric and customary measurement systems.",
  },
  {
    question: "Why does the planetary calculator use lbf instead of lb?",
    answer: "Because the planetary section represents gravitational force, not mass. The corresponding customary force unit is pound-force, lbf. NIST distinguishes pound-force from pound mass.",
  },
  {
    question: "Is the kilogram still defined by a physical metal object?",
    answer: "No. The modern SI definition of the kilogram, adopted at the 2019 CGPM, is based on the fixed numerical value of the Planck constant (h = 6.62607015 × 10⁻³⁴ J·s).",
  },
  {
    question: "Can I use a material preset for a precise engineering calculation?",
    answer: "A preset can provide a convenient estimate, but the appropriate material specification or measured density should be used when a project requires a specific alloy grade, moisture condition, or uncertainty.",
  },
];

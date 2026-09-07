import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const mass_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is the formula for calculating mass?",
    answer:
      "Mass is calculated from density and volume using: m = ρV, where m is mass, ρ is density, and V is volume.",
  },
  {
    question: "How do I calculate mass from density and volume?",
    answer:
      "Multiply density by volume after ensuring that the units are compatible. For example: 8,900 kg/m³ × 1 m³ = 8,900 kg.",
  },
  {
    question: "What is the difference between mass and weight?",
    answer:
      "Mass measures the amount of matter and is measured in kilograms in SI. Weight, when used in the physics sense, is gravitational force and is measured in newtons.",
  },
  {
    question: "How do I convert kilograms to pounds?",
    answer:
      "Multiply kilograms by approximately: 2.2046226218 lb/kg. For example: 10 kg ≈ 22.0462 lb. For exact conversion, the calculator uses the defined relationship: 1 lb = 0.45359237 kg.",
  },
  {
    question: "How do I convert pounds to kilograms?",
    answer:
      "Multiply pounds by: 0.45359237 kg/lb. For example: 185.5 lb ≈ 84.14138 kg.",
  },
  {
    question: "How many pounds are in a kilogram?",
    answer:
      "One kilogram is approximately: 2.2046226218 pounds. The commonly used \"2.2 pounds\" is a rounded approximation.",
  },
  {
    question: "How many grams are in a kilogram?",
    answer:
      "One kilogram contains: 1,000 grams.",
  },
  {
    question: "How many ounces are in a pound?",
    answer:
      "One avoirdupois pound contains: 16 avoirdupois ounces.",
  },
  {
    question: "What is the difference between a metric tonne, short ton and long ton?",
    answer:
      "A metric tonne is 1,000 kg. A US short ton is 2,000 lb, or 907.18474 kg. A UK long ton is 2,240 lb, or 1,016.0469088 kg.",
  },
  {
    question: "What is the formula for weight on another planet?",
    answer:
      "Gravitational weight is: W = mg, where m is mass in kilograms and g is the local gravitational acceleration.",
  },
  {
    question: "Would a 70 kg object weigh less on the Moon?",
    answer:
      "Yes. Its mass remains 70 kg, but its gravitational force is much lower because the Moon's surface gravitational acceleration is lower than Earth's. Using the calculator's reference value of approximately 1.622 m/s²: W ≈ 113.54 N.",
  },
  {
    question: "Would a 70 kg object weigh more on Jupiter?",
    answer:
      "Using the calculator's reference gravitational acceleration of approximately 24.79 m/s²: W ≈ 1,735.30 N. The object's mass is still 70 kg.",
  },
  {
    question: "What is density?",
    answer:
      "Density is mass per unit volume: ρ = m/V. It indicates how much mass is contained in a specified volume.",
  },
  {
    question: "Can I calculate mass using density in g/cm³ and volume in m³?",
    answer:
      "Yes, but the units must first be made compatible. For example: 8.9 g/cm³ must be combined with cubic centimetres, or the density must be converted to a compatible unit such as kg/m³.",
  },
  {
    question: "What is the mass of 1 cubic meter of a material with density 8,900 kg/m³?",
    answer:
      "Using: m = ρV, m = 8,900 × 1 = 8,900 kg.",
  },
  {
    question: "Is pound the same as pound-force?",
    answer:
      "No. A pound used in mass conversion and pound-force are different concepts. Pound-force is a unit of force, while an avoirdupois pound is a unit of mass.",
  },
  {
    question: "What is the SI unit of mass?",
    answer:
      "The SI base unit of mass is the kilogram, symbol kg.",
  },
  {
    question: "What changed about the kilogram in 2019?",
    answer:
      "The SI definition of the kilogram was changed so that it is defined through a fixed numerical value of the Planck constant rather than through the mass of a physical prototype. The fixed value is: 6.62607015 × 10⁻³⁴ J·s.",
  },
  {
    question: "Can material density vary?",
    answer:
      "Yes. Density can vary with factors such as temperature, pressure, composition, porosity, and phase.",
  },
  {
    question: "Why can my mass calculation differ from a reference table?",
    answer:
      "Possible reasons include: different material grades, different density assumptions, different unit definitions, different rounding, temperature or pressure conditions. For engineering work, use the density specified by the relevant technical standard, manufacturer, or material datasheet.",
  },
];

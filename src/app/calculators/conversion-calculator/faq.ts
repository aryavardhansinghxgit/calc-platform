import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const conversion_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is a unit conversion calculator?",
    answer: "A unit conversion calculator converts a measurement from one unit to another while preserving the same underlying quantity. For example, 100 meters and 328.084 feet represent the same length."
  },
  {
    question: "How do I convert units manually?",
    answer: "For a simple conversion, multiply by an appropriate conversion factor. The unit-factor method makes the units explicit so that incompatible units are less likely to be mixed accidentally."
  },
  {
    question: "Is temperature conversion just multiplication?",
    answer: "No. Celsius-to-Fahrenheit includes both a scale factor and an offset: °F = (°C × 9/5) + 32. That is why temperature needs a different conversion rule from ordinary length conversion."
  },
  {
    question: "What is the difference between metric and SI units?",
    answer: "SI is the internationally standardized system underlying modern scientific measurement. Metric units such as meters, kilograms and liters are commonly used in metric measurement, while SI defines the formal system and its base and derived units. BIPM is the international authority responsible for the SI."
  },
  {
    question: "What are the seven SI base units?",
    answer: "They are the second, metre, kilogram, ampere, kelvin, mole and candela."
  },
  {
    question: "What is the difference between kB and KiB?",
    answer: "kB uses the decimal SI prefix kilo: 1 kB = 1,000 B. KiB uses the IEC binary prefix kibi: 1 KiB = 1,024 B. They are different quantities."
  },
  {
    question: "Are US gallons and Imperial gallons the same?",
    answer: "No. A US liquid gallon and an Imperial gallon have different definitions and therefore different liter equivalents."
  },
  {
    question: "Why are fuel-economy conversions reversed?",
    answer: "MPG measures distance per unit of fuel, whereas L/100 km measures fuel consumed per fixed distance. Because they are reciprocal-style measures, higher MPG corresponds to lower fuel consumption."
  },
  {
    question: "How accurate is a unit conversion calculator?",
    answer: "Accuracy depends on the conversion definition, numerical implementation and displayed precision. A properly implemented converter should preserve the underlying relationship while rounding only the displayed result where appropriate."
  },
  {
    question: "Why does my converted number have more digits than expected?",
    answer: "The calculator may retain a more precise internal result and display a chosen number of decimal places. More displayed digits do not automatically mean more physical accuracy."
  },
  {
    question: "Can a unit converter convert area and volume?",
    answer: "Yes, but area and volume must use squared and cubed relationships respectively. You cannot reuse a simple linear conversion factor unchanged for square or cubic units."
  },
  {
    question: "What is the factor-label method?",
    answer: "The factor-label method, also called dimensional analysis, multiplies a quantity by a conversion factor written as a fraction so that the original unit cancels and the desired unit remains."
  },
  {
    question: "Why is my answer slightly different from a calculator using fewer decimals?",
    answer: "The most common reason is display rounding. Two tools can use the same underlying conversion factor but show different final digits because one displays fewer decimal places."
  },
  {
    question: "Should I use a converter for engineering work?",
    answer: "A converter is useful for routine calculations and checking. For regulated, laboratory, safety-critical or specification-driven work, the governing standard, drawing, datasheet or project specification should remain the controlling authority."
  }
];

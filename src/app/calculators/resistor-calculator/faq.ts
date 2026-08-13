import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const resistor_calculatorFaqs: CalculatorFAQ[] = [
  {
    "question": "What is an electrical resistor and what does it do in a circuit?",
    "answer": "An electrical resistor is a passive two-terminal component that introduces electrical resistance into a circuit. It restricts the flow of electric current, divides voltages, adjusts signal levels, biases active components (like transistors), and converts electrical energy into heat, protecting sensitive parts from excessive current."
  },
  {
    "question": "How do I calculate a resistor's value from its color bands?",
    "answer": "To decode a resistor, read the bands from left to right. For a 4-band resistor: the first two bands represent significant digits, the third is the multiplier (power of 10), and the fourth is the tolerance. Multiply the two-digit number by the multiplier. For 5-band and 6-band resistors, the first three bands represent significant digits, followed by the multiplier and tolerance."
  },
  {
    "question": "What is the difference between 4-band, 5-band, and 6-band resistors?",
    "answer": "A 4-band resistor uses two significant digits, one multiplier, and one tolerance band. A 5-band resistor offers higher precision, using three significant digits, one multiplier, and one tolerance band. A 6-band resistor adds a sixth band representing the Temperature Coefficient of Resistance (TCR), indicating how much the resistance shifts as the temperature changes."
  },
  {
    "question": "What does the sixth band on a resistor mean?",
    "answer": "The sixth band indicates the Temperature Coefficient of Resistance (TCR) measured in parts per million per Kelvin (ppm/K). It quantifies the expected shift in resistance per degree of temperature change. For example, a 100 ppm/K coefficient means the resistance will change by 0.01% for every 1°C temperature shift."
  },
  {
    "question": "How do you calculate series resistor combinations?",
    "answer": "Resistors in series are connected end-to-end, meaning the same current flows through each. The total equivalent resistance is the simple arithmetic sum of the individual values: R_total = R_1 + R_2 + ... + R_n."
  },
  {
    "question": "How do you calculate parallel resistor combinations?",
    "answer": "Resistors in parallel share the same voltage across their terminals. The equivalent resistance is calculated using the reciprocal formula: 1 / R_total = 1 / R_1 + 1 / R_2 + ... + 1 / R_n, which resolves to R_total = 1 / (Σ 1/R_i). The equivalent resistance of a parallel network is always lower than the smallest individual resistor in the branch."
  },
  {
    "question": "What is resistor tolerance and how is it calculated?",
    "answer": "Tolerance is the allowable variance between the resistor's nominal (printed) value and its actual measured value, expressed as a percentage. For a nominal value R and tolerance T%, the minimum value is R_min = R × (1 - T/100) and the maximum is R_max = R × (1 + T/100)."
  },
  {
    "question": "How does wire length affect its electrical resistance?",
    "answer": "Resistance is directly proportional to conductor length. As the length of a wire doubles, electrons encounter twice as many collisions along the path, doubling the resistance (R = ρ × L / A)."
  },
  {
    "question": "How does wire thickness or cross-sectional area affect resistance?",
    "answer": "Resistance is inversely proportional to the cross-sectional area of the conductor. A thicker wire (larger area) provides a wider path for electron flow, reducing electrical resistance (R = ρ × L / A). Doubling the wire area cuts the resistance in half."
  },
  {
    "question": "What is the difference between resistance and resistivity?",
    "answer": "Resistivity (ρ) is an intrinsic physical property of a material indicating how strongly it opposes electrical current, independent of shape or size. Resistance (R) is the property of a specific object that depends on both the material's resistivity and its physical dimensions (length and area)."
  },
  {
    "question": "What is electrical conductivity?",
    "answer": "Electrical conductivity (σ) is the measure of a material's ability to conduct electric current. It is the mathematical reciprocal of electrical resistivity: σ = 1 / ρ. Materials with high conductivity, like copper or silver, offer low resistance to current flow."
  },
  {
    "question": "What does a 3-digit SMD resistor code mean?",
    "answer": "A 3-digit Surface Mount Device (SMD) code uses the first two digits as significant figures and the third digit as the multiplier exponent (power of 10). For example, a code of '472' translates to 47 × 10² = 4,700 Ω, or 4.7 kΩ."
  },
  {
    "question": "What does a 4-digit SMD resistor code mean?",
    "answer": "A 4-digit SMD code is used for high-precision components. The first three digits represent the significant figures, and the fourth is the multiplier exponent. For example, a code of '1002' translates to 100 × 10² = 10,000 Ω, or 10 kΩ."
  },
  {
    "question": "What is the EIA-96 SMD resistor marking system?",
    "answer": "EIA-96 is a standardized coding system for 1% tolerance SMD resistors. It uses a three-character code: two digits (01 to 96) lookup a base significant value in a standard table, and one trailing letter indicates the multiplier power of ten."
  },
  {
    "question": "How does temperature affect wire resistance?",
    "answer": "As temperature increases, metal atoms vibrate more rapidly, increasing the frequency of electron collisions and raising resistance. This is calculated using the formula: R(T) = R_20 × [1 + α × (T - 20)], where α is the material's temperature coefficient."
  },
  {
    "question": "How do I choose the correct resistor wattage?",
    "answer": "Calculate the power dissipation using P = I²R or P = V²/R. Choose a resistor with a power rating at least twice the calculated power (50% derating safety margin) to prevent overheating and ensure long-term component reliability."
  }
];

export default resistor_calculatorFaqs;

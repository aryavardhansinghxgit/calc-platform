import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const resistor_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "How do I calculate resistor value from color bands?",
    answer: "First determine whether the resistor has four, five or six bands. Then interpret the significant digits, multiplier and tolerance according to the applicable marking system. For a common 4-band resistor: Digit 1, Digit 2, Multiplier, Tolerance. IEC 60062 covers resistor colour coding and related marking systems."
  },
  {
    question: "What does a 4-band resistor mean?",
    answer: "A common 4-band resistor uses: Band 1 = first digit, Band 2 = second digit, Band 3 = multiplier, Band 4 = tolerance. For example, Brown – Black – Red – Gold means: 10 × 100 = 1,000 Ω = 1 kΩ ±5%."
  },
  {
    question: "How do I read a 5-band resistor?",
    answer: "A 5-band resistor normally uses three significant digits before the multiplier: Digit 1, Digit 2, Digit 3, Multiplier, Tolerance. This allows a more precise nominal resistance than the common 4-band arrangement."
  },
  {
    question: "What does the sixth resistor color band mean?",
    answer: "On a 6-band resistor, the sixth band commonly represents the temperature coefficient of resistance, normally expressed in ppm/K. IEC 60062 includes temperature-coefficient marking provisions."
  },
  {
    question: "What is resistor tolerance?",
    answer: "Tolerance describes the permitted variation around the nominal resistance. For a resistor marked 10 kΩ ±5%, the nominal tolerance limits are 9.5 kΩ to 10.5 kΩ."
  },
  {
    question: "What is the formula for resistors in series?",
    answer: "Use: Rtotal = R1 + R2 + R3 + ... For example: 100 Ω + 220 Ω + 470 Ω = 790 Ω."
  },
  {
    question: "What is the formula for resistors in parallel?",
    answer: "Use: 1/Rtotal = 1/R1 + 1/R2 + 1/R3 + ... For two resistors, this can also be written: Rtotal = (R1 × R2) / (R1 + R2), provided both resistors are finite and nonzero."
  },
  {
    question: "Why is parallel resistance smaller than the smallest resistor?",
    answer: "Parallel branches provide additional paths for current, increasing the total conductance. For ordinary positive resistors: Rparallel < smallest branch resistance. The calculator verifies this monotonic behavior across randomized test cases."
  },
  {
    question: "What does SMD resistor code 103 mean?",
    answer: "For the common 3-digit format, 103 means 10 × 10³ Ω = 10,000 Ω = 10 kΩ. It does not mean 103 Ω. DigiKey documents the same three-digit interpretation."
  },
  {
    question: "What does SMD resistor code 472 mean?",
    answer: "472 means 47 × 10² Ω = 4,700 Ω = 4.7 kΩ. The final digit is the power-of-ten multiplier."
  },
  {
    question: "What does 4R7 mean on a resistor?",
    answer: "R is commonly used as a decimal-point marker, so 4R7 = 4.7 Ω. The same convention is used for values such as R47 = 0.47 Ω, depending on the marking format and component specification."
  },
  {
    question: "What is an E24 resistor?",
    answer: "E24 is one of the IEC preferred-number series used for resistor values. IEC 60063 defines preferred-number series for resistors and capacitors. The calculator uses E-series selection to find a practical standardized nominal value close to a requested resistance."
  },
  {
    question: "What tolerance is associated with E24?",
    answer: "In the calculator's E-series implementation, E24 is treated as a ±5% manufacturing-tolerance class. That tolerance is separate from the numerical difference between the requested target and the selected preferred value."
  },
  {
    question: "How is wire resistance calculated?",
    answer: "For a uniform conductor: R = ρL/A. For a round wire: A = πd²/4, so resistance depends on material resistivity, length and the square of diameter."
  },
  {
    question: "How do I calculate resistor power?",
    answer: "Common equivalent forms are: P = VI, P = I²R, and P = V²/R. Use the form that matches the quantities you know. When selecting a real resistor, compare the calculated dissipation with the component's rated power and the application's operating conditions."
  }
];

export default resistor_calculatorFaqs;

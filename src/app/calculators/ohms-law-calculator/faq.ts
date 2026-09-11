import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const ohms_law_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is Ohm's Law?",
    answer: "Ohm's Law describes the relationship between voltage, current and resistance for ohmic electrical behavior: V = I × R. It can be rearranged to calculate current or resistance."
  },
  {
    question: "What is the formula for Ohm's Law?",
    answer: "The basic equation is: V = I × R, where V is voltage, I is current and R is resistance."
  },
  {
    question: "How do I calculate voltage with Ohm's Law?",
    answer: "Multiply current by resistance: V = I × R. For example, 3 A through 4 Ω produces: V = 3 × 4 = 12 V."
  },
  {
    question: "How do I calculate current?",
    answer: "Divide voltage by resistance: I = V ÷ R. For example: 12 V ÷ 4 Ω = 3 A."
  },
  {
    question: "How do I calculate resistance?",
    answer: "Divide voltage by current: R = V ÷ I. For example: 12 V ÷ 3 A = 4 Ω."
  },
  {
    question: "How do I calculate electrical power?",
    answer: "For a resistive circuit, use any applicable form: P = VI, P = I²R, P = V²/R. The equations produce the same result when the underlying assumptions are satisfied."
  },
  {
    question: "What is the relationship between power and resistance?",
    answer: "At constant voltage: P = V²/R, so increasing resistance decreases power. At constant current: P = I²R, so increasing resistance increases power. The result therefore depends on which electrical quantity is being held constant."
  },
  {
    question: "What happens to current if resistance increases?",
    answer: "At constant voltage: I = V/R. Therefore, increasing resistance decreases current. For example, doubling resistance while keeping voltage constant halves the current."
  },
  {
    question: "What happens to current if voltage increases?",
    answer: "At constant resistance: I = V/R. Therefore, current increases proportionally with voltage. For an ohmic resistor, doubling voltage doubles current."
  },
  {
    question: "Can I use Ohm's Law for AC circuits?",
    answer: "It depends on the circuit. For a purely resistive AC element, the resistance relationship can be used for the appropriate steady-state calculation. For circuits with inductors and capacitors, impedance and phase relationships must generally be included. Ohm's Law in its broader AC form is expressed using impedance rather than resistance alone."
  },
  {
    question: "What is the difference between resistance and impedance?",
    answer: "Resistance is the resistive opposition to current. Impedance is the broader AC quantity that combines resistance with reactance. For a general AC circuit: Z = R + jX, where X represents reactance."
  },
  {
    question: "How does a voltage divider work?",
    answer: "A two-resistor voltage divider produces: Vout = Vin × R2/(R1 + R2) for the standard unloaded configuration. The calculator also supports a loaded-divider calculation when an output load resistor is present."
  },
  {
    question: "How does a current divider work?",
    answer: "Parallel branches share the same voltage while the total current divides among them. The calculator determines equivalent resistance, parallel voltage and individual branch currents. The branch currents must sum to the total current."
  },
  {
    question: "How do I calculate an LED resistor?",
    answer: "For a simple resistor-limited LED circuit: R = (Vs − Vf)/If. Use the supply voltage, LED forward voltage and desired forward current. For example, 9 V supply, 2 V LED drop and 20 mA requires: R = 350 Ω. The calculator then selects an appropriate standard E24 resistance."
  },
  {
    question: "Why is the recommended LED resistor sometimes higher than the calculated resistance?",
    answer: "Standard resistor values are discrete. A resistor below the calculated minimum can allow more LED current than intended. The calculator therefore selects the smallest E24 value that is at least as large as the calculated target resistance."
  },
  {
    question: "What happens if my Ohm's Law inputs disagree?",
    answer: "If several entered values do not satisfy the relevant equations, the calculator can flag the inconsistency rather than silently replacing your data. For example: V = 12 V, I = 3 A, R = 10 Ω does not satisfy: V = IR because: 3 × 10 = 30 V. Such a discrepancy may indicate an incorrect unit, measurement error, or a circuit that does not fit the assumed model."
  }
];

export default ohms_law_calculatorFaqs;

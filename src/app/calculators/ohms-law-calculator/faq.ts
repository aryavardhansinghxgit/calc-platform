import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const ohms_law_calculatorFaqs: CalculatorFAQ[] = [
  {
    "question": "What is Ohm's Law?",
    "answer": "Ohm's Law is a fundamental electrical principle stating that the electric current (I) flowing through a conductor between two points is directly proportional to the voltage drop (V) across those points, and inversely proportional to the resistance (R) of the path. Mathematically, it is expressed as V = I × R."
  },
  {
    "question": "What is the formula for Ohm's Law?",
    "answer": "The primary formula is V = I × R (Voltage = Current × Resistance). From this, we derive the equations: I = V / R (Current = Voltage / Resistance) and R = V / I (Resistance = Voltage / Current)."
  },
  {
    "question": "How do I calculate voltage using Ohm's Law?",
    "answer": "To calculate Voltage (V), multiply the electric Current (I) in Amperes by the electrical Resistance (R) in Ohms. The formula is V = I × R."
  },
  {
    "question": "How do I calculate electric current?",
    "answer": "To calculate Current (I), divide the Voltage (V) across the circuit by the total Resistance (R) of the load. The formula is I = V / R."
  },
  {
    "question": "How do I calculate electrical resistance?",
    "answer": "To calculate Resistance (R), divide the Voltage drop (V) across the component by the Current (I) flowing through it. The formula is R = V / I."
  },
  {
    "question": "How do I calculate electrical power?",
    "answer": "Electrical Power (P) in Watts is calculated by multiplying Voltage (V) by Current (I): P = V × I. By integrating Ohm's Law, it can also be calculated using P = I² × R or P = V² / R."
  },
  {
    "question": "What are the four variables in Ohm's Law and power relationships?",
    "answer": "The four fundamental variables are Voltage (V, measured in Volts), Current (I, measured in Amperes), Resistance (R, measured in Ohms), and Power (P, measured in Watts)."
  },
  {
    "question": "What is the relationship between electrical power and resistance?",
    "answer": "Power is directly proportional to resistance when current is held constant (P = I²R), and inversely proportional to resistance when voltage is held constant (P = V²/R)."
  },
  {
    "question": "Can I calculate power using only voltage and current?",
    "answer": "Yes. Power (P) is equal to Voltage (V) multiplied by Current (I), using the equation P = V × I. This applies to resistive DC circuits and in-phase AC circuits."
  },
  {
    "question": "What happens to the current in a circuit when resistance increases?",
    "answer": "According to I = V / R, if the voltage (V) remains constant, the current (I) is inversely proportional to resistance. Therefore, increasing the resistance reduces the current."
  },
  {
    "question": "What happens to current when voltage increases?",
    "answer": "According to I = V / R, if the resistance (R) remains constant, the current (I) is directly proportional to voltage. Therefore, increasing the voltage increases the current."
  },
  {
    "question": "What is the difference between voltage and current?",
    "answer": "Voltage is the potential difference or electrical pressure that pushes charge carriers, whereas current is the physical flow rate of those charge carriers through the conductor."
  },
  {
    "question": "What is the difference between resistance and impedance?",
    "answer": "Resistance is the opposition to charge flow in DC and purely resistive AC circuits. Impedance (Z) is a broader concept used in AC circuits that combines resistance and reactance (opposition from capacitors and inductors) across varying frequencies."
  },
  {
    "question": "Does Ohm's Law work for AC circuits?",
    "answer": "Ohm's Law works for AC circuits, but only if they are purely resistive. If capacitors or inductors are present, resistance (R) must be replaced with impedance (Z), resulting in the vector formula V = I × Z."
  },
  {
    "question": "How do I calculate a current-limiting resistor for an LED?",
    "answer": "Subtract the LED forward voltage drop (Vf) from the supply voltage (Vsource), then divide the result by the desired forward current (If) in Amperes: R = (Vsource - Vf) / If."
  },
  {
    "question": "Why do my entered Ohm's Law inputs disagree?",
    "answer": "If you input three or four values (e.g. V, I, and R), they must satisfy V = I × R. If they do not, they are mathematically inconsistent, indicating a measurement error or a non-resistive load in the physical circuit."
  }
];

export default ohms_law_calculatorFaqs;

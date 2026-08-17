import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const binary_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is two's complement and why is it used?",
    answer: "Two's complement is a binary representation system for signed negative numbers formed by inverting all bits (1's complement) and adding 1. It allows digital arithmetic logic units (ALUs) to perform subtraction using standard addition circuitry."
  },
  {
    question: "How do you add two binary numbers with carry?",
    answer: "Add bits column-by-column from right to left using binary rules: 0+0=0, 0+1=1, 1+0=1, and 1+1=0 with a carry bit of 1 forwarded to the next column."
  },
  {
    question: "Can this calculator handle floating-point or negative binary numbers?",
    answer: "Yes! The calculator supports signed negative binary numbers using 2's complement representation across 8-bit, 16-bit, 32-bit, and 64-bit register widths."
  },
  {
    question: "What is the difference between bitwise shift and arithmetic shift?",
    answer: "A logical bitwise shift (<< or >>) moves all bits and fills empty positions with zeros. An arithmetic right shift preserves the sign bit (MSB) to maintain correct negative integer values."
  },
  {
    question: "How do you convert binary to hexadecimal and octal?",
    answer: "To convert to hexadecimal, group binary bits into sets of 4 from right to left (each 4-bit nibble maps to hex 0-F). To convert to octal, group bits into sets of 3 (each 3-bit group maps to octal 0-7)."
  },
  {
    question: "What is the difference between bitwise AND, OR, and XOR operations?",
    answer: "Bitwise AND (&) outputs 1 only when both input bits are 1. Bitwise OR (|) outputs 1 if at least one input bit is 1. Bitwise XOR (^) outputs 1 when the two input bits are different."
  },
  {
    question: "How does binary long division work with remainders?",
    answer: "Binary division mirrors decimal long division by iteratively comparing the divisor to the partial dividend. If the divisor fits, output a quotient bit of 1 and subtract; otherwise output 0 and shift to the next bit."
  },
  {
    question: "Why do computers use binary instead of decimal?",
    answer: "Computers use binary because physical semiconductor transistors naturally operate in two distinct electrical states: voltage presence (ON / 1) or absence (OFF / 0), providing maximum noise immunity and hardware simplicity."
  },
  {
    question: "What is an 8-bit, 16-bit, or 64-bit overflow?",
    answer: "Overflow occurs when a calculation produces a result exceeding the maximum representable capacity of a fixed bit register (e.g. 255 for unsigned 8-bit). Extra carry bits beyond the width are truncated."
  },
  {
    question: "How are ASCII characters represented in binary code?",
    answer: "ASCII assigns a unique 8-bit binary number (0 to 127) to every character, number, and symbol. For example, uppercase 'A' is 65 in decimal, represented in binary as 01000001."
  }
];

export default binary_calculatorFaqs;

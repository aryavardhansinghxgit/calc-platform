import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const hex_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "Why do programmers use Hexadecimal instead of Binary?",
    answer: "Programmers use Hexadecimal because it provides a human-readable, compact representation of binary data. One hex digit represents exactly 4 binary bits (a nibble), allowing a full 8-bit byte (0-255) to be written in just two hex characters (0x00 to 0xFF)."
  },
  {
    question: "How do you represent negative numbers in Hex?",
    answer: "Negative numbers are represented in Hex using Two's Complement notation within a fixed register width (e.g. 8-bit, 16-bit, 32-bit). The most significant bit (MSB) acts as the sign bit."
  },
  {
    question: "What is a nibble?",
    answer: "A nibble is a four-bit aggregation of binary digits (half a byte). Exactly one hexadecimal character (0-9, A-F) maps to a single 4-bit nibble."
  },
  {
    question: "How does IEEE 754 floating-point conversion work in Hex?",
    answer: "In IEEE 754 single precision (32-bit), the 8-digit hex value is split into 1 Sign bit, an 8-bit biased exponent (bias 127), and a 23-bit mantissa fraction."
  },
  {
    question: "How do you convert Hexadecimal to Decimal?",
    answer: "Multiply each hex digit by 16 raised to its column position power (starting at 0 on the right) and sum the products. For example, 0x2AA = (2 × 256) + (10 × 16) + (10 × 1) = 682."
  },
  {
    question: "What does the '0x' prefix mean in Hexadecimal?",
    answer: "The '0x' prefix is a standard programming convention (used in C, C++, Java, JavaScript, Python) to indicate that the following string is formatted in base-16 hexadecimal rather than base-10 decimal."
  },
  {
    question: "How does Hex addition carry work when reaching 16?",
    answer: "In Hex column addition, when the sum reaches or exceeds 16, subtract 16 to get the column result digit and carry 1 to the next higher-order column."
  },
  {
    question: "What is the difference between signed 2's complement and unsigned Hex?",
    answer: "Unsigned Hex represents non-negative values from 0 to 2ⁿ-1. Signed 2's complement interprets high-order bits as negative quantities, spanning from -2ⁿ⁻¹ to +2ⁿ⁻¹-1."
  },
  {
    question: "How are web color codes written in Hex?",
    answer: "Web color codes use 6 hex digits (#RRGGBB) to specify Red, Green, and Blue intensities from 00 (0) to FF (255). An optional 4th byte (#RRGGBBAA) specifies alpha transparency."
  },
  {
    question: "What happens during Hex bitwise shifting (<< and >>)?",
    answer: "Left shifting a hex value by 4 bits moves all digits one position left (multiplying by 16). Right shifting by 4 bits moves all digits one position right (dividing by 16)."
  }
];

export default hex_calculatorFaqs;

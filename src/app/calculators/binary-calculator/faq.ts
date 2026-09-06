import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const binary_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is a binary calculator?",
    answer:
      "A binary calculator performs arithmetic and logical operations using the base-2 number system, where values are represented with 0 and 1. This calculator also supports bitwise operations, fixed-width signed representation, and base conversion.",
  },
  {
    question: "How do I add binary numbers?",
    answer:
      "Align the binary digits from right to left and add each column using the binary rules 0+0=0, 0+1=1, and 1+1=10, carrying the extra bit to the next column. The calculator shows the carry chain so you can verify each step.",
  },
  {
    question: "How do I convert binary to decimal?",
    answer:
      "Multiply each binary digit by its corresponding power of two and add the results. For example, 1011₂ = 8 + 2 + 1 = 11₁₀.",
  },
  {
    question: "How do I convert decimal to binary?",
    answer:
      "Repeatedly divide the decimal integer by 2 and record each remainder. Reading the remainders from bottom to top gives the binary representation. The calculator performs this conversion automatically and shows the division steps.",
  },
  {
    question: "What is the difference between signed and unsigned binary?",
    answer:
      "Unsigned binary treats all bits as magnitude, while signed two's-complement binary reserves the highest bit as part of the sign representation. For example, the eight-bit pattern 11111101 is 253 unsigned but −3 as signed two's complement.",
  },
  {
    question: "What is two's complement?",
    answer:
      "Two's complement is a fixed-width representation for signed integers. To obtain the negative representation of a positive binary value, invert all bits and add 1.",
  },
  {
    question: "What does binary overflow mean?",
    answer:
      "Overflow occurs when a mathematical result cannot be represented within the selected register width. For example, 255 + 1 = 256, but an unsigned eight-bit register can store only 0 through 255, so the stored result wraps to 00000000 with a carry-out.",
  },
  {
    question: "What is a bitwise AND operation?",
    answer:
      "Bitwise AND compares corresponding bits and produces 1 only when both corresponding bits are 1.",
  },
  {
    question: "What is the difference between XOR and OR?",
    answer:
      "OR produces 1 when either input bit is 1, whereas XOR produces 1 only when the two input bits are different.",
  },
  {
    question: "Why is hexadecimal useful for binary values?",
    answer:
      "One hexadecimal digit represents exactly four binary bits, making long binary values much shorter to read and write. For example, 10111001 becomes B9 in hexadecimal.",
  },
  {
    question: "Can this calculator handle numbers larger than 2⁵³ - 1?",
    answer:
      "Yes. The calculator's large-integer calculation and conversion path uses arbitrary-precision integer arithmetic. This avoids the precision limitation that applies to JavaScript Number values beyond 2⁵³ - 1.",
  },
  {
    question: "What bases does the converter support?",
    answer:
      "The converter supports integer bases from 2 through 36, allowing common systems such as binary, octal, decimal and hexadecimal as well as less common positional bases.",
  },
  {
    question: "What is binary modulo?",
    answer:
      "Binary modulo returns the remainder after dividing one binary integer by another. For example, 13 mod 5 = 3, which is 0011 in binary.",
  },
  {
    question: "Why does an eight-bit result sometimes differ from the mathematical result?",
    answer:
      "An eight-bit register can store only a finite range of bit patterns. If an operation produces a value outside that range, the register representation can wrap or truncate while the underlying mathematical result remains different. The calculator displays the representation and overflow information separately.",
  },
];

export default binary_calculatorFaqs;

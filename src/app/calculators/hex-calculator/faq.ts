import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const hex_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is a hex calculator?",
    answer: "A hex calculator performs calculations directly on hexadecimal (base-16) numbers. Depending on the tool, this includes hexadecimal arithmetic (+, -, ×, ÷, MOD), bitwise operations (AND, OR, XOR, NOT, bit shifts), signed and unsigned two's complement interpretation, and conversions between hexadecimal, decimal, binary, octal, and arbitrary number bases."
  },
  {
    question: "How do I calculate hexadecimal numbers?",
    answer: "Enter your hexadecimal operands (using digits 0–9 and letters A–F), select your desired arithmetic or bitwise operator, and inspect the calculated result. For example, 0x8AB + 0xB78 = 0x1423. The result can then be inspected simultaneously in other numeral systems such as decimal (5155), binary (0001 0100 0010 0011), and octal (012043)."
  },
  {
    question: "How do I convert hex to decimal?",
    answer: "Multiply each hexadecimal digit by 16 raised to the power of its column position (starting from 0 on the right) and sum the products. For example: 0x2F = (2 × 16¹) + (15 × 16⁰) = 32 + 15 = 47. The calculator performs this conversion automatically in real time."
  },
  {
    question: "How do I convert hexadecimal to binary?",
    answer: "Replace every hexadecimal digit with its exact 4-bit binary nibble equivalent. For example: 0xAB = 1010 1011 in binary, because A represents 1010₂ and B represents 1011₂. Since each hex digit corresponds to exactly four binary bits, conversion requires no decimal intermediate arithmetic."
  },
  {
    question: "What is 0xFF in decimal?",
    answer: "In an ordinary unsigned interpretation, 0xFF equals 255. In an 8-bit signed two's complement interpretation, the identical bit pattern (11111111₂) represents -1. The numerical meaning therefore depends on whether the register is configured as signed or unsigned."
  },
  {
    question: "What is 0x100 in decimal?",
    answer: "0x100 = 1 × 16² + 0 × 16¹ + 0 × 16⁰ = 256. In an 8-bit register, adding 0xFF + 0x01 produces mathematical 0x100 (256), but the 8-bit stored register truncates to 0x00 with a carry-out of 1."
  },
  {
    question: "What does hexadecimal AND do?",
    answer: "Hexadecimal bitwise AND converts both operands to binary and evaluates each corresponding bit independently: the result bit is 1 only if both operand bits are 1. For example, 0xCC (1100 1100₂) AND 0xAA (1010 1010₂) = 0x88 (1000 1000₂). It is commonly used for masking and clearing specific bit flags."
  },
  {
    question: "What is the difference between >> and >>>?",
    answer: "An arithmetic right shift (>>) preserves the sign bit for signed two's complement numbers, copying the most significant bit into vacated high-order bit positions. A logical right shift (>>>) is a zero-fill shift that always shifts zeros into vacated high-order positions regardless of the sign bit."
  },
  {
    question: "What is two's complement?",
    answer: "Two's complement is the standard binary encoding used by computers to represent signed negative integers. For an N-bit word, the most significant bit (MSB) acts as a negative weight (-2^(N-1)), allowing addition and subtraction of positive and negative integers to use identical hardware adder circuits."
  },
  {
    question: "Why does an 8-bit result wrap around?",
    answer: "An 8-bit register can hold only 8 binary bits (values 0 to 255 unsigned). If an arithmetic operation produces a result exceeding 255 (such as 0xFF + 0x01 = 256), the lower 8 bits (0x00) are stored in the register, while the extra 9th bit is flagged separately as carry-out and unsigned overflow."
  },
  {
    question: "Can a hex calculator handle values larger than 2⁵³ − 1?",
    answer: "Standard JavaScript Number types lose precision above 2⁵³ - 1 (9,007,199,254,740,991). This calculator implements arbitrary-precision BigInt arithmetic, ensuring exact calculation and base conversion for 64-bit registers (up to 18,446,744,073,709,551,615) and beyond with zero floating-point rounding error."
  },
  {
    question: "What is a nibble in hexadecimal?",
    answer: "A nibble is an aggregation of four binary bits (half a byte). Because 2⁴ = 16, exactly one hexadecimal character (0–9, A–F) represents one 4-bit nibble."
  },
  {
    question: "What is a byte in hexadecimal?",
    answer: "A byte consists of eight binary bits (two nibbles) and is written in hexadecimal as two digits spanning from 0x00 (0) to 0xFF (255)."
  },
  {
    question: "What are hexadecimal numbers used for?",
    answer: "Hexadecimal is used throughout computer science, software engineering, and digital systems: inspecting memory addresses and pointer values, reading compiled bytecodes and opcodes, networking MAC and IPv6 addresses, defining web color codes (#RRGGBB), debugging embedded microcontroller registers, and configuring cryptographic keys and checksums."
  }
];

export default hex_calculatorFaqs;

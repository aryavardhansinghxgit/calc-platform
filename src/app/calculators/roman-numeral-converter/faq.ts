import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const roman_numeral_converterFaqs: CalculatorFAQ[] = [
  {
    question: "What are the seven Roman numeral symbols?",
    answer:
      "The seven basic Roman numeral symbols are I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, and M = 1,000.",
  },
  {
    question: "How do I convert a number to Roman numerals?",
    answer:
      "Break the number into Roman-compatible values and combine the symbols using the standard additive and subtractive rules. The calculator performs this conversion automatically.",
  },
  {
    question: "How do I convert Roman numerals back to numbers?",
    answer:
      "Enter a valid Roman numeral such as LXIII or MCMXCIV. The converter validates the numeral and returns its decimal value.",
  },
  {
    question: "What is 63 in Roman numerals?",
    answer: "63 is LXIII (50 + 10 + 1 + 1 + 1).",
  },
  {
    question: "What is 1994 in Roman numerals?",
    answer: "1994 is MCMXCIV (1000 + 900 + 90 + 4).",
  },
  {
    question: "What is 2026 in Roman numerals?",
    answer: "2026 is MMXXVI (2000 + 20 + 6).",
  },
  {
    question: "What is the largest standard Roman numeral?",
    answer:
      "The conventional canonical range commonly used by modern Roman-numeral converters ends at 3,999, written MMMCMXCIX. Extended conventions such as the vinculum can represent larger values.",
  },
  {
    question: "Why is 4 written as IV instead of IIII?",
    answer:
      "IV is the canonical subtractive form used by this converter. IIII is a historical/display variant encountered in some contexts, especially on clock faces, but it is not the canonical form enforced here.",
  },
  {
    question: "Why is 9 written as IX?",
    answer:
      "IX uses the standard subtractive pair in which I precedes X, giving 10 − 1 = 9.",
  },
  {
    question: "Is IL a valid Roman numeral for 49?",
    answer:
      "No. Under the calculator's strict classical grammar, IL is invalid. The canonical form is XLIX (40 + 9).",
  },
  {
    question: "Is IC a valid Roman numeral for 99?",
    answer:
      "No. The canonical form is XCIX (90 + 9).",
  },
  {
    question: "Can Roman numerals represent zero?",
    answer:
      "There is no standard classical Roman numeral symbol for zero. Historical accounting practices sometimes used nulla or N, but these are not the normal seven-symbol Roman numeral system.",
  },
  {
    question: "Can Roman numerals represent negative numbers?",
    answer:
      "Not in the standard canonical system supported by this calculator. Arithmetic operations that produce a negative result are therefore handled as an explicit underflow condition.",
  },
  {
    question: "How does the Roman numeral date converter work?",
    answer:
      "It converts the month, day, and year separately into Roman numerals and then arranges them according to the selected date order and separator.",
  },
  {
    question: "What is August 17, 2026 in Roman numerals?",
    answer:
      "In month-day-year order: VIII · XVII · MMXXVI.",
  },
  {
    question: "What is 2024 in Roman numerals?",
    answer: "2024 in Roman numerals is MMXXIV.",
  },
  {
    question: "Can I perform arithmetic with Roman numerals?",
    answer:
      "Yes. The calculator supports the implemented arithmetic operations by converting the operands to integers, performing the mathematical operation, and converting the result back into canonical Roman notation.",
  },
  {
    question: "What is XLV + XVIII in Roman numerals?",
    answer:
      "XLV = 45 and XVIII = 18. 45 + 18 = 63. Therefore, XLV + XVIII = LXIII.",
  },
  {
    question: "What is a Roman numeral vinculum?",
    answer:
      "A vinculum is an overline placed above a Roman numeral expression. Under the convention used by this calculator, the overline multiplies its value by 1,000 (for example, V̅ = 5,000).",
  },
  {
    question: "Does the calculator support numbers above 3,999?",
    answer:
      "Yes, through its supported vinculum/overline convention up to the implementation's documented extended range (3,999,999). Double-overline and Apostrophus are educationally documented but not interactive parser modes.",
  },
];

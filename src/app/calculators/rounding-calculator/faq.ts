import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const rounding_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is a rounding calculator?",
    answer: "A rounding calculator takes a number and applies a selected rounding rule and precision, such as two decimal places, three significant figures, nearest 100, or the nearest multiple."
  },
  {
    question: "How do I round a number to 2 decimal places?",
    answer: "Keep two digits after the decimal point, then inspect the third digit. If that deciding digit is 5 or greater under the selected nearest-rounding rule, increase the second decimal digit by one; otherwise keep it unchanged."
  },
  {
    question: "What is 12.34567 rounded to 2 decimal places?",
    answer: "Using standard Round Half Up, the result is 12.35. The hundredths digit is 4 and the deciding digit is 5, so the 4 becomes 5."
  },
  {
    question: "What is the difference between decimal places and significant figures?",
    answer: "Decimal places count digits after the decimal point. Significant figures count meaningful digits beginning with the first nonzero digit."
  },
  {
    question: "How do I round to 3 significant figures?",
    answer: "Start at the first nonzero digit, keep three meaningful digits, inspect the next digit, and apply the selected rounding rule."
  },
  {
    question: "What is banker's rounding?",
    answer: "Banker's rounding, also called half-to-even rounding, sends an exact halfway case to the result with an even retained digit. For example, 2.5 becomes 2 while 3.5 becomes 4."
  },
  {
    question: "How are negative numbers rounded?",
    answer: "The result depends on the method. For example, floor(-5.7) = -6, ceiling(-5.7) = -5, and rounding toward zero gives -5."
  },
  {
    question: "What is the deciding digit in rounding?",
    answer: "It is the digit immediately to the right of the last digit you want to retain."
  },
  {
    question: "Why does 9.99 rounded to one decimal place become 10.0?",
    answer: "The tenths digit must be determined from the hundredths digit. Since 9.99 is above the halfway point, the result carries into the next whole number. The trailing zero is retained to show one decimal place."
  },
  {
    question: "Can I round to the nearest 10, 100, or 1000?",
    answer: "Yes. Place-value rounding can be used for tens, hundreds, thousands, and other selected powers of ten."
  },
  {
    question: "Can I round to the nearest fraction?",
    answer: "Yes. The fraction mode can express the result using a selected denominator and reduce the resulting fraction to lowest terms."
  },
  {
    question: "What is the difference between rounding and truncation?",
    answer: "Rounding considers the discarded digits and chooses the appropriate nearby value. Truncation simply removes the unwanted digits."
  },
  {
    question: "Should I round intermediate calculations?",
    answer: "Usually, keep sufficient precision through intermediate calculations and round the final reported result unless your specific procedure says otherwise. NIST guidance similarly emphasizes preserving precision through calculations and rounding final reported values appropriately."
  },
  {
    question: "Why can two calculators give different rounding results?",
    answer: "They may be using different rounding conventions, particularly at exact halfway values. Check whether they use Half Up, Half Down, Half Even, Floor, Ceiling, or another rule."
  },
  {
    question: "Why are trailing zeros important?",
    answer: "Trailing zeros can communicate the intended precision. For example, 10.0 clearly indicates one decimal place, while 10 does not."
  },
  {
    question: "Is 0.009995 the same as 0.01?",
    answer: "They are numerically different. When rounded to three significant figures, however, 0.009995 becomes 0.0100 under the relevant tie rule. The trailing zeros communicate the significant-figure precision."
  }
];

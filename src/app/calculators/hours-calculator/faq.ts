import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const hours_calculatorFaqs: CalculatorFAQ[] = [
  {
    "question": "Does this handle shifts crossing midnight?",
    "answer": "Yes, if the end time is earlier than the start time, it automatically adds 24 hours."
  }
];

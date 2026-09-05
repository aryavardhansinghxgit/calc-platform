import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const random_number_generatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is a random number generator?",
    answer: "A random number generator produces values according to a defined random-generation process. In this calculator, you specify the allowed range and can choose integer or decimal output."
  },
  {
    question: "Can I generate a random number between 1 and 100?",
    answer: "Yes. Enter 1 as the lower limit and 100 as the upper limit, then select integer mode and generate one value."
  },
  {
    question: "Is the range inclusive?",
    answer: "Yes. The generator treats the requested lower and upper bounds as part of the allowed range when the input is valid."
  },
  {
    question: "Can I generate negative random numbers?",
    answer: "Yes. Negative ranges such as -100 to -1 or ranges crossing zero such as -50 to 50 are supported."
  },
  {
    question: "Can I generate decimal random numbers?",
    answer: "Yes. Use decimal mode and specify the precision you need. The implementation uses exact scaled-integer handling for high-precision decimal generation."
  },
  {
    question: "Can I generate multiple random numbers at once?",
    answer: "Yes. The comprehensive generator supports multiple results and can visualize the generated dataset."
  },
  {
    question: "Is this better than Math.random()?",
    answer: "For browser-side cryptographically strong random generation, the calculator uses the Web Crypto API rather than Math.random(). MDN states that Math.random() is not cryptographically secure, while getRandomValues() provides cryptographically strong random values."
  },
  {
    question: "Is it a true random number generator?",
    answer: "No. It is more accurate to describe the browser mechanism as a cryptographically secure pseudo-random number generator (CSPRNG). Web Crypto uses a pseudo-random algorithm seeded with sufficient entropy; that is different from a physical true-random source."
  },
  {
    question: "Can it generate very large integers?",
    answer: "Yes, the calculator supports arbitrary-precision integer handling and has been tested with exact 39-, 100-, and 999-digit integer values."
  },
  {
    question: "What happens if I enter a lower limit greater than the upper limit?",
    answer: "The calculator rejects the request and displays a validation message instead of silently changing the user's inputs."
  },
  {
    question: "Why does integer mode reject values such as 1.5 and 9.8?",
    answer: "Because an integer generator is expected to operate on whole-number bounds. Silently truncating fractional values can cause the result to differ from what the user intended. The calculator therefore asks the user to use decimal mode instead."
  },
  {
    question: "Can I export the generated numbers?",
    answer: "Yes. The calculator provides copy functionality plus CSV and JSON export for generated results."
  },
  {
    question: "Can I save a random-number setup and use it again?",
    answer: "Yes. Saved calculations store their generation parameters, and the Restore function can repopulate the inputs without modifying the saved record."
  }
];

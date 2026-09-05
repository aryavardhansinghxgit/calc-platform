import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateScientificNotationCalculator } from "./calculator";
import { ScientificNotationCalculator } from "@/components/calculator/scientific-notation/ScientificNotationCalculator";
import { ScientificNotationContent } from "@/components/calculator/scientific-notation/ScientificNotationContent";

export const scientific_notation_calculatorFaqs = [
  {
    question: "What is scientific notation?",
    answer: "Scientific notation is a way of expressing a number as a coefficient multiplied by a power of ten. In normalized form, the coefficient has a magnitude of at least 1 and less than 10."
  },
  {
    question: "How do I convert a number to scientific notation?",
    answer: "Move the decimal point until one nonzero digit remains to its left. Count the number of places moved and use that number as the exponent of 10. Moving left produces a positive exponent; moving right produces a negative exponent for numbers between 0 and 1."
  },
  {
    question: "What is 1.568938 million in scientific notation?",
    answer: "1,568,938 becomes: 1.568938 × 10⁶. At four displayed decimal places: 1.5689 × 10⁶."
  },
  {
    question: "What is 0.00000425 in scientific notation?",
    answer: "0.00000425 = 4.25 × 10⁻⁶."
  },
  {
    question: "How do you multiply numbers in scientific notation?",
    answer: "Multiply the coefficients and add the exponents. Then normalize the result if the coefficient is not between 1 and 10 in magnitude."
  },
  {
    question: "How do you divide scientific notation?",
    answer: "Divide the coefficients and subtract the exponent of the denominator from the exponent of the numerator. Normalize the result when necessary."
  },
  {
    question: "How do you add numbers in scientific notation?",
    answer: "First express both numbers using the same power of ten. Then add their coefficients and normalize the result if necessary."
  },
  {
    question: "How do you subtract numbers in scientific notation?",
    answer: "First align the powers of ten. Rewrite one value using the same exponent as the other, subtract the coefficients, and normalize the result if necessary."
  },
  {
    question: "What is E notation?",
    answer: "E notation is a computer-friendly way of writing scientific notation. For example, 4.25 × 10⁻⁶ can be written as 4.25E-6."
  },
  {
    question: "What is engineering notation?",
    answer: "Engineering notation is similar to scientific notation, but the exponent must be a multiple of three. This makes it convenient for engineering quantities and SI prefixes such as kilo, mega, milli, micro, and nano."
  },
  {
    question: "Is scientific notation the same as significant figures?",
    answer: "No. Scientific notation is a representation of numerical magnitude, while significant figures describe the meaningful precision of a measurement or stated quantity. A display setting for decimal places does not automatically perform significant-figure analysis."
  },
  {
    question: "Why does the exponent become negative for very small numbers?",
    answer: "A negative exponent represents a reciprocal power of ten. For example, 10⁻⁶ means 1/1,000,000, so 4.25 × 10⁻⁶ represents a very small number."
  },
  {
    question: "Can I enter E notation into the converter?",
    answer: "Yes. Values such as 6.25e8 and 4.25e-6 can be interpreted as scientific notation and converted into the calculator's supported output formats."
  },
  {
    question: "Why must the coefficient usually be between 1 and 10?",
    answer: "That convention creates a unique normalized representation for every nonzero value. It prevents the same number from having many different scientific-notation forms."
  },
  {
    question: "When should I use scientific notation instead of decimal notation?",
    answer: "Scientific notation is especially useful when numbers are extremely large or small, when comparing orders of magnitude, or when performing calculations involving powers of ten."
  }
];

export const scientific_notation_calculatorConfig: CalculatorModuleDefinition = {
  id: "scientific-notation-calculator",
  title: "Scientific Notation Calculator & Converter",
  slug: "scientific-notation-calculator",
  category: "Math",
  subcategory: "General Math",
  description: "Use this scientific notation calculator to convert numbers and calculate in scientific, engineering, and E notation with step-by-step results.",
  iconName: "FileText",
  featured: true,
  keywords: [
    "scientific notation calculator",
    "scientific notation converter",
    "scientific notation calculator with steps",
    "engineering notation calculator",
    "engineering notation converter",
    "E notation converter",
    "scientific notation conversion",
    "convert to scientific notation",
    "scientific notation arithmetic",
    "scientific notation multiplication",
    "scientific notation division",
    "scientific notation addition",
    "scientific notation subtraction",
    "scientific notation exponent calculator"
  ],
  priority: 1,
  relatedCalculators: ["exponent-calculator", "big-number-calculator", "rounding-calculator"],
  formulaDescription: "Scientific Notation = a × 10^b (where 1 ≤ |a| < 10)",
  faqs: scientific_notation_calculatorFaqs,
  CustomComponent: ScientificNotationCalculator,
  ContentComponent: ScientificNotationContent,
  inputs: [
    {
      name: "number",
      label: "Input Number",
      type: "number",
      defaultValue: 3500000,
      min: -1000000000000000,
      max: 1000000000000000,
      step: 1
    }
  ],
  outputs: [
    {
      name: "scientific",
      label: "Scientific Notation",
      format: "text",
      highlight: true
    },
    {
      name: "engineering",
      label: "Engineering Notation",
      format: "text"
    },
    {
      name: "standard",
      label: "Standard Form",
      format: "number"
    }
  ],
  calculate: calculateScientificNotationCalculator
} as any;

export default scientific_notation_calculatorConfig;

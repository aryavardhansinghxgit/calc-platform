import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const ratio_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is the difference between a ratio and a fraction?",
    answer: "A ratio compares two quantities to each other (part-to-part, e.g. 2 boys : 3 girls). A fraction compares one part to the whole group (part-to-whole, e.g. 2 boys / 5 total children = 2/5)."
  },
  {
    question: "How do you solve for an unknown X in a proportion like 4/5 = X/20?",
    answer: "Cross-multiply the diagonal terms: 4 × 20 = 5 × X ⇒ 80 = 5X ⇒ X = 80 / 5 = 16."
  },
  {
    question: "Can a ratio contain negative numbers or zero?",
    answer: "Standard physical ratios (like ingredients, dimensions, populations) must be positive. However, mathematical vector ratios or financial growth rates can occasionally be negative or zero."
  },
  {
    question: "How do you convert a decimal ratio into a whole-number ratio?",
    answer: "Multiply all terms in the ratio by powers of 10 (e.g., 10, 100, 1000) to clear decimals, then simplify by dividing by the Greatest Common Divisor (GCD). For example, 0.75 : 1.5 → 75 : 150 → 1 : 2."
  },
  {
    question: "How do you simplify a 3-part ratio (e.g., 15 : 25 : 35)?",
    answer: "Find the Greatest Common Divisor (GCD) of all three terms. GCD(15, 25, 35) = 5. Divide each term by 5: 15/5 : 25/5 : 35/5 = 3 : 5 : 7."
  },
  {
    question: "How do you divide an amount of money among three people in a 2:3:5 ratio?",
    answer: "Add the ratio parts together: 2 + 3 + 5 = 10 total parts. Divide the total money by 10 to find the unit value per part, then multiply by 2, 3, and 5 respectively."
  },
  {
    question: "What is a unit rate and how do you calculate it?",
    answer: "A unit rate expresses a ratio as a single quantity relative to 1 unit of another quantity (e.g., miles per 1 hour, or price per 1 unit). Calculate it by dividing term A by term B: A / B."
  },
  {
    question: "How do aspect ratios work in digital screens and videos?",
    answer: "Aspect ratio is the proportional relationship between display width and height. For example, 16:9 widescreen means for every 16 units of width, there are 9 units of height."
  },
  {
    question: "What is the Golden Ratio and why is it special?",
    answer: "The Golden Ratio (Φ ≈ 1.6180339887...) is a mathematical proportion where (A + B) / A = A / B. It is revered in art, architecture, and nature for creating visually harmonious compositions."
  },
  {
    question: "How do you convert a ratio into a percentage?",
    answer: "For a part-to-part ratio A : B, the percentage share of A out of the total is calculated as [A / (A + B)] × 100%. For example, in a 1 : 4 ratio, Share A = [1 / (1 + 4)] × 100% = 20%."
  }
];

export default ratio_calculatorFaqs;

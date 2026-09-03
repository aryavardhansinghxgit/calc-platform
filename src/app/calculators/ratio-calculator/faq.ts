import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const ratio_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is a ratio?",
    answer: "A ratio compares two or more quantities in a specified order. It can be written as a:b, a/b, or \"a to b.\""
  },
  {
    question: "How do I solve a ratio such as 3:4 = 6:x?",
    answer: "Write it as a proportion: 3/4 = 6/x. Cross multiply: 3x = 24, so x = 8."
  },
  {
    question: "What is the formula for solving a proportion?",
    answer: "For A/B = C/D, the cross-products are equal: A×D = B×C. The required unknown can then be isolated algebraically."
  },
  {
    question: "Can this ratio calculator solve for A, B, C and D?",
    answer: "Yes. The proportion solver supports all four target variables."
  },
  {
    question: "How do you simplify 12:18:24?",
    answer: "Find the GCD: GCD(12,18,24) = 6. Then divide all terms by 6: 2:3:4."
  },
  {
    question: "What is the GCD of 12, 18 and 24?",
    answer: "The greatest common divisor is 6."
  },
  {
    question: "How do you simplify a decimal ratio?",
    answer: "Multiply every term by the same power of 10 needed to remove the decimals, then divide by the GCD. For example: 0.75:1.5 → 75:150 → 1:2."
  },
  {
    question: "What is a unit rate?",
    answer: "A unit rate expresses the first quantity for every 1 unit of the second quantity. It is found by dividing the first quantity by the second."
  },
  {
    question: "How do you divide 500 in a 2:3:5 ratio?",
    answer: "There are 2+3+5 = 10 parts. One part is 500/10 = 50. So the shares are 100, 150, 250."
  },
  {
    question: "How do you split money according to a ratio?",
    answer: "Add the ratio parts, divide the total by that sum to find the value of one part, then multiply by each ratio term."
  },
  {
    question: "What is the difference between a part-to-part and part-to-whole ratio?",
    answer: "A part-to-part ratio compares two components, such as 2 red objects to 3 blue objects. A part-to-whole ratio compares one component with the total, such as 2 red objects out of 5 total objects."
  },
  {
    question: "How do I convert a ratio into a percentage?",
    answer: "For the first part of A:B, use A/(A+B) × 100%. For example, 1:4 gives 1/5 × 100% = 20%."
  },
  {
    question: "What is an aspect ratio?",
    answer: "An aspect ratio is the proportional relationship between width and height. It is commonly written as width:height, such as 16:9."
  },
  {
    question: "How do I calculate a 16:9 dimension?",
    answer: "If the width is known: height = width × 9/16. For a width of 1280: 1280 × 9/16 = 720. So the dimensions are 1280×720."
  },
  {
    question: "What is the aspect ratio of 1920×1080?",
    answer: "Divide both dimensions by their GCD, 120: 1920:1080 = 16:9."
  },
  {
    question: "Can I resize an image without changing its aspect ratio?",
    answer: "Yes. Keep width and height proportional. If one dimension changes, calculate the other from the original ratio rather than changing both independently. Maintaining the intended aspect ratio is important for preserving media proportions."
  },
  {
    question: "What is the golden ratio?",
    answer: "The golden ratio is φ = (1+√5)/2 ≈ 1.61803398875. It describes a special proportional division in which the ratio of the whole to the larger part equals the ratio of the larger part to the smaller part."
  },
  {
    question: "What is the golden ratio of 100?",
    answer: "Dividing 100 according to the golden ratio gives approximately 61.8034 and 38.1966."
  },
  {
    question: "Why do golden-ratio results have decimal values?",
    answer: "Because the golden ratio is irrational. The exact constant involves √5, so practical calculator displays show rounded decimal approximations."
  },
  {
    question: "Does the calculator show calculation steps?",
    answer: "Yes. The calculator provides step-by-step mathematical derivations for its major ratio tools."
  },
  {
    question: "Does the calculator validate zero denominators?",
    answer: "Yes. A proportion denominator cannot be zero, and the calculator explicitly validates denominator-zero cases."
  },
  {
    question: "Can I use negative numbers in a ratio?",
    answer: "It depends on the context and the calculator's accepted domain. Some mathematical ratios can involve signed quantities, while physical allocation ratios normally represent nonnegative amounts. The calculator should not silently change a negative input into a positive one."
  },
  {
    question: "What happens if all ratio parts are zero?",
    answer: "A zero-total ratio cannot be normalized because there is no nonzero common scale factor. The calculator should reject or explicitly handle that invalid case rather than producing NaN or an arbitrary ratio."
  },
  {
    question: "Is 16:9 a fixed resolution?",
    answer: "No. 16:9 is a proportion. 1920×1080 and 1280×720 are different resolutions with the same 16:9 aspect ratio."
  },
  {
    question: "Can I export my ratio calculation?",
    answer: "Yes. The calculator supports the applicable PDF/Print, CSV, Copy, Save and Share workflows."
  }
];

export default ratio_calculatorFaqs;

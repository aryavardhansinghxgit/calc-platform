import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const log_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is a logarithm?",
    answer: "A logarithm is the inverse of exponentiation. log_b(x)=y means exactly that b^y=x, so the logarithm tells you what exponent is required to produce x from base b."
  },
  {
    question: "What is the formula for a logarithm?",
    answer: "The defining relationship is log_b(x)=y if and only if b^y=x. For arbitrary bases, the change-of-base formula is log_b(x)=ln(x)/ln(b)."
  },
  {
    question: "What are the restrictions on a logarithm?",
    answer: "For a real logarithm, the base must satisfy b>0 and b≠1, while the argument must satisfy x>0."
  },
  {
    question: "Why can't the logarithm base be 1?",
    answer: "Because 1^y=1 for every real y. Base 1 therefore cannot uniquely generate arbitrary positive arguments."
  },
  {
    question: "Why can't I take the logarithm of zero?",
    answer: "There is no finite real exponent y for a positive base b such that b^y=0. Therefore log_b(0) is undefined, and x=0 is the vertical asymptote of the standard logarithmic graph."
  },
  {
    question: "Why is the logarithm of a negative number undefined in real numbers?",
    answer: "A positive real base raised to any real exponent remains positive, so it cannot produce a negative argument. Therefore a negative argument has no real logarithm."
  },
  {
    question: "Can a logarithm have a negative answer?",
    answer: "Yes. For a base greater than 1, arguments between 0 and 1 produce negative logarithms. For example, log₁₀(0.01)=-2 because 10^-2=0.01."
  },
  {
    question: "What is log(1)?",
    answer: "For every valid base b, log_b(1)=0 because b^0=1."
  },
  {
    question: "What is the difference between log and ln?",
    answer: "ln denotes the natural logarithm with base e. The notation log often denotes base 10 in elementary and scientific contexts, although notation can vary by field."
  },
  {
    question: "What is a common logarithm?",
    answer: "A common logarithm is a logarithm with base 10. For example, log₁₀(1000)=3."
  },
  {
    question: "What is a natural logarithm?",
    answer: "A natural logarithm is a logarithm with base e, where e is approximately 2.718281828459. It is written ln(x)."
  },
  {
    question: "What is a binary logarithm?",
    answer: "A binary logarithm uses base 2 and is written log₂(x). It is common in computer science, information theory and algorithm analysis."
  },
  {
    question: "What is an antilogarithm?",
    answer: "An antilogarithm reverses a logarithm. If log_b(x)=y, then antilog_b(y)=b^y=x."
  },
  {
    question: "What is the antilog of 2 in base 10?",
    answer: "antilog₁₀(2)=10²=100."
  },
  {
    question: "How do you calculate a logarithm with any base?",
    answer: "Use the change-of-base formula: log_b(x)=ln(x)/ln(b). The same result can be obtained using common logarithms: log_b(x)=log₁₀(x)/log₁₀(b)."
  },
  {
    question: "What is the change-of-base formula?",
    answer: "The change-of-base formula is log_b(x)=ln(x)/ln(b). It converts a logarithm with any valid base into a quotient of natural logarithms."
  },
  {
    question: "What is log₂(64)?",
    answer: "log₂(64)=6 because 2^6=64."
  },
  {
    question: "What is log₁₀(100)?",
    answer: "log₁₀(100)=2 because 10²=100."
  },
  {
    question: "What is log₃(81)?",
    answer: "log₃(81)=4 because 3⁴=81."
  },
  {
    question: "What is log₅(125)?",
    answer: "log₅(125)=3 because 5³=125."
  },
  {
    question: "What is log₁₀(0.01)?",
    answer: "log₁₀(0.01)=-2 because 10^-2=0.01."
  },
  {
    question: "What is log₁₀₄₉(105)?",
    answer: "log₁₀₄₉(105) is approximately 0.6690961665. It can be calculated with ln(105)/ln(1049)."
  },
  {
    question: "How do I solve log_b(x)=y for y?",
    answer: "Simply evaluate y=log_b(x), provided b>0, b≠1 and x>0."
  },
  {
    question: "How do I solve log_b(x)=y for x?",
    answer: "Convert to exponential form: x=b^y."
  },
  {
    question: "How do I solve log_b(x)=y for the base b?",
    answer: "Rewrite the equation as b^y=x and, when the requested real solution is defined, solve b=x^(1/y)."
  },
  {
    question: "What is the relationship between logarithms and exponential functions?",
    answer: "They are inverse operations. log_b(x)=y means b^y=x. Their graphs are reflections across y=x when the corresponding functions are considered on their domains."
  },
  {
    question: "What is the domain of y=log_b(x)?",
    answer: "For a standard real logarithm, the domain is x>0. The range is all real numbers."
  },
  {
    question: "What is the range of a logarithmic function?",
    answer: "For the parent function y=log_b(x), the range is all real numbers."
  },
  {
    question: "What is the vertical asymptote of a logarithmic function?",
    answer: "For the parent logarithmic function y=log_b(x), the vertical asymptote is x=0."
  },
  {
    question: "What point does every logarithmic graph pass through?",
    answer: "Every parent logarithmic graph y=log_b(x) passes through (1,0)."
  },
  {
    question: "What is the point (b,1) on a logarithmic graph?",
    answer: "Because log_b(b)=1, the point (b,1) lies on the graph of y=log_b(x)."
  },
  {
    question: "Does the graph of log_b(x) increase or decrease?",
    answer: "It increases when b>1 and decreases when 0<b<1."
  },
  {
    question: "Why is my logarithm result decimal instead of an integer?",
    answer: "Many logarithms are irrational numbers and cannot be represented exactly as finite decimals. A decimal output is therefore often an approximation of the exact logarithmic value."
  },
  {
    question: "Can I calculate ln(x) with this calculator?",
    answer: "Yes. The calculator reports the natural logarithm ln(x) alongside the custom base result."
  },
  {
    question: "Can I calculate log₂(x)?",
    answer: "Yes. The calculator provides binary logarithm values using base 2."
  },
  {
    question: "Can I calculate a custom-base logarithm?",
    answer: "Yes. Enter the desired positive base other than 1 and a positive argument."
  },
  {
    question: "Can the calculator solve for the exponent?",
    answer: "Yes. The three-variable solver can solve log_b(x)=y for y."
  },
  {
    question: "Can the calculator solve for x?",
    answer: "Yes. It converts log_b(x)=y to x=b^y and evaluates the result."
  },
  {
    question: "Can the calculator solve for the base?",
    answer: "Yes, where a real mathematical solution is defined. It uses b=x^(1/y) and handles supported negative-argument odd-root cases separately."
  },
  {
    question: "Can the logarithm graph update when I change the base?",
    answer: "Yes. The graph is synchronized with the active base. Changing the base updates the logarithmic curve and its key points."
  },
  {
    question: "Why is (1,0) on every logarithmic graph?",
    answer: "Because b^0=1 for every valid logarithm base, so log_b(1)=0."
  },
  {
    question: "Why does the graph approach x=0 but not cross it?",
    answer: "Zero is outside the real logarithm's domain, so x=0 acts as a vertical asymptote for the parent logarithmic function."
  },
  {
    question: "What are the product, quotient and power rules?",
    answer: "For valid positive arguments: log_b(xy)=log_b(x)+log_b(y), log_b(x/y)=log_b(x)-log_b(y), and log_b(x^k)=k log_b(x)."
  },
  {
    question: "How can I check a logarithm calculation?",
    answer: "Convert the answer back to exponential form. If log_b(x)=y, verify that b^y equals x."
  },
  {
    question: "What is the antilog of a logarithm?",
    answer: "It reverses the logarithm. If log_b(x)=y, then b^y=x."
  },
  {
    question: "Can the calculator show the steps?",
    answer: "Yes. The primary logarithm calculator provides a step-by-step derivation, including the change-of-base calculation and exponential verification."
  },
  {
    question: "Can I save a calculation?",
    answer: "Yes. Saved calculations can be stored and later loaded, deleted or cleared from the saved-calculation area."
  },
  {
    question: "Can I export logarithm results?",
    answer: "Yes. The calculator supports available PDF/Print, CSV, Copy and Share workflows for preserving the current calculation."
  }
];

export default log_calculatorFaqs;

import { CalculatorFAQ } from "@/calculators/types";

export const percent_error_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is percentage error?",
    answer:
      "Percentage error is a dimensionless relative metric that quantifies the discrepancy between an experimentally observed measurement and an accepted, theoretical, or true reference value, expressed as a percentage.",
  },
  {
    question: "What is the percentage error formula?",
    answer:
      "The standard absolute percentage error formula is (|V_observed - V_true| / |V_true|) × 100%. The signed percentage error formula is ((V_observed - V_true) / V_true) × 100%.",
  },
  {
    question: "What is the difference between absolute and signed percentage error?",
    answer:
      "Absolute percentage error reports the non-directional magnitude of discrepancy using absolute values and is always non-negative. Signed percentage error preserves directionality, where a positive value indicates an overestimate and a negative value indicates an underestimate.",
  },
  {
    question: "How do I calculate percentage error from an observed and true value?",
    answer:
      "Subtract the true value from the observed value to get the error difference, divide that difference by the true reference value to obtain relative error, and multiply by 100 to convert to a percentage.",
  },
  {
    question: "What does a negative percentage error mean?",
    answer:
      "In signed percentage error calculations, a negative value indicates that the observed measurement is lower than the accepted reference value (an underestimate).",
  },
  {
    question: "What does a positive percentage error mean?",
    answer:
      "In signed percentage error calculations, a positive value indicates that the observed measurement is greater than the accepted reference value (an overestimate).",
  },
  {
    question: "How do I calculate absolute error?",
    answer:
      "Absolute error is calculated as the absolute difference between the observed value and the true value: |V_observed - V_true|. Unlike percentage error, absolute error retains the physical units of measurement.",
  },
  {
    question: "Why can't percentage error be calculated when the true value is zero?",
    answer:
      "Percentage error normalizes the error against the true reference value. When the true value is zero, the denominator is zero, making division mathematically undefined.",
  },
  {
    question: "Can percentage error be negative?",
    answer:
      "Yes, when using the signed percentage error formula ((V_observed - V_true) / V_true) × 100%, the result can be negative whenever the observed value is less than the true value. Absolute percentage error is always non-negative.",
  },
  {
    question: "What is the difference between relative error and percentage error?",
    answer:
      "Relative error is the fractional quotient of the error difference divided by the true value. Percentage error is simply relative error multiplied by 100 and expressed with a percentage symbol.",
  },
  {
    question: "How should percentage error be interpreted in experiments and measurements?",
    answer:
      "A lower percentage error indicates closer agreement between measurement and reference. However, percentage error only quantifies discrepancy magnitude and direction; determining whether an error stems from systematic bias, random variation, or calibration requires separate experimental investigation.",
  },
  {
    question: "Why can my manual percentage-error calculation differ from the calculator?",
    answer:
      "Manual calculations often introduce premature rounding at intermediate subtraction or division steps. The calculator maintains high floating-point precision throughout all intermediate operations before formatting the final output.",
  },
];

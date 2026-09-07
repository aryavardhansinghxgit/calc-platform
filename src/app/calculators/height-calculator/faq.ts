import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const height_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "How accurate is a height calculator?",
    answer:
      "A height calculator can be numerically accurate while the biological prediction remains uncertain. Statistical methods estimate adult stature from population data and cannot guarantee an individual's final height.",
  },
  {
    question: "What is the most accurate adult height prediction method?",
    answer:
      "There is no single method that is universally most accurate for every child. Different prediction algorithms use different inputs and assumptions, and research has found meaningful disagreement between commonly used methods.",
  },
  {
    question: "How is adult height predicted from parents?",
    answer:
      "A common mid-parental method averages the parents' heights after applying a sex-specific adjustment of approximately 13 cm (or 5 inches).",
  },
  {
    question: "How do I calculate my child's mid-parental height?",
    answer:
      "For a boy: (Mother's height + Father's height + 13 cm) / 2. For a girl: (Mother's height + Father's height − 13 cm) / 2. The result is a target estimate rather than a guaranteed final height.",
  },
  {
    question: "What is the Khamis-Roche method?",
    answer:
      "It is a statistical adult-stature prediction method developed using longitudinal data that estimates adult height without requiring skeletal age. The original research used childhood height, weight, age, sex, and mid-parental stature.",
  },
  {
    question: "At what age can Khamis-Roche be used?",
    answer:
      "The implementation on this page supports the model within its configured domain of 4 through 17 years and rejects ages outside that range rather than silently extrapolating.",
  },
  {
    question: "What does a height percentile mean?",
    answer:
      "A percentile describes where a child's height falls within a reference population for age and sex. A 50th percentile means the measurement is around the middle of that reference distribution; it does not mean the child will reach 50% of adult height.",
  },
  {
    question: "Does being tall as a child mean you will be tall as an adult?",
    answer:
      "Not necessarily. Current stature provides useful information, but adult height also depends on growth trajectory, genetics, puberty, and other factors.",
  },
  {
    question: "Can parents' height predict a child's adult height?",
    answer:
      "Parents' heights provide useful information about genetic stature potential, which is why mid-parental height is commonly used as a target-height estimate. It does not determine a child's exact final height.",
  },
  {
    question: "What is the toddler doubling method?",
    answer:
      "It is a simple heuristic that estimates adult height by doubling stature measured at a specified young age (typically 24 months for boys and 18 months for girls). It is much simpler than a multi-variable regression model and should be treated as a rough estimate.",
  },
  {
    question: "Does weight affect predicted adult height?",
    answer:
      "In the Khamis-Roche model, childhood weight is one predictor variable, so changing weight can change the model's estimated adult stature. Weight does not independently determine adult height.",
  },
  {
    question: "Why do different height calculators give different answers?",
    answer:
      "Different calculators may use different models, formulas, reference populations, ages, inputs, and uncertainty assumptions. A difference between estimates does not automatically mean that one calculator is malfunctioning.",
  },
  {
    question: "Can a height calculator diagnose a growth problem?",
    answer:
      "No. Height prediction and growth-chart calculations are not diagnostic by themselves. CDC describes growth charts as tools contributing to the overall clinical assessment rather than a sole diagnostic instrument.",
  },
  {
    question: "How do I convert 5 ft 9 in to centimeters?",
    answer:
      "Convert to inches first: 5 × 12 + 9 = 69 in. Then multiply by 2.54: 69 × 2.54 = 175.26 cm. So 5 ft 9 in = 175.26 cm.",
  },
  {
    question: "How do I convert centimeters to feet and inches?",
    answer:
      "Divide centimeters by 2.54 to obtain total inches, then divide the total inches by 12 to determine the feet and remaining inches. For example, 175.26 cm / 2.54 = 69 in = 5 ft 9 in.",
  },
];

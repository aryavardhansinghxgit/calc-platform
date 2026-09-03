import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const z_score_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is a z-score?",
    answer: "A z-score measures how many standard deviations an observation is above or below a mean. For population parameters, z = (x - μ) / σ."
  },
  {
    question: "What is the z-score formula?",
    answer: "The population z-score formula is z = (x - μ) / σ. For a sample-based calculation, the corresponding form uses the sample mean and sample standard deviation: z = (x - x̄) / s."
  },
  {
    question: "How do I calculate a z-score?",
    answer: "Subtract the mean from the raw value, then divide by the standard deviation."
  },
  {
    question: "What does a positive z-score mean?",
    answer: "It means the observation is above the reference mean."
  },
  {
    question: "What does a negative z-score mean?",
    answer: "It means the observation is below the reference mean."
  },
  {
    question: "What does z = 0 mean?",
    answer: "It means the observation equals the reference mean. Exactly 50% of a standard normal distribution lies below zero."
  },
  {
    question: "Is a z-score a percentile?",
    answer: "No. A z-score is a standardized distance in units of standard deviation. A percentile is obtained by applying the appropriate cumulative distribution function (Φ) to that z-score."
  },
  {
    question: "How do I convert a z-score to a percentile?",
    answer: "For the standard normal model, calculate Φ(z). For example, z = 1.50 corresponds to approximately the 93.32nd percentile."
  },
  {
    question: "What percentile is a z-score of 1.96?",
    answer: "Under the standard normal distribution, z ≈ 1.96 corresponds to a cumulative probability of about 0.975, or the 97.5th percentile."
  },
  {
    question: "What percentile is z = 0?",
    answer: "The 50th percentile."
  },
  {
    question: "What is the 95% critical z-value?",
    answer: "For a two-sided 95% confidence level, the critical value is approximately ±1.959964, usually rounded to ±1.96."
  },
  {
    question: "Why is the 95% critical value 1.96?",
    answer: "A two-sided 95% central area leaves 5% outside the interval, with 2.5% in each tail. The z-value whose cumulative probability is 97.5% is approximately 1.959964."
  },
  {
    question: "What is the difference between one-tail and two-tail?",
    answer: "A one-tail calculation places the relevant probability in one tail of the distribution. A two-tail calculation divides the tail probability between both sides."
  },
  {
    question: "What is a left-tail probability?",
    answer: "It is P(Z < z), the probability represented by the area to the left of the specified z-score."
  },
  {
    question: "What is a right-tail probability?",
    answer: "It is P(Z > z), the probability represented by the area to the right of the specified z-score (1 - Φ(z))."
  },
  {
    question: "What is a two-tail probability?",
    answer: "For a specified magnitude |z|, it is the probability of being at least that far from zero in either direction: 2[1 - Φ(|z|)]."
  },
  {
    question: "What is the area between two z-scores?",
    answer: "It is the normal probability contained between the two standardized boundaries: P(z1 < Z < z2) = Φ(z2) - Φ(z1)."
  },
  {
    question: "How do I calculate the area between two raw scores?",
    answer: "Convert each raw boundary to a z-score and subtract the lower CDF from the upper CDF: P(X1 < X < X2) = Φ(Z2) - Φ(Z1)."
  },
  {
    question: "What is the standard normal distribution?",
    answer: "It is the normal distribution with mean 0 and standard deviation 1, written Z ~ N(0, 1)."
  },
  {
    question: "What is the 68-95-99.7 rule?",
    answer: "For a normal distribution, approximately 68% of observations fall within one SD of the mean (±1σ), 95% within two SDs (±2σ), and 99.7% within three SDs (±3σ)."
  },
  {
    question: "Can I calculate a z-score when the standard deviation is zero?",
    answer: "No. The formula would divide by zero. This calculator treats non-positive SD as invalid rather than silently replacing it."
  },
  {
    question: "Can standard deviation be negative?",
    answer: "No. A negative standard deviation is not a valid standard deviation parameter. Standard deviation must be strictly positive."
  },
  {
    question: "Can a very large z-score be calculated?",
    answer: "Yes, provided the inputs are valid. Extremely large z-scores can have cumulative probabilities that round to 0% or 100% at ordinary display precision."
  },
  {
    question: "Why does an extreme z-score show 100%?",
    answer: "The true cumulative probability may be extremely close to 1 but not exactly 1. At normal display precision it rounds to 100.00%."
  },
  {
    question: "What is an inverse z-score?",
    answer: "An inverse z-score calculation starts with a cumulative probability, percentile, or confidence requirement and finds the corresponding z-value using the quantile function Φ⁻¹(p)."
  },
  {
    question: "What is a critical z-score?",
    answer: "A critical z-score is a cutoff threshold corresponding to a specified probability allocation, alpha level, or confidence level."
  },
  {
    question: "How do I find a raw score from a z-score?",
    answer: "Use the rearranged standardization formula: x = μ + z·σ (or x = x̄ + z·s for samples)."
  },
  {
    question: "What is the difference between a z-score and a raw score?",
    answer: "A raw score retains the original measurement units. A z-score is unitless and expresses the score's position in standard-deviation units."
  },
  {
    question: "Can z-scores be used to compare different exams?",
    answer: "Yes, they can help compare standardized positions when the underlying distributions and assumptions make that comparison meaningful."
  },
  {
    question: "Does a z-score prove that data are normally distributed?",
    answer: "No. A z-score can be computed as an algebraic standardization for any distribution with a mean and SD, but normal-distribution probability interpretations require an appropriate normal reference model."
  },
  {
    question: "What is a z-table?",
    answer: "A z-table is a reference table listing standard normal cumulative probabilities corresponding to selected z-values."
  },
  {
    question: "Does this calculator replace a z-table?",
    answer: "Yes, it performs the numerical operation directly with high floating-point precision, provides interactive bell curve shading, and solves inverse critical values."
  },
  {
    question: "Can I calculate z-scores for an entire dataset?",
    answer: "Yes. The batch analyzer calculates sample mean, sample standard deviation, variance, median, and row-level z-scores and percentile ranks for an entire dataset."
  },
  {
    question: "Can I export batch z-score calculations?",
    answer: "Yes. The calculator provides structured CSV spreadsheet downloads for batch datasets."
  },
  {
    question: "Does changing the decimal setting change the calculation?",
    answer: "No. The display setting changes the visible decimal places (2, 4, or 6 Dec), while the underlying calculation retains full internal precision."
  },
  {
    question: "Can I save a z-score calculation?",
    answer: "Yes, each module provides Save buttons storing immutable calculation snapshots in browser storage."
  },
  {
    question: "Can I print or export a z-score report?",
    answer: "Yes. The dedicated Print / PDF modal produces an executive 2-page report with zero blank whitespace and complete cross-layer numerical parity."
  }
];

export default z_score_calculatorFaqs;

import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const standard_deviation_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is standard deviation?",
    answer: "Standard deviation measures how spread out numerical observations are around their mean. A smaller value indicates tighter clustering around the mean, while a larger value indicates greater dispersion."
  },
  {
    question: "How do I calculate standard deviation?",
    answer: "Calculate the mean, subtract it from each observation, square the deviations, add the squared deviations, divide by n−1 for a sample or N for a population, and take the square root."
  },
  {
    question: "What is the difference between sample and population standard deviation?",
    answer: "Sample standard deviation uses n−1 in the denominator because the sample is being used to estimate variability in a larger population. Population standard deviation uses N when the dataset represents the complete population."
  },
  {
    question: "Why do I divide by n−1 for sample standard deviation?",
    answer: "The n−1 denominator is Bessel's correction. It compensates for estimating the population mean from the sample when calculating sample variance."
  },
  {
    question: "What is variance?",
    answer: "Variance is the average squared deviation from the mean using the appropriate sample or population denominator. Standard deviation is the positive square root of variance."
  },
  {
    question: "What is the difference between standard deviation and standard error?",
    answer: "Standard deviation measures variability among observations. Standard error measures the variability or uncertainty of a sample statistic, commonly the sample mean. For a sample mean, SE is commonly s divided by √n."
  },
  {
    question: "What is coefficient of variation?",
    answer: "Coefficient of variation expresses standard deviation relative to the mean, usually as a percentage. A common form is CV = (s/|x̄|) × 100%. It is undefined when the mean is zero."
  },
  {
    question: "Can standard deviation be zero?",
    answer: "Yes. Standard deviation is zero when every observation has exactly the same value, because every deviation from the mean is zero."
  },
  {
    question: "Can standard deviation be negative?",
    answer: "No. Variance is nonnegative and standard deviation is its nonnegative square root."
  },
  {
    question: "What does a high standard deviation mean?",
    answer: "A high standard deviation means observations are more dispersed around the mean. Whether that amount of variability is desirable depends on the application."
  },
  {
    question: "What does a low standard deviation mean?",
    answer: "A low standard deviation means observations are relatively close to their mean."
  },
  {
    question: "Does standard deviation measure accuracy?",
    answer: "No. Standard deviation measures variability, not whether a measurement is close to a true or target value."
  },
  {
    question: "Does standard deviation increase with sample size?",
    answer: "Not necessarily. Standard deviation describes the variability of the observed values. Increasing sample size generally reduces the standard error of the mean, not automatically the standard deviation."
  },
  {
    question: "What is the 68–95–99.7 rule?",
    answer: "For an approximately normal distribution, about 68% of observations fall within 1 standard deviation of the mean, about 95% within 2, and about 99.7% within 3."
  },
  {
    question: "Does the empirical rule apply to every dataset?",
    answer: "No. The 68–95–99.7 rule is specifically associated with approximately normal distributions. It should not be treated as a universal property of arbitrary datasets."
  },
  {
    question: "What is a z-score?",
    answer: "A z-score expresses an observation's distance from a mean in standard deviation units. It is commonly written as z = (x−μ)/σ for a population-standardized value."
  },
  {
    question: "What is an outlier?",
    answer: "An outlier is an observation that is unusually far from the rest of a dataset. A common box-plot convention flags values beyond 1.5 times the IQR from Q1 or Q3 as potential outliers."
  },
  {
    question: "Does an outlier affect standard deviation?",
    answer: "Yes. Because deviations are squared, extreme observations can have a strong effect on variance and standard deviation."
  },
  {
    question: "What is pooled standard deviation?",
    answer: "Pooled standard deviation combines two sample variances into a common estimate when the statistical model assumes equal population variances."
  },
  {
    question: "What is an F ratio?",
    answer: "The calculator's variance ratio is F = s₁²/s₂². It compares the magnitude of two sample variances. A formal F-test requires additional assumptions and a statistical decision framework."
  },
  {
    question: "What is a confidence interval?",
    answer: "A confidence interval gives an interval estimate for a population parameter. Its confidence level describes the long-run performance of the interval-making procedure, not the probability that a fixed parameter is inside one particular computed interval."
  },
  {
    question: "What is margin of error?",
    answer: "Margin of error is the amount added and subtracted from a point estimate to form a confidence interval. In the calculator's z-based form, ME = z × SE."
  },
  {
    question: "Can I use standard deviation for finance?",
    answer: "Yes. Standard deviation is commonly used as a descriptive measure of return variability. In finance it is often used as a volatility measure, although specific risk metrics may require additional inputs and assumptions."
  },
  {
    question: "Can I use standard deviation for Six Sigma?",
    answer: "Standard deviation is fundamental to Six Sigma terminology and process variation analysis. However, process capability and sigma-level calculations also depend on specification limits and other process quantities."
  },
  {
    question: "What happens when the mean is zero?",
    answer: "The coefficient of variation becomes undefined because it divides by the mean. Standard deviation and variance can still be calculated normally."
  },
  {
    question: "What happens when there is only one observation?",
    answer: "The population standard deviation is zero because there is no variation in a one-value population. Sample variance and sample standard deviation are undefined because there are zero degrees of freedom after subtracting one from the sample size."
  },
  {
    question: "Why is my answer slightly different from another calculator?",
    answer: "Differences can result from sample versus population mode, intermediate rounding, a different quartile convention, different confidence-interval assumptions, or a different definition of coefficient of variation. Compare the exact formula and settings rather than only the final displayed number."
  },
  {
    question: "Can this calculator replace statistical software?",
    answer: "It can perform many common descriptive calculations and provide transparent intermediate steps, but complex analyses may require specialized statistical software and subject-matter expertise."
  },
  {
    question: "How accurate is this calculator?",
    answer: "For valid numerical inputs, the calculator applies deterministic formulas. Accuracy of the resulting statistical conclusion still depends on choosing the correct statistical model and interpreting the result appropriately."
  },
  {
    question: "Should I use sample or population standard deviation?",
    answer: "Use population standard deviation when your dataset is the complete population of interest. Use sample standard deviation when the observations are a sample from a broader population and you want the usual sample estimator."
  }
];

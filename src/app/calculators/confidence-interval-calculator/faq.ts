import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const confidence_interval_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is a confidence interval?",
    answer: "A confidence interval is a range calculated from sample data to estimate an unknown population parameter. Its construction depends on the selected statistical method, confidence level and assumptions."
  },
  {
    question: "How do I calculate a 95% confidence interval?",
    answer: "The calculation depends on the parameter. For a one-sample mean with unknown population standard deviation, CI = x̄ ± t*(s / √n). For a known population standard deviation, a Z critical value is used instead. Proportions and variance require different distributions and formulas."
  },
  {
    question: "What is the formula for a confidence interval for a mean?",
    answer: "For an unknown population standard deviation, CI = x̄ ± t*(s / √n) with df = n - 1. For a known population standard deviation, CI = x̄ ± Z*(σ / √n)."
  },
  {
    question: "When should I use a t interval instead of a Z interval?",
    answer: "For the classical one-sample mean problem, use a t interval when the population standard deviation is unknown and the sample standard deviation is used. A Z interval applies when the population standard deviation is known under the corresponding model."
  },
  {
    question: "What is the standard error in a confidence interval?",
    answer: "For a one-sample mean using the sample standard deviation, SE = s / √n. It measures the estimated sampling variability of the sample mean."
  },
  {
    question: "What is the margin of error?",
    answer: "The margin of error is the amount added to and subtracted from the point estimate in a symmetric interval: ME = critical value × SE. The resulting interval is estimate ± ME."
  },
  {
    question: "What does a 95% confidence interval mean?",
    answer: "Under repeated random sampling and the same interval-producing procedure, approximately 95% of the constructed intervals would contain the fixed population parameter, assuming the model and conditions are appropriate."
  },
  {
    question: "Does a 95% confidence interval mean there is a 95% chance the true value is inside?",
    answer: "Not in the standard frequentist interpretation. Once a particular interval is calculated, the population parameter is treated as fixed. The 95% refers to the long-run coverage of the interval-producing procedure."
  },
  {
    question: "Why does a higher confidence level produce a wider interval?",
    answer: "A higher confidence level requires a larger critical-value multiplier. This increases the margin of error and therefore widens the interval."
  },
  {
    question: "Does a larger sample size make a confidence interval narrower?",
    answer: "Generally, yes, when other assumptions and quantities remain fixed. For a mean, the standard error decreases approximately according to 1 / √n."
  },
  {
    question: "What is a Wilson confidence interval?",
    answer: "The Wilson interval is a score-based confidence interval for a binomial population proportion. It generally has better coverage behavior than the simple Wald interval across a wider range of sample sizes and proportions."
  },
  {
    question: "What is the Wald confidence interval?",
    answer: "The Wald interval uses p̂ ± z*√(p̂(1 - p̂) / n). It is simple but can perform poorly for small samples or proportions near 0 or 1."
  },
  {
    question: "What is the Agresti-Coull interval?",
    answer: "The Agresti-Coull interval adjusts the estimated proportion and effective sample size before applying a normal-style interval (often approximated as the plus-four rule for 95% intervals). It is commonly used as an improved alternative to the ordinary Wald calculation."
  },
  {
    question: "Which proportion confidence interval should I use: Wilson, Wald or Agresti-Coull?",
    answer: "The appropriate choice depends on the analysis and assumptions. The ordinary Wald method is convenient but can have poor coverage in some situations. Wilson and Agresti-Coull methods generally provide more robust behavior across a wider range of conditions."
  },
  {
    question: "What does it mean if a confidence interval includes zero?",
    answer: "For a difference parameter, it means zero remains within the interval and therefore a zero difference is compatible with the selected confidence procedure. It does not prove that the two populations are identical."
  },
  {
    question: "What does it mean if the confidence interval does not include zero?",
    answer: "For a two-sided difference interval, zero is outside the interval. Under the associated confidence level and method, the interval excludes a zero difference, indicating a statistically significant difference at that alpha level."
  },
  {
    question: "Does an interval excluding zero prove causation?",
    answer: "No. Excluding zero addresses compatibility with a zero difference under the selected statistical model. It does not by itself establish causality, which depends on study design and randomization."
  },
  {
    question: "How do I calculate a confidence interval for two means?",
    answer: "For two independent means with unequal variances, the Welch method uses (x̄1 - x̄2) ± t*√(s1²/n1 + s2²/n2) with Welch-Satterthwaite degrees of freedom."
  },
  {
    question: "What is Welch's confidence interval?",
    answer: "Welch's interval estimates the difference between two independent means without requiring equal population variances. Its degrees of freedom are approximated using the Welch-Satterthwaite formula."
  },
  {
    question: "How do I calculate a confidence interval for two proportions?",
    answer: "Calculate each sample proportion p̂1 = x1/n1 and p̂2 = x2/n2, find their difference p̂1 - p̂2, calculate SE(diff) = √[p̂1(1-p̂1)/n1 + p̂2(1-p̂2)/n2], and compute (p̂1 - p̂2) ± Z* × SE(diff)."
  },
  {
    question: "What is the confidence interval for population variance?",
    answer: "Under the normal-population assumption, a two-sided interval for variance is constructed using chi-square critical values: [(n-1)s² / χ²(1-α/2), (n-1)s² / χ²(α/2)]."
  },
  {
    question: "Why is a variance confidence interval asymmetric?",
    answer: "Because the chi-square distribution is asymmetric. The lower and upper variance limits therefore do not occur at equal distances from the sample variance."
  },
  {
    question: "How is the confidence interval for standard deviation calculated?",
    answer: "First calculate the confidence interval for variance using the chi-square distribution, then take the square root of each variance endpoint. NIST describes this procedure explicitly."
  },
  {
    question: "Can a confidence interval be negative?",
    answer: "For a mean or a difference between means/proportions, negative limits can be perfectly valid because those parameters themselves can be negative. A variance or standard deviation, however, cannot be negative and requires nonnegative bounds."
  },
  {
    question: "What is the difference between confidence interval and standard deviation?",
    answer: "Standard deviation describes the spread of individual observations in a dataset. A confidence interval describes uncertainty around an estimated population parameter."
  },
  {
    question: "What is the difference between confidence interval and standard error?",
    answer: "Standard error measures the estimated sampling variability of a statistic. A confidence interval uses the standard error together with a critical value to construct an uncertainty range."
  },
  {
    question: "What happens to a confidence interval when the confidence level increases from 95% to 99%?",
    answer: "The interval generally becomes wider because the critical value increases, requiring a larger margin of error to capture the parameter across a higher percentage of repeated samples."
  },
  {
    question: "What happens to a confidence interval when the sample size increases?",
    answer: "The interval generally becomes narrower because the standard error decreases according to 1 / √n, assuming other sample quantities remain comparable."
  },
  {
    question: "Can two confidence interval calculators give different answers?",
    answer: "Yes. Different calculators may use different statistical methods, degrees-of-freedom approximations, critical-value algorithms, continuity corrections, or rounding conventions. Always compare the underlying methodology."
  },
  {
    question: "Is the confidence interval calculator suitable for research?",
    answer: "It is suitable for standard statistical calculations, teaching and preliminary analysis. Complex studies, clinical trials, complex survey sampling designs and regulated analyses may require specialized statistical methodology or statistical review."
  }
];

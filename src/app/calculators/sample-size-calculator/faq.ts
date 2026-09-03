import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const sample_size_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is a good sample size for a survey?",
    answer: "There is no single sample size that is good for every survey. It depends on the desired confidence level, margin of error, expected proportion, population size, sampling design, and other assumptions. For a simple large-population proportion calculation with 95% confidence, ±5% margin of error, and conservative p = 0.50, the familiar result is about 385 completed responses."
  },
  {
    question: "How many people do I need for a 95% confidence level and 5% margin of error?",
    answer: "For the standard large-population proportion calculation with p = 0.50, the preliminary result is about 384.15, so the minimum whole-number sample is 385."
  },
  {
    question: "Why is the sample size 385?",
    answer: "Because n = [1.96² × (0.5)(0.5)] / 0.05² ≈ 384.15, and the minimum sample is rounded upward to 385."
  },
  {
    question: "Is 30 people enough for a survey?",
    answer: "Not as a universal rule. Whether 30 observations are adequate depends on the objective, outcome and required precision or power. A fixed rule such as '30 is enough' cannot replace an appropriate sample-size calculation."
  },
  {
    question: "Why is p = 0.5 used in sample-size calculations?",
    answer: "When no reliable estimate of a population proportion is available, 0.50 maximizes p(1 - p), producing the most conservative sample-size requirement for the simple proportion formula."
  },
  {
    question: "Does a larger population always require a much larger sample?",
    answer: "No. Once the population becomes large relative to the required sample, the required sample approaches the large-population result under fixed assumptions. Finite population correction matters more when the sample represents a larger fraction of the population."
  },
  {
    question: "What is finite population correction?",
    answer: "Finite population correction adjusts a sample-size calculation when the total population N is known and finite: n = n₀ / [1 + (n₀ - 1) / N]. It generally reduces the required sample compared with the uncorrected calculation."
  },
  {
    question: "Should I round sample size up or down?",
    answer: "For a minimum required sample, round up, not down. A calculated requirement of 384.15 therefore becomes 385."
  },
  {
    question: "What is the margin of error?",
    answer: "The margin of error is half the width of a symmetric confidence interval around an estimate. It represents the desired precision under the stated confidence procedure."
  },
  {
    question: "Does a smaller margin of error require more people?",
    answer: "Yes, generally. Because sample-size formulas often contain the inverse square of the margin of error, reducing the target error can require substantially more observations."
  },
  {
    question: "Does increasing confidence increase sample size?",
    answer: "Generally yes. A higher confidence level requires a larger critical-value multiplier, which increases the required sample when other inputs remain fixed."
  },
  {
    question: "What is statistical power?",
    answer: "Power is 1 - β, where β is the Type II error probability under the specified alternative. It describes the probability of detecting the prespecified effect under the assumptions of the analysis."
  },
  {
    question: "Is 80% power enough?",
    answer: "80% is a common planning choice, but whether it is appropriate depends on the study and consequences of a missed effect. Some studies use 90% or another target. Higher power generally requires a larger sample."
  },
  {
    question: "What is the difference between confidence level and statistical power?",
    answer: "Confidence level is associated with estimation procedures such as confidence intervals. Power is associated with a hypothesis-testing procedure and the ability to detect a specified effect under the assumed alternative. They address different aspects of statistical design."
  },
  {
    question: "How many subjects are needed for 80% power?",
    answer: "There is no universal number. The required sample depends on the statistical test, effect size, variability, significance level, allocation and other design assumptions."
  },
  {
    question: "How is A/B test sample size calculated?",
    answer: "It depends on the baseline conversion rate, target variant rate, desired power, significance level, allocation and the statistical approximation used. A smaller detectable difference generally requires more observations."
  },
  {
    question: "What is the difference between absolute difference and relative uplift?",
    answer: "Absolute difference is the percentage-point change. For 3.0% to 3.5%, 3.5% - 3.0% = 0.5 percentage points. Relative uplift is [(3.5 - 3.0) / 3.0] × 100 ≈ 16.67%. They should not be used interchangeably."
  },
  {
    question: "How many samples do I need for a 3% to 3.5% conversion-rate test?",
    answer: "Under the methodology implemented by this calculator, the audited example produces 19,740 observations per variant at 80% power, or 39,480 total. Different statistical methods can produce different requirements, so the underlying assumptions should be documented."
  },
  {
    question: "What happens if the response rate is only 50%?",
    answer: "A simple recruitment adjustment divides the required completed sample by 0.50. For example, 385 completed responses would require an estimated 385 / 0.50 = 770 invitations."
  },
  {
    question: "How many people should I invite if I need 385 responses and expect an 80% response rate?",
    answer: "385 / 0.80 = 481.25, so the recruitment target is 482 people."
  },
  {
    question: "Can I calculate sample size for a continuous measurement?",
    answer: "Yes, when the calculator's continuous-mean mode is appropriate. A common normal-approximation form is n = (Zσ / E)², where σ represents the estimated standard deviation and E the desired absolute precision."
  },
  {
    question: "What if my population size is unknown?",
    answer: "For the simple proportion calculation, leaving population size unspecified means the calculator treats the population as effectively infinite and does not apply finite population correction."
  },
  {
    question: "What if my sample size is already fixed?",
    answer: "Use the reverse margin-of-error calculation to estimate the precision achieved under the calculator's selected assumptions."
  },
  {
    question: "Does sample size guarantee statistical significance?",
    answer: "No. Sample size is planned using assumptions about effect size, variability, significance level and power. It cannot guarantee the result of a future analysis."
  },
  {
    question: "Can I use this calculator for clinical trials?",
    answer: "It can provide calculations for common simplified designs, but clinical trials often require design-specific methods involving the primary outcome, effect size, variance, allocation, significance level, power, dropout, interim analyses and other considerations. More complex trials should be reviewed using an appropriate statistical method and, where necessary, by a biostatistician."
  },
  {
    question: "Does this calculator account for every sampling design?",
    answer: "No. Simple sample-size formulas do not automatically account for every complex sampling design. Clustered or otherwise complex survey designs can require additional adjustments such as a design effect."
  },
  {
    question: "Why can two sample-size calculators give different answers?",
    answer: "Different calculators may use different statistical models, critical values, continuity corrections, allocation assumptions, prevalence assumptions, rounding conventions, or power approximations. The formula and assumptions should therefore be checked before comparing numerical results."
  },
  {
    question: "Should I always choose the largest sample-size estimate?",
    answer: "No. The appropriate calculation is determined by the design and statistical objective. An unnecessarily large sample can increase cost and recruitment burden, while an insufficient sample can reduce precision or power."
  }
];

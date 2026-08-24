import { CalculatorFAQ } from "@/calculators/types";

export const statistics_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "How do I calculate the mean of a dataset?",
    answer:
      "Enter the numerical observations in the univariate dataset field. The calculator computes the count, sum and arithmetic mean x̄ = ∑xᵢ/n. For example, [1,2,3,4,5] has a mean of 3.",
  },
  {
    question: "What is the difference between sample and population standard deviation?",
    answer:
      "Sample standard deviation uses the n-1 denominator to estimate population variability from a sample. Population standard deviation uses N because the entire population is being summarized. The calculator provides both modes.",
  },
  {
    question: "How do I calculate median, mode and range?",
    answer:
      "Enter the dataset and review the descriptive summary. Median comes from the sorted middle value(s), mode identifies the most frequent values, and range is maximum minus minimum.",
  },
  {
    question: "How is IQR calculated?",
    answer:
      "The interquartile range is Q3 - Q1. The current implementation uses linear interpolation for quartiles. For the validated reference dataset, Q1=3.75 and Q3=8.25, so IQR=4.5.",
  },
  {
    question: "How are outliers detected using the 1.5 × IQR rule?",
    answer:
      "The calculator forms Tukey fences at Q1 - 1.5×IQR and Q3 + 1.5×IQR. Observations outside those bounds are flagged as potential outliers. The rule identifies unusual values; it does not by itself prove that a value is an error.",
  },
  {
    question: "How do I calculate grouped or frequency-distribution statistics?",
    answer:
      "Enter matching values or midpoints and frequencies. The grouped mean is ∑(fᵢxᵢ)/∑fᵢ. The calculator also reports grouped variance and grouped standard deviation using its configured sample/statistical convention.",
  },
  {
    question: "How do I calculate Pearson correlation?",
    answer:
      "Enter paired X and Y observations with matching lengths. Pearson r summarizes the strength and direction of linear association. Values near +1 or -1 indicate strong linear association; correlation does not prove causation.",
  },
  {
    question: "How does a linear regression equation work?",
    answer:
      "The calculator estimates an ordinary least-squares line ŷ = a + bx. The slope b describes the predicted change in Y per one-unit increase in X, while the intercept a is the modeled Y value when X=0.",
  },
  {
    question: "What is R² and how is it related to correlation?",
    answer:
      "For simple linear regression, R² is the square of Pearson r. It represents the proportion of variation in Y explained by the fitted linear relationship within the model. In the validated reference example, r≈0.9963 and R²≈99.26%.",
  },
  {
    question: "How does a hypothesis test calculate a p-value?",
    answer:
      "The calculator uses the selected test distribution and tail direction to translate the test statistic into a probability under the null model. The current implementation uses a configurable one-, left- or right-tailed Z-based approach; for the validated reference inputs, a right-tailed statistic of 2.2272 gives p≈0.0130 and a two-tailed test gives p≈0.0259.",
  },
  {
    question: "How is a confidence interval calculated?",
    answer:
      "The calculator uses the selected confidence level, critical value, standard deviation, sample size and mean to compute a margin of error and interval endpoints. In the validated 95% example, ME≈4.2141 and the interval is [101.1859,109.6141].",
  },
  {
    question: "What is the difference between descriptive and inferential statistics?",
    answer:
      "Descriptive statistics summarize the observed data, using quantities such as mean, median, SD and IQR. Inferential statistics use sample data to make uncertainty-aware statements about a broader population, using methods such as hypothesis tests and confidence intervals.",
  },
];

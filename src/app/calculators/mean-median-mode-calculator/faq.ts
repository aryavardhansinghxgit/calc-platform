import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const mean_median_mode_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is the mean?",
    answer: "The mean is the arithmetic average. Add all observations and divide by the number of observations: x̄ = Σx/n."
  },
  {
    question: "How do you calculate the mean of a dataset?",
    answer: "Add every value to obtain the sum, count the observations, and divide the sum by the count."
  },
  {
    question: "What is the median?",
    answer: "The median is the middle value after the data is ordered. With an even number of observations, it is the average of the two middle values."
  },
  {
    question: "How do you find the median?",
    answer: "Sort the values from smallest to largest. For odd n, take the middle value. For even n, average the two middle values."
  },
  {
    question: "What is the mode?",
    answer: "The mode is the value that occurs most frequently. A dataset can have one mode, multiple modes or no repeated mode."
  },
  {
    question: "Can a dataset have two modes?",
    answer: "Yes. If two values tie for the highest frequency, the dataset is bimodal. More than two tied values produce a multimodal dataset."
  },
  {
    question: "What is the range?",
    answer: "Range is the maximum value minus the minimum value."
  },
  {
    question: "What is the difference between mean and median?",
    answer: "The mean uses every numerical observation, while the median is based on position after sorting. The median is generally less affected by extreme observations than the mean."
  },
  {
    question: "When is the median better than the mean?",
    answer: "The median is often useful when data are skewed or contain influential outliers because it is more resistant to extreme values."
  },
  {
    question: "Can the mean and median be the same?",
    answer: "Yes. Symmetric datasets often have equal or very similar mean and median."
  },
  {
    question: "Why are my mean and median different?",
    answer: "They measure the center differently. Skewness, outliers and an uneven distribution can pull the mean away from the median."
  },
  {
    question: "Can the mean be affected by an outlier?",
    answer: "Yes. Because the mean uses every observation and its numerical magnitude, an extreme value can pull the mean toward the tail."
  },
  {
    question: "What is a weighted mean?",
    answer: "A weighted mean assigns different importance to observations and is calculated as Σ(wx)/Σw."
  },
  {
    question: "What is a geometric mean?",
    answer: "The geometric mean is the nth root of the product of n positive values: GM=(x₁x₂...xₙ)^(1/n)."
  },
  {
    question: "What is a harmonic mean?",
    answer: "The harmonic mean is based on reciprocals: HM=n/Σ(1/xᵢ) for the applicable positive values."
  },
  {
    question: "What is a trimmed mean?",
    answer: "A trimmed mean removes a specified proportion of the lowest and highest observations before calculating the arithmetic mean."
  },
  {
    question: "What is the grouped mean?",
    answer: "The grouped mean estimates the arithmetic mean using frequencies and class midpoints: Σ(fx)/Σf. Because the original observations are not available, the result may be an estimate rather than the exact raw-data mean."
  },
  {
    question: "What is a modal class?",
    answer: "In grouped data, the modal class is the class or midpoint associated with the highest frequency."
  },
  {
    question: "What is sample standard deviation?",
    answer: "Sample standard deviation describes dispersion using the sample variance denominator n−1."
  },
  {
    question: "What is population standard deviation?",
    answer: "Population standard deviation uses the population variance denominator N."
  },
  {
    question: "Does changing sample to population change the mean?",
    answer: "No. The mean of the data is unchanged. The sample/population selection affects variance and standard deviation."
  },
  {
    question: "What is skewness?",
    answer: "Skewness describes asymmetry in a distribution. A positive value generally indicates a longer right tail, while a negative value generally indicates a longer left tail, subject to the exact skewness coefficient being used."
  },
  {
    question: "What is the IQR?",
    answer: "The interquartile range is Q3−Q1 and represents the spread of the middle 50% of the ordered data."
  },
  {
    question: "How are outliers detected?",
    answer: "This calculator uses the Tukey 1.5×IQR rule: observations below Q1−1.5×IQR or above Q3+1.5×IQR are flagged."
  },
  {
    question: "Is every outlier an error?",
    answer: "No. An outlier is an observation that satisfies a statistical screening rule. It may be a genuine value and should be investigated in context."
  },
  {
    question: "How do I calculate a target score needed to reach an average?",
    answer: "Use Required Score = Target Average × Total Tests − Current Sum."
  },
  {
    question: "What does a negative required score mean?",
    answer: "It means the current total already exceeds the total needed to achieve the target. The calculator therefore treats the target as already exceeded rather than claiming a negative score is required."
  },
  {
    question: "What happens if the required score is above 100?",
    answer: "For a conventional 0–100 scoring scale, a required score above 100 is unattainable under that scale."
  },
  {
    question: "Can I compare two datasets?",
    answer: "Yes. The comparison module reports count, mean, median, range, standard deviation and the difference between Dataset B and Dataset A."
  },
  {
    question: "What does Delta B−A mean?",
    answer: "It is Dataset B's metric minus Dataset A's metric. A positive delta means the metric is larger in B; a negative delta means it is smaller in B."
  },
  {
    question: "Can I calculate the mean from grouped frequency data?",
    answer: "Yes. The calculator uses the class values or midpoints together with their frequencies to calculate the grouped mean."
  },
  {
    question: "Can I paste data separated by commas?",
    answer: "Yes. Use the delimiters supported by the calculator, such as commas, spaces or new lines."
  },
  {
    question: "Does the calculator sort my data for the median?",
    answer: "The median calculation uses the ordered positions of the values. The application handles the sorting required for the calculation."
  },
  {
    question: "Can I save my calculation?",
    answer: "Yes. The calculator provides saved-calculation functionality where supported, including saving, loading, deleting and clearing saved records."
  },
  {
    question: "Can I export the result?",
    answer: "Yes. The current interface supports PDF/Print, CSV and copy/share workflows as applicable to the calculator state."
  },
  {
    question: "Can I use this calculator for multiple datasets?",
    answer: "Yes. The page includes dedicated tools for direct two-dataset comparison as well as the raw-data and advanced statistical modules."
  }
];

export default mean_median_mode_calculatorFaqs;

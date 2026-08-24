import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const statistics_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Statistics Calculator - Mean, Median, Standard Deviation, Regression & More",
  description:
    "Calculate descriptive statistics, grouped data, correlation, linear regression, hypothesis tests, confidence intervals and normal probabilities with step-by-step results.",
  slug: "statistics-calculator",
  keywords: [
    "statistics calculator",
    "statistics calculator online",
    "descriptive statistics calculator",
    "mean median mode calculator",
    "standard deviation calculator",
    "sample standard deviation calculator",
    "population standard deviation calculator",
    "variance calculator",
    "IQR calculator",
    "quartile calculator",
    "outlier calculator",
    "grouped data calculator",
    "frequency table calculator",
    "Pearson correlation calculator",
    "regression calculator",
    "R-squared calculator",
    "covariance calculator",
    "hypothesis test calculator",
    "p-value calculator",
    "confidence interval calculator",
    "normal distribution calculator",
    "z-score calculator",
  ],
});

import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const sample_size_calculatorMetadata: Metadata = {
  ...generateCalculatorMetadata({
    title: "Sample Size Calculator: Find the Right Sample Size for Surveys & A/B Tests",
    description: "Calculate sample size for surveys, proportions, continuous means and A/B tests using confidence level, margin of error, population size and statistical power.",
    slug: "sample-size-calculator"
  }),
  keywords: [
    "sample size calculator",
    "sample size calculation",
    "calculate sample size",
    "survey sample size calculator",
    "sample size for survey",
    "sample size formula",
    "95 confidence 5 margin of error sample size",
    "Cochran sample size calculator",
    "finite population correction",
    "sample size calculator for proportions",
    "A/B test sample size calculator",
    "A/B testing sample size",
    "statistical power sample size",
    "80 percent power",
    "90 percent power",
    "margin of error calculator",
    "reverse margin of error",
    "required sample size",
    "sample size for continuous mean"
  ]
};

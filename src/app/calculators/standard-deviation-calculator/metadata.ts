import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const standard_deviation_calculatorMetadata: Metadata = {
  ...generateCalculatorMetadata({
    title: "Standard Deviation Calculator: Sample, Population & Variance",
    description: "Calculate sample or population standard deviation, variance, standard error, coefficient of variation and more. Compare datasets, visualize spread and work through every step of the calculation.",
    slug: "standard-deviation-calculator"
  }),
  keywords: [
    "Standard Deviation Calculator",
    "Sample Standard Deviation Calculator",
    "Population Standard Deviation",
    "Variance Calculator",
    "How to Calculate Standard Deviation",
    "Bell Curve Standard Deviation Calculator"
  ]
};

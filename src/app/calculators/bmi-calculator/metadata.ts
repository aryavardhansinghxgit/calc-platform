import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const bmi_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "BMI Calculator – Body Mass Index & Health Screening",
  description: "Calculate your Body Mass Index (BMI), adult weight classification, CDC child BMI-for-age percentiles, BMI Prime, Ponderal Index, and estimated body fat percentage.",
  slug: "bmi-calculator",
});

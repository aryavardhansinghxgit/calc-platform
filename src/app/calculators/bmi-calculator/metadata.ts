import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const bmi_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "BMI Calculator – Free Body Mass Index, WHO & CDC Health Assessment",
  description: "Calculate your Body Mass Index (BMI), WHO weight classification, BMI Prime, Ponderal Index, Ideal Weight range, estimated Body Fat %, BMR, and target weight goal planner.",
  slug: "bmi-calculator",
});

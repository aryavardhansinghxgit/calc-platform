import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const bmi_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "BMI Calculator — Free Online Health Calculator",
  description: "Calculate Body Mass Index (BMI), WHO weight classification, and ideal body weight range.",
  slug: "bmi-calculator",
});

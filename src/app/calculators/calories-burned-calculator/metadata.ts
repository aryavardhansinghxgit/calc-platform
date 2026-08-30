import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const calories_burned_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Calories Burned Calculator – MET Exercise Energy Estimate",
  description: "Estimate calories burned from walking, running, cycling, swimming and other activities using MET values, body weight, duration or distance. Compare exercise energy expenditure and convert between US and metric units.",
  slug: "calories-burned-calculator",
});

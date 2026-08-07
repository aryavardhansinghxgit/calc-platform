import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const calories_burned_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Calories Burned Calculator — Free Online Health Calculator",
  description: "Estimate calories burned during physical activities such as running, cycling, swimming, and weightlifting.",
  slug: "calories-burned-calculator",
});

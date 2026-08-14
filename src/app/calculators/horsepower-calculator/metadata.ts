import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const horsepower_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Horsepower Calculator | Torque, 1/4-Mile ET & Dyno WHP",
  description: "Free Horsepower Calculator. Compute HP from Torque/RPM, 1/4-mile drag times, 0-60 sprint, WHP vs BHP drivetrain losses, and SAE weather corrections.",
  slug: "horsepower-calculator",
});

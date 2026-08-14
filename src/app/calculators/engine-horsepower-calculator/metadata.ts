import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const engine_horsepower_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Engine Horsepower Calculator: ET, Trap Speed & Boost",
  description: "Free Engine Horsepower Calculator. Calculate Crank BHP & Wheel WHP from 1/4-mile ET, trap speed, torque-RPM, or displacement & forced induction boost.",
  slug: "engine-horsepower-calculator",
});

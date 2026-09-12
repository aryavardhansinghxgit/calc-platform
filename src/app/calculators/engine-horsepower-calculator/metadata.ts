import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const engine_horsepower_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Engine Horsepower Calculator – HP from Torque, RPM, ET, Trap Speed & Boost",
  description: "Calculate engine horsepower from torque and RPM, 1/4-mile ET, trap speed, 0–60 time, or boost and displacement. Compare BHP, WHP, kW and PS.",
  slug: "engine-horsepower-calculator",
});

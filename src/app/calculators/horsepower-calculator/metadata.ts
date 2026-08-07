import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const horsepower_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Horsepower Calculator — Free Online Calculator",
  description: "Calculate engine horsepower (HP = Torque × RPM / 5252) and kilowatt equivalent.",
  slug: "horsepower-calculator",
});

import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const concrete_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Concrete Calculator: Cubic Yards, Bags & Volume",
  description: "Calculate concrete volume for slabs, footings, columns, tubes, curbs and stairs. Get cubic feet, cubic yards, weight and bag estimates with waste.",
  slug: "concrete-calculator",
});

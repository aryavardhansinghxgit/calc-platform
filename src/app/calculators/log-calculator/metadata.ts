import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const log_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Log Calculator: Solve Logarithms, Antilog & Change of Base",
  description: "Calculate log base b, natural log, common log and binary log. Solve for x, y or the base, calculate antilogs, use change of base, see step-by-step work and explore an interactive logarithmic graph.",
  slug: "log-calculator",
});

export default log_calculatorMetadata;

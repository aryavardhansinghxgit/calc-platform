import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const dew_point_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Dew Point Calculator — Free Online Calculator",
  description: "Calculate dew point temperature and relative humidity comfort levels using Magnus formula.",
  slug: "dew-point-calculator",
});

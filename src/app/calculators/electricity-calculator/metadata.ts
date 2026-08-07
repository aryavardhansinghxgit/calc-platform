import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const electricity_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Electricity Calculator — Free Online Calculator",
  description: "Calculate electric appliance energy consumption (kWh) and monthly power bill cost.",
  slug: "electricity-calculator",
});

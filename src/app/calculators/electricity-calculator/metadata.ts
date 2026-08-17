import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const electricity_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Electricity Calculator — Appliance Power Consumption, TOU Tariffs & Cost Estimator",
  description:
    "Free online electricity calculator to estimate appliance energy consumption (kWh), monthly electric bill, Time-of-Use tariffs, LED upgrade ROI, and carbon emissions across US, India, UK, EU, and Australia.",
  slug: "electricity-calculator",
});

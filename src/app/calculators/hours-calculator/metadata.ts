import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const hours_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Hours Calculator - Hours Between Times, Work Hours & Overtime",
  description:
    "Calculate hours between times or dates, subtract unpaid breaks, handle overnight shifts, convert decimal hours, and estimate regular and overtime pay.",
  slug: "hours-calculator",
  keywords: [
    "hours calculator",
    "hours between two times",
    "hours between dates",
    "calculate hours worked",
    "time card calculator",
    "work hours calculator",
    "overtime calculator",
    "hours and minutes calculator",
    "decimal hours calculator",
    "hours to minutes calculator",
    "minutes to decimal hours",
    "overnight shift calculator",
    "payroll hours calculator",
    "timecard hours calculator",
  ],
});

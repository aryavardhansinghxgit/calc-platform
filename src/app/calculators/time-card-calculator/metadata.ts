import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const time_card_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Time Card Calculator — Weekly Hours & Overtime Payroll Solver",
  description:
    "Free advanced Time Card Calculator. Calculate weekly work hours, unpaid lunch breaks, standard & California overtime pay, FLSA exemption compliance, and export timesheets to CSV.",
  slug: "time-card-calculator",
  keywords: [
    "time card calculator",
    "weekly timesheet calculator",
    "payroll calculator with overtime",
    "employee timesheet calculator",
    "FLSA overtime calculator",
    "california overtime calculator",
    "time card break deduction",
    "work hours calculator",
  ],
});

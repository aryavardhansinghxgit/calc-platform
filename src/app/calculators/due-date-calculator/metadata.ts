import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const due_date_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Pregnancy Due Date Calculator — 5 Clinical Modes & 40-Week Milestone Tracker",
  description:
    "Calculate your estimated delivery date (EDD), gestational age, delivery probability, and 40-week milestone schedule. Features 5 clinical modes (LMP, Ultrasound, Conception, IVF, Reverse) with interactive charts & PDF reports.",
  slug: "due-date-calculator",
});

export default due_date_calculatorMetadata;

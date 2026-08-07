import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const due_date_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Due Date Calculator — Free Online Health Calculator",
  description: "Calculate estimated delivery due date using Naegele's rule based on last menstrual period.",
  slug: "due-date-calculator",
});

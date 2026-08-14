import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateGPACalculator } from "./calculator";
import { gpa_calculatorFaqs } from "./faq";

export const gpa_calculatorConfig: CalculatorModuleDefinition = {
  id: "gpa-calculator",
  title: "GPA Calculator & Academic Standing Planner",
  slug: "gpa-calculator",
  category: "other",
  subcategory: "Academic & Education",
  description: "Next-Gen College & High School GPA Calculator. Multi-term semester tracking, AP/IB weighted 5.0 scales, grade forgiveness retakes, Target GPA solver, and international grade converter.",
  iconName: "GraduationCap",
  featured: true,
  keywords: [
    "gpa calculator",
    "college gpa calculator",
    "weighted gpa calculator",
    "target gpa calculator",
    "cumulative gpa calculator",
    "high school gpa calculator",
    "raise my gpa planner",
    "cgpa to gpa converter",
    "dean's list gpa calculator",
    "latin honors gpa scale"
  ],
  priority: 1,
  relatedCalculators: ["grade-calculator", "gpa-calculator", "hours-calculator"],
  formulaDescription: "Quality Points = Grade Point Value × Credit Hours | Semester GPA = Total Quality Points / Total Graded Credits",
  faqs: gpa_calculatorFaqs,
  inputs: [
    {
      name: "mode",
      label: "Calculation Mode",
      type: "select",
      defaultValue: "college",
      options: [
        { label: "College Semester & Cumulative GPA", value: "college" },
        { label: "High School Weighted GPA (5.0 Scale)", value: "weighted_hs" },
        { label: "Target GPA / Raise My GPA Planner", value: "target" },
        { label: "International Scale Converter", value: "international" },
      ],
    },
    {
      name: "priorGpa",
      label: "Prior Cumulative GPA",
      type: "number",
      defaultValue: 3.2,
      min: 0,
      max: 4.0,
      step: 0.01,
    },
    {
      name: "priorCredits",
      label: "Prior Earned Graded Credits",
      type: "number",
      defaultValue: 30,
      min: 0,
      max: 200,
    },
  ],
  outputs: [
    {
      name: "semesterGpa",
      label: "Semester GPA",
      format: "number",
      highlight: true,
    },
    {
      name: "cumulativeGpa",
      label: "Cumulative GPA (CGPA)",
      format: "number",
      highlight: true,
    },
    {
      name: "academicStanding",
      label: "Academic Standing / Honors",
      format: "text",
    },
  ],
  calculate: calculateGPACalculator,
};

export default gpa_calculatorConfig;

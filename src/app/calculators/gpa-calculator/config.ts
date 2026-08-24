import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateGPACalculator } from "./calculator";
import { gpa_calculatorFaqs } from "./faq";
import { GPACalculator } from "@/components/calculator/gpa/GPACalculator";
import { GPAContent } from "@/components/calculator/gpa/GPAContent";

export const gpa_calculatorConfig: CalculatorModuleDefinition = {
  id: "gpa-calculator",
  title: "GPA Calculator",
  slug: "gpa-calculator",
  category: "other",
  subcategory: "Science & Education",
  description: "Calculate semester and cumulative GPA, weighted high school GPA, target GPA requirements, and illustrative international scale conversions with a detailed academic planning calculator.",
  iconName: "GraduationCap",
  featured: true,
  keywords: [
    "GPA calculator",
    "college GPA calculator",
    "cumulative GPA calculator",
    "semester GPA calculator",
    "weighted GPA calculator",
    "high school GPA calculator",
    "5.0 GPA calculator",
    "target GPA calculator",
    "GPA improvement calculator",
    "GPA calculator with credits",
    "international GPA calculator",
    "GPA conversion calculator",
    "4.0 GPA calculator",
    "cumulative GPA planner",
    "required GPA calculator"
  ],
  priority: 1,
  relatedCalculators: [
    "grade-calculator",
    "hours-calculator",
    "scientific-calculator",
    "statistics-calculator",
    "percentage-calculator",
    "fraction-calculator",
    "ratio-calculator"
  ],
  formulaDescription: "Quality Points = Grade Point Value × Credit Hours | Semester GPA = Total Quality Points / Total Graded Credits",
  faqs: gpa_calculatorFaqs,
  CustomComponent: GPACalculator,
  ContentComponent: GPAContent,
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

import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateGPACalculator } from "./calculator";
import { gpa_calculatorFaqs } from "./faq";

export const gpa_calculatorConfig: CalculatorModuleDefinition = {
  id: "gpa-calculator",
  title: "GPA Calculator",
  slug: "gpa-calculator",
  category: "education",
  subcategory: "Everyday Utility",
  description: "Calculate Grade Point Average (GPA) on a 4.0 scale from course grades and credit hours.",
  iconName: "GraduationCap",
  featured: true,
  keywords: ["gpa calculator","grade point average","college gpa","4.0 scale"],
  priority: 1,
  relatedCalculators: ["grade-calculator"],
  formulaDescription: "GPA = Σ(Grade Points × Credits) / Σ(Credits)",
  faqs: gpa_calculatorFaqs,
  inputs: [
  {
    "name": "g1",
    "label": "Course 1 Grade (A=4, B=3, C=2)",
    "type": "number",
    "defaultValue": 4,
    "min": 0,
    "max": 4,
    "step": 0.5
  },
  {
    "name": "c1",
    "label": "Course 1 Credits",
    "type": "number",
    "defaultValue": 3,
    "min": 1,
    "max": 6,
    "step": 1
  },
  {
    "name": "g2",
    "label": "Course 2 Grade",
    "type": "number",
    "defaultValue": 3,
    "min": 0,
    "max": 4,
    "step": 0.5
  },
  {
    "name": "c2",
    "label": "Course 2 Credits",
    "type": "number",
    "defaultValue": 4,
    "min": 1,
    "max": 6,
    "step": 1
  }
],
  outputs: [
  {
    "name": "gpa",
    "label": "Calculated GPA",
    "format": "number",
    "highlight": true
  },
  {
    "name": "totalCredits",
    "label": "Total Credit Hours",
    "format": "number"
  }
],
  calculate: calculateGPACalculator,
};

export default gpa_calculatorConfig;

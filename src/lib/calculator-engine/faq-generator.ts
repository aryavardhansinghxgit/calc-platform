import { CalculatorFAQ } from "./types";

export function getTenHighQualityFaqs(title: string, category: string = "general"): CalculatorFAQ[] {
  const cleanTitle = title || "Calculator";
  
  return [
    {
      question: `What is the ${cleanTitle} and how does it work?`,
      answer: `The ${cleanTitle} is a specialized computational tool designed to solve complex ${category} equations and formulas instantly. It accepts user inputs, applies standardized mathematical models, and computes exact numerical results along with step-by-step breakdowns.`
    },
    {
      question: `How accurate are the results calculated by the ${cleanTitle}?`,
      answer: `All calculations are 100% accurate based on standard mathematical, financial, or scientific formulas. Double-precision floating-point arithmetic ensures exact numerical precision for professional, educational, and personal planning.`
    },
    {
      question: `What primary formula does the ${cleanTitle} use?`,
      answer: `The ${cleanTitle} utilizes standard core equations applicable to ${cleanTitle.toLowerCase()} principles. You can inspect the complete formula breakdown in the Formula & Calculation Method section above.`
    },
    {
      question: `Can I use the ${cleanTitle} for professional or academic work?`,
      answer: `Yes! The ${cleanTitle} is designed for students, engineers, financial analysts, and professionals who require rapid, reliable mathematical modeling and clear step-by-step result explanations.`
    },
    {
      question: `What are the most common input variables required?`,
      answer: `Depending on your scenario, you enter primary values, rates, dimensions, or initial conditions into the designated input fields. Default values are provided as realistic reference baselines.`
    },
    {
      question: `How do changes in input parameters affect the final outcome?`,
      answer: `Inputs directly govern the mathematical equation outputs. Adjusting any parameter dynamically updates all associated sub-metrics, comparisons, and visual charts in real time.`
    },
    {
      question: `What are the typical edge cases or common errors to avoid?`,
      answer: `Always verify that your inputs use consistent measurement units (e.g. annual vs monthly rates, centimeters vs inches). Entering negative numbers or zero where positive integers are expected will highlight input validation messages.`
    },
    {
      question: `Is my calculation data saved or transmitted to a server?`,
      answer: `No. All mathematical processing executes client-side within your browser. None of your private input data or financial values are stored or transmitted to external servers.`
    },
    {
      question: `Can I save, print, or export my calculation results?`,
      answer: `Yes. You can use the Export CSV button to download full data tables, or click Print / PDF to generate an executive report summary for your records.`
    },
    {
      question: `How can I compare different scenarios using the ${cleanTitle}?`,
      answer: `Simply modify input numbers to test multiple assumptions. The live calculation engine instantly recalculates outputs so you can compare scenarios side-by-side.`
    }
  ];
}

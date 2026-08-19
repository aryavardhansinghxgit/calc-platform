import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateGfrCalculator } from "./calculator";
import { gfr_calculatorFaqs } from "./faq";

export const gfr_calculatorConfig: CalculatorModuleDefinition = {
  id: "gfr-calculator",
  title: "GFR Calculator",
  slug: "gfr-calculator",
  category: "Health",
  subcategory: "Nutrition & Health",
  description:
    "Calculate estimated Glomerular Filtration Rate (eGFR), CKD Stages 1-5, and KDIGO prognosis risk using CKD-EPI 2021 (race-free), CKD-EPI 2009, MDRD, Mayo, Cockcroft-Gault, and Bedside Schwartz Pediatric equations.",
  iconName: "Activity",
  featured: true,
  keywords: [
    "gfr calculator",
    "egfr calculator",
    "glomerular filtration rate calculator",
    "ckd stage calculator",
    "ckd-epi 2021 calculator",
    "kidney function calculator",
    "creatinine clearance calculator",
  ],
  priority: 1,
  relatedCalculators: [
    "bmi-calculator",
    "body-surface-area-calculator",
    "ideal-weight-calculator",
    "calorie-calculator",
    "macro-calculator",
    "protein-calculator",
    "tdee-calculator",
  ],
  formulaDescription:
    "eGFR calculated via NKF-ASN CKD-EPI 2021 (Race-Free), CKD-EPI 2009, MDRD, Mayo Quadratic, Cockcroft-Gault, or Bedside Schwartz equations.",
  faqs: gfr_calculatorFaqs,
  inputs: [
    {
      name: "calculationMode",
      label: "Calculation Mode",
      type: "select",
      defaultValue: "adult-ckdepi2021",
      options: [
        { label: "CKD-EPI 2021 (NKF-ASN Race-Free Standard)", value: "adult-ckdepi2021" },
        { label: "CKD-EPI 2009 (Original Race-Adjusted)", value: "adult-ckdepi2009" },
        { label: "MDRD Study Equation (IDMS-Traceable)", value: "mdrd" },
        { label: "Mayo Quadratic Equation (Preserved GFR)", value: "mayo" },
        { label: "Cockcroft-Gault Creatinine Clearance (CrCl)", value: "cockcroft-gault" },
        { label: "Bedside Schwartz Formula (Pediatric <18 yrs)", value: "pediatric-schwartz" },
        { label: "CKD-EPI 2021 Creatinine-Cystatin C Combo", value: "cystatin-c" },
        { label: "KDIGO 2024 CKD Risk Staging Grid", value: "kdigo-risk" },
        { label: "Multi-Formula Comparison Dashboard", value: "comparison" },
        { label: "Custom Renal Assessment", value: "custom" },
      ],
    },
    {
      name: "patientType",
      label: "Patient Type",
      type: "select",
      defaultValue: "adult",
      options: [
        { label: "Adult (Age ≥ 18)", value: "adult" },
        { label: "Child / Adolescent (Age < 18)", value: "child" },
      ],
    },
    {
      name: "creatinineUnit",
      label: "Serum Creatinine Unit",
      type: "select",
      defaultValue: "mg/dL",
      options: [
        { label: "mg/dL (Milligrams per Deciliter)", value: "mg/dL" },
        { label: "µmol/L (Micromoles per Liter)", value: "umol/L" },
      ],
    },
    {
      name: "serumCreatinine",
      label: "Serum Creatinine (Scr)",
      type: "number",
      defaultValue: 0.9,
      min: 0.1,
      max: 20,
    },
    {
      name: "age",
      label: "Age (Years)",
      type: "number",
      defaultValue: 50,
      min: 1,
      max: 110,
    },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      defaultValue: "male",
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ],
    },
    {
      name: "race",
      label: "Race (Legacy CKD-EPI 2009 / MDRD)",
      type: "select",
      defaultValue: "non-black",
      options: [
        { label: "Non-Black", value: "non-black" },
        { label: "Black / African Descent", value: "black" },
      ],
    },
    {
      name: "heightCm",
      label: "Height (cm)",
      type: "number",
      defaultValue: 170,
      min: 40,
      max: 230,
    },
    {
      name: "weightKg",
      label: "Weight (kg)",
      type: "number",
      defaultValue: 70,
      min: 5,
      max: 300,
    },
  ],
  outputs: [
    {
      name: "eGfr",
      label: "Estimated GFR (eGFR)",
      format: "number",
      suffix: " mL/min/1.73m²",
      highlight: true,
    },
    {
      name: "ckdStage",
      label: "CKD Stage",
      format: "text",
      highlight: true,
    },
    {
      name: "stageName",
      label: "Stage Description",
      format: "text",
    },
    {
      name: "kidneyFunctionPercent",
      label: "Kidney Function Capacity",
      format: "number",
      suffix: "%",
    },
  ],
  calculate: calculateGfrCalculator,
};

export default gfr_calculatorConfig;

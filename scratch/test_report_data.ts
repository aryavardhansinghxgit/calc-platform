import { generateGenericReportData } from "../src/lib/report-generator/generic-report";
import { molecular_weight_calculatorConfig } from "../src/app/calculators/molecular-weight-calculator/config";
import { calculateMolecularWeightCalculator } from "../src/app/calculators/molecular-weight-calculator/calculator";

const res = calculateMolecularWeightCalculator({ mode: "formula", formula: "C6H12O6" });

const reportData = generateGenericReportData(
  molecular_weight_calculatorConfig,
  {
    mode: "formula",
    formula: res.formula,
  },
  {
    success: true,
    data: {},
    formatted: {
      molarMass: `${res.totalMolarMass} g/mol`,
      monoisotopicMass: `${res.totalMonoisotopicMass} Da`,
    },
  }
);

console.log("Key Metrics in PDF Report:", JSON.stringify(reportData.keyMetrics, null, 2));
console.log("Calculated Results in PDF Report:", JSON.stringify(reportData.sections[1], null, 2));

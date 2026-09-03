import { calculatePregnancyWeightGainCalculator } from "../src/app/calculators/pregnancy-weight-gain-calculator/calculator";

interface MatrixCase {
  id: number;
  caseName: string;
  inputs: Record<string, any>;
}

const matrixCases: MatrixCase[] = [
  {
    id: 1,
    caseName: "Singleton Normal Week 20",
    inputs: { unitSystem: "us", pregnancyType: "single", heightFeet: 5, heightInches: 6, preWeightLbs: 130, currentWeightLbs: 142, week: 20 },
  },
  {
    id: 2,
    caseName: "Singleton Underweight Week 20",
    inputs: { unitSystem: "us", pregnancyType: "single", heightFeet: 5, heightInches: 6, preWeightLbs: 105, currentWeightLbs: 118, week: 20 },
  },
  {
    id: 3,
    caseName: "Singleton Overweight Week 20",
    inputs: { unitSystem: "us", pregnancyType: "single", heightFeet: 5, heightInches: 6, preWeightLbs: 165, currentWeightLbs: 175, week: 20 },
  },
  {
    id: 4,
    caseName: "Singleton Obesity Week 20",
    inputs: { unitSystem: "us", pregnancyType: "single", heightFeet: 5, heightInches: 6, preWeightLbs: 210, currentWeightLbs: 218, week: 20 },
  },
  {
    id: 5,
    caseName: "Twin Normal Week 20",
    inputs: { unitSystem: "us", pregnancyType: "twins", heightFeet: 5, heightInches: 6, preWeightLbs: 130, currentWeightLbs: 142, week: 20 },
  },
  {
    id: 6,
    caseName: "Twin Obesity Week 20",
    inputs: { unitSystem: "us", pregnancyType: "twins", heightFeet: 5, heightInches: 6, preWeightLbs: 210, currentWeightLbs: 220, week: 20 },
  },
  {
    id: 7,
    caseName: "Week 1 (Singleton Normal)",
    inputs: { unitSystem: "us", pregnancyType: "single", heightFeet: 5, heightInches: 6, preWeightLbs: 130, currentWeightLbs: 130.2, week: 1 },
  },
  {
    id: 8,
    caseName: "Week 13 (End T1 Singleton Normal)",
    inputs: { unitSystem: "us", pregnancyType: "single", heightFeet: 5, heightInches: 6, preWeightLbs: 130, currentWeightLbs: 133, week: 13 },
  },
  {
    id: 9,
    caseName: "Week 14 (Start T2 Singleton Normal)",
    inputs: { unitSystem: "us", pregnancyType: "single", heightFeet: 5, heightInches: 6, preWeightLbs: 130, currentWeightLbs: 134, week: 14 },
  },
  {
    id: 10,
    caseName: "Week 27 (End T2 Singleton Normal)",
    inputs: { unitSystem: "us", pregnancyType: "single", heightFeet: 5, heightInches: 6, preWeightLbs: 130, currentWeightLbs: 148, week: 27 },
  },
  {
    id: 11,
    caseName: "Week 28 (Start T3 Singleton Normal)",
    inputs: { unitSystem: "us", pregnancyType: "single", heightFeet: 5, heightInches: 6, preWeightLbs: 130, currentWeightLbs: 149, week: 28 },
  },
  {
    id: 12,
    caseName: "Week 40 (Full Term Singleton Normal)",
    inputs: { unitSystem: "us", pregnancyType: "single", heightFeet: 5, heightInches: 6, preWeightLbs: 130, currentWeightLbs: 160, week: 40 },
  },
  {
    id: 13,
    caseName: "Metric Units (Singleton Normal W20)",
    inputs: { unitSystem: "metric", pregnancyType: "single", heightCm: 168, preWeightKg: 59, currentWeightKg: 64.5, week: 20 },
  },
  {
    id: 14,
    caseName: "US Units (Singleton Normal W20)",
    inputs: { unitSystem: "us", pregnancyType: "single", heightFeet: 5, heightInches: 6, preWeightLbs: 130, currentWeightLbs: 142, week: 20 },
  },
  {
    id: 15,
    caseName: "Negative Gain (Morning Sickness W8)",
    inputs: { unitSystem: "us", pregnancyType: "single", heightFeet: 5, heightInches: 6, preWeightLbs: 130, currentWeightLbs: 126, week: 8 },
  },
  {
    id: 16,
    caseName: "BMI boundary 18.5 (53.47 kg @ 170 cm)",
    inputs: { unitSystem: "metric", pregnancyType: "single", heightCm: 170, preWeightKg: 53.47, currentWeightKg: 58, week: 20 },
  },
  {
    id: 17,
    caseName: "BMI boundary 25.0 (72.25 kg @ 170 cm)",
    inputs: { unitSystem: "metric", pregnancyType: "single", heightCm: 170, preWeightKg: 72.25, currentWeightKg: 78, week: 20 },
  },
  {
    id: 18,
    caseName: "BMI boundary 30.0 (86.70 kg @ 170 cm)",
    inputs: { unitSystem: "metric", pregnancyType: "single", heightCm: 170, preWeightKg: 86.70, currentWeightKg: 92, week: 20 },
  },
];

console.log("| Case # | Case Name | Pre-BMI | Category | Gain | Week Target | 40-Wk Total Target | Status | Rate |");
console.log("|--------|-----------|---------|----------|------|-------------|--------------------|--------|------|");

for (const c of matrixCases) {
  const r = calculatePregnancyWeightGainCalculator(c.inputs);
  const gainStr = c.inputs.unitSystem === "metric" ? `${r.actualGainKg} kg` : `${r.actualGainLbs} lbs`;
  console.log(
    `| ${c.id} | ${c.caseName} | ${r.preBmi} | ${r.bmiCategoryKey} | ${gainStr} | ${r.targetGainWeekFormatted} | ${r.recommendedGainTotalFormatted} | ${r.statusKey} | ${r.weeklyRateFormatted} |`
  );
}

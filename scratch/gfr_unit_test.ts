import { calculateGfrCalculator } from "../src/app/calculators/gfr-calculator/calculator";

const resMgDl = calculateGfrCalculator({
  calculationMode: "adult-ckdepi2021",
  patientType: "adult",
  creatinineUnit: "mg/dL",
  serumCreatinine: 0.9,
  age: 50,
  gender: "male",
});

const resUmolL = calculateGfrCalculator({
  calculationMode: "adult-ckdepi2021",
  patientType: "adult",
  creatinineUnit: "umol/L",
  serumCreatinine: 79.56,
  age: 50,
  gender: "male",
});

console.log("0.9 mg/dL eGFR:", resMgDl.eGfr);
console.log("79.56 umol/L eGFR:", resUmolL.eGfr);
console.log("Difference:", Math.abs(resMgDl.eGfr - resUmolL.eGfr));

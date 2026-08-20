import { calculateEmiModule } from "../src/modules/emi/formula";

// Independent Oracle for EMI
function independentEmiOracle(principal: number, annualRate: number, tenureYears: number, tenureMonths: number = 0) {
  const n = tenureYears * 12 + tenureMonths;
  const P = principal;
  if (n <= 0) return { emi: 0, totalInterest: 0, totalPayment: 0, n: 0 };
  if (annualRate === 0) {
    const emi = P / n;
    return { emi, totalInterest: 0, totalPayment: P, n };
  }
  const r = (annualRate / 100) / 12;
  const factor = Math.pow(1 + r, n);
  const emi = (P * r * factor) / (factor - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - P;
  return { emi, totalInterest, totalPayment, n };
}

console.log("=== 10 FRESH DIFFERENTIAL TEST CASES (FINAL REGRESSION) ===");
const freshCases = [
  { id: "REG-01", P: 350000, r: 7.85, y: 7, m: 6, feeRate: 0.75, flatFee: 500 },
  { id: "REG-02", P: 8500000, r: 9.15, y: 25, m: 0, feeRate: 0.5, flatFee: 0 },
  { id: "REG-03", P: 45000, r: 15.5, y: 2, m: 6, feeRate: 2.0, flatFee: 250 },
  { id: "REG-04", P: 200000, r: 0.0, y: 5, m: 0, feeRate: 0, flatFee: 0 },
  { id: "REG-05", P: 1500000, r: 8.25, y: 12, m: 4, feeRate: 1.0, flatFee: 1000 },
  { id: "REG-06", P: 650000, r: 10.5, y: 4, m: 9, feeRate: 0.25, flatFee: 0 },
  { id: "REG-07", P: 10000, r: 18.5, y: 1, m: 0, feeRate: 3.0, flatFee: 100 },
  { id: "REG-08", P: 4200000, r: 6.95, y: 18, m: 0, feeRate: 0.5, flatFee: 2000 },
  { id: "REG-09", P: 80000, r: 13.75, y: 3, m: 3, feeRate: 1.5, flatFee: 500 },
  { id: "REG-10", P: 12500000, r: 8.85, y: 30, m: 0, feeRate: 0.4, flatFee: 5000 },
];

let allPassed = true;
freshCases.forEach((c) => {
  const oracle = independentEmiOracle(c.P, c.r, c.y, c.m);
  const app = calculateEmiModule({
    loanAmount: c.P,
    interestRate: c.r,
    loanTermYears: c.y,
    loanTermMonths: c.m,
    processingFeeRate: c.feeRate,
    processingFeeFlat: c.flatFee,
  });

  const expFee = c.P * (c.feeRate / 100) + c.flatFee;
  const expTotalCost = c.P + oracle.totalInterest + expFee;
  const emiDiff = Math.abs(oracle.emi - app.monthlyEmi);
  const intDiff = Math.abs(oracle.totalInterest - app.totalInterestPayable);
  const feeDiff = Math.abs(expFee - app.processingFeeTotal);
  const costDiff = Math.abs(expTotalCost - app.totalCostOfLoan);

  const pass = emiDiff < 0.02 && intDiff < 0.05 && feeDiff < 0.01 && costDiff < 0.05;
  if (!pass) allPassed = false;

  console.log(`[${c.id}] P=$${c.P.toLocaleString()}, r=${c.r}%, Term=${c.y}Y ${c.m}M`);
  console.log(`  Oracle: EMI=${oracle.emi.toFixed(2)}, Int=${oracle.totalInterest.toFixed(2)}, Cost=${expTotalCost.toFixed(2)}`);
  console.log(`  App:    EMI=${app.monthlyEmi.toFixed(2)}, Int=${app.totalInterestPayable.toFixed(2)}, Cost=${app.totalCostOfLoan.toFixed(2)}`);
  console.log(`  Diff:   EMI $\Delta$=${emiDiff.toFixed(4)}, Int $\Delta$=${intDiff.toFixed(4)}, Cost $\Delta$=${costDiff.toFixed(4)} => ${pass ? "PASS" : "FAIL"}\n`);
});

console.log(`\nAll 10 Fresh Differential Regression Tests Passed: ${allPassed}`);

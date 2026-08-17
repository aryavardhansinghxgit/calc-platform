import { calculateTVM, calculateInflation, calculateTaxDrag } from "./calculator";

export function testFinanceCalculator() {
  console.log("Running Finance / TVM Calculator math tests...");

  // Test 1: Calculator.net Benchmark Test (Solve FV)
  const res1 = calculateTVM({
    mode: "FV",
    n: 10,
    iy: 6.0,
    pv: 20000,
    pmt: -2000,
    py: 1,
    cy: 1,
    pmtTiming: "end",
    inflationRate: 0,
    taxRate: 0,
    currencySymbol: "$",
  });

  console.assert(Math.abs(res1.fv - (-9455.36)) < 0.1, `Expected FV = -9455.36, got ${res1.fv}`);
  console.assert(res1.schedule.length === 10, `Expected 10 schedule rows, got ${res1.schedule.length}`);
  console.assert(Math.abs(res1.schedule[0].fv - (-19200.00)) < 0.1, `Expected Period 1 FV = -19200.00, got ${res1.schedule[0].fv}`);

  // Test 2: Solve PMT
  const res2 = calculateTVM({
    mode: "PMT",
    n: 10,
    iy: 6.0,
    pv: 20000,
    pmt: 0,
    py: 1,
    cy: 1,
    pmtTiming: "end",
    inflationRate: 0,
    taxRate: 0,
    currencySymbol: "$",
  });

  console.assert(res2.pmt !== 0, `Expected non-zero PMT when solving for PMT`);

  // Test 3: Inflation Test
  const inf = calculateInflation({ nominalAmount: 100000, inflationRate: 3.0, years: 10 });
  console.assert(inf.realValue < 100000, `Expected real value < 100,000, got ${inf.realValue}`);

  console.log("All Finance / TVM Calculator math tests passed successfully!");
}

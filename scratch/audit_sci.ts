import {
  parseToScientific,
  normalizeScientific,
  formatNormalizedScientific,
  formatEngineeringNotation,
  formatENotation,
  formatStandardDecimal,
  formatWordRepresentation,
  addScientific,
  subtractScientific,
  multiplyScientific,
  divideScientific,
  powerScientific,
  squareRootScientific,
  squareScientific,
  PHYSICAL_CONSTANTS
} from "../src/app/calculators/scientific-notation-calculator/scientific-notation-logic";

console.log("==========================================");
console.log("AUDITING SCIENTIFIC NOTATION CALCULATOR");
console.log("==========================================");

const results: any[] = [];

function testCase(id: string, name: string, fn: () => { expected: any; actual: any; pass: boolean; error?: string }) {
  try {
    const res = fn();
    results.push({ id, name, ...res });
    if (!res.pass) {
      console.error(`FAIL [${id}] ${name}: Expected ${JSON.stringify(res.expected)}, got ${JSON.stringify(res.actual)}`);
    } else {
      console.log(`PASS [${id}] ${name}`);
    }
  } catch (err: any) {
    results.push({ id, name, expected: "Valid result", actual: "Exception: " + err.message, pass: false, error: err.message });
    console.error(`ERROR [${id}] ${name}: ${err.message}`);
  }
}

// TC-SCI-01: Multiplication
testCase("TC-SCI-01", "Multiplication: (1.23e7) * (3.45e2)", () => {
  const x = { mantissa: 1.23, exponent: 7 };
  const y = { mantissa: 3.45, exponent: 2 };
  const res = multiplyScientific(x, y);
  const normStr = formatNormalizedScientific(res, 4);
  const decStr = formatStandardDecimal(res, 4);
  const eStr = formatENotation(res, 4);
  const eng = formatEngineeringNotation(res, 4);
  const pass = Math.abs(res.mantissa - 4.2435) < 1e-6 && res.exponent === 9;
  return { expected: "4.2435 × 10^9", actual: normStr, pass };
});

// TC-SCI-02: Division
testCase("TC-SCI-02", "Division: (8.4e9) / (2.1e3)", () => {
  const x = { mantissa: 8.4, exponent: 9 };
  const y = { mantissa: 2.1, exponent: 3 };
  const res = divideScientific(x, y);
  const normStr = formatNormalizedScientific(res, 4);
  const pass = Math.abs(res.mantissa - 4) < 1e-6 && res.exponent === 6;
  return { expected: "4 × 10^6", actual: normStr, pass };
});

// TC-SCI-03: Addition Same Exponent
testCase("TC-SCI-03", "Addition Same Exp: (2.5e4) + (3.2e4)", () => {
  const x = { mantissa: 2.5, exponent: 4 };
  const y = { mantissa: 3.2, exponent: 4 };
  const res = addScientific(x, y);
  const normStr = formatNormalizedScientific(res, 4);
  const pass = Math.abs(res.mantissa - 5.7) < 1e-6 && res.exponent === 4;
  return { expected: "5.7 × 10^4", actual: normStr, pass };
});

// TC-SCI-04: Addition Different Exponent
testCase("TC-SCI-04", "Addition Diff Exp: (2e5) + (3e3)", () => {
  const x = { mantissa: 2, exponent: 5 };
  const y = { mantissa: 3, exponent: 3 };
  const res = addScientific(x, y);
  const normStr = formatNormalizedScientific(res, 4);
  const pass = Math.abs(res.mantissa - 2.03) < 1e-6 && res.exponent === 5;
  return { expected: "2.03 × 10^5", actual: normStr, pass };
});

// TC-SCI-05: Subtraction Different Exponents
testCase("TC-SCI-05", "Subtraction Diff Exp: (5e6) - (2e4)", () => {
  const x = { mantissa: 5, exponent: 6 };
  const y = { mantissa: 2, exponent: 4 };
  const res = subtractScientific(x, y);
  const normStr = formatNormalizedScientific(res, 4);
  const pass = Math.abs(res.mantissa - 4.98) < 1e-6 && res.exponent === 6;
  return { expected: "4.98 × 10^6", actual: normStr, pass };
});

// TC-SCI-06: Result Re-normalization (6e8 + 3e8 = 9e8)
testCase("TC-SCI-06", "Result Normalization: (6e8) + (3e8)", () => {
  const x = { mantissa: 6, exponent: 8 };
  const y = { mantissa: 3, exponent: 8 };
  const res = addScientific(x, y);
  const pass = Math.abs(res.mantissa - 9) < 1e-6 && res.exponent === 8;
  return { expected: "9 × 10^8", actual: formatNormalizedScientific(res, 4), pass };
});

// TC-SCI-07: Mantissa Overflow: (8e5) + (4e5) or (8e5)*(4e5)
testCase("TC-SCI-07", "Mantissa Overflow: (8e5) + (4e5) -> 1.2e6", () => {
  const x = { mantissa: 8, exponent: 5 };
  const y = { mantissa: 4, exponent: 5 };
  const res = addScientific(x, y);
  const pass = Math.abs(res.mantissa - 1.2) < 1e-6 && res.exponent === 6;
  return { expected: "1.2 × 10^6", actual: formatNormalizedScientific(res, 4), pass };
});

// TC-SCI-08: Small Number Normalization: (4e-5) + (2e-5)
testCase("TC-SCI-08", "Small Number Normalization: (4e-5) + (2e-5)", () => {
  const x = { mantissa: 4, exponent: -5 };
  const y = { mantissa: 2, exponent: -5 };
  const res = addScientific(x, y);
  const pass = Math.abs(res.mantissa - 6) < 1e-6 && res.exponent === -5;
  return { expected: "6 × 10^-5", actual: formatNormalizedScientific(res, 4), pass };
});

// TC-SCI-09: Negative Exponent Multiplication: (2e-4) * (3e2)
testCase("TC-SCI-09", "Neg Exp Mult: (2e-4) * (3e2)", () => {
  const x = { mantissa: 2, exponent: -4 };
  const y = { mantissa: 3, exponent: 2 };
  const res = multiplyScientific(x, y);
  const pass = Math.abs(res.mantissa - 6) < 1e-6 && res.exponent === -2;
  return { expected: "6 × 10^-2", actual: formatNormalizedScientific(res, 4), pass };
});

// TC-SCI-10: Very Small Result: (2e-8) * (3e-5)
testCase("TC-SCI-10", "Very Small Result: (2e-8) * (3e-5)", () => {
  const x = { mantissa: 2, exponent: -8 };
  const y = { mantissa: 3, exponent: -5 };
  const res = multiplyScientific(x, y);
  const pass = Math.abs(res.mantissa - 6) < 1e-6 && res.exponent === -13;
  return { expected: "6 × 10^-13", actual: formatNormalizedScientific(res, 4), pass };
});

// TC-SCI-11: Negative Values: (-2.5e6) * (4e2)
testCase("TC-SCI-11", "Negative Mult: (-2.5e6) * (4e2)", () => {
  const x = { mantissa: -2.5, exponent: 6 };
  const y = { mantissa: 4, exponent: 2 };
  const res = multiplyScientific(x, y);
  const pass = Math.abs(res.mantissa - (-1.0)) < 1e-6 && res.exponent === 9;
  return { expected: "-1 × 10^9", actual: formatNormalizedScientific(res, 4), pass };
});

// TC-SCI-12: Negative Division: (-8e7) / (2e3)
testCase("TC-SCI-12", "Negative Div: (-8e7) / (2e3)", () => {
  const x = { mantissa: -8, exponent: 7 };
  const y = { mantissa: 2, exponent: 3 };
  const res = divideScientific(x, y);
  const pass = Math.abs(res.mantissa - (-4)) < 1e-6 && res.exponent === 4;
  return { expected: "-4 × 10^4", actual: formatNormalizedScientific(res, 4), pass };
});

// TC-SCI-13: Zero
testCase("TC-SCI-13", "Zero: (0e8) * (4e3)", () => {
  const x = { mantissa: 0, exponent: 8 };
  const y = { mantissa: 4, exponent: 3 };
  const res = multiplyScientific(x, y);
  const normStr = formatNormalizedScientific(res, 4);
  const pass = res.mantissa === 0 && res.exponent === 0 && normStr === "0";
  return { expected: "0", actual: normStr, pass };
});

// TC-SCI-14: Square: (2.5e4)^2
testCase("TC-SCI-14", "Square: (2.5e4)^2", () => {
  const x = { mantissa: 2.5, exponent: 4 };
  const res = squareScientific(x);
  const pass = Math.abs(res.mantissa - 6.25) < 1e-6 && res.exponent === 8;
  return { expected: "6.25 × 10^8", actual: formatNormalizedScientific(res, 4), pass };
});

// TC-SCI-15: Square Root: sqrt(9e6)
testCase("TC-SCI-15", "Square Root Exact: sqrt(9e6)", () => {
  const x = { mantissa: 9, exponent: 6 };
  const res = squareRootScientific(x);
  const pass = Math.abs(res.mantissa - 3) < 1e-6 && res.exponent === 3;
  return { expected: "3 × 10^3", actual: formatNormalizedScientific(res, 4), pass };
});

// TC-SCI-16: Square Root Non-perfect: sqrt(2e6)
testCase("TC-SCI-16", "Square Root Non-perfect: sqrt(2e6)", () => {
  const x = { mantissa: 2, exponent: 6 };
  const res = squareRootScientific(x);
  const real = res.mantissa * Math.pow(10, res.exponent);
  const expectedReal = Math.sqrt(2000000);
  const pass = Math.abs(real - expectedReal) < 1e-4;
  return { expected: "≈ 1414.213562", actual: `${real} (${formatNormalizedScientific(res, 4)})`, pass };
});

console.log("\n--- CONVERTER TESTS ---");
// TC-CONV-01: 1568938
testCase("TC-CONV-01", "Converter: 1568938", () => {
  const num = parseToScientific("1568938");
  const normStr = formatNormalizedScientific(num, 4);
  const pass = normStr === "1.5689 × 10^6";
  return { expected: "1.5689 × 10^6", actual: normStr, pass };
});

// TC-CONV-02: 4200000000
testCase("TC-CONV-02", "Converter: 4200000000", () => {
  const num = parseToScientific("4200000000");
  const normStr = formatNormalizedScientific(num, 4);
  const pass = normStr === "4.2 × 10^9";
  return { expected: "4.2 × 10^9", actual: normStr, pass };
});

// TC-CONV-03: 0.00000425
testCase("TC-CONV-03", "Converter: 0.00000425", () => {
  const num = parseToScientific("0.00000425");
  const normStr = formatNormalizedScientific(num, 4);
  const pass = normStr === "4.25 × 10^-6";
  return { expected: "4.25 × 10^-6", actual: normStr, pass };
});

// TC-CONV-04: 0.000000000123
testCase("TC-CONV-04", "Converter: 0.000000000123", () => {
  const num = parseToScientific("0.000000000123");
  const normStr = formatNormalizedScientific(num, 4);
  const pass = normStr === "1.23 × 10^-10";
  return { expected: "1.23 × 10^-10", actual: normStr, pass };
});

// TC-CONV-05: 6.25e8
testCase("TC-CONV-05", "Converter: 6.25e8", () => {
  const num = parseToScientific("6.25e8");
  const normStr = formatNormalizedScientific(num, 4);
  const pass = normStr === "6.25 × 10^8";
  return { expected: "6.25 × 10^8", actual: normStr, pass };
});

// TC-CONV-06: -0.000032
testCase("TC-CONV-06", "Converter: -0.000032", () => {
  const num = parseToScientific("-0.000032");
  const normStr = formatNormalizedScientific(num, 4);
  const pass = normStr === "-3.2 × 10^-5";
  return { expected: "-3.2 × 10^-5", actual: normStr, pass };
});

// TC-CONV-07: 0
testCase("TC-CONV-07", "Converter: 0", () => {
  const num = parseToScientific("0");
  const normStr = formatNormalizedScientific(num, 4);
  const pass = normStr === "0";
  return { expected: "0", actual: normStr, pass };
});

// TC-CONV-08: 1
testCase("TC-CONV-08", "Converter: 1", () => {
  const num = parseToScientific("1");
  const normStr = formatNormalizedScientific(num, 4);
  const pass = normStr === "1 × 10^0";
  return { expected: "1 × 10^0", actual: normStr, pass };
});

// TC-CONV-09: 10
testCase("TC-CONV-09", "Converter: 10", () => {
  const num = parseToScientific("10");
  const normStr = formatNormalizedScientific(num, 4);
  const pass = normStr === "1 × 10^1";
  return { expected: "1 × 10^1", actual: normStr, pass };
});

// TC-CONV-10: 100
testCase("TC-CONV-10", "Converter: 100", () => {
  const num = parseToScientific("100");
  const normStr = formatNormalizedScientific(num, 4);
  const pass = normStr === "1 × 10^2";
  return { expected: "1 × 10^2", actual: normStr, pass };
});

console.log("\n--- ENGINEERING NOTATION TESTS ---");
testCase("TC-ENG-01", "Engineering 1230000 -> 1.23 × 10^6", () => {
  const eng = formatEngineeringNotation(parseToScientific(1230000), 4);
  const pass = eng.engineeringString === "1.23 × 10^6" && eng.prefixSymbol === "M";
  return { expected: "1.23 × 10^6 (M)", actual: `${eng.engineeringString} (${eng.prefixSymbol})`, pass };
});

testCase("TC-ENG-02", "Engineering 123000 -> 123 × 10^3", () => {
  const eng = formatEngineeringNotation(parseToScientific(123000), 4);
  const pass = eng.engineeringString === "123 × 10^3" && eng.prefixSymbol === "k";
  return { expected: "123 × 10^3 (k)", actual: `${eng.engineeringString} (${eng.prefixSymbol})`, pass };
});

testCase("TC-ENG-03", "Engineering 0.00123 -> 1.23 × 10^-3", () => {
  const eng = formatEngineeringNotation(parseToScientific(0.00123), 4);
  const pass = eng.engineeringString === "1.23 × 10^-3" && eng.prefixSymbol === "m";
  return { expected: "1.23 × 10^-3 (m)", actual: `${eng.engineeringString} (${eng.prefixSymbol})`, pass };
});

console.log("\n--- E-NOTATION TESTS ---");
testCase("TC-ENOT-01", "E-Notation 4.2435e9 -> 4.2435E+9", () => {
  const eStr = formatENotation({ mantissa: 4.2435, exponent: 9 }, 4);
  const pass = eStr === "4.2435E+9";
  return { expected: "4.2435E+9", actual: eStr, pass };
});

testCase("TC-ENOT-02", "E-Notation 4.25e-6 -> 4.25E-6", () => {
  const eStr = formatENotation({ mantissa: 4.25, exponent: -6 }, 4);
  const pass = eStr === "4.25E-6";
  return { expected: "4.25E-6", actual: eStr, pass };
});

console.log("\n--- PHYSICAL CONSTANTS AUDIT ---");
for (const c of PHYSICAL_CONSTANTS) {
  console.log(`Constant: ${c.name} (${c.symbol}) = ${c.mantissa} × 10^${c.exponent} ${c.unit} [${c.description}]`);
}

console.log("\n--- RUNNING 5,000 RANDOMIZED PROPERTY TESTS ---");
let randPass = 0;
let randFail = 0;
let maxRelErr = 0;
let maxAbsErr = 0;

for (let i = 0; i < 5000; i++) {
  // Random mantissas in [1, 9.9999] with random signs
  const signX = Math.random() > 0.5 ? 1 : -1;
  const signY = Math.random() > 0.5 ? 1 : -1;
  const mX = signX * (1 + Math.random() * 8.9999);
  const mY = signY * (1 + Math.random() * 8.9999);
  // Random exponents in [-20, 20] to avoid JS double overflow/underflow in multiplication/addition comparisons
  const eX = Math.floor(Math.random() * 41) - 20;
  const eY = Math.floor(Math.random() * 41) - 20;

  const numX = { mantissa: mX, exponent: eX };
  const numY = { mantissa: mY, exponent: eY };

  const valX = mX * Math.pow(10, eX);
  const valY = mY * Math.pow(10, eY);

  // Multiplication
  const prod = multiplyScientific(numX, numY);
  const expectedProd = valX * valY;
  const actualProd = prod.mantissa * Math.pow(10, prod.exponent);

  const relErrProd = Math.abs(expectedProd - actualProd) / (Math.abs(expectedProd) || 1);
  if (relErrProd > maxRelErr) maxRelErr = relErrProd;
  if (relErrProd < 1e-9) {
    randPass++;
  } else {
    randFail++;
  }

  // Normalization check: 1 <= |mantissa| < 10
  if (prod.mantissa !== 0 && (Math.abs(prod.mantissa) < 1 || Math.abs(prod.mantissa) >= 10)) {
    console.error(`Normalization failure in prod: ${prod.mantissa}`);
    randFail++;
  }

  // Addition
  const sum = addScientific(numX, numY);
  const expectedSum = valX + valY;
  const actualSum = sum.mantissa * Math.pow(10, sum.exponent);
  const absErrSum = Math.abs(expectedSum - actualSum);
  if (absErrSum > maxAbsErr) maxAbsErr = absErrSum;
  const relErrSum = absErrSum / (Math.abs(expectedSum) || 1);

  if (relErrSum < 1e-9 || absErrSum < 1e-12) {
    randPass++;
  } else {
    randFail++;
  }

  if (sum.mantissa !== 0 && (Math.abs(sum.mantissa) < 1 || Math.abs(sum.mantissa) >= 10)) {
    console.error(`Normalization failure in sum: ${sum.mantissa}`);
    randFail++;
  }
}

console.log(`\nRandomized Tests Result: ${randPass} passed, ${randFail} failed.`);
console.log(`Max relative error: ${maxRelErr.toExponential(4)}, Max absolute error: ${maxAbsErr.toExponential(4)}`);

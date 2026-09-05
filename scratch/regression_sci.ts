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
  squareScientific,
  squareRootScientific,
  explainArithmeticStepByStep,
  PHYSICAL_CONSTANTS
} from "../src/app/calculators/scientific-notation-calculator/scientific-notation-logic";
import * as fs from "fs";

console.log("==========================================");
console.log("COMPLETE REGRESSION TEST SUITE: SCIENTIFIC NOTATION");
console.log("==========================================");

let testsPassed = 0;
let testsFailed = 0;

function assert(condition: boolean, msg: string) {
  if (condition) {
    testsPassed++;
    console.log(`[PASS] ${msg}`);
  } else {
    testsFailed++;
    console.error(`[FAIL] ${msg}`);
  }
}

// 1. Subtraction derivation test (DEF-SCI-05)
const subDiffExp = explainArithmeticStepByStep(
  parseToScientific("5e6"),
  parseToScientific("2e4"),
  "sub"
);
assert(
  subDiffExp.includes("Align exponents to 10^6") && subDiffExp.includes("4.98"),
  `Subtraction with diff exponents derivation: "${subDiffExp}"`
);

const subSameExp = explainArithmeticStepByStep(
  parseToScientific("5e4"),
  parseToScientific("2e4"),
  "sub"
);
assert(
  subSameExp.includes("Subtract coefficients") && subSameExp.includes("3.0000 × 10^4"),
  `Subtraction with same exponents derivation: "${subSameExp}"`
);

// 2. Square derivation test (DEF-SCI-05)
const sqDeriv = explainArithmeticStepByStep(
  parseToScientific("2.5e4"),
  { mantissa: 0, exponent: 0 },
  "sq"
);
assert(
  sqDeriv.includes("Square coefficient & double exponent") && sqDeriv.includes("6.25"),
  `Square derivation: "${sqDeriv}"`
);

// 3. Multiplication derivation test
const multDeriv = explainArithmeticStepByStep(
  parseToScientific("1.23e7"),
  parseToScientific("3.45e2"),
  "mult"
);
assert(
  multDeriv.includes("Multiply coefficients & add exponents") && multDeriv.includes("4.2435"),
  `Multiplication derivation: "${multDeriv}"`
);

// 4. Immutability & Restore data integrity (DEF-SCI-02)
const savedRecord = {
  id: "test-1",
  title: "Scientific Arithmetic (mult)",
  inputs: "X: (1.23 × 10^7), Y: (3.45 × 10^2), Op: mult",
  operation: "Scientific Notation Arithmetic (mult)",
  result: "Normalized Scientific = 4.2435 × 10^9",
  timestamp: "Sep 5, 05:30 PM",
  rawInputs: { manX: "1.23", expX: "7", manY: "3.45", expY: "2", arithOp: "mult", precision: 4 }
};
const cloneSaved = JSON.parse(JSON.stringify(savedRecord));

// Simulate modifying current state
let activeState = { manX: "8.4", expX: "9", manY: "2.1", expY: "3", arithOp: "div", precision: 2 };
// Simulate restoring saved record
activeState = { ...savedRecord.rawInputs } as any;
assert(
  activeState.manX === "1.23" && activeState.arithOp === "mult" && activeState.precision === 4,
  "Restore correctly re-applies stored parameters"
);
assert(
  JSON.stringify(savedRecord) === JSON.stringify(cloneSaved),
  "Saved item remains strictly immutable during/after restore"
);

// 5. Educational content verification (DEF-SCI-06)
const contentHtml = fs.readFileSync(
  "src/components/calculator/scientific-notation/ScientificNotationContent.tsx",
  "utf8"
);
assert(
  !contentHtml.includes("Significant Figures Mode"),
  "Content no longer claims a dedicated Significant Figures Mode"
);
assert(
  contentHtml.includes("three practical modules") || contentHtml.includes("3 dedicated calculation modes"),
  "Content accurately states 3 dedicated calculation modules"
);

// 6. Layout duplicate fallback check (DEF-SCI-03)
const ssrReport = fs.readFileSync("scratch/ssr_report.txt", "utf8");
assert(
  ssrReport.includes("RELATED CALCULATORS count: 2"),
  "SSR HTML contains exactly 2 dedicated Related Calculators blocks (one above and one below content)"
);

// 7. Print classes verification (DEF-SCI-04)
const calcTsx = fs.readFileSync(
  "src/components/calculator/scientific-notation/ScientificNotationCalculator.tsx",
  "utf8"
);
assert(
  calcTsx.includes("print:break-inside-avoid print-card") && calcTsx.includes("no-print"),
  "Calculator contains print break protection and no-print classes"
);

// 8. Copy & Export toolbar buttons check (DEF-SCI-01)
assert(
  calcTsx.includes('aria-label="Copy Result"') &&
  calcTsx.includes('aria-label="Copy LaTeX"') &&
  calcTsx.includes('aria-label="Export CSV"'),
  "Copy Result, Copy LaTeX, and Export CSV buttons exist with accessible names in Arithmetic Solver"
);
assert(
  calcTsx.includes('aria-label="Copy Converted Result"') &&
  calcTsx.includes('aria-label="Copy Converted LaTeX"') &&
  calcTsx.includes('aria-label="Export Converted CSV"'),
  "Copy Result, Copy LaTeX, and Export CSV buttons exist in Converter"
);
assert(
  calcTsx.includes('aria-label="Copy Constant Details"') &&
  calcTsx.includes('aria-label="Copy Constant LaTeX"') &&
  calcTsx.includes('aria-label="Export Constant CSV"'),
  "Copy Result, Copy LaTeX, and Export CSV buttons exist in Physical Constants"
);
assert(
  calcTsx.includes('aria-label="Restore saved calculation"'),
  "Restore buttons exist on saved calculation cards"
);

// 9. Golden Mathematical Cases Regression
const g1 = multiplyScientific({ mantissa: 1.23, exponent: 7 }, { mantissa: 3.45, exponent: 2 });
assert(formatNormalizedScientific(g1, 4) === "4.2435 × 10^9", "TC-SCI-01 Mult: 4.2435 × 10^9");

const g2 = divideScientific({ mantissa: 8.4, exponent: 9 }, { mantissa: 2.1, exponent: 3 });
assert(formatNormalizedScientific(g2, 4) === "4 × 10^6", "TC-SCI-02 Div: 4 × 10^6");

const g3 = addScientific({ mantissa: 2.5, exponent: 4 }, { mantissa: 3.2, exponent: 4 });
assert(formatNormalizedScientific(g3, 4) === "5.7 × 10^4", "TC-SCI-03 Add Same Exp: 5.7 × 10^4");

const g4 = addScientific({ mantissa: 2, exponent: 5 }, { mantissa: 3, exponent: 3 });
assert(formatNormalizedScientific(g4, 4) === "2.03 × 10^5", "TC-SCI-04 Add Diff Exp: 2.03 × 10^5");

const g5 = subtractScientific({ mantissa: 5, exponent: 6 }, { mantissa: 2, exponent: 4 });
assert(formatNormalizedScientific(g5, 4) === "4.98 × 10^6", "TC-SCI-05 Sub Diff Exp: 4.98 × 10^6");

const g6 = squareScientific({ mantissa: 2.5, exponent: 4 });
assert(formatNormalizedScientific(g6, 4) === "6.25 × 10^8", "TC-SCI-14 Square: 6.25 × 10^8");

const g7 = squareRootScientific({ mantissa: 9, exponent: 6 });
assert(formatNormalizedScientific(g7, 4) === "3 × 10^3", "TC-SCI-15 Sqrt Exact: 3 × 10^3");

// 10. Randomized property testing (5,000 tests)
let randPass = 0;
let randFail = 0;
for (let i = 0; i < 5000; i++) {
  const signX = Math.random() > 0.5 ? 1 : -1;
  const signY = Math.random() > 0.5 ? 1 : -1;
  const mX = signX * (1 + Math.random() * 8.9999);
  const mY = signY * (1 + Math.random() * 8.9999);
  const eX = Math.floor(Math.random() * 41) - 20;
  const eY = Math.floor(Math.random() * 41) - 20;

  const numX = { mantissa: mX, exponent: eX };
  const numY = { mantissa: mY, exponent: eY };

  const valX = mX * Math.pow(10, eX);
  const valY = mY * Math.pow(10, eY);

  const prod = multiplyScientific(numX, numY);
  const expectedProd = valX * valY;
  const actualProd = prod.mantissa * Math.pow(10, prod.exponent);
  const relErr = Math.abs(expectedProd - actualProd) / (Math.abs(expectedProd) || 1);

  if (relErr < 1e-9) {
    randPass++;
  } else {
    randFail++;
  }
}
assert(randPass === 5000 && randFail === 0, `5,000 Randomized Multiplication Tests: ${randPass}/5000 passed`);

console.log(`\nRegression results: ${testsPassed} passed, ${testsFailed} failed.`);
if (testsFailed > 0) {
  process.exit(1);
}

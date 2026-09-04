import { calculateTriangleCalculator } from "./calculator";
import {
  solveUniversalTriangle,
  solveRightTriangle,
  calculateInradiusCircumradius,
  calculateHeron,
  parseAngleExpression
} from "./triangle-logic";

export function runTriangleCalculatorTests() {
  // 1. Basic interface tests
  const defaultInputs = { sideA: 3, sideB: 4, sideC: 5 };
  const res1 = calculateTriangleCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object" || Math.abs(res1.area - 6) > 1e-4) {
    throw new Error("Formula failed for default inputs 3,4,5");
  }

  const zeroInputs = { sideA: 0, sideB: 0, sideC: 0 };
  const res2 = calculateTriangleCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = { sideA: -50, sideB: -50, sideC: -50 };
  const res3 = calculateTriangleCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = { sideA: null, sideB: null, sideC: null };
  const res4 = calculateTriangleCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  // 2. Safe Radian / Pi Expression Parsing (P0 Regression)
  const angleCases: [string, number][] = [
    ["pi/6", 30],
    ["pi/4", 45],
    ["pi/3", 60],
    ["pi/2", 90],
    ["2*pi/3", 120],
    ["3*pi/4", 135],
    ["5*pi/6", 150],
    ["2*pi", 360],
    ["π/6", 30],
    ["π/4", 45],
    ["π/3", 60],
    ["π/2", 90],
    ["2π/3", 120],
    ["3π/4", 135],
    ["5π/6", 150],
    ["2π", 360]
  ];

  for (const [expr, expectedDeg] of angleCases) {
    const parsed = parseAngleExpression(expr, "rad");
    if (parsed === undefined || Math.abs(parsed - expectedDeg) > 1e-5) {
      throw new Error(`Radian parsing failed for '${expr}': expected ${expectedDeg}°, got ${parsed}`);
    }
  }

  // Verify rejection of malicious / arbitrary JS injection (Security requirement)
  const invalidCases = [
    "eval('2+2')",
    "console.log(1)",
    "alert(1)",
    "process.exit()",
    "pi/0",
    "-pi/2",
    "2*pi/3/4",
    "abc"
  ];
  for (const inv of invalidCases) {
    const parsed = parseAngleExpression(inv, "rad");
    if (parsed !== undefined) {
      throw new Error(`Radian parsing should have rejected invalid expression '${inv}', but returned ${parsed}`);
    }
  }

  // 3. Golden Case 1: 3-4-5 Triangle
  const gold345 = solveUniversalTriangle(3, 4, 5, undefined, undefined, undefined, 6);
  if (!gold345.success || gold345.solutions.length === 0) throw new Error("Golden 3-4-5 failed to solve");
  const s345 = gold345.solutions[0];
  if (Math.abs(s345.area - 6) > 1e-5) throw new Error("3-4-5 Area must be 6");
  if (Math.abs(s345.perimeter - 12) > 1e-5) throw new Error("3-4-5 Perimeter must be 12");
  if (Math.abs(s345.s - 6) > 1e-5) throw new Error("3-4-5 Semiperimeter must be 6");
  if (Math.abs(s345.ha - 4) > 1e-5) throw new Error("3-4-5 ha must be 4");
  if (Math.abs(s345.hb - 3) > 1e-5) throw new Error("3-4-5 hb must be 3");
  if (Math.abs(s345.hc - 2.4) > 1e-5) throw new Error("3-4-5 hc must be 2.4");
  if (Math.abs(s345.r - 1) > 1e-5) throw new Error("3-4-5 inradius r must be 1");
  if (Math.abs(s345.R - 2.5) > 1e-5) throw new Error("3-4-5 circumradius R must be 2.5");
  if (Math.abs(s345.A_deg - 36.8698976) > 1e-4) throw new Error("3-4-5 Angle A mismatch");
  if (Math.abs(s345.B_deg - 53.1301024) > 1e-4) throw new Error("3-4-5 Angle B mismatch");
  if (Math.abs(s345.C_deg - 90) > 1e-5) throw new Error("3-4-5 Angle C must be 90");

  // 4. Golden Case 2: 6-8-10 Right Triangle
  const gold6810 = solveRightTriangle(6, 8, 4);
  if (!gold6810.success || !gold6810.solution) throw new Error("Golden 6-8-10 failed");
  const s6810 = gold6810.solution;
  if (Math.abs(s6810.c - 10) > 1e-5) throw new Error("6-8-10 hypotenuse must be 10");
  if (Math.abs(s6810.area - 24) > 1e-5) throw new Error("6-8-10 area must be 24");
  if (Math.abs(s6810.perimeter - 24) > 1e-5) throw new Error("6-8-10 perimeter must be 24");
  if (Math.abs(s6810.sinA - 0.6) > 1e-5) throw new Error("6-8-10 sin(A) must be 0.6");
  if (Math.abs(s6810.cosA - 0.8) > 1e-5) throw new Error("6-8-10 cos(A) must be 0.8");
  if (Math.abs(s6810.tanA - 0.75) > 1e-5) throw new Error("6-8-10 tan(A) must be 0.75");

  // 5. Golden Case 3: 7-8-9 Inradius / Circumradius
  const gold789 = calculateInradiusCircumradius(7, 8, 9, 6);
  if (!gold789.success || !gold789.solution) throw new Error("Golden 7-8-9 failed");
  const s789 = gold789.solution;
  if (Math.abs(s789.s - 12) > 1e-5) throw new Error("7-8-9 semiperimeter must be 12");
  if (Math.abs(s789.area - Math.sqrt(720)) > 1e-4) throw new Error("7-8-9 area must be sqrt(720) ≈ 26.8328157");
  if (Math.abs(s789.r - 2.236068) > 1e-4) throw new Error("7-8-9 inradius r must be ≈ 2.236068");
  if (Math.abs(s789.R - 4.695742) > 1e-4) throw new Error("7-8-9 circumradius R must be ≈ 4.695742");

  // 6. Golden Case 4: 5-6-7 Heron's Formula (m_a ≈ 6.020797)
  const gold567 = calculateHeron(5, 6, 7, 6);
  if (!gold567.success || !gold567.solution) throw new Error("Golden 5-6-7 failed");
  const s567 = gold567.solution;
  if (Math.abs(s567.s - 9) > 1e-5) throw new Error("5-6-7 semiperimeter must be 9");
  if (Math.abs(s567.area - 14.696938) > 1e-4) throw new Error("5-6-7 area must be ≈ 14.696938");
  if (Math.abs(s567.ha - 5.878775) > 1e-4) throw new Error("5-6-7 ha must be ≈ 5.878775");
  if (Math.abs(s567.hb - 4.898979) > 1e-4) throw new Error("5-6-7 hb must be ≈ 4.898979");
  if (Math.abs(s567.hc - 4.199125) > 1e-4) throw new Error("5-6-7 hc must be ≈ 4.199125");
  if (Math.abs(s567.ma - 6.020797) > 1e-4) throw new Error(`5-6-7 ma must be ≈ 6.020797, got ${s567.ma}`);
  if (Math.abs(s567.mb - 5.291503) > 1e-4) throw new Error("5-6-7 mb must be ≈ 5.291503");
  if (Math.abs(s567.mc - 4.272002) > 1e-4) throw new Error("5-6-7 mc must be ≈ 4.272002");

  // 7. Exact 30-60-90 Preset Test
  const preset306090 = solveUniversalTriangle(5, undefined, 10, 30, undefined, undefined, 4);
  if (!preset306090.success || preset306090.solutions.length === 0) throw new Error("30-60-90 preset failed to solve");
  const s3060 = preset306090.solutions[0];
  if (Math.abs(s3060.A_deg - 30) > 1e-5 || Math.abs(s3060.B_deg - 60) > 1e-5 || Math.abs(s3060.C_deg - 90) > 1e-5) {
    throw new Error(`30-60-90 angles incorrect: A=${s3060.A_deg}, B=${s3060.B_deg}, C=${s3060.C_deg}`);
  }

  // 8. Decimal Precision Trailing Zero Preservation
  const precSol = solveUniversalTriangle(3, 4, 5, undefined, undefined, undefined, 4).solutions[0];
  if (precSol.fmt.area !== "6.0000" || precSol.fmt.r !== "1.0000" || precSol.fmt.R !== "2.5000") {
    throw new Error(`Trailing zeros not preserved in fmt: area=${precSol.fmt.area}, r=${precSol.fmt.r}, R=${precSol.fmt.R}`);
  }

  return true;
}

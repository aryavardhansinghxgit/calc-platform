import {
  computeRightTriangleUniversal,
  convertRightTriangleUnits,
  RightTriangleResult
} from "../src/app/calculators/right-triangle-calculator/right-triangle-logic";

interface TestCaseReport {
  id: string;
  name: string;
  pass: boolean;
  details: string;
}

const reports: TestCaseReport[] = [];

function assertApprox(val: number, expected: number, tol = 1e-4, label = ""): boolean {
  const diff = Math.abs(val - expected);
  const ok = diff <= tol;
  if (!ok) {
    console.error(`FAIL: ${label}: expected ${expected}, got ${val} (diff: ${diff})`);
  }
  return ok;
}

console.log("=== 1. GOLDEN TEST CASES (RT-01 to RT-08) ===");

// RT-01: 3-4-5
{
  const res = computeRightTriangleUniversal(3, 4, undefined, undefined, undefined, undefined, undefined, 4);
  const ok = res.isValid &&
    assertApprox(res.c, 5, 1e-4, "c") &&
    assertApprox(res.alphaDeg, 36.8699, 1e-3, "alpha") &&
    assertApprox(res.betaDeg, 53.1301, 1e-3, "beta") &&
    assertApprox(res.area, 6, 1e-4, "area") &&
    assertApprox(res.perimeter, 12, 1e-4, "perimeter") &&
    assertApprox(res.altitudeHc, 2.4, 1e-4, "altitude") &&
    assertApprox(res.inradius, 1.0, 1e-4, "inradius") &&
    assertApprox(res.circumradius, 2.5, 1e-4, "circumradius") &&
    assertApprox(res.medianMc, 2.5, 1e-4, "median");

  reports.push({
    id: "RT-01",
    name: "3-4-5 Triangle",
    pass: ok,
    details: `c=${res.c}, alpha=${res.alphaDeg}°, beta=${res.betaDeg}°, Area=${res.area}, P=${res.perimeter}, hc=${res.altitudeHc}, r=${res.inradius}, R=${res.circumradius}`
  });
}

// RT-02: 5-12-13
{
  const res = computeRightTriangleUniversal(5, 12, undefined, undefined, undefined, undefined, undefined, 4);
  const ok = res.isValid &&
    assertApprox(res.c, 13, 1e-4, "c") &&
    assertApprox(res.alphaDeg, 22.6199, 1e-3, "alpha") &&
    assertApprox(res.betaDeg, 67.3801, 1e-3, "beta") &&
    assertApprox(res.area, 30, 1e-4, "area") &&
    assertApprox(res.perimeter, 30, 1e-4, "perimeter") &&
    assertApprox(res.altitudeHc, 60 / 13, 1e-4, "altitude") &&
    assertApprox(res.inradius, 2.0, 1e-4, "inradius") &&
    assertApprox(res.circumradius, 6.5, 1e-4, "circumradius") &&
    assertApprox(res.medianMc, 6.5, 1e-4, "median");

  reports.push({
    id: "RT-02",
    name: "5-12-13 Triangle",
    pass: ok,
    details: `c=${res.c}, alpha=${res.alphaDeg}°, beta=${res.betaDeg}°, Area=${res.area}, P=${res.perimeter}, hc=${res.altitudeHc}, r=${res.inradius}, R=${res.circumradius}`
  });
}

// RT-03: a=5, c=13
{
  const res = computeRightTriangleUniversal(5, undefined, 13, undefined, undefined, undefined, undefined, 4);
  const ok = res.isValid &&
    assertApprox(res.b, 12, 1e-4, "b") &&
    assertApprox(res.alphaDeg, 22.6199, 1e-3, "alpha") &&
    assertApprox(res.area, 30, 1e-4, "area");

  reports.push({
    id: "RT-03",
    name: "Known Hypotenuse + Leg a=5, c=13",
    pass: ok,
    details: `b=${res.b}, alpha=${res.alphaDeg}°, Area=${res.area}`
  });
}

// RT-04: b=12, c=13
{
  const res = computeRightTriangleUniversal(undefined, 12, 13, undefined, undefined, undefined, undefined, 4);
  const ok = res.isValid &&
    assertApprox(res.a, 5, 1e-4, "a") &&
    assertApprox(res.alphaDeg, 22.6199, 1e-3, "alpha") &&
    assertApprox(res.area, 30, 1e-4, "area");

  reports.push({
    id: "RT-04",
    name: "Known Hypotenuse + Other Leg b=12, c=13",
    pass: ok,
    details: `a=${res.a}, alpha=${res.alphaDeg}°, Area=${res.area}`
  });
}

// RT-05: a=5, alpha=22.61986495°
{
  const res = computeRightTriangleUniversal(5, undefined, undefined, 22.61986495, undefined, undefined, undefined, 4);
  const ok = res.isValid &&
    assertApprox(res.b, 12, 1e-2, "b") &&
    assertApprox(res.c, 13, 1e-2, "c");

  reports.push({
    id: "RT-05",
    name: "Angle + Leg a=5, alpha=22.619865°",
    pass: ok,
    details: `b=${res.b}, c=${res.c}`
  });
}

// RT-06: 45-45-90
{
  const res = computeRightTriangleUniversal(1, undefined, undefined, 45, undefined, undefined, undefined, 4);
  const ok = res.isValid &&
    assertApprox(res.b, 1, 1e-4, "b") &&
    assertApprox(res.c, Math.SQRT2, 1e-3, "c") &&
    assertApprox(res.betaDeg, 45, 1e-4, "beta") &&
    assertApprox(res.area, 0.5, 1e-4, "area") &&
    assertApprox(res.inradius, (2 - Math.SQRT2) / 2, 1e-3, "inradius") &&
    assertApprox(res.circumradius, Math.SQRT2 / 2, 1e-3, "circumradius");

  reports.push({
    id: "RT-06",
    name: "45-45-90 Triangle",
    pass: ok,
    details: `b=${res.b}, c=${res.c}, r=${res.inradius}, R=${res.circumradius}`
  });
}

// RT-07: 30-60-90
{
  const res = computeRightTriangleUniversal(1, undefined, undefined, 30, undefined, undefined, undefined, 4);
  const ok = res.isValid &&
    assertApprox(res.b, Math.sqrt(3), 1e-3, "b") &&
    assertApprox(res.c, 2, 1e-3, "c");

  reports.push({
    id: "RT-07",
    name: "30-60-90 Triangle",
    pass: ok,
    details: `b=${res.b}, c=${res.c}`
  });
}

// RT-08: 1:12 ADA Ramp
{
  const res = computeRightTriangleUniversal(1, 12, undefined, undefined, undefined, undefined, undefined, 4);
  const ok = res.isValid &&
    assertApprox(res.gradePercent, 8.3333, 1e-3, "grade") &&
    assertApprox(res.alphaDeg, 4.7636, 1e-3, "angle");

  reports.push({
    id: "RT-08",
    name: "1:12 ADA Ramp ratio",
    pass: ok,
    details: `grade=${res.gradePercent}%, angle=${res.alphaDeg}%, pitch=${res.roofPitch}`
  });
}

console.log("\n=== 2. INPUT VALIDATION & CONTRADICTIONS ===");
{
  // a=5, b=12, c=10 -> Must be invalid (contradictory)
  const rContradict = computeRightTriangleUniversal(5, 12, 10);
  const okContradict = !rContradict.isValid && Boolean(rContradict.errorMessage?.includes("Contradictory"));

  // a=15, c=10 -> Must be invalid (c <= a)
  const rHypLtLeg = computeRightTriangleUniversal(15, undefined, 10);
  const okHypLtLeg = !rHypLtLeg.isValid && Boolean(rHypLtLeg.errorMessage?.includes("Hypotenuse c must be strictly greater"));

  // a=5, b=12, c=13 -> Must be valid
  const rValid3 = computeRightTriangleUniversal(5, 12, 13);
  const okValid3 = rValid3.isValid && rValid3.c === 13;

  // a=3, b=4, c=5 -> Must be valid
  const rValid345 = computeRightTriangleUniversal(3, 4, 5);
  const okValid345 = rValid345.isValid && rValid345.c === 5;

  // angle alpha >= 90 -> Must be invalid
  const rBadAngle = computeRightTriangleUniversal(5, undefined, undefined, 95);
  const okBadAngle = !rBadAngle.isValid;

  reports.push({
    id: "VAL-CONTRADICTION",
    name: "Contradictory Inputs (a=5, b=12, c=10)",
    pass: okContradict,
    details: `isValid=${rContradict.isValid}, msg="${rContradict.errorMessage}"`
  });

  reports.push({
    id: "VAL-HYP-LT-LEG",
    name: "Hypotenuse <= Leg (a=15, c=10)",
    pass: okHypLtLeg,
    details: `isValid=${rHypLtLeg.isValid}, msg="${rHypLtLeg.errorMessage}"`
  });

  reports.push({
    id: "VAL-CONSISTENT-3",
    name: "Consistent 3 sides (a=5, b=12, c=13 & 3-4-5)",
    pass: okValid3 && okValid345,
    details: `5-12-13 isValid=${rValid3.isValid}, 3-4-5 isValid=${rValid345.isValid}`
  });

  reports.push({
    id: "VAL-ANGLE-BOUNDS",
    name: "Angle bounds (alpha >= 90)",
    pass: okBadAngle,
    details: `isValid=${rBadAngle.isValid}`
  });
}

console.log("\n=== 3. ADAPTIVE MICRO-SCALE & EXTREME VALUES ===");
{
  const micro = computeRightTriangleUniversal(1e-6, 1e-6, undefined, undefined, undefined, undefined, undefined, 4);
  const okMicro = micro.isValid && micro.c > 0 && assertApprox(micro.c, Math.SQRT2 * 1e-6, 1e-8, "micro c");

  const nano = computeRightTriangleUniversal(1e-10, 1e-10, undefined, undefined, undefined, undefined, undefined, 4);
  const okNano = nano.isValid && nano.c > 0;

  reports.push({
    id: "NUM-MICRO-SCALE",
    name: "Adaptive Micro-scale (1e-6 and 1e-10)",
    pass: okMicro && okNano,
    details: `1e-6 c=${micro.c} (not 0), 1e-10 c=${nano.c} (not 0)`
  });
}

console.log("\n=== 4. UNIT CONVERTER (INCL. YARDS) ===");
{
  // 10 yards -> meters
  const yardsToMeters = 10 * 0.9144; // 9.144
  const convYards = convertRightTriangleUnits(yardsToMeters, 4);
  const okYards = convYards.meters === 9.144 && convYards.yards === 10;

  // 10 meters -> yards
  const conv10m = convertRightTriangleUnits(10, 4);
  const ok10m = conv10m.meters === 10 && conv10m.cm === 1000 && conv10m.mm === 10000 && assertApprox(conv10m.yards, 10.9361, 1e-3);

  reports.push({
    id: "UNIT-YARDS",
    name: "Unit Converter with Yards bidirectional",
    pass: okYards && ok10m,
    details: `10 yd -> ${convYards.meters} m; 10 m -> ${conv10m.yards} yd`
  });
}

console.log("\n=== 5. 5,000 RANDOMIZED PROPERTY TESTS ===");
let randPass = 0;
let randFail = 0;
for (let i = 0; i < 5000; i++) {
  const a = Math.random() * 9999 + 0.01;
  const b = Math.random() * 9999 + 0.01;
  const res = computeRightTriangleUniversal(a, b, undefined, undefined, undefined, undefined, undefined, 8);

  const expC = Math.sqrt(a * a + b * b);
  const expAlpha = (Math.atan2(a, b) * 180) / Math.PI;
  const expBeta = 90 - expAlpha;
  const expArea = 0.5 * a * b;
  const expP = a + b + expC;
  const expHc = (a * b) / expC;
  const expR = (a + b - expC) / 2;
  const expCirc = expC / 2;
  const expMed = expC / 2;
  const expGrade = (a / b) * 100;

  const okC = Math.abs(res.c - expC) / expC < 1e-4;
  const okAngle = Math.abs(res.alphaDeg + res.betaDeg - 90) < 1e-3;
  const okArea = Math.abs(res.area - expArea) / expArea < 1e-4;
  const okP = Math.abs(res.perimeter - expP) / expP < 1e-4;
  const okHc = Math.abs(res.altitudeHc - expHc) / expHc < 1e-4;
  const okR = Math.abs(res.inradius - expR) / (expR || 1) < 1e-4;
  const okCirc = Math.abs(res.circumradius - expCirc) / expCirc < 1e-4;
  const okMed = Math.abs(res.medianMc - expMed) / expMed < 1e-4;
  const okGrade = Math.abs(res.gradePercent - expGrade) / (expGrade || 1) < 1e-4;

  if (res.isValid && okC && okAngle && okArea && okP && okHc && okR && okCirc && okMed && okGrade) {
    randPass++;
  } else {
    randFail++;
  }
}

reports.push({
  id: "RAND-5000",
  name: "5,000 Randomized Property Tests",
  pass: randFail === 0,
  details: `Passed: ${randPass} / 5000, Failed: ${randFail}`
});

console.log("\n============================================================");
console.log("TEST REPORT RESULTS");
console.log("============================================================");
reports.forEach(r => {
  console.log(`[${r.pass ? "PASS" : "FAIL"}] ${r.id.padEnd(18)} : ${r.name} -> ${r.details}`);
});
console.log("============================================================");

const allPass = reports.every(r => r.pass);
console.log(`ALL TESTS STATUS: ${allPass ? "PASSED (100%)" : "FAILED"}`);
process.exit(allPass ? 0 : 1);

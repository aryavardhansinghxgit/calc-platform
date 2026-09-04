import {
  computeTwoPointSlope,
  computePointSlopeDistance,
  computeParallelPerpLine
} from "../src/app/calculators/slope-calculator/slope-logic";

console.log("==========================================");
console.log("STARTING MATHEMATICAL AUDIT OF SLOPE LOGIC");
console.log("==========================================");

// TEST GROUP A: (1,1) to (4,7)
console.log("\n--- TEST GROUP A: (1,1) to (4,7) ---");
const resA = computeTwoPointSlope(1, 1, 4, 7, 4);
console.log("Delta X:", resA.deltaX, "Expected: 3");
console.log("Delta Y:", resA.deltaY, "Expected: 6");
console.log("Slope:", resA.slope, "Expected: 2");
console.log("Distance:", resA.distance, "Expected: 6.7082");
console.log("Angle Deg:", resA.angleDeg, "Expected: 63.4349");
console.log("Slope-Intercept:", resA.slopeInterceptForm, "Expected: y = 2.0000x - 1.0000");

// TEST GROUP B: (4,7) to (1,1) (Reversed)
console.log("\n--- TEST GROUP B: (4,7) to (1,1) ---");
const resB = computeTwoPointSlope(4, 7, 1, 1, 4);
console.log("Delta X:", resB.deltaX, "Expected: -3");
console.log("Delta Y:", resB.deltaY, "Expected: -6");
console.log("Slope:", resB.slope, "Expected: 2");
console.log("Distance:", resB.distance, "Expected: 6.7082");
console.log("Angle Deg:", resB.angleDeg, "Expected: 63.4349");
console.log("Slope-Intercept:", resB.slopeInterceptForm, "Expected: y = 2.0000x - 1.0000");

// TEST GROUP C: (2,8) to (6,0) (Negative Slope)
console.log("\n--- TEST GROUP C: (2,8) to (6,0) ---");
const resC = computeTwoPointSlope(2, 8, 6, 0, 4);
console.log("Delta X:", resC.deltaX, "Expected: 4");
console.log("Delta Y:", resC.deltaY, "Expected: -8");
console.log("Slope:", resC.slope, "Expected: -2");
console.log("Distance:", resC.distance, "Expected: 8.9443 (sqrt(80))");
console.log("Angle Deg:", resC.angleDeg, "Expected: 116.5651° or -63.4349° (atan(-2) in [0, 180): 116.5651)");
console.log("Slope-Intercept:", resC.slopeInterceptForm, "Expected: y = -2.0000x + 12.0000");

// TEST GROUP D: (2,5) to (10,5) (Horizontal Line)
console.log("\n--- TEST GROUP D: (2,5) to (10,5) ---");
const resD = computeTwoPointSlope(2, 5, 10, 5, 4);
console.log("Delta X:", resD.deltaX, "Expected: 8");
console.log("Delta Y:", resD.deltaY, "Expected: 0");
console.log("Slope:", resD.slope, "Expected: 0");
console.log("Distance:", resD.distance, "Expected: 8");
console.log("Angle Deg:", resD.angleDeg, "Expected: 0");
console.log("Slope-Intercept:", resD.slopeInterceptForm, "Expected: y = 0.0000x + 5.0000 or y = 5");

// TEST GROUP E: (3,1) to (3,9) (Vertical Line)
console.log("\n--- TEST GROUP E: (3,1) to (3,9) ---");
const resE = computeTwoPointSlope(3, 1, 3, 9, 4);
console.log("Delta X:", resE.deltaX, "Expected: 0");
console.log("Delta Y:", resE.deltaY, "Expected: 8");
console.log("Slope:", resE.slope, "Expected: Undefined (reported as:", resE.slope, "isVertical:", resE.isVertical, ")");
console.log("Distance:", resE.distance, "Expected: 8");
console.log("Angle Deg:", resE.angleDeg, "Expected: 90");
console.log("Slope-Intercept:", resE.slopeInterceptForm, "Expected: x = 3.0000 (Undefined Slope)");

// TEST GROUP F: (5,5) to (5,5) (Coincident Points)
console.log("\n--- TEST GROUP F: (5,5) to (5,5) ---");
const resF = computeTwoPointSlope(5, 5, 5, 5, 4);
console.log("Delta X:", resF.deltaX, "Expected: 0");
console.log("Delta Y:", resF.deltaY, "Expected: 0");
console.log("isVertical:", resF.isVertical, "isHorizontal:", resF.isHorizontal);
console.log("Slope:", resF.slope);
console.log("Distance:", resF.distance, "Expected: 0 (or error - points coincident)");
console.log("Slope-Intercept:", resF.slopeInterceptForm);

// TEST GROUP G: Very small deltaX
console.log("\n--- TEST GROUP G: (1,1) to (1.000001, 2) ---");
const resG = computeTwoPointSlope(1, 1, 1.000001, 2, 4);
console.log("Slope:", resG.slope, "Expected: 1,000,000");

// TEST GROUP H: Decimals
console.log("\n--- TEST GROUP H: (1.25, 2.50) to (4.75, 9.50) ---");
const resH = computeTwoPointSlope(1.25, 2.50, 4.75, 9.50, 4);
console.log("Delta X:", resH.deltaX, "Expected: 3.5");
console.log("Delta Y:", resH.deltaY, "Expected: 7.0");
console.log("Slope:", resH.slope, "Expected: 2");
console.log("Y-Intercept:", resH.yIntercept, "Expected: 0");

// ENDPOINT SOLVER
console.log("\n--- ENDPOINT SOLVER ---");
const resPt1 = computePointSlopeDistance(1, 1, 5, "slope", 0.75, 4);
console.log("Endpoint (1,1), d=5, m=0.75:", resPt1.x2, resPt1.y2, "Expected: 5, 4");
const resPt0 = computePointSlopeDistance(1, 1, 5, "slope", 0, 4);
console.log("Endpoint (1,1), d=5, m=0:", resPt0.x2, resPt0.y2, "Expected: 6, 1");
const resPtNegD = computePointSlopeDistance(1, 1, -5, "slope", 0.75, 4);
console.log("Endpoint with negative d=-5:", resPtNegD.distance, resPtNegD.x2, resPtNegD.y2);

// PARALLEL & PERPENDICULAR
console.log("\n--- PARALLEL & PERPENDICULAR ---");
const resPar1 = computeParallelPerpLine(2, 3, 4, 4);
console.log("Parallel to m=2 through (3,4):", resPar1.parallelEq, "Expected: y = 2.0000x - 2.0000");
console.log("Perpendicular to m=2 through (3,4):", resPar1.perpEq, "Expected: y = -0.5000x + 5.5000");

console.log("\n--- PARALLEL & PERPENDICULAR WITH m = 0 ---");
const resPar0 = computeParallelPerpLine(0, 3, 4, 4);
console.log("Parallel to m=0 through (3,4):", resPar0.parallelEq, "Expected: y = 0.0000x + 4.0000");
console.log("Perpendicular to m=0 through (3,4):", resPar0.perpEq, "perpSlope:", resPar0.perpSlope, "Expected: x = 3 (vertical line!)");

// ANGLE BETWEEN LINES ENGINE
console.log("\n--- ANGLE BETWEEN LINES ---");
function computeAngleBetween(m1: number, m2: number, precision: number = 4) {
  const denom = 1 + m1 * m2;
  let acuteRad = 0;
  if (Math.abs(denom) < 1e-9) {
    acuteRad = Math.PI / 2.0;
  } else {
    const tanTheta = Math.abs((m2 - m1) / denom);
    acuteRad = Math.atan(tanTheta);
  }
  const acuteDeg = (acuteRad * 180.0) / Math.PI;
  const obtuseDeg = 180.0 - acuteDeg;
  return {
    acuteDeg: acuteDeg.toFixed(precision),
    obtuseDeg: obtuseDeg.toFixed(precision),
    tanTheta: Math.abs(denom) < 1e-9 ? "Undefined (90°)" : Math.abs((m2 - m1) / denom).toFixed(precision)
  };
}
console.log("m1=1, m2=-2:", computeAngleBetween(1, -2));
console.log("m1=1, m2=1 (Parallel):", computeAngleBetween(1, 1));
console.log("m1=1, m2=-1 (Perpendicular):", computeAngleBetween(1, -1));

// RANDOMIZED TESTING: 5000 valid cases
console.log("\n--- RUNNING 5,000 RANDOMIZED VALID POINT PAIRS ---");
let validPassed = 0;
let validFailed = 0;
for (let i = 0; i < 5000; i++) {
  const x1 = (Math.random() - 0.5) * 2000;
  const y1 = (Math.random() - 0.5) * 2000;
  let x2 = (Math.random() - 0.5) * 2000;
  let y2 = (Math.random() - 0.5) * 2000;
  if (Math.abs(x2 - x1) < 1e-5) x2 += 1; // avoid coincident / vertical for this batch

  const expectedDx = x2 - x1;
  const expectedDy = y2 - y1;
  const expectedM = expectedDy / expectedDx;
  const expectedDist = Math.sqrt(expectedDx * expectedDx + expectedDy * expectedDy);

  const res = computeTwoPointSlope(x1, y1, x2, y2, 4);

  const mDiff = res.slope !== null ? Math.abs(res.slope - expectedM) : 999;
  const dDiff = Math.abs(res.distance - expectedDist);

  if (mDiff < 1e-3 && dDiff < 1e-3) {
    validPassed++;
  } else {
    validFailed++;
  }
}
console.log(`Valid Cases Tested: 5000 | Passed: ${validPassed} | Failed: ${validFailed}`);

// RANDOMIZED TESTING: 1,000 Degenerate / Invalid / Edge Cases
console.log("\n--- RUNNING 1,000 DEGENERATE / EDGE CASES ---");
let rejectedOrHandled = 0;
let unhandledOrErroneous = 0;
for (let i = 0; i < 1000; i++) {
  const kind = i % 4;
  if (kind === 0) {
    // Coincident points
    const x = (Math.random() - 0.5) * 200;
    const y = (Math.random() - 0.5) * 200;
    const res = computeTwoPointSlope(x, y, x, y, 4);
    // Coincident points must be rejected with isCoincident=true, slope=null, lineEquation indicating not unique
    if (res.isCoincident && res.slope === null && res.errorMessage) {
      rejectedOrHandled++;
    } else {
      unhandledOrErroneous++;
    }
  } else if (kind === 1) {
    // Exact vertical line
    const x = (Math.random() - 0.5) * 200;
    const y1 = (Math.random() - 0.5) * 200;
    const y2 = y1 + 10;
    const res = computeTwoPointSlope(x, y1, x, y2, 4);
    if (res.isVertical && res.angleDeg === 90 && res.slope === null) {
      rejectedOrHandled++;
    } else {
      unhandledOrErroneous++;
    }
  } else if (kind === 2) {
    // Exact horizontal line
    const x1 = (Math.random() - 0.5) * 200;
    const x2 = x1 + 10;
    const y = (Math.random() - 0.5) * 200;
    const res = computeTwoPointSlope(x1, y, x2, y, 4);
    if (res.isHorizontal && res.slope === 0 && res.angleDeg === 0) {
      rejectedOrHandled++;
    } else {
      unhandledOrErroneous++;
    }
  } else {
    // Negative distance in endpoint solver
    const d = - (Math.random() * 100 + 1);
    const res = computePointSlopeDistance(0, 0, d, "slope", 1, 4);
    if (res.errorMessage && res.errorMessage.includes("greater than or equal to 0")) {
      rejectedOrHandled++; // Correctly rejected negative distance
    } else {
      unhandledOrErroneous++;
    }
  }
}
console.log(`Degenerate/Edge Cases: 1000 | Correctly Handled: ${rejectedOrHandled} | Defectively Handled: ${unhandledOrErroneous}`);

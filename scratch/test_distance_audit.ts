/**
 * Independent Mathematical Test & Oracle Suite
 * Distance Calculator & Geodesic Navigation Suite
 */

import {
  compute2DDistance,
  compute3DDistance,
  computeHaversineDistance,
  computeSpeedDistanceTime,
  computePointToLineDistance,
  convertDistanceFromMeters
} from "../src/app/calculators/distance-calculator/distance-logic";

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures: string[] = [];

function assert(condition: boolean, msg: string) {
  totalTests++;
  if (condition) {
    passedTests++;
  } else {
    failedTests++;
    failures.push(msg);
    console.error(`FAIL: ${msg}`);
  }
}

function approxEqual(a: number, b: number, tol: number = 1e-4): boolean {
  return Math.abs(a - b) <= tol;
}

console.log("==================================================");
console.log("1. AUDITING 2D CARTESIAN EUCLIDEAN DISTANCE");
console.log("==================================================");

// CASE 2D-1: P1=(0,0), P2=(3,4)
const r2d_1 = compute2DDistance(0, 0, 3, 4, 6);
assert(approxEqual(r2d_1.euclidean, 5.0), `CASE 2D-1 Euclidean expected 5, got ${r2d_1.euclidean}`);
assert(approxEqual(r2d_1.midpoint.x, 1.5) && approxEqual(r2d_1.midpoint.y, 2.0), `CASE 2D-1 Midpoint expected (1.5, 2), got (${r2d_1.midpoint.x}, ${r2d_1.midpoint.y})`);
assert(approxEqual(r2d_1.manhattan, 7.0), `CASE 2D-1 Manhattan expected 7, got ${r2d_1.manhattan}`);
assert(approxEqual(r2d_1.chebyshev, 4.0), `CASE 2D-1 Chebyshev expected 4, got ${r2d_1.chebyshev}`);
assert(approxEqual(r2d_1.angleDeg, 53.1301, 1e-3), `CASE 2D-1 Incline expected ~53.1301°, got ${r2d_1.angleDeg}`);

// CASE 2D-2: P1=(-3,-4), P2=(0,0)
const r2d_2 = compute2DDistance(-3, -4, 0, 0, 6);
assert(approxEqual(r2d_2.euclidean, 5.0), `CASE 2D-2 expected 5, got ${r2d_2.euclidean}`);

// CASE 2D-3: P1=(-3,4), P2=(5,-2)
const r2d_3 = compute2DDistance(-3, 4, 5, -2, 6);
assert(approxEqual(r2d_3.deltaX, 8.0), `CASE 2D-3 deltaX expected 8, got ${r2d_3.deltaX}`);
assert(approxEqual(r2d_3.deltaY, -6.0), `CASE 2D-3 deltaY expected -6, got ${r2d_3.deltaY}`);
assert(approxEqual(r2d_3.euclidean, 10.0), `CASE 2D-3 distance expected 10, got ${r2d_3.euclidean}`);

// CASE 2D-4: P1=(5,5), P2=(5,5)
const r2d_4 = compute2DDistance(5, 5, 5, 5, 6);
assert(approxEqual(r2d_4.euclidean, 0.0), `CASE 2D-4 expected 0, got ${r2d_4.euclidean}`);
assert(approxEqual(r2d_4.midpoint.x, 5.0) && approxEqual(r2d_4.midpoint.y, 5.0), `CASE 2D-4 Midpoint expected (5, 5)`);

// CASE 2D-5: P1=(-10,-20), P2=(30,40)
const r2d_5 = compute2DDistance(-10, -20, 30, 40, 6);
assert(approxEqual(r2d_5.euclidean, Math.sqrt(5200), 1e-4), `CASE 2D-5 distance expected √5200 ≈ 72.1110, got ${r2d_5.euclidean}`);

// CASE 2D-6: Decimals (1.25, 2.50) -> (4.75, 8.50)
const r2d_6 = compute2DDistance(1.25, 2.50, 4.75, 8.50, 6);
const expected2D_6 = Math.sqrt(Math.pow(4.75 - 1.25, 2) + Math.pow(8.50 - 2.50, 2)); // √(3.5² + 6²) = √(12.25 + 36) = √48.25 ≈ 6.946222
assert(approxEqual(r2d_6.euclidean, expected2D_6, 1e-4), `CASE 2D-6 decimal distance expected ${expected2D_6}, got ${r2d_6.euclidean}`);

// CASE 2D-7: Reversal invariance
const r2d_7a = compute2DDistance(1.25, 2.50, 4.75, 8.50, 6);
const r2d_7b = compute2DDistance(4.75, 8.50, 1.25, 2.50, 6);
assert(approxEqual(r2d_7a.euclidean, r2d_7b.euclidean), `CASE 2D-7 Reversal distance symmetry failed`);
assert(approxEqual(r2d_7a.midpoint.x, r2d_7b.midpoint.x) && approxEqual(r2d_7a.midpoint.y, r2d_7b.midpoint.y), `CASE 2D-7 Midpoint symmetry failed`);
assert(approxEqual(r2d_7a.manhattan, r2d_7b.manhattan), `CASE 2D-7 Manhattan symmetry failed`);
assert(approxEqual(r2d_7a.chebyshev, r2d_7b.chebyshev), `CASE 2D-7 Chebyshev symmetry failed`);

console.log("==================================================");
console.log("2. AUDITING 3D SPATIAL COORDINATE DISTANCE");
console.log("==================================================");

// CASE 3D-1: P1=(1,1,1), P2=(4,5,9)
const r3d_1 = compute3DDistance(1, 1, 1, 4, 5, 9, 6);
assert(approxEqual(r3d_1.deltaX, 3) && approxEqual(r3d_1.deltaY, 4) && approxEqual(r3d_1.deltaZ, 8), `CASE 3D-1 deltas expected (3,4,8)`);
assert(approxEqual(r3d_1.euclidean, Math.sqrt(89), 1e-5), `CASE 3D-1 expected √89 ≈ 9.433981, got ${r3d_1.euclidean}`);

// CASE 3D-2: P1=(0,0,0), P2=(3,4,12)
const r3d_2 = compute3DDistance(0, 0, 0, 3, 4, 12, 6);
assert(approxEqual(r3d_2.euclidean, 13.0), `CASE 3D-2 expected 13, got ${r3d_2.euclidean}`);

// CASE 3D-3: P1=(-3,4,12), P2=(0,0,0) (negative coordinates)
const r3d_3 = compute3DDistance(-3, 4, 12, 0, 0, 0, 6);
assert(approxEqual(r3d_3.euclidean, 13.0), `CASE 3D-3 expected 13, got ${r3d_3.euclidean}`);

// CASE 3D-4: P1=(5,5,5), P2=(5,5,5)
const r3d_4 = compute3DDistance(5, 5, 5, 5, 5, 5, 6);
assert(approxEqual(r3d_4.euclidean, 0.0), `CASE 3D-4 expected 0, got ${r3d_4.euclidean}`);

// CASE 3D-5: Mixed decimal coordinates
const r3d_5 = compute3DDistance(-1.5, 2.75, -4.2, 3.1, -0.85, 2.4, 6);
const exp3D_5 = Math.sqrt(Math.pow(3.1 - (-1.5), 2) + Math.pow(-0.85 - 2.75, 2) + Math.pow(2.4 - (-4.2), 2));
assert(approxEqual(r3d_5.euclidean, exp3D_5, 1e-4), `CASE 3D-5 decimal 3D distance failed`);

console.log("==================================================");
console.log("3. AUDITING GREAT-CIRCLE / HAVERSINE DISTANCE");
console.log("==================================================");

// CASE GEO-1: New York (40.7128, -74.0060) to London (51.5074, -0.1278)
const rgeo_1 = computeHaversineDistance(40.7128, -74.0060, 51.5074, -0.1278, 6);
assert(rgeo_1.isValid, `CASE GEO-1 should be valid`);
assert(approxEqual(rgeo_1.km, 5570.2299, 0.5), `CASE GEO-1 km expected ~5570.23 km, got ${rgeo_1.km}`);
assert(approxEqual(rgeo_1.miles, 3461.1804, 0.5), `CASE GEO-1 miles expected ~3461.18 mi, got ${rgeo_1.miles}`);
assert(approxEqual(rgeo_1.nauticalMiles, 3007.6835, 0.5), `CASE GEO-1 nautical miles expected ~3007.68 NM, got ${rgeo_1.nauticalMiles}`);
assert(approxEqual(rgeo_1.initialBearingDeg, 51.21, 0.1), `CASE GEO-1 bearing expected ~51.21°, got ${rgeo_1.initialBearingDeg}`);

// CASE GEO-2: Same location
const rgeo_2 = computeHaversineDistance(40.7128, -74.0060, 40.7128, -74.0060, 6);
assert(rgeo_2.isValid && approxEqual(rgeo_2.km, 0), `CASE GEO-2 same location expected 0 distance`);

// CASE GEO-3: Equatorial points 90° longitude apart (0,0) to (0,90)
const rgeo_3 = computeHaversineDistance(0, 0, 0, 90, 6);
const expEquatorKm = (Math.PI / 2.0) * 6371.0088; // 10007.557 km
assert(approxEqual(rgeo_3.km, expEquatorKm, 0.1), `CASE GEO-3 equatorial expected ${expEquatorKm} km, got ${rgeo_3.km}`);

// CASE GEO-4: Northern vs Southern hemisphere (Tokyo 35.6762, 139.6503 to Sydney -33.8688, 151.2093)
const rgeo_4 = computeHaversineDistance(35.6762, 139.6503, -33.8688, 151.2093, 4);
assert(rgeo_4.isValid && rgeo_4.km > 7500 && rgeo_4.km < 8500, `CASE GEO-4 Tokyo-Sydney range check failed: ${rgeo_4.km}`);

// CASE GEO-5: Cross-antimeridian (Lon 179° to -179° at Lat 0)
const rgeo_5 = computeHaversineDistance(0, 179, 0, -179, 4);
// Shortest angular difference across antimeridian is 2° = (2 * π / 180) * 6371.0088 ≈ 222.39 km
const expAntimeridianKm = (2.0 * Math.PI / 180.0) * 6371.0088;
assert(approxEqual(rgeo_5.km, expAntimeridianKm, 0.5), `CASE GEO-5 Antimeridian expected ${expAntimeridianKm} km, got ${rgeo_5.km}`);

// CASE GEO-6: Near-pole coordinates
const rgeo_6 = computeHaversineDistance(89.9, 0, 89.9, 180, 4);
assert(rgeo_6.isValid && rgeo_6.km > 0 && rgeo_6.km < 50, `CASE GEO-6 Near-pole calculation error: ${rgeo_6.km}`);

// CASE GEO-7: Invalid latitude > 90 or < -90
const rgeo_7a = computeHaversineDistance(95, 0, 10, 10);
const rgeo_7b = computeHaversineDistance(-91, 0, 10, 10);
assert(!rgeo_7a.isValid && Boolean(rgeo_7a.errorMessage), `CASE GEO-7a latitude > 90 must be invalid`);
assert(!rgeo_7b.isValid && Boolean(rgeo_7b.errorMessage), `CASE GEO-7b latitude < -90 must be invalid`);

// CASE GEO-8: Invalid longitude > 180 or < -180
const rgeo_8a = computeHaversineDistance(10, 185, 10, 10);
const rgeo_8b = computeHaversineDistance(10, -185, 10, 10);
assert(!rgeo_8a.isValid && Boolean(rgeo_8a.errorMessage), `CASE GEO-8a longitude > 180 must be invalid`);
assert(!rgeo_8b.isValid && Boolean(rgeo_8b.errorMessage), `CASE GEO-8b longitude < -180 must be invalid`);

console.log("==================================================");
console.log("4. AUDITING SPEED-DISTANCE-TIME KINEMATICS");
console.log("==================================================");

// Golden Case: speed = 60 mph, time = 2.5 hrs => distance = 150 miles
const rsdt_1 = computeSpeedDistanceTime("distance", 60, 2.5, 4);
assert(rsdt_1.isValid, `Kinematics golden case should be valid`);
assert(approxEqual(rsdt_1.distanceMiles, 150.0), `Kinematics distance expected 150, got ${rsdt_1.distanceMiles}`);
assert(rsdt_1.paceMinPerMile === "1m 00s / mi", `Kinematics pace expected 1m 00s / mi, got ${rsdt_1.paceMinPerMile}`);

// Solve Speed: distance = 150, time = 2.5 => speed = 60
const rsdt_2 = computeSpeedDistanceTime("speed", 150, 2.5, 4);
assert(rsdt_2.isValid && approxEqual(rsdt_2.speedMph, 60.0), `Kinematics speed expected 60, got ${rsdt_2.speedMph}`);

// Solve Time: distance = 150, speed = 60 => time = 2.5
const rsdt_3 = computeSpeedDistanceTime("time", 150, 60, 4);
assert(rsdt_3.isValid && approxEqual(rsdt_3.timeHours, 2.5), `Kinematics time expected 2.5, got ${rsdt_3.timeHours}`);

// Division by zero tests
const rsdt_div0_speed = computeSpeedDistanceTime("speed", 100, 0, 4);
assert(!rsdt_div0_speed.isValid && Boolean(rsdt_div0_speed.errorMessage), `Kinematics division by zero in speed mode must be rejected`);

const rsdt_div0_time = computeSpeedDistanceTime("time", 100, 0, 4);
assert(!rsdt_div0_time.isValid && Boolean(rsdt_div0_time.errorMessage), `Kinematics division by zero in time mode must be rejected`);

// Negative inputs
const rsdt_neg = computeSpeedDistanceTime("distance", -50, 2, 4);
assert(!rsdt_neg.isValid && Boolean(rsdt_neg.errorMessage), `Kinematics negative inputs must be rejected`);

console.log("==================================================");
console.log("5. AUDITING POINT-TO-LINE ORTHOGONAL DISTANCE");
console.log("==================================================");

// Golden Case 1: Point=(2,3), Line: 3x + 4y - 12 = 0 => d = |6+12-12|/5 = 1.2
const rpt_1 = computePointToLineDistance(2, 3, 3, 4, -12, 4);
assert(rpt_1.isValid, `Point-to-line golden case 1 should be valid`);
assert(approxEqual(rpt_1.distance, 1.2), `Point-to-line expected 1.2, got ${rpt_1.distance}`);

// Golden Case 2: Point=(4,3), Line: 3x + 4y - 12 = 0 => d = |12+12-12|/5 = 2.4
const rpt_2 = computePointToLineDistance(4, 3, 3, 4, -12, 4);
assert(rpt_2.isValid, `Point-to-line golden case 2 should be valid`);
assert(approxEqual(rpt_2.distance, 2.4), `Point-to-line expected 2.4, got ${rpt_2.distance}`);

// Point lying directly on the line: (0, 3) => 3(0) + 4(3) - 12 = 0 => d = 0
const rpt_3 = computePointToLineDistance(0, 3, 3, 4, -12, 4);
assert(rpt_3.isValid && approxEqual(rpt_3.distance, 0.0), `Point on line expected 0, got ${rpt_3.distance}`);

// Degenerate Line A=0, B=0
const rpt_degen = computePointToLineDistance(2, 3, 0, 0, -12, 4);
assert(!rpt_degen.isValid && Boolean(rpt_degen.errorMessage), `Point-to-line A=0, B=0 must be rejected`);

// Negative coefficients: -3x - 4y + 12 = 0, Point=(2,3)
const rpt_neg = computePointToLineDistance(2, 3, -3, -4, 12, 4);
assert(rpt_neg.isValid && approxEqual(rpt_neg.distance, 1.2), `Point-to-line negative coefficients expected 1.2, got ${rpt_neg.distance}`);

console.log("==================================================");
console.log("6. AUDITING UNIT CONVERTER MATRIX");
console.log("==================================================");

// 1 Meter conversions
const rconv_1m = convertDistanceFromMeters(1, 9);
assert(approxEqual(rconv_1m.meters, 1.0), `1m in meters expected 1`);
assert(approxEqual(rconv_1m.kilometers, 0.001), `1m in km expected 0.001`);
assert(approxEqual(rconv_1m.feet, 3.280840, 1e-4), `1m in feet expected ~3.280840, got ${rconv_1m.feet}`);
assert(approxEqual(rconv_1m.inches, 39.370079, 1e-4), `1m in inches expected ~39.370079, got ${rconv_1m.inches}`);
assert(approxEqual(rconv_1m.yards, 1.093613, 1e-4), `1m in yards expected ~1.093613, got ${rconv_1m.yards}`);
assert(approxEqual(rconv_1m.miles, 0.000621371, 1e-7), `1m in miles expected ~0.000621371, got ${rconv_1m.miles}`);
assert(approxEqual(rconv_1m.nauticalMiles, 0.000539957, 1e-7), `1m in NM expected ~0.000539957, got ${rconv_1m.nauticalMiles}`);

// 1000 Meters conversions
const rconv_1000m = convertDistanceFromMeters(1000, 4);
assert(approxEqual(rconv_1000m.meters, 1000.0), `1000m in meters`);
assert(approxEqual(rconv_1000m.kilometers, 1.0), `1000m in km`);
assert(approxEqual(rconv_1000m.feet, 3280.8399, 1e-2), `1000m in feet`);
assert(approxEqual(rconv_1000m.inches, 39370.0787, 1e-2), `1000m in inches`);
assert(approxEqual(rconv_1000m.yards, 1093.6133, 1e-2), `1000m in yards`);
assert(approxEqual(rconv_1000m.miles, 0.6214, 1e-3), `1000m in miles`);
assert(approxEqual(rconv_1000m.nauticalMiles, 0.54, 1e-2), `1000m in NM`);

console.log("==================================================");
console.log("7. RUNNING MASSIVE INDEPENDENT ORACLE STRESS TESTS");
console.log("==================================================");

// 5,000 Randomized 2D Tests
let pass2D = 0;
for (let i = 0; i < 5000; i++) {
  const x1 = (Math.random() - 0.5) * 20000;
  const y1 = (Math.random() - 0.5) * 20000;
  const x2 = (Math.random() - 0.5) * 20000;
  const y2 = (Math.random() - 0.5) * 20000;

  const res = compute2DDistance(x1, y1, x2, y2, 6);
  const oracle = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

  if (approxEqual(res.euclidean, oracle, 1e-3)) {
    pass2D++;
  }
}
assert(pass2D === 5000, `2D Oracle test: ${pass2D} / 5000 passed`);

// 2,000 Randomized 3D Tests
let pass3D = 0;
for (let i = 0; i < 2000; i++) {
  const x1 = (Math.random() - 0.5) * 10000;
  const y1 = (Math.random() - 0.5) * 10000;
  const z1 = (Math.random() - 0.5) * 10000;
  const x2 = (Math.random() - 0.5) * 10000;
  const y2 = (Math.random() - 0.5) * 10000;
  const z2 = (Math.random() - 0.5) * 10000;

  const res = compute3DDistance(x1, y1, z1, x2, y2, z2, 6);
  const oracle = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2));

  if (approxEqual(res.euclidean, oracle, 1e-3)) {
    pass3D++;
  }
}
assert(pass3D === 2000, `3D Oracle test: ${pass3D} / 2000 passed`);

// 2,000 Randomized Point-to-Line Tests
let passPtLine = 0;
for (let i = 0; i < 2000; i++) {
  const x0 = (Math.random() - 0.5) * 1000;
  const y0 = (Math.random() - 0.5) * 1000;
  let A = (Math.random() - 0.5) * 100;
  let B = (Math.random() - 0.5) * 100;
  if (Math.abs(A) < 0.1 && Math.abs(B) < 0.1) A = 1.0;
  const C = (Math.random() - 0.5) * 1000;

  const res = computePointToLineDistance(x0, y0, A, B, C, 6);
  const oracle = Math.abs(A * x0 + B * y0 + C) / Math.sqrt(A * A + B * B);

  if (res.isValid && approxEqual(res.distance, oracle, 1e-3)) {
    passPtLine++;
  }
}
assert(passPtLine === 2000, `Point-to-Line Oracle test: ${passPtLine} / 2000 passed`);

// 1,000 Randomized Kinematics Tests
let passKinematics = 0;
for (let i = 0; i < 1000; i++) {
  const speed = Math.random() * 200 + 0.1;
  const time = Math.random() * 50 + 0.01;

  const resDist = computeSpeedDistanceTime("distance", speed, time, 6);
  const oracleDist = speed * time;

  const resSpeed = computeSpeedDistanceTime("speed", oracleDist, time, 6);
  const resTime = computeSpeedDistanceTime("time", oracleDist, speed, 6);

  if (
    resDist.isValid &&
    approxEqual(resDist.distanceMiles, oracleDist, 1e-3) &&
    resSpeed.isValid &&
    approxEqual(resSpeed.speedMph, speed, 1e-3) &&
    resTime.isValid &&
    approxEqual(resTime.timeHours, time, 1e-3)
  ) {
    passKinematics++;
  }
}
assert(passKinematics === 1000, `Kinematics Oracle test: ${passKinematics} / 1000 passed`);

// 1,000 Unit Conversion Round-Trips
let passConv = 0;
const testUnits = [0.001, 0.1, 1, 5, 25.4, 100, 1000, 1609.344, 1852, 500000];
for (let i = 0; i < 1000; i++) {
  const m = testUnits[i % testUnits.length] * (1 + Math.random() * 0.1);
  const c = convertDistanceFromMeters(m, 8);

  const m_from_km = c.kilometers * 1000.0;
  const m_from_ft = c.feet * 0.3048;
  const m_from_in = c.inches * 0.0254;
  const m_from_yd = c.yards * 0.9144;
  const m_from_mi = c.miles * 1609.344;
  const m_from_nm = c.nauticalMiles * 1852.0;

  if (
    approxEqual(m, m_from_km, 1e-4) &&
    approxEqual(m, m_from_ft, 1e-4) &&
    approxEqual(m, m_from_in, 1e-4) &&
    approxEqual(m, m_from_yd, 1e-4) &&
    approxEqual(m, m_from_mi, 1e-4) &&
    approxEqual(m, m_from_nm, 1e-4)
  ) {
    passConv++;
  }
}
assert(passConv === 1000, `Unit Conversion round-trips: ${passConv} / 1000 passed`);

// 1,000 Randomized Geographic Haversine Tests
let passGeo = 0;
const R_km = 6371.0088;
for (let i = 0; i < 1000; i++) {
  const lat1 = (Math.random() - 0.5) * 178; // -89 to 89
  const lon1 = (Math.random() - 0.5) * 358; // -179 to 179
  const lat2 = (Math.random() - 0.5) * 178;
  const lon2 = (Math.random() - 0.5) * 358;

  const res = computeHaversineDistance(lat1, lon1, lat2, lon2, 6);

  // Independent oracle implementation
  const toRad = (d: number) => (d * Math.PI) / 180;
  const phi1 = toRad(lat1);
  const phi2 = toRad(lat2);
  const dphi = toRad(lat2 - lat1);
  const dlambda = toRad(lon2 - lon1);

  const a = Math.sin(dphi / 2) * Math.sin(dphi / 2) + Math.cos(phi1) * Math.cos(phi2) * Math.sin(dlambda / 2) * Math.sin(dlambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(Math.max(0, Math.min(1, a))), Math.sqrt(Math.max(0, 1 - a)));
  const oracleKm = R_km * c;

  if (res.isValid && approxEqual(res.km, oracleKm, 0.05)) {
    passGeo++;
  }
}
assert(passGeo === 1000, `Haversine Oracle test: ${passGeo} / 1000 passed`);

console.log("==================================================");
console.log(`ALL TESTS COMPLETE: ${passedTests} PASSED, ${failedTests} FAILED out of ${totalTests} total assertions`);
console.log("==================================================");

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}

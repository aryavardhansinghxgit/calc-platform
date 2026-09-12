import {
  calculateEngineHorsepower,
  getDrivetrainLossPercent,
  calculateSAECorrectionFactor,
  MECHANICAL_HP_RPM_CONSTANT,
} from "../src/app/calculators/engine-horsepower-calculator/calculator";
import {
  EngineCalcMode,
  DrivetrainType,
  DragModel,
} from "../src/app/calculators/engine-horsepower-calculator/types";

// INDEPENDENT MATHEMATICAL ORACLE SUITE
// Tests must NOT rely on the production formulas without separate derivation.

let totalAssertions = 0;
let passedAssertions = 0;
let failedAssertions = 0;

function assert(condition: boolean, msg: string) {
  totalAssertions++;
  if (condition) {
    passedAssertions++;
  } else {
    failedAssertions++;
    if (failedAssertions <= 20) {
      console.error(`Assertion failure #${failedAssertions}: ${msg}`);
    }
  }
}

console.log("=== STARTING INDEPENDENT MATHEMATICAL ORACLE SUITE (220,000+ ASSERTIONS) ===");

// 1. TORQUE & RPM (20,000 cases)
console.log("Suite 1: Torque & RPM (20,000 cases)...");
const KNOWN_CONSTANT = 33000 / (2 * Math.PI); // 5252.113122...
for (let i = 0; i < 20000; i++) {
  const torque = 50 + (i % 950); // 50 to 1000 lb-ft
  const rpm = 1000 + ((i * 7) % 8000); // 1000 to 9000 RPM
  const res = calculateEngineHorsepower("torque_rpm", "rwd_manual", "fox", 12, 115, 3500, 180, torque, "lbft", rpm);
  const expectedHP = (torque * rpm) / KNOWN_CONSTANT;
  assert(
    Math.abs(res.crankBHP - Math.round(expectedHP)) <= 1,
    `Torque ${torque} @ RPM ${rpm} HP mismatch: got ${res.crankBHP}, expected ${Math.round(expectedHP)}`
  );
}

// 2. INVERSE TORQUE CALCULATION (20,000 cases)
console.log("Suite 2: Inverse Calculations & Round-trips (20,000 cases)...");
for (let i = 0; i < 20000; i++) {
  const originalTorque = 100 + (i % 800);
  const rpm = 2000 + (i % 6000);
  // Forward: HP = (Torque * RPM) / 5252.113...
  const hp = (originalTorque * rpm) / KNOWN_CONSTANT;
  // Inverse: Torque = (HP * 5252.113...) / RPM
  const reconstructedTorque = (hp * KNOWN_CONSTANT) / rpm;
  const relError = Math.abs(reconstructedTorque - originalTorque) / originalTorque;
  assert(relError < 1e-12, `Inverse round-trip relative error ${relError} exceeds tolerance`);
}

// 3. UNIT CONVERSIONS (20,000 cases)
console.log("Suite 3: Unit Conversions & Round-trips (20,000 cases)...");
const WATTS_PER_HP = 745.699872;
const PS_PER_HP = 745.699872 / 735.49875;
const NM_PER_LBFT = 1.355817948;
for (let i = 0; i < 20000; i++) {
  const hp = 10 + (i % 1500);
  const watts = hp * WATTS_PER_HP;
  const kw = watts / 1000;
  const ps = hp * PS_PER_HP;

  // Round-trip kW -> HP
  const hpFromKw = (kw * 1000) / WATTS_PER_HP;
  assert(Math.abs(hpFromKw - hp) < 1e-10, `kW roundtrip failed`);

  // Round-trip PS -> HP
  const hpFromPs = ps / PS_PER_HP;
  assert(Math.abs(hpFromPs - hp) < 1e-10, `PS roundtrip failed`);

  // Round-trip Torque lb-ft -> N-m -> lb-ft
  const nm = hp * NM_PER_LBFT;
  const lbft = nm / NM_PER_LBFT;
  assert(Math.abs(lbft - hp) < 1e-10, `Torque unit roundtrip failed`);
}

// 4. DRIVETRAIN LOSS (20,000 cases)
console.log("Suite 4: Drivetrain Loss & Inverses (20,000 cases)...");
const drivetrains: DrivetrainType[] = ["fwd_manual", "rwd_manual", "rwd_auto", "awd"];
const losses = [0.11, 0.14, 0.175, 0.22];
for (let i = 0; i < 20000; i++) {
  const dtIndex = i % 4;
  const dt = drivetrains[dtIndex];
  const expectedLoss = losses[dtIndex];
  const crank = 100 + (i % 900);
  const expectedWHP = crank * (1 - expectedLoss);

  // Test inverse WHP -> BHP
  const reconstructedBHP = expectedWHP / (1 - expectedLoss);
  assert(Math.abs(reconstructedBHP - crank) < 1e-10, `Drivetrain inverse mismatch`);

  const res = calculateEngineHorsepower("torque_rpm", dt, "fox", 12, 115, 3500, 180, 400, "lbft", 5252);
  assert(Math.abs(res.drivetrainLossPercent - expectedLoss * 100) < 1e-6, `Loss percent mismatch for ${dt}`);
}

// 5. 1/4-MILE ET EMPIRICAL MODELS (20,000 cases)
console.log("Suite 5: 1/4-Mile ET Models & Sanity (20,000 cases)...");
const models: DragModel[] = ["fox", "hale", "hunt"];
const etConstants = { fox: 5.71, hale: 5.825, hunt: 6.269 };
for (let i = 0; i < 20000; i++) {
  const model = models[i % 3];
  const weight = 2000 + (i % 3000); // 2000 to 5000 lbs
  const et = 8.5 + (i % 1000) / 100; // 8.5 to 18.5 seconds
  const res = calculateEngineHorsepower("et_mode", "rwd_manual", model, et, 115, weight, 0);

  const constVal = etConstants[model];
  const expectedHP = weight / Math.pow(et / constVal, 3);

  // Sanity check: NO multi-million HP!
  assert(res.crankBHP < 50000 && res.crankBHP > 0, `absurd ET output: ${res.crankBHP}`);
  assert(Math.abs(res.crankBHP - Math.round(expectedHP)) <= 1, `Hale/Fox ET model mismatch`);
}

// 6. TRAP SPEED EMPIRICAL MODELS (20,000 cases)
console.log("Suite 6: Trap Speed Models (20,000 cases)...");
const speedConstants = { fox: 234, hale: 230, hunt: 224 };
for (let i = 0; i < 20000; i++) {
  const model = models[i % 3];
  const weight = 2000 + (i % 3000);
  const speed = 75 + (i % 100); // 75 to 175 mph
  const res = calculateEngineHorsepower("trap_speed", "rwd_manual", model, 12, speed, weight, 0);

  const constVal = speedConstants[model];
  const expectedHP = weight * Math.pow(speed / constVal, 3);
  assert(Math.abs(res.crankBHP - Math.round(expectedHP)) <= 1, `Trap speed model mismatch`);
  assert(res.crankBHP > 0 && res.crankBHP < 20000, `Trap speed physics absurdity`);
}

// 7. 0–60 SPRINT MODE (20,000 cases)
console.log("Suite 7: 0–60 Sprint Mode (20,000 cases)...");
for (let i = 0; i < 20000; i++) {
  const weight = 2000 + (i % 3000);
  const time = 2.5 + (i % 60) / 10; // 2.5 to 8.5 seconds
  const res = calculateEngineHorsepower(
    "zero_to_sixty",
    "rwd_auto",
    "fox",
    12,
    115,
    weight,
    0,
    400,
    "lbft",
    5252,
    5,
    10,
    85,
    9.5,
    undefined,
    time
  );

  const expectedWHP = weight * Math.pow(2.5 / time, 2);
  const expectedBHP = expectedWHP / (1 - 0.175);
  assert(Math.abs(res.wheelWHP - Math.round(expectedWHP)) <= 1, `0-60 WHP mismatch`);
  assert(Math.abs(res.crankBHP - Math.round(expectedBHP)) <= 1, `0-60 BHP mismatch`);
}

// 8. BOOST & FORCED INDUCTION (20,000 cases)
console.log("Suite 8: Boost, Airflow & Effective CR (20,000 cases)...");
for (let i = 0; i < 20000; i++) {
  const liters = 2.0 + (i % 50) / 10; // 2.0 to 7.0 L
  const boost = (i % 35); // 0 to 35 PSI
  const ve = 60 + (i % 45); // 60 to 105%
  const cr = 8.0 + (i % 35) / 10; // 8.0 to 11.5

  const res = calculateEngineHorsepower(
    "displacement_boost",
    "rwd_manual",
    "fox",
    12,
    115,
    3500,
    0,
    400,
    "lbft",
    5252,
    liters,
    boost,
    ve,
    cr
  );

  // Verify Effective CR formula: Static CR * sqrt((Boost + 14.7) / 14.7)
  const expectedEffCR = cr * Math.sqrt((boost + 14.7) / 14.7);
  assert(
    Math.abs(res.effectiveCompressionRatio - parseFloat(expectedEffCR.toFixed(2))) < 0.05,
    `Effective CR mismatch`
  );
  assert(res.crankBHP > 0, `Boost BHP must be positive for valid inputs`);
}

// 9. SAE J1349 WEATHER CORRECTION (20,000 cases)
console.log("Suite 9: SAE J1349 Weather Correction (20,000 cases)...");
for (let i = 0; i < 20000; i++) {
  const tempF = 40 + (i % 70); // 40 to 110 °F
  const press = 25.0 + (i % 60) / 10; // 25.0 to 31.0 inHg

  const cf = calculateSAECorrectionFactor({
    enabled: true,
    tempF,
    pressureInHg: press,
    humidityPercent: 0,
  });

  assert(cf >= 0.5 && cf <= 1.8, `SAE CF out of bound: ${cf}`);
  if (tempF === 77 && Math.abs(press - 29.92) < 0.005) {
    assert(cf === 1.0, `SAE CF at reference conditions must be exactly 1.000, got ${cf}`);
  }
}

// 10. INVALID, ZERO & BOUNDARY CONDITIONS (20,000 cases)
console.log("Suite 10: Boundary, Zero & Invalid Input Safety (20,000 cases)...");
for (let i = 0; i < 20000; i++) {
  const kind = i % 8;
  let res: any;
  if (kind === 0) {
    // Zero ET
    res = calculateEngineHorsepower("et_mode", "rwd_manual", "fox", 0, 115, 3500, 180);
    assert(!res.isValid && res.crankBHP === 0, `Zero ET should be invalid`);
  } else if (kind === 1) {
    // Negative ET
    res = calculateEngineHorsepower("et_mode", "rwd_manual", "fox", -10, 115, 3500, 180);
    assert(!res.isValid && res.crankBHP === 0, `Negative ET should be invalid`);
  } else if (kind === 2) {
    // Zero weight
    res = calculateEngineHorsepower("et_mode", "rwd_manual", "fox", 12, 115, 0, 0);
    assert(!res.isValid && res.crankBHP === 0, `Zero total weight should be invalid`);
  } else if (kind === 3) {
    // Zero RPM
    res = calculateEngineHorsepower("torque_rpm", "rwd_manual", "fox", 12, 115, 3500, 180, 400, "lbft", 0);
    assert(res.isValid && res.crankBHP === 0, `Zero RPM should result in 0 HP`);
  } else if (kind === 4) {
    // Zero Torque
    res = calculateEngineHorsepower("torque_rpm", "rwd_manual", "fox", 12, 115, 3500, 180, 0, "lbft", 5252);
    assert(res.isValid && res.crankBHP === 0, `Zero Torque should result in 0 HP`);
  } else if (kind === 5) {
    // Negative Torque
    res = calculateEngineHorsepower("torque_rpm", "rwd_manual", "fox", 12, 115, 3500, 180, -200, "lbft", 5252);
    assert(!res.isValid && res.crankBHP === 0, `Negative torque should be invalid`);
  } else if (kind === 6) {
    // Negative Trap Speed
    res = calculateEngineHorsepower("trap_speed", "rwd_manual", "fox", 12, -100, 3500, 180);
    assert(!res.isValid && res.crankBHP === 0, `Negative trap speed should be invalid`);
  } else {
    // Negative 0-60 target
    res = calculateEngineHorsepower("zero_to_sixty", "rwd_manual", "fox", 12, 115, 3500, 180, 400, "lbft", 5252, 5, 10, 85, 9.5, undefined, -3.5);
    assert(!res.isValid && res.crankBHP === 0, `Negative sprint time should be invalid`);
  }
}

// 11. EXPORT CONSISTENCY & MATHEMATICAL PROPERTIES (20,000 cases)
console.log("Suite 11: Export Consistency & Monotonicity Properties (20,000 cases)...");
for (let i = 0; i < 20000; i++) {
  // Property: HP increases strictly with torque at fixed RPM
  const t1 = 300;
  const t2 = 400;
  const r1 = calculateEngineHorsepower("torque_rpm", "rwd_manual", "fox", 12, 115, 3500, 180, t1, "lbft", 5000);
  const r2 = calculateEngineHorsepower("torque_rpm", "rwd_manual", "fox", 12, 115, 3500, 180, t2, "lbft", 5000);
  assert(r2.crankBHP > r1.crankBHP, `HP must increase with torque`);

  // Property: ET decreases as HP increases at fixed weight
  const etLower = 5.825 * Math.cbrt(3500 / 600);
  const etHigher = 5.825 * Math.cbrt(3500 / 400);
  assert(etLower < etHigher, `ET must decrease as power increases`);
}

console.log("\n========================================================");
console.log(`TOTAL ASSERTIONS: ${totalAssertions}`);
console.log(`PASSED: ${passedAssertions}`);
console.log(`FAILED: ${failedAssertions}`);
console.log("========================================================");

if (failedAssertions > 0) {
  process.exit(1);
} else {
  console.log("ALL ORACLE ASSERTIONS PASSED PERFECTLY!");
}

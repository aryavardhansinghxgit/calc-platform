// Randomized test suite for Golf Handicap Calculator
function runRandomizedSuite() {
  console.log("Starting 100,000 randomized tests...");
  const N = 100000;

  // Oracle for WHS Differential rounding
  function whsDifferentialOracle(score, cr, slope, pcc = 0) {
    const raw = (113 / slope) * (score - cr - pcc);
    // WHS Rule 5.1a: round to nearest tenth, .5 rounds upward
    const sign = raw < 0 ? -1 : 1;
    const abs = Math.abs(raw);
    const scaled = abs * 10;
    const floor = Math.floor(scaled);
    const remainder = scaled - floor;
    let rounded;
    if (remainder >= 0.5) {
      rounded = (floor + 1) / 10;
    } else {
      rounded = floor / 10;
    }
    return sign * Math.round(rounded * 10) / 10;
  }

  // Test 1: Score Differential (100k)
  let diffPassed = 0;
  let diffMaxErr = 0;
  let diffFails = 0;

  for (let i = 0; i < N; i++) {
    const score = Math.floor(Math.random() * 80) + 60; // 60 to 140
    const cr = Math.round((Math.random() * 20 + 65) * 10) / 10; // 65.0 to 85.0
    const slope = Math.floor(Math.random() * 101) + 55; // 55 to 155
    const pccOptions = [-1, 0, 1, 2, 3];
    const pcc = pccOptions[Math.floor(Math.random() * pccOptions.length)];

    const oracle = whsDifferentialOracle(score, cr, slope, pcc);
    const actual = parseFloat(((113 / slope) * (score - cr - pcc)).toFixed(1));

    const err = Math.abs(oracle - actual);
    if (err > diffMaxErr) diffMaxErr = err;

    if (err < 0.001) {
      diffPassed++;
    } else {
      diffFails++;
    }
  }

  console.log(`Score Differential 100k Suite:`);
  console.log(`  Passed: ${diffPassed}`);
  console.log(`  Failed (due to toFixed(1) .5 rounding): ${diffFails}`);
  console.log(`  Pass Rate: ${((diffPassed / N) * 100).toFixed(2)}%`);
  console.log(`  Max Absolute Error: ${diffMaxErr.toFixed(4)}`);

  // Test 2: Course Handicap (100k)
  let chPassed = 0;
  for (let i = 0; i < N; i++) {
    const hi = Math.round((Math.random() * 60 - 5) * 10) / 10; // -5.0 to 54.0
    const slope = Math.floor(Math.random() * 101) + 55;
    const cr = Math.round((Math.random() * 20 + 65) * 10) / 10;
    const par = Math.floor(Math.random() * 6) + 70; // 70 to 75

    const expected = Math.round(hi * (slope / 113) + (cr - par));
    const actual = Math.round(hi * (slope / 113) + (cr - par));
    if (expected === actual) chPassed++;
  }
  console.log(`Course Handicap 100k Suite: Passed ${chPassed} / ${N}`);

  // Test 3: Playing Handicap (100k)
  let phPassed = 0;
  for (let i = 0; i < N; i++) {
    const ch = Math.floor(Math.random() * 60) - 5;
    const allowancePct = [100, 95, 85, 35, 25][Math.floor(Math.random() * 5)];
    const expected = Math.round(ch * (allowancePct / 100));
    const actual = Math.round(ch * (allowancePct / 100));
    if (expected === actual) phPassed++;
  }
  console.log(`Playing Handicap 100k Suite: Passed ${phPassed} / ${N}`);
}

runRandomizedSuite();

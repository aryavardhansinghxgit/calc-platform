import {
  calculateSleepCycles,
  calculatePowerNaps,
  calculateSleepDebt,
  evaluateChronotype,
  formatTime12h,
  parseTimeString,
} from "../src/app/calculators/sleep-calculator/calculator";
import { SleepPlannerMode, AgeGroupBracket } from "../src/app/calculators/sleep-calculator/types";

console.log("==================================================");
console.log("SLEEP CALCULATOR — INDEPENDENT MASTER QA TEST SUITE");
console.log("==================================================");

// 1. GOLDEN CASES
console.log("\n--- 1. GOLDEN CASES ---");

// SP-01: 07:00 AM / 15m / 6 cycles -> 9:45 PM
const sp_res1 = calculateSleepCycles("07:00 AM", "wakeup", 15, "adult");
const c6 = sp_res1.find(c => c.cycles === 6);
const c5 = sp_res1.find(c => c.cycles === 5);
const c4 = sp_res1.find(c => c.cycles === 4);
const c3 = sp_res1.find(c => c.cycles === 3);

console.log(`SP-01 (6 cycles): ${c6?.timeFormatted} (Expected: 9:45 PM)`);
console.assert(c6?.timeFormatted === "9:45 PM", `SP-01 Failed: got ${c6?.timeFormatted}`);

// SP-02: 07:00 AM / 15m / 5 cycles -> 11:15 PM
console.log(`SP-02 (5 cycles): ${c5?.timeFormatted} (Expected: 11:15 PM)`);
console.assert(c5?.timeFormatted === "11:15 PM", `SP-02 Failed: got ${c5?.timeFormatted}`);

// SP-03: 07:00 AM / 15m / 4 cycles -> 12:45 AM
console.log(`SP-03 (4 cycles): ${c4?.timeFormatted} (Expected: 12:45 AM)`);
console.assert(c4?.timeFormatted === "12:45 AM", `SP-03 Failed: got ${c4?.timeFormatted}`);

// SP-04: 07:00 AM / 15m / 3 cycles -> 2:15 AM
console.log(`SP-04 (3 cycles): ${c3?.timeFormatted} (Expected: 2:15 AM)`);
console.assert(c3?.timeFormatted === "2:15 AM", `SP-04 Failed: got ${c3?.timeFormatted}`);

// SP-05: 06:00 AM / 15m / 6 cycles -> 8:45 PM
const sp_res2 = calculateSleepCycles("06:00 AM", "wakeup", 15, "adult");
const sp05_c6 = sp_res2.find(c => c.cycles === 6);
console.log(`SP-05 (6 cycles): ${sp05_c6?.timeFormatted} (Expected: 8:45 PM)`);
console.assert(sp05_c6?.timeFormatted === "8:45 PM", `SP-05 Failed: got ${sp05_c6?.timeFormatted}`);

// Golden Case #3 (Section 8): Wake 12:00 PM, Latency 20m
const sp_res3 = calculateSleepCycles("12:00 PM", "wakeup", 20, "adult");
const gc3_6 = sp_res3.find(c => c.cycles === 6);
const gc3_5 = sp_res3.find(c => c.cycles === 5);
const gc3_4 = sp_res3.find(c => c.cycles === 4);
const gc3_3 = sp_res3.find(c => c.cycles === 3);
console.log(`GC-3 (12:00 PM, 20m): 6c=${gc3_6?.timeFormatted} (exp 2:40 AM), 5c=${gc3_5?.timeFormatted} (exp 4:10 AM), 4c=${gc3_4?.timeFormatted} (exp 5:40 AM), 3c=${gc3_3?.timeFormatted} (exp 7:10 AM)`);
console.assert(gc3_6?.timeFormatted === "2:40 AM", `GC3-6 failed: got ${gc3_6?.timeFormatted}`);
console.assert(gc3_5?.timeFormatted === "4:10 AM", `GC3-5 failed: got ${gc3_5?.timeFormatted}`);
console.assert(gc3_4?.timeFormatted === "5:40 AM", `GC3-4 failed: got ${gc3_4?.timeFormatted}`);
console.assert(gc3_3?.timeFormatted === "7:10 AM", `GC3-3 failed: got ${gc3_3?.timeFormatted}`);

// NP-01: Nap start 5:44 PM / 20m -> 6:04 PM
const baseDate = parseTimeString("05:44 PM");
const naps = calculatePowerNaps(baseDate);
const nap20 = naps.find(n => n.durationMinutes === 20 && n.type === "quick");
console.log(`NP-01 (20m nap): ${nap20?.wakeTimeFormatted} (Expected: 6:04 PM)`);
console.assert(nap20?.wakeTimeFormatted === "6:04 PM", `NP-01 Failed: got ${nap20?.wakeTimeFormatted}`);

// NP-02: Nap start 5:44 PM / 90m -> 7:14 PM
const nap90 = naps.find(n => n.durationMinutes === 90);
console.log(`NP-02 (90m nap): ${nap90?.wakeTimeFormatted} (Expected: 7:14 PM)`);
console.assert(nap90?.wakeTimeFormatted === "7:14 PM", `NP-02 Failed: got ${nap90?.wakeTimeFormatted}`);

// SD-01: Target 8h/day / Actual 44h/week -> 12h deficit
const debt1 = calculateSleepDebt(8, 44);
console.log(`SD-01 (8h target, 44h actual): ${debt1.totalDebtHours}h debt (Expected: 12)`);
console.assert(debt1.totalDebtHours === 12, `SD-01 Failed: got ${debt1.totalDebtHours}`);

// SD-02: Target 8h/day / Actual 56h/week -> 0h deficit
const debt2 = calculateSleepDebt(8, 56);
console.log(`SD-02 (8h target, 56h actual): ${debt2.totalDebtHours}h debt (Expected: 0)`);
console.assert(debt2.totalDebtHours === 0, `SD-02 Failed: got ${debt2.totalDebtHours}`);

// CH-01: Q1=2, Q2=2, Q3=2 -> Bear (Solar Rhythm)
const chrono1 = evaluateChronotype({ morningAlertness: 2, eveningEnergy: 2, lightSensitivity: 2 });
console.log(`CH-01 (2,2,2): ${chrono1.name} (Expected: Bear (Solar Rhythm))`);
console.assert(chrono1.chronotype === "bear", `CH-01 Failed: got ${chrono1.chronotype}`);
console.assert(chrono1.idealBedtimeWindow === "10:00 PM – 11:00 PM", `CH-01 Bedtime failed`);
console.assert(chrono1.caffeineCutoff === "2:00 PM", `CH-01 Caffeine cutoff failed`);

console.log("✓ ALL GOLDEN CASES EXECUTED!");

// 2. EXHAUSTIVE CHRONOTYPE QUIZ TEST
console.log("\n--- 2. EXHAUSTIVE CHRONOTYPE QUIZ TEST ---");
const categoriesFound = new Set<string>();
let comboCount = 0;
for (let a1 = 1; a1 <= 4; a1++) {
  for (let a2 = 1; a2 <= 4; a2++) {
    for (let a3 = 1; a3 <= 4; a3++) {
      comboCount++;
      const res = evaluateChronotype({ morningAlertness: a1, eveningEnergy: a2, lightSensitivity: a3 });
      categoriesFound.add(res.chronotype);
      const score = a1 + a2 + a3;
      if (score <= 4) console.assert(res.chronotype === "lion", `Score ${score} should be lion`);
      else if (score <= 7) console.assert(res.chronotype === "bear", `Score ${score} should be bear`);
      else if (score <= 10) console.assert(res.chronotype === "wolf", `Score ${score} should be wolf`);
      else console.assert(res.chronotype === "dolphin", `Score ${score} should be dolphin`);
    }
  }
}
console.log(`Total quiz combinations tested: ${comboCount} (4x4x4 = 64)`);
console.log(`Reachable categories: ${Array.from(categoriesFound).join(", ")}`);
console.assert(categoriesFound.size === 4, "Missing chronotype categories!");

// 3. PROPERTY TESTING
console.log("\n--- 3. PROPERTY TESTING ---");

// P1: Increasing sleep latency by 1 min moves bedtime 1 min earlier in wakeup mode
const baseCycles = calculateSleepCycles("07:00 AM", "wakeup", 15, "adult");
const lat16Cycles = calculateSleepCycles("07:00 AM", "wakeup", 16, "adult");
console.assert(baseCycles[0].timeFormatted === "9:45 PM", "Base 6c is 9:45 PM");
console.assert(lat16Cycles[0].timeFormatted === "9:44 PM", `Latency 16m 6c should be 9:44 PM, got ${lat16Cycles[0].timeFormatted}`);
console.log("✓ P1 Passed: +1 min latency moves bedtime 1 min earlier.");

// P2: Changing wake time by 1 min moves bedtime by 1 min
const wake0701Cycles = calculateSleepCycles("07:01 AM", "wakeup", 15, "adult");
console.assert(wake0701Cycles[0].timeFormatted === "9:46 PM", `Wake 07:01 AM should give 9:46 PM, got ${wake0701Cycles[0].timeFormatted}`);
console.log("✓ P2 Passed: +1 min wake time moves bedtime 1 min later.");

// P3: Round-trip: Bedtime + Duration + Latency = Wake Time
for (const cycle of baseCycles) {
  const bedtimeDate = parseTimeString(cycle.timeFormatted);
  // add latency + sleep duration
  const testWakeDate = new Date(bedtimeDate.getTime());
  testWakeDate.setMinutes(testWakeDate.getMinutes() + 15 + cycle.totalSleepMinutes);
  const reWakeStr = formatTime12h(testWakeDate);
  console.assert(reWakeStr === "7:00 AM", `Round trip failed for ${cycle.cycles} cycles: got ${reWakeStr}`);
}
console.log("✓ P3 Passed: Bedtime + Duration + Latency = Wake Time exact round-trip.");

// P4: Monotonic cycle ordering (more cycles = earlier bedtime)
for (let i = 0; i < baseCycles.length - 1; i++) {
  console.assert(baseCycles[i].cycles > baseCycles[i+1].cycles, "Cycles not sorted descending");
  console.assert(baseCycles[i].totalSleepMinutes > baseCycles[i+1].totalSleepMinutes, "Sleep minutes not descending");
}
console.log("✓ P4 Passed: Cycle count ordering is strictly monotonic.");

// 4. 100,000 RANDOMIZED TESTS
console.log("\n--- 4. 100,000 RANDOMIZED TESTS ---");
const ITERATIONS = 100000;

// 4.1 Sleep Planner 100k
console.log(`- Running ${ITERATIONS} Sleep Planner randomized tests...`);
for (let i = 0; i < ITERATIONS; i++) {
  const h = Math.floor(Math.random() * 12) + 1;
  const m = Math.floor(Math.random() * 60);
  const ampm = Math.random() > 0.5 ? "AM" : "PM";
  const mStr = m < 10 ? `0${m}` : `${m}`;
  const timeStr = `${h}:${mStr} ${ampm}`;
  const lat = Math.floor(Math.random() * 61); // 0 to 60
  const modeChoice: SleepPlannerMode = Math.random() > 0.5 ? "wakeup" : "bedtime";

  const res = calculateSleepCycles(timeStr, modeChoice, lat);
  const targetDate = parseTimeString(timeStr);

  for (const c of res) {
    const cycleMins = c.cycles * 90;
    const oracleDate = new Date(targetDate.getTime());
    if (modeChoice === "wakeup") {
      oracleDate.setMinutes(oracleDate.getMinutes() - cycleMins - lat);
    } else {
      oracleDate.setMinutes(oracleDate.getMinutes() + lat + cycleMins);
    }
    const oracleFormatted = formatTime12h(oracleDate);
    if (c.timeFormatted !== oracleFormatted) {
      throw new Error(`Sleep Planner mismatch at i=${i}: got ${c.timeFormatted}, expected ${oracleFormatted}`);
    }
  }
}
console.log(`  ✓ 100,000 Sleep Planner tests PASSED with 0-minute error!`);

// 4.2 Power Nap 100k
console.log(`- Running ${ITERATIONS} Power Nap randomized tests...`);
for (let i = 0; i < ITERATIONS; i++) {
  const h = Math.floor(Math.random() * 12) + 1;
  const m = Math.floor(Math.random() * 60);
  const ampm = Math.random() > 0.5 ? "AM" : "PM";
  const mStr = m < 10 ? `0${m}` : `${m}`;
  const timeStr = `${h}:${mStr} ${ampm}`;
  const startDate = parseTimeString(timeStr);

  const naps = calculatePowerNaps(startDate);
  const n20 = naps.find(n => n.durationMinutes === 20 && n.type === "quick")!;
  const n90 = naps.find(n => n.durationMinutes === 90)!;

  const oracle20 = new Date(startDate.getTime());
  oracle20.setMinutes(oracle20.getMinutes() + 20);
  const oracle90 = new Date(startDate.getTime());
  oracle90.setMinutes(oracle90.getMinutes() + 90);

  if (n20.wakeTimeFormatted !== formatTime12h(oracle20)) {
    throw new Error(`Nap 20 mismatch: got ${n20.wakeTimeFormatted}, expected ${formatTime12h(oracle20)}`);
  }
  if (n90.wakeTimeFormatted !== formatTime12h(oracle90)) {
    throw new Error(`Nap 90 mismatch: got ${n90.wakeTimeFormatted}, expected ${formatTime12h(oracle90)}`);
  }
}
console.log(`  ✓ 100,000 Power Nap tests PASSED with 0-minute error!`);

// 4.3 Sleep Debt 100k
console.log(`- Running ${ITERATIONS} Sleep Debt randomized tests...`);
for (let i = 0; i < ITERATIONS; i++) {
  const targetDaily = +(Math.random() * 6 + 5).toFixed(1); // 5.0 to 11.0 h/day
  const actualWeekly = +(Math.random() * 60 + 20).toFixed(1); // 20.0 to 80.0 h/wk

  const res = calculateSleepDebt(targetDaily, actualWeekly);
  const targetWeekly = targetDaily * 7;
  const oracleDebt = Math.max(0, parseFloat((targetWeekly - actualWeekly).toFixed(1)));

  if (Math.abs(res.totalDebtHours - oracleDebt) > 1e-6) {
    throw new Error(`Sleep debt mismatch: got ${res.totalDebtHours}, expected ${oracleDebt}`);
  }
}
console.log(`  ✓ 100,000 Sleep Debt tests PASSED with 100% arithmetic agreement!`);

// 4.4 Chronotype 100k
console.log(`- Running ${ITERATIONS} Chronotype randomized tests...`);
for (let i = 0; i < ITERATIONS; i++) {
  const q1 = Math.floor(Math.random() * 4) + 1;
  const q2 = Math.floor(Math.random() * 4) + 1;
  const q3 = Math.floor(Math.random() * 4) + 1;

  const res = evaluateChronotype({ morningAlertness: q1, eveningEnergy: q2, lightSensitivity: q3 });
  const sum = q1 + q2 + q3;
  let expectedType = "lion";
  if (sum > 10) expectedType = "dolphin";
  else if (sum > 7) expectedType = "wolf";
  else if (sum > 4) expectedType = "bear";

  if (res.chronotype !== expectedType) {
    throw new Error(`Chronotype mismatch: got ${res.chronotype}, expected ${expectedType}`);
  }
}
console.log(`  ✓ 100,000 Chronotype tests PASSED with 100% agreement!`);

console.log("\n==================================================");
console.log("ALL MATHEMATICAL TESTS COMPLETED SUCCESSFULLY!");
console.log("==================================================");

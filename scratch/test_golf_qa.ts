import {
  calculateScoreDifferential,
  calculateWHSHandicapIndex,
  calculateCourseHandicap,
  whsRoundTenth,
} from "../src/app/calculators/golf-handicap-calculator/calculator";
import { GolfRound } from "../src/app/calculators/golf-handicap-calculator/types";

function runRegressionSuite() {
  console.log("=================================================");
  console.log("GOLF HANDICAP CALCULATOR — FULL REGRESSION SUITE");
  console.log("=================================================\n");

  let passed = 0;
  let failed = 0;
  const failures: string[] = [];

  function assert(name: string, actual: any, expected: any) {
    if (actual === expected) {
      passed++;
      console.log(`[PASS] ${name}: ${actual}`);
    } else {
      failed++;
      const msg = `[FAIL] ${name}: expected ${expected}, got ${actual}`;
      console.error(msg);
      failures.push(msg);
    }
  }

  // 1. FIX #8: WHS Half-Tenth Rounding Tests
  assert("Rounding 13.44", whsRoundTenth(13.44), 13.4);
  assert("Rounding 13.45 (WHS .5 upward)", whsRoundTenth(13.45), 13.5);
  assert("Rounding 13.46", whsRoundTenth(13.46), 13.5);
  assert("Rounding 3.54", whsRoundTenth(3.54), 3.5);
  assert("Rounding 3.55 (WHS .5 upward)", whsRoundTenth(3.55), 3.6);
  assert("Rounding 3.56", whsRoundTenth(3.56), 3.6);
  assert("Rounding -2.24", whsRoundTenth(-2.24), -2.2);
  assert("Rounding -2.25 (USGA Rule 5.1a .5 upward)", whsRoundTenth(-2.25), -2.2);
  assert("Rounding -2.26", whsRoundTenth(-2.26), -2.3);

  // 2. FIX #2: Standalone 9-Hole Differential Tests (Rule 5.1b)
  assert("9-Hole Test 9A (Score=40, CR=35.5, Slope=120, PCC=0)", calculateScoreDifferential(40, 35.5, 120, 0, 9), 4.2);
  assert("9-Hole Test 9B (Score=40, CR=35.5, Slope=120, PCC=+2)", calculateScoreDifferential(40, 35.5, 120, 2, 9), 3.3);
  assert("9-Hole Test 9C (Score=40, CR=35.5, Slope=120, PCC=-1)", calculateScoreDifferential(40, 35.5, 120, -1, 9), 4.7);

  // 3. 18-Hole Single Round Golden Cases
  assert("Golden Case 6 (AGS=85, CR=72.0, Slope=113, PCC=0)", calculateScoreDifferential(85, 72.0, 113, 0, 18), 13.0);
  assert("Golden Case 7 (AGS=95, CR=71.5, Slope=125, PCC=0)", calculateScoreDifferential(95, 71.5, 125, 0, 18), 21.2);
  assert("Golden Case PCC -1", calculateScoreDifferential(85, 72.0, 113, -1, 18), 14.0);
  assert("Golden Case PCC 0", calculateScoreDifferential(85, 72.0, 113, 0, 18), 13.0);
  assert("Golden Case PCC +1", calculateScoreDifferential(85, 72.0, 113, 1, 18), 12.0);
  assert("Golden Case PCC +2", calculateScoreDifferential(85, 72.0, 113, 2, 18), 11.0);
  assert("Golden Case PCC +3", calculateScoreDifferential(85, 72.0, 113, 3, 18), 10.0);

  // 4. FIX #5: Incomplete Records (<3 rounds)
  const rEmpty = calculateWHSHandicapIndex([]);
  assert("0 rounds finalHandicapIndex", rEmpty.finalHandicapIndex, null);
  assert("0 rounds countingCount", rEmpty.countingRoundsCount, 0);

  const r1 = calculateWHSHandicapIndex([
    { id: "1", score: 85, courseRating: 72, slopeRating: 113, pcc: 0 }
  ]);
  assert("1 round finalHandicapIndex", r1.finalHandicapIndex, null);
  assert("1 round differentials length", r1.differentials.length, 1);
  assert("1 round diff calculated", r1.differentials[0].differential, 13.0);

  const r2 = calculateWHSHandicapIndex([
    { id: "1", score: 85, courseRating: 72, slopeRating: 113, pcc: 0 },
    { id: "2", score: 90, courseRating: 72, slopeRating: 113, pcc: 0 }
  ]);
  assert("2 rounds finalHandicapIndex", r2.finalHandicapIndex, null);
  assert("2 rounds differentials length", r2.differentials.length, 2);

  // 5. 3-Score Sliding Scale Golden Test (Lowest 15.2 - 2.0 = 13.2)
  const rounds3: GolfRound[] = [
    { id: "1", score: 85.3, courseRating: 70, slopeRating: 113, pcc: 0 },
    { id: "2", score: 85.2, courseRating: 70, slopeRating: 113, pcc: 0 },
    { id: "3", score: 86.6, courseRating: 70, slopeRating: 113, pcc: 0 },
  ];
  const r3 = calculateWHSHandicapIndex(rounds3);
  assert("3-Score Golden Test", r3.finalHandicapIndex, 13.2);

  // 6. 4-Score Sliding Scale Golden Test (Lowest 15.2 - 1.0 = 14.2)
  const rounds4: GolfRound[] = [...rounds3, { id: "4", score: 90.0, courseRating: 70, slopeRating: 113, pcc: 0 }];
  assert("4-Score Golden Test", calculateWHSHandicapIndex(rounds4).finalHandicapIndex, 14.2);

  // 7. 5-Score Sliding Scale Golden Test (Lowest 10.2)
  const rounds5: GolfRound[] = [
    { id: "1", score: 80.2, courseRating: 70, slopeRating: 113, pcc: 0 },
    { id: "2", score: 82.4, courseRating: 70, slopeRating: 113, pcc: 0 },
    { id: "3", score: 81.8, courseRating: 70, slopeRating: 113, pcc: 0 },
    { id: "4", score: 84.1, courseRating: 70, slopeRating: 113, pcc: 0 },
    { id: "5", score: 83.5, courseRating: 70, slopeRating: 113, pcc: 0 },
  ];
  assert("5-Score Golden Test", calculateWHSHandicapIndex(rounds5).finalHandicapIndex, 10.2);

  // 8. 6-Score Sliding Scale Golden Test (Average lowest 2 - 1.0 = 9.0)
  const rounds6: GolfRound[] = [...rounds5, { id: "6", score: 79.8, courseRating: 70, slopeRating: 113, pcc: 0 }];
  assert("6-Score Golden Test", calculateWHSHandicapIndex(rounds6).finalHandicapIndex, 9.0);

  // 9. 20-Score Full Scale Golden Test (Average lowest 8 = 10.1)
  const diffs20 = [
    10.2, 11.4, 12.8, 14.1, 9.8, 15.0, 10.5, 13.2, 11.0, 16.4,
    8.9, 12.0, 10.8, 14.5, 11.6, 13.0, 9.5, 12.4, 15.8, 10.0
  ];
  const rounds20: GolfRound[] = diffs20.map((d, i) => ({
    id: `r${i+1}`,
    score: 70 + d,
    courseRating: 70,
    slopeRating: 113,
    pcc: 0,
  }));
  assert("20-Score Golden Test", calculateWHSHandicapIndex(rounds20).finalHandicapIndex, 10.1);

  // 10. FIX #7: Caps Inactive on Incomplete Records (<20 rounds)
  const rounds19 = rounds20.slice(0, 19);
  const r19Cap = calculateWHSHandicapIndex(rounds19, 8.0);
  assert("19-rounds Cap Inactive", r19Cap.softCapApplied, false);

  // 11. Soft Cap on 20 Rounds: Low Index 10.0, Raw Index 13.4 -> 13.2
  const roundsCap: GolfRound[] = Array.from({ length: 20 }, (_, i) => ({
    id: `c${i+1}`,
    score: 70 + (i < 8 ? 13.4 : 20.0),
    courseRating: 70,
    slopeRating: 113,
    pcc: 0,
  }));
  const rCapSoft = calculateWHSHandicapIndex(roundsCap, 10.0);
  assert("Soft Cap on 20 Rounds (Raw 13.4 -> 13.2)", rCapSoft.finalHandicapIndex, 13.2);
  assert("Soft Cap Flag Active", rCapSoft.softCapApplied, true);

  // 12. Hard Cap on 20 Rounds: Low Index 10.0, Raw Index 18.0 -> 15.0
  const roundsHardCap: GolfRound[] = Array.from({ length: 20 }, (_, i) => ({
    id: `hc${i+1}`,
    score: 70 + (i < 8 ? 18.0 : 25.0),
    courseRating: 70,
    slopeRating: 113,
    pcc: 0,
  }));
  const rCapHard = calculateWHSHandicapIndex(roundsHardCap, 10.0);
  assert("Hard Cap on 20 Rounds (Raw 18.0 -> 15.0)", rCapHard.finalHandicapIndex, 15.0);
  assert("Hard Cap Flag Active", rCapHard.hardCapApplied, true);

  // 13. FIX #6: ESR Implementation with Baseline
  const roundsEsr1: GolfRound[] = Array.from({ length: 20 }, (_, i) => ({
    id: `esr${i+1}`,
    score: 70 + (i === 0 ? 8.0 : 14.0),
    courseRating: 70,
    slopeRating: 113,
    pcc: 0,
  }));
  const rEsr1 = calculateWHSHandicapIndex(roundsEsr1, undefined, 15.0);
  assert("ESR 7.0-9.9 strokes better (-1.0 adjustment)", rEsr1.totalEsrAdjustment, -1.0);
  assert("ESR 1 Flag Active", rEsr1.esrApplied, true);
  assert("ESR 1 Final Index (13.25 - 1.0 = 12.25 -> 12.3)", rEsr1.finalHandicapIndex, 12.3);

  const roundsEsr2: GolfRound[] = Array.from({ length: 20 }, (_, i) => ({
    id: `esr2_${i+1}`,
    score: 70 + (i === 0 ? 5.0 : 14.0),
    courseRating: 70,
    slopeRating: 113,
    pcc: 0,
  }));
  const rEsr2 = calculateWHSHandicapIndex(roundsEsr2, undefined, 15.0);
  assert("ESR 10.0+ strokes better (-2.0 adjustment)", rEsr2.totalEsrAdjustment, -2.0);

  const roundsEsrNone: GolfRound[] = Array.from({ length: 20 }, (_, i) => ({
    id: `esr_none_${i+1}`,
    score: 70 + (i === 0 ? 8.1 : 14.0),
    courseRating: 70,
    slopeRating: 113,
    pcc: 0,
  }));
  const rEsrNone = calculateWHSHandicapIndex(roundsEsrNone, undefined, 15.0);
  assert("ESR 6.9 stroke gap -> No ESR", rEsrNone.totalEsrAdjustment, 0);

  // 14. Course Handicap & Playing Handicap Golden Cases
  const chRef = calculateCourseHandicap(10.4, 128, 72.1, 72, "100_stroke");
  assert("Course Handicap Ref (10.4, 128, 72.1, 72)", chRef.courseHandicap, 12);
  assert("Playing Handicap 100%", chRef.playingHandicap, 12);

  assert("Course Handicap Case A (CR=72, Par=72)", calculateCourseHandicap(10.0, 113, 72, 72).courseHandicap, 10);
  assert("Course Handicap Case B (CR=72.5, Par=72)", calculateCourseHandicap(10.0, 113, 72.5, 72).courseHandicap, 11);
  assert("Course Handicap Case C (CR=71.0, Par=72)", calculateCourseHandicap(10.0, 113, 71.0, 72).courseHandicap, 9);
  assert("Playing Handicap 95%", calculateCourseHandicap(10.4, 128, 72.1, 72, "95_fourball").playingHandicap, 11);
  assert("Playing Handicap 85%", calculateCourseHandicap(10.4, 128, 72.1, 72, "85_alternate").playingHandicap, 10);

  // 15. Randomized Differential 100,000 Oracle Suite
  const N = 100000;
  let rDiffPassed = 0;
  for (let i = 0; i < N; i++) {
    const score = Math.floor(Math.random() * 80) + 60;
    const cr = Math.round((Math.random() * 20 + 65) * 10) / 10;
    const slope = Math.floor(Math.random() * 101) + 55;
    const pccOptions = [-1, 0, 1, 2, 3];
    const pcc = pccOptions[Math.floor(Math.random() * pccOptions.length)];

    const raw = (113 / slope) * (score - cr - pcc);
    const expected = Math.floor(raw * 10 + 0.5 + 1e-9) / 10;
    const actual = calculateScoreDifferential(score, cr, slope, pcc, 18);

    if (Math.abs(expected - actual) < 1e-6) {
      rDiffPassed++;
    }
  }
  assert(`Randomized 100k Differential Oracle (${rDiffPassed}/${N})`, rDiffPassed, N);

  // 16. Randomized Course Handicap 100,000 Suite
  let rChPassed = 0;
  for (let i = 0; i < N; i++) {
    const hi = Math.round((Math.random() * 60 - 5) * 10) / 10;
    const slope = Math.floor(Math.random() * 101) + 55;
    const cr = Math.round((Math.random() * 20 + 65) * 10) / 10;
    const par = Math.floor(Math.random() * 6) + 70;

    const expected = Math.round(hi * (slope / 113) + (cr - par));
    const actual = calculateCourseHandicap(hi, slope, cr, par).courseHandicap;
    if (expected === actual) rChPassed++;
  }
  assert(`Randomized 100k Course Handicap Oracle (${rChPassed}/${N})`, rChPassed, N);

  console.log("\n=================================================");
  console.log(`TOTAL REGRESSION CHECKS: ${passed + failed}`);
  console.log(`PASSED: ${passed}`);
  console.log(`FAILED: ${failed}`);
  if (failures.length > 0) {
    console.log("FAILURES:");
    failures.forEach((f) => console.log(" - " + f));
  }
  console.log("=================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runRegressionSuite();

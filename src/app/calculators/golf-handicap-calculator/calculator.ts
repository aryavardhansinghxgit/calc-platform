import {
  GolfRound,
  DifferentialResult,
  HandicapAllowanceFormat,
  CourseHandicapResult,
  WHSHandicapResult,
} from "./types";

/**
 * WHS Rule 5.1a / Rule 5.1c Half-Tenth Rounding
 * A Score Differential is rounded to the nearest tenth, with .5 rounded upwards algebraically.
 * e.g., 13.45 rounds to 13.5, 13.44 rounds to 13.4, -2.25 rounds to -2.2, -2.26 rounds to -2.3.
 */
export function whsRoundTenth(value: number): number {
  return Math.floor(value * 10 + 0.5 + 1e-9) / 10;
}

/**
 * Returns the unrounded raw Score Differential before final decimal formatting.
 * Keeps full floating-point precision for downstream combinations (e.g., 9-hole + expected score).
 */
export function calculateRawScoreDifferential(
  score: number,
  courseRating: number,
  slopeRating: number,
  pcc: number = 0,
  holes: 9 | 18 = 18
): number {
  if (slopeRating <= 0) return 0;

  // Bound PCC to official WHS range [-1.0, +3.0]
  const boundedPcc = Math.max(-1.0, Math.min(3.0, pcc));

  if (holes === 9) {
    // WHS Rule 5.1b standalone 9-hole differential formula (unrounded)
    return (113 / slopeRating) * (score - courseRating - 0.5 * boundedPcc);
  }

  // WHS Rule 5.1a 18-hole differential formula (unrounded)
  return (113 / slopeRating) * (score - courseRating - boundedPcc);
}

/**
 * Calculates a rounded Score Differential per WHS Rules.
 * - 18-hole score (Rule 5.1a): (113 / Slope) * (Score - CourseRating - PCC)
 * - Standalone 9-hole score component (Rule 5.1b): (113 / Slope) * (Score - CourseRating - 0.5 * PCC)
 */
export function calculateScoreDifferential(
  score: number,
  courseRating: number,
  slopeRating: number,
  pcc: number = 0,
  holes: 9 | 18 = 18
): number {
  const raw = calculateRawScoreDifferential(score, courseRating, slopeRating, pcc, holes);
  return whsRoundTenth(raw);
}

export interface NineHoleWHSResult {
  unroundedDiff9: number;
  standaloneDiff9: number;
  expectedDiff9: number;
  unroundedCombined18: number;
  combined18Differential: number;
}

/**
 * Full WHS Rule 5.1b 9-Hole Workflow (2024 Revision):
 * 1. Computes unrounded 9-hole differential: (113 / Slope) * (Score - CR - 0.5 * PCC).
 * 2. Determines player's expected 9-hole differential from current Handicap Index: HI / 2.
 * 3. Combines unrounded 9-hole differential with expected differential.
 * 4. Rounds only the final combined 18-hole differential to the nearest tenth (.5 upward).
 */
export function calculate9HoleCombinedDifferential(
  score: number,
  courseRating: number,
  slopeRating: number,
  pcc: number = 0,
  currentHandicapIndex?: number
): NineHoleWHSResult {
  const unroundedDiff9 = calculateRawScoreDifferential(score, courseRating, slopeRating, pcc, 9);
  const standaloneDiff9 = whsRoundTenth(unroundedDiff9);

  // WHS Rule 5.1b Expected Score Differential for unplayed 9 holes based on current Handicap Index
  const hi = currentHandicapIndex ?? 0;
  const expectedDiff9 = hi / 2;

  const unroundedCombined18 = unroundedDiff9 + expectedDiff9;
  const combined18Differential = whsRoundTenth(unroundedCombined18);

  return {
    unroundedDiff9,
    standaloneDiff9,
    expectedDiff9: whsRoundTenth(expectedDiff9),
    unroundedCombined18,
    combined18Differential,
  };
}

/**
 * Calculates a WHS Handicap Index from a list of submitted rounds.
 * Strictly adheres to WHS Rule 5.2 sliding scale for 3 to 20 rounds.
 * Caps and ESR are safeguarded against unestablished records and circular logic.
 */
export function calculateWHSHandicapIndex(
  rounds: GolfRound[],
  lowIndexAnchor?: number,
  baselineHandicapIndex?: number
): WHSHandicapResult {
  const safeRounds = rounds.filter((r) => r.score > 0 && r.slopeRating > 0 && r.courseRating > 0);
  const totalRounds = safeRounds.length;

  // Pre-calculate differentials for all submitted rounds so table always displays them
  const allDiffs: { round: GolfRound; diff: number; index: number }[] = safeRounds.map(
    (round, idx) => ({
      round,
      diff: calculateScoreDifferential(
        round.score,
        round.courseRating,
        round.slopeRating,
        round.pcc ?? 0,
        round.holes ?? 18
      ),
      index: idx,
    })
  );

  // If fewer than 3 rounds, Handicap Index is unestablished
  if (totalRounds < 3) {
    const incompleteDiffsResult: DifferentialResult[] = allDiffs.map((d) => ({
      roundId: d.round.id,
      score: d.round.score,
      courseRating: d.round.courseRating,
      slopeRating: d.round.slopeRating,
      pcc: d.round.pcc ?? 0,
      differential: d.diff,
      isCounting: false,
      isExceptional: false,
      esrAdjustment: 0,
    }));

    return {
      roundsSubmitted: totalRounds,
      countingRoundsCount: 0,
      rawUncappedIndex: null,
      lowIndexAnchor,
      baselineHandicapIndex,
      softCapApplied: false,
      hardCapApplied: false,
      esrApplied: false,
      totalEsrAdjustment: 0,
      finalHandicapIndex: null,
      differentials: incompleteDiffsResult,
      whsRuleNote: "Minimum 3 18-hole rounds (or 54 holes) required to calculate a WHS Handicap Index.",
    };
  }

  // Use up to the 20 most recent rounds
  const recentDiffs = allDiffs.slice(0, 20);

  // Determine counting count & adjustment per WHS Rule 5.2
  let countingCount = 1;
  let adjustment = 0;
  let ruleNote = "";

  const n = recentDiffs.length;
  if (n === 3) {
    countingCount = 1;
    adjustment = -2.0;
    ruleNote = "WHS Scale (3 Rounds): Lowest 1 differential minus 2.0";
  } else if (n === 4) {
    countingCount = 1;
    adjustment = -1.0;
    ruleNote = "WHS Scale (4 Rounds): Lowest 1 differential minus 1.0";
  } else if (n === 5) {
    countingCount = 1;
    adjustment = 0;
    ruleNote = "WHS Scale (5 Rounds): Lowest 1 differential";
  } else if (n === 6) {
    countingCount = 2;
    adjustment = -1.0;
    ruleNote = "WHS Scale (6 Rounds): Average of lowest 2 differentials minus 1.0";
  } else if (n >= 7 && n <= 8) {
    countingCount = 2;
    adjustment = 0;
    ruleNote = `WHS Scale (${n} Rounds): Average of lowest 2 differentials`;
  } else if (n >= 9 && n <= 11) {
    countingCount = 3;
    adjustment = 0;
    ruleNote = `WHS Scale (${n} Rounds): Average of lowest 3 differentials`;
  } else if (n >= 12 && n <= 14) {
    countingCount = 4;
    adjustment = 0;
    ruleNote = `WHS Scale (${n} Rounds): Average of lowest 4 differentials`;
  } else if (n >= 15 && n <= 16) {
    countingCount = 5;
    adjustment = 0;
    ruleNote = `WHS Scale (${n} Rounds): Average of lowest 5 differentials`;
  } else if (n >= 17 && n <= 18) {
    countingCount = 6;
    adjustment = 0;
    ruleNote = `WHS Scale (${n} Rounds): Average of lowest 6 differentials`;
  } else if (n === 19) {
    countingCount = 7;
    adjustment = 0;
    ruleNote = "WHS Scale (19 Rounds): Average of lowest 7 differentials";
  } else {
    countingCount = 8;
    adjustment = 0;
    ruleNote = "WHS Scale (20 Rounds): Average of lowest 8 differentials (Full WHS Standard)";
  }

  // Sort differentials ascending to identify counting ones
  const sortedDiffs = [...recentDiffs].sort((a, b) => a.diff - b.diff);
  const countingIds = new Set(sortedDiffs.slice(0, countingCount).map((d) => d.round.id));

  // Average of lowest counting differentials
  const lowestSum = sortedDiffs.slice(0, countingCount).reduce((acc, d) => acc + d.diff, 0);
  const baseAvg = lowestSum / countingCount;

  let rawIndex = baseAvg + adjustment;
  if (rawIndex < -10) rawIndex = -10;

  // ESR Evaluation (WHS Rule 5.9)
  // ESR requires an established baseline Handicap Index at the time the round was played.
  let esrAdjustment = 0;
  let esrApplied = false;
  const exceptionalRoundIds = new Set<string>();

  if (
    baselineHandicapIndex !== undefined &&
    baselineHandicapIndex !== null &&
    !isNaN(baselineHandicapIndex)
  ) {
    recentDiffs.forEach((d) => {
      const diffGap = Math.round((baselineHandicapIndex - d.diff) * 10) / 10;
      if (diffGap >= 10.0) {
        esrAdjustment = -2.0;
        esrApplied = true;
        exceptionalRoundIds.add(d.round.id);
      } else if (diffGap >= 7.0 && esrAdjustment > -2.0) {
        esrAdjustment = -1.0;
        esrApplied = true;
        exceptionalRoundIds.add(d.round.id);
      }
    });
  }

  // Under Rule 5.9, ESR adjustment applies to all differentials in the record,
  // thereby lowering the raw calculated index by exactly esrAdjustment before caps.
  rawIndex += esrAdjustment;

  // Caps Evaluation (WHS Rule 5.7 & 5.8)
  // USGA Rule 5.7: Low Handicap Index and caps apply ONLY when a player has an established 20-score record.
  let finalIndex = rawIndex;
  let softCapApplied = false;
  let hardCapApplied = false;

  if (
    totalRounds >= 20 &&
    lowIndexAnchor !== undefined &&
    lowIndexAnchor !== null &&
    !isNaN(lowIndexAnchor)
  ) {
    const increase = rawIndex - lowIndexAnchor;
    if (increase > 3.0) {
      softCapApplied = true;
      const excessAbove3 = increase - 3.0;
      const suppressedIncrease = 3.0 + excessAbove3 * 0.5;
      finalIndex = lowIndexAnchor + suppressedIncrease;

      if (finalIndex > lowIndexAnchor + 5.0) {
        hardCapApplied = true;
        finalIndex = lowIndexAnchor + 5.0;
      }
    }
  }

  const roundedFinalIndex = whsRoundTenth(finalIndex);

  const differentialsResult: DifferentialResult[] = recentDiffs.map((d) => ({
    roundId: d.round.id,
    score: d.round.score,
    courseRating: d.round.courseRating,
    slopeRating: d.round.slopeRating,
    pcc: d.round.pcc ?? 0,
    differential: d.diff,
    isCounting: countingIds.has(d.round.id),
    isExceptional: exceptionalRoundIds.has(d.round.id),
    esrAdjustment: exceptionalRoundIds.has(d.round.id) ? esrAdjustment : 0,
  }));

  return {
    roundsSubmitted: totalRounds,
    countingRoundsCount: countingCount,
    rawUncappedIndex: whsRoundTenth(rawIndex - esrAdjustment),
    lowIndexAnchor,
    baselineHandicapIndex,
    softCapApplied,
    hardCapApplied,
    esrApplied,
    totalEsrAdjustment: esrAdjustment,
    finalHandicapIndex: roundedFinalIndex,
    differentials: differentialsResult,
    whsRuleNote: ruleNote,
  };
}

/**
 * Calculates Course Handicap and Playing Handicap (WHS Rule 6).
 * Course Handicap = Handicap Index * (Slope / 113) + (Course Rating - Par)
 */
export function calculateCourseHandicap(
  handicapIndex: number,
  slopeRating: number = 113,
  courseRating: number = 72.0,
  par: number = 72,
  allowanceFormat: HandicapAllowanceFormat = "100_stroke"
): CourseHandicapResult {
  const courseHandicapExact = handicapIndex * (slopeRating / 113) + (courseRating - par);
  const courseHandicap = Math.round(courseHandicapExact);

  let allowancePct = 100;
  let allowanceLabel = "100% Individual Stroke Play";

  if (allowanceFormat === "95_fourball") {
    allowancePct = 95;
    allowanceLabel = "95% Four-Ball Stroke Play";
  } else if (allowanceFormat === "85_alternate") {
    allowancePct = 85;
    allowanceLabel = "85% Alternate Shot / Best Ball";
  } else if (allowanceFormat === "scramble_2p") {
    allowancePct = 35;
    allowanceLabel = "2-Player Scramble (35% A / 15% B)";
  } else if (allowanceFormat === "scramble_4p") {
    allowancePct = 25;
    allowanceLabel = "4-Player Scramble (25% A / 20% B / 15% C / 10% D)";
  }

  const playingHandicap = Math.round(courseHandicap * (allowancePct / 100));

  return {
    courseHandicap,
    playingHandicap,
    allowancePct,
    allowanceLabel,
  };
}

export function calculateGolfHandicapFromInputs(inputs: Record<string, any>): WHSHandicapResult {
  const score = Number(inputs.score || inputs.grossScore) || 85;
  const rating = Number(inputs.courseRating || inputs.rating) || 72.0;
  const slope = Number(inputs.slopeRating || inputs.slope) || 113;
  const pcc = Number(inputs.pcc) || 0;

  const mockRound: GolfRound = {
    id: "r1",
    score,
    courseRating: rating,
    slopeRating: slope,
    pcc,
    holes: 18,
  };

  return calculateWHSHandicapIndex([mockRound, mockRound, mockRound]);
}

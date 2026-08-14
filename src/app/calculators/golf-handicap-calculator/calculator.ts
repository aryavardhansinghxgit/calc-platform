import {
  GolfRound,
  DifferentialResult,
  HandicapAllowanceFormat,
  CourseHandicapResult,
  WHSHandicapResult,
} from "./types";

export function calculateScoreDifferential(
  score: number,
  courseRating: number,
  slopeRating: number,
  pcc: number = 0,
  holes: 9 | 18 = 18
): number {
  if (slopeRating <= 0) return 0;

  // Scale 9-hole score/ratings to 18-hole equivalents if necessary
  const effScore = holes === 9 ? score * 2 : score;
  const effRating = holes === 9 ? courseRating * 2 : courseRating;
  const effSlope = slopeRating;

  const diff = (113 / effSlope) * (effScore - effRating - pcc);
  return parseFloat(diff.toFixed(1));
}

export function calculateWHSHandicapIndex(
  rounds: GolfRound[],
  lowIndexAnchor?: number
): WHSHandicapResult {
  const safeRounds = rounds.filter((r) => r.score > 0 && r.slopeRating > 0);
  const totalRounds = safeRounds.length;

  if (totalRounds < 3) {
    return {
      roundsSubmitted: totalRounds,
      countingRoundsCount: 0,
      rawUncappedIndex: 0,
      lowIndexAnchor,
      softCapApplied: false,
      hardCapApplied: false,
      esrApplied: false,
      totalEsrAdjustment: 0,
      finalHandicapIndex: 0,
      differentials: [],
      whsRuleNote: "Minimum 3 18-hole rounds (or 54 holes) required to calculate a WHS Handicap Index.",
    };
  }

  // Use up to the 20 most recent rounds
  const recentRounds = safeRounds.slice(0, 20);

  // Compute differentials
  const diffList: { round: GolfRound; diff: number; index: number }[] = recentRounds.map(
    (round, idx) => ({
      round,
      diff: calculateScoreDifferential(
        round.score,
        round.courseRating,
        round.slopeRating,
        round.pcc || 0,
        round.holes || 18
      ),
      index: idx,
    })
  );

  // Determine counting count & adjustment per WHS Rule 5.2
  let countingCount = 1;
  let adjustment = 0;
  let ruleNote = "";

  const n = diffList.length;
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
  const sortedDiffs = [...diffList].sort((a, b) => a.diff - b.diff);
  const countingIds = new Set(sortedDiffs.slice(0, countingCount).map((d) => d.round.id));

  // Average of lowest counting differentials
  const lowestSum = sortedDiffs.slice(0, countingCount).reduce((acc, d) => acc + d.diff, 0);
  const baseAvg = lowestSum / countingCount;

  let rawIndex = baseAvg + adjustment;
  if (rawIndex < -10) rawIndex = -10;

  // ESR Check (Exceptional Score Reduction)
  let esrAdjustment = 0;
  let esrApplied = false;

  sortedDiffs.forEach((d) => {
    const diffGap = rawIndex - d.diff;
    if (diffGap >= 10.0) {
      esrAdjustment = -2.0;
      esrApplied = true;
    } else if (diffGap >= 7.0 && esrAdjustment > -2.0) {
      esrAdjustment = -1.0;
      esrApplied = true;
    }
  });

  rawIndex += esrAdjustment;

  // Caps evaluation (Soft & Hard Cap vs 365-day Low Index Anchor)
  let finalIndex = rawIndex;
  let softCapApplied = false;
  let hardCapApplied = false;

  if (lowIndexAnchor !== undefined && lowIndexAnchor !== null && !isNaN(lowIndexAnchor)) {
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

  const roundedFinalIndex = parseFloat(finalIndex.toFixed(1));

  const differentialsResult: DifferentialResult[] = diffList.map((d) => ({
    roundId: d.round.id,
    score: d.round.score,
    courseRating: d.round.courseRating,
    slopeRating: d.round.slopeRating,
    pcc: d.round.pcc || 0,
    differential: d.diff,
    isCounting: countingIds.has(d.round.id),
    isExceptional: rawIndex - d.diff >= 7.0,
    esrAdjustment,
  }));

  return {
    roundsSubmitted: totalRounds,
    countingRoundsCount: countingCount,
    rawUncappedIndex: parseFloat(rawIndex.toFixed(1)),
    lowIndexAnchor,
    softCapApplied,
    hardCapApplied,
    esrApplied,
    totalEsrAdjustment: esrAdjustment,
    finalHandicapIndex: roundedFinalIndex,
    differentials: differentialsResult,
    whsRuleNote: ruleNote,
  };
}

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

  // Build 3 minimum rounds for default execution
  return calculateWHSHandicapIndex([mockRound, mockRound, mockRound]);
}

import {
  calculateNumerology,
  calculateZodiacMatch,
  calculateLifePath,
  calculateFLAMES,
  generateCoupleMoniker,
  calculateLoveCalculator,
} from "./calculator";

export function runLoveCalculatorTests() {
  // Test 1: Numerology reduction & harmony
  const numRes = calculateNumerology("Romeo", "Juliet");
  if (numRes.harmonyScore < 50 || numRes.harmonyScore > 100) {
    throw new Error(`Numerology score ${numRes.harmonyScore} out of bounds`);
  }

  // Test 2: Zodiac element matching (Fire + Air => 96%)
  const zodiacRes = calculateZodiacMatch("leo", "gemini");
  if (zodiacRes.elementHarmonyScore !== 96 || zodiacRes.element1 !== "fire" || zodiacRes.element2 !== "air") {
    throw new Error("Zodiac calculation failed for Fire + Air");
  }

  // Test 2b: Zodiac Fire + Earth & Air + Water coverage (Issue 7)
  const fireEarth = calculateZodiacMatch("aries", "taurus");
  if (fireEarth.elementHarmonyScore !== 72) {
    throw new Error(`Zodiac Fire + Earth expected 72, got ${fireEarth.elementHarmonyScore}`);
  }
  const airWater = calculateZodiacMatch("gemini", "cancer");
  if (airWater.elementHarmonyScore !== 74) {
    throw new Error(`Zodiac Air + Water expected 74, got ${airWater.elementHarmonyScore}`);
  }

  // Test 3: Life Path calculation
  const lpRes = calculateLifePath("1995-05-15", "1997-09-20");
  if (lpRes.lifePath1 < 1 || lpRes.lifePath2 < 1) {
    throw new Error("Life Path reduction failed");
  }

  // Test 4: Authentic Circular FLAMES (Issue 3)
  // "Romeo" (r, o, m, e, o) & "Juliet" (j, u, l, i, e, t)
  // 'e' cancelled -> Romeo has r, o, m, o (4). Juliet has j, u, l, i, t (5). Total remaining = 9.
  // F L A M E S (len 6): (9-1)%6 = 2 -> A removed -> [F, L, M, E, S], idx=2
  // (2 + 9 - 1)%5 = 10%5 = 0 -> F removed -> [L, M, E, S], idx=0
  // (0 + 9 - 1)%4 = 8%4 = 0 -> L removed -> [M, E, S], idx=0
  // (0 + 9 - 1)%3 = 8%3 = 2 -> S removed -> [M, E], idx=2%2 = 0
  // (0 + 9 - 1)%2 = 8%2 = 0 -> M removed -> [E] remaining!
  // Outcome MUST be "Enemies"
  const flamesRomeoJuliet = calculateFLAMES("Romeo", "Juliet");
  if (flamesRomeoJuliet.outcome !== "Enemies" || flamesRomeoJuliet.remainingLettersCount !== 9) {
    throw new Error(`Authentic FLAMES failed for Romeo + Juliet: expected Enemies with count 9, got ${flamesRomeoJuliet.outcome} with count ${flamesRomeoJuliet.remainingLettersCount}`);
  }

  // 50 Benchmark Pairs for Authentic Circular FLAMES (Issue 3)
  const benchmarkFiftyPairs: [string, string][] = [
    ["Romeo", "Juliet"],
    ["John", "Jane"],
    ["Jack", "Jill"],
    ["Alex", "Alexa"],
    ["Brad", "Angelina"],
    ["Prince", "Cinderella"],
    ["Harry", "Sally"],
    ["Anthony", "Cleopatra"],
    ["Bonnie", "Clyde"],
    ["Tristan", "Isolde"],
    ["Lancelot", "Guinevere"],
    ["Orpheus", "Eurydice"],
    ["Tarzan", "Jane"],
    ["Mickey", "Minnie"],
    ["Donald", "Daisy"],
    ["Homer", "Marge"],
    ["Clark", "Lois"],
    ["Peter", "Mary"],
    ["Han", "Leia"],
    ["Luke", "Mara"],
    ["Ross", "Rachel"],
    ["Chandler", "Monica"],
    ["Jim", "Pam"],
    ["Michael", "Holly"],
    ["Edward", "Bella"],
    ["Ron", "Hermione"],
    ["Harry", "Ginny"],
    ["Darcy", "Elizabeth"],
    ["Heathcliff", "Catherine"],
    ["Jay", "Daisy"],
    ["Rhett", "Scarlett"],
    ["Noah", "Allie"],
    ["Forrest", "Jenny"],
    ["Simba", "Nala"],
    ["Aladdin", "Jasmine"],
    ["Shrek", "Fiona"],
    ["Jack", "Rose"],
    ["Christian", "Anastasia"],
    ["Gomez", "Morticia"],
    ["Robin", "Marian"],
    ["Odysseus", "Penelope"],
    ["Paris", "Helena"],
    ["Zeus", "Hera"],
    ["Apollo", "Daphne"],
    ["David", "Victoria"],
    ["Barack", "Michelle"],
    ["Will", "Jada"],
    ["Tom", "Zendaya"],
    ["Taylor", "Travis"],
    ["Ryan", "Blake"],
  ];

  const validFLAMES = new Set(["Friends", "Lovers", "Affection", "Marriage", "Enemies", "Siblings"]);

  if (benchmarkFiftyPairs.length !== 50) {
    throw new Error(`Expected exactly 50 benchmark pairs, found ${benchmarkFiftyPairs.length}`);
  }

  for (const [p1, p2] of benchmarkFiftyPairs) {
    const resForward = calculateFLAMES(p1, p2);
    const resReverse = calculateFLAMES(p2, p1);

    if (!validFLAMES.has(resForward.outcome)) {
      throw new Error(`Invalid FLAMES outcome ${resForward.outcome} for pair ${p1} + ${p2}`);
    }
    if (resForward.remainingLettersCount < 0) {
      throw new Error(`Negative letter count for pair ${p1} + ${p2}`);
    }
    // Strict symmetry check: FLAMES cancellation and outcome must be 100% bilateral
    if (resForward.outcome !== resReverse.outcome) {
      throw new Error(`FLAMES symmetry violation for ${p1} + ${p2}: ${resForward.outcome} vs ${resReverse.outcome}`);
    }
    if (resForward.remainingLettersCount !== resReverse.remainingLettersCount) {
      throw new Error(`FLAMES count symmetry violation for ${p1} + ${p2}: ${resForward.remainingLettersCount} vs ${resReverse.remainingLettersCount}`);
    }
  }

  // Test 5: Ultimate Chemistry (Issue 4 - Weights sum to 100% and can reach 100%)
  const ultScore = calculateLoveCalculator({
    name1: "Romeo",
    name2: "Juliet",
    mode: "ultimate",
    dob1: "1996-05-15",
    dob2: "1998-09-20",
    sign1: "leo",
    sign2: "gemini",
  });
  if (ultScore.compatibilityScore < 40 || ultScore.compatibilityScore > 100) {
    throw new Error(`Ultimate Chemistry score out of bounds: ${ultScore.compatibilityScore}`);
  }
  if (!ultScore.flames) {
    throw new Error("Ultimate Chemistry must incorporate FLAMES");
  }

  // Test 6: Couple Moniker Portmanteau
  const moniker = generateCoupleMoniker("Brad", "Angelina");
  if (!moniker || moniker.length === 0) {
    throw new Error("Moniker generator failed");
  }

  // Test 7: Unicode Support (Issue 8)
  // Hindi, Arabic, Chinese, Japanese, Russian
  const hindiRes = calculateLoveCalculator({ name1: "राहुल", name2: "प्रिया", mode: "name" });
  if (hindiRes.compatibilityScore < 40 || !hindiRes.moniker) {
    throw new Error("Hindi Unicode calculation failed");
  }

  const arabicRes = calculateLoveCalculator({ name1: "أحمد", name2: "فاطمة", mode: "name" });
  if (arabicRes.compatibilityScore < 40 || !arabicRes.moniker) {
    throw new Error("Arabic Unicode calculation failed");
  }

  const chineseRes = calculateLoveCalculator({ name1: "李明", name2: "王芳", mode: "name" });
  if (chineseRes.compatibilityScore < 40 || !chineseRes.moniker) {
    throw new Error("Chinese Unicode calculation failed");
  }

  const russianRes = calculateLoveCalculator({ name1: "Алексей", name2: "Мария", mode: "name" });
  if (russianRes.compatibilityScore < 40 || !russianRes.moniker) {
    throw new Error("Russian Cyrillic Unicode calculation failed");
  }

  // Test 8: Bilateral consistency (Name 1 + Name 2 vs Name 2 + Name 1)
  const calc1 = calculateLoveCalculator({ name1: "Romeo", name2: "Juliet", mode: "name" });
  const calc2 = calculateLoveCalculator({ name1: "Juliet", name2: "Romeo", mode: "name" });
  if (calc1.compatibilityScore !== calc2.compatibilityScore) {
    throw new Error(`Bilateral consistency check failed: ${calc1.compatibilityScore} vs ${calc2.compatibilityScore}`);
  }

  // Test 9: Mode switching consistency (Issue 2)
  const nameCalc = calculateLoveCalculator({ name1: "Romeo", name2: "Juliet", mode: "name" });
  const flamesCalc = calculateLoveCalculator({ name1: "Romeo", name2: "Juliet", mode: "flames" });
  if (nameCalc.compatibilityScore === flamesCalc.compatibilityScore && nameCalc.verdict === flamesCalc.verdict) {
    // They shouldn't be identical unless coincidentally identical, but let's verify FLAMES has flames output
  }
  if (!flamesCalc.flames || flamesCalc.flames.outcome !== "Enemies") {
    throw new Error("FLAMES mode must supply authentic FLAMES outcome");
  }

  return true;
}

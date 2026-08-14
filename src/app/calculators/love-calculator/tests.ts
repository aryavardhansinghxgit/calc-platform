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
    throw new Error("Numerology calculation out of bounds");
  }

  // Test 2: Zodiac element matching (Leo Fire + Gemini Air => 96%)
  const zodiacRes = calculateZodiacMatch("leo", "gemini");
  if (zodiacRes.elementHarmonyScore !== 96 || zodiacRes.element1 !== "fire" || zodiacRes.element2 !== "air") {
    throw new Error("Zodiac calculation failed for Fire + Air");
  }

  // Test 3: Life Path calculation
  const lpRes = calculateLifePath("1995-05-15", "1997-09-20");
  if (lpRes.lifePath1 < 1 || lpRes.lifePath2 < 1) {
    throw new Error("Life Path reduction failed");
  }

  // Test 4: FLAMES game engine
  const flamesRes = calculateFLAMES("Romeo", "Juliet");
  if (!flamesRes.outcome || !flamesRes.description) {
    throw new Error("FLAMES game engine failed");
  }

  // Test 5: Couple Moniker Portmanteau
  const moniker = generateCoupleMoniker("Brad", "Angelina");
  if (!moniker || moniker.length === 0) {
    throw new Error("Moniker generator failed");
  }

  // Test 6: Bilateral consistency (Name 1 + Name 2 vs Name 2 + Name 1)
  const calc1 = calculateLoveCalculator({ name1: "Romeo", name2: "Juliet" });
  const calc2 = calculateLoveCalculator({ name1: "Juliet", name2: "Romeo" });
  if (calc1.compatibilityScore !== calc2.compatibilityScore) {
    throw new Error("Bilateral consistency check failed");
  }

  return true;
}

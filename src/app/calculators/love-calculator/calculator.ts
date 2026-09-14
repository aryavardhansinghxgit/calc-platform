import {
  LoveCalculatorOutputs,
  ZodiacSign,
  ZodiacElement,
  FLAMESOutcome,
  DimensionalChemistry,
  NumerologyBreakdown,
  ZodiacBreakdown,
  LifePathBreakdown,
  FLAMESResult,
} from "./types";

// Pythagorean Numerology Chart (1-9)
const PYTHAGOREAN_MAP: Record<string, number> = {
  a: 1, j: 1, s: 1,
  b: 2, k: 2, t: 2,
  c: 3, l: 3, u: 3,
  d: 4, m: 4, v: 4,
  e: 5, n: 5, w: 5,
  f: 6, o: 6, x: 6,
  g: 7, p: 7, y: 7,
  h: 8, q: 8, z: 8,
  i: 9, r: 9,
};

const LATIN_VOWELS = new Set(["a", "e", "i", "o", "u", "y"]);

// Zodiac Element Assignments
export const ZODIAC_ELEMENTS: Record<ZodiacSign, ZodiacElement> = {
  aries: "fire",
  leo: "fire",
  sagittarius: "fire",
  taurus: "earth",
  virgo: "earth",
  capricorn: "earth",
  gemini: "air",
  libra: "air",
  aquarius: "air",
  cancer: "water",
  scorpio: "water",
  pisces: "water",
};

/**
 * Reduce a number to a single digit (1-9) or Master Number (11, 22, 33)
 */
export function reduceToSingleDigit(num: number): number {
  if (num <= 0) return 1;
  if (num === 11 || num === 22 || num === 33) return num;
  let current = num;
  while (current > 9 && current !== 11 && current !== 22 && current !== 33) {
    current = String(current)
      .split("")
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }
  return current;
}

/**
 * Pythagorean Name Numerology Engine (with International Unicode Fallback)
 */
export function calculateNumerology(name1: string, name2: string): NumerologyBreakdown {
  const getNumbers = (str: string) => {
    const trimmed = str.trim().toLowerCase();
    // 1. Check for Latin characters first
    const latinOnly = trimmed.replace(/[^a-z]/g, "");
    if (latinOnly.length > 0) {
      let soulSum = 0;
      let personalitySum = 0;
      for (const char of latinOnly) {
        const val = PYTHAGOREAN_MAP[char] || 0;
        if (LATIN_VOWELS.has(char)) {
          soulSum += val;
        } else {
          personalitySum += val;
        }
      }
      return {
        soul: reduceToSingleDigit(soulSum || 1),
        personality: reduceToSingleDigit(personalitySum || 1),
      };
    }

    // 2. Unicode / Non-Latin script fallback (Hindi, Chinese, Arabic, Cyrillic, etc.)
    const codePoints = Array.from(trimmed).map((c) => c.codePointAt(0) || 0).filter((cp) => cp > 32);
    if (codePoints.length === 0) {
      return { soul: 1, personality: 1 };
    }

    let soulSum = 0;
    let persSum = 0;
    for (let i = 0; i < codePoints.length; i++) {
      const val = (codePoints[i] % 9) + 1;
      if (i % 2 === 0) {
        soulSum += val;
      } else {
        persSum += val;
      }
    }

    return {
      soul: reduceToSingleDigit(soulSum || 1),
      personality: reduceToSingleDigit(persSum || 1),
    };
  };

  const n1 = getNumbers(name1);
  const n2 = getNumbers(name2);

  const soulDiff = Math.abs(n1.soul - n2.soul);
  const persDiff = Math.abs(n1.personality - n2.personality);

  const harmonyScore = Math.max(55, Math.min(99, 100 - (soulDiff * 5 + persDiff * 4)));

  return {
    name1Personality: n1.personality,
    name1SoulUrge: n1.soul,
    name2Personality: n2.personality,
    name2SoulUrge: n2.soul,
    harmonyScore,
  };
}

/**
 * Zodiac Western Astrology Compatibility Matcher (100% Comprehensive 16-Pair Coverage)
 */
export function calculateZodiacMatch(sign1?: ZodiacSign, sign2?: ZodiacSign): ZodiacBreakdown {
  if (!sign1 || !sign2) {
    return {
      element1: "fire",
      element2: "air",
      elementHarmonyScore: 85,
      verdict: "Harmonious Energy Blend",
    };
  }

  const e1 = ZODIAC_ELEMENTS[sign1];
  const e2 = ZODIAC_ELEMENTS[sign2];

  let score = 75;
  let verdict = "Dynamic Energy Dynamic";

  if (e1 === e2) {
    score = 92;
    verdict = `Same Element (${e1.toUpperCase()}) — Deep Mutual Understanding & Natural Rapport`;
  } else if ((e1 === "fire" && e2 === "air") || (e1 === "air" && e2 === "fire")) {
    score = 96;
    verdict = "Fire & Air — Inspiring, Passionate, Electrifying & Full of Spark";
  } else if ((e1 === "earth" && e2 === "water") || (e1 === "water" && e2 === "earth")) {
    score = 95;
    verdict = "Earth & Water — Nurturing, Grounded, Supportive & Long-Lasting";
  } else if ((e1 === "fire" && e2 === "earth") || (e1 === "earth" && e2 === "fire")) {
    score = 72;
    verdict = "Fire & Earth — Lava & Hearth: Creative Ambition Balanced by Grounded Structure";
  } else if ((e1 === "air" && e2 === "water") || (e1 === "water" && e2 === "air")) {
    score = 74;
    verdict = "Air & Water — Waves & Breeze: Intuitive Imagination Meets Intellectual Clarity";
  } else if ((e1 === "fire" && e2 === "water") || (e1 === "water" && e2 === "fire")) {
    score = 65;
    verdict = "Fire & Water — Steam & Intense Emotion: High Chemistry That Thrives on Patience";
  } else if ((e1 === "earth" && e2 === "air") || (e1 === "air" && e2 === "earth")) {
    score = 68;
    verdict = "Earth & Air — Practical vs Conceptual: Fosters Mutual Broadening & Personal Growth";
  }

  return {
    element1: e1,
    element2: e2,
    elementHarmonyScore: score,
    verdict,
  };
}

/**
 * Birth Date & Life Path Number Matcher
 */
export function calculateLifePath(dob1?: string, dob2?: string): LifePathBreakdown {
  if (!dob1 || !dob2) {
    return { lifePath1: 7, lifePath2: 9, lifePathScore: 88 };
  }

  const getLifePathFromDOB = (dobStr: string): number => {
    const digitsOnly = dobStr.replace(/[^0-9]/g, "");
    if (!digitsOnly) return 7;
    const sum = digitsOnly.split("").reduce((acc, d) => acc + parseInt(d, 10), 0);
    return reduceToSingleDigit(sum);
  };

  const lp1 = getLifePathFromDOB(dob1);
  const lp2 = getLifePathFromDOB(dob2);

  const diff = Math.abs(lp1 - lp2);
  const lifePathScore = Math.max(60, Math.min(98, 98 - diff * 4));

  return {
    lifePath1: lp1,
    lifePath2: lp2,
    lifePathScore,
  };
}

/**
 * 90s Classic "FLAMES" Game Engine (Authentic Step-by-Step Circular Elimination)
 */
export function calculateFLAMES(name1: string, name2: string): FLAMESResult {
  // Support both Latin and Unicode graphemes
  const toLetters = (str: string) => {
    return Array.from(str.toLowerCase())
      .map((c) => c.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
      .filter((c) => /\p{L}/u.test(c));
  };

  let arr1 = toLetters(name1);
  let arr2 = toLetters(name2);

  // If no letters found (e.g. numeric or symbolic names), fall back to clean characters
  if (arr1.length === 0) arr1 = Array.from(name1.toLowerCase().trim());
  if (arr2.length === 0) arr2 = Array.from(name2.toLowerCase().trim());

  // Step 1 & 2: Cross out matching common letters
  for (let i = arr1.length - 1; i >= 0; i--) {
    const idxIn2 = arr2.indexOf(arr1[i]);
    if (idxIn2 !== -1) {
      arr1.splice(i, 1);
      arr2.splice(idxIn2, 1);
    }
  }

  const totalRemaining = arr1.length + arr2.length;
  if (totalRemaining === 0) {
    return {
      outcome: "Lovers",
      remainingLettersCount: 0,
      description: "Identical letter resonance — Pure Romantic Connection!",
    };
  }

  // Step 3 & 4: Authentic Circular Elimination on F-L-A-M-E-S
  const acronym: FLAMESOutcome[] = [
    "Friends",
    "Lovers",
    "Affection",
    "Marriage",
    "Enemies",
    "Siblings",
  ];

  const descriptions: Record<FLAMESOutcome, string> = {
    Friends: "Solid Foundation & Lifelong Mutual Support",
    Lovers: "Passionate Chemistry & Deep Romantic Attraction",
    Affection: "Sweet Emotional Warmth, Tenderness & Caring",
    Marriage: "Long-Term Devotion, Sacred Bond & Shared Life Vision",
    Enemies: "Fiery Dynamic — Intense Sparks That Demand Emotional Maturity",
    Siblings: "Comfortable Familiarity, Protective Loyalty & Playful Trust",
  };

  let currentPos = 0;
  while (acronym.length > 1) {
    const eliminateIdx = (currentPos + totalRemaining - 1) % acronym.length;
    acronym.splice(eliminateIdx, 1);
    currentPos = eliminateIdx % acronym.length;
  }

  const finalOutcome = acronym[0];

  return {
    outcome: finalOutcome,
    remainingLettersCount: totalRemaining,
    description: descriptions[finalOutcome],
  };
}

/**
 * Generate Portmanteau Couple Moniker (with Unicode Surrogate Safety)
 */
export function generateCoupleMoniker(name1: string, name2: string): string {
  const n1 = name1.trim();
  const n2 = name2.trim();

  if (!n1 || !n2) return "The Couple";

  // Use Array.from to properly handle multi-byte Unicode characters & emojis
  const chars1 = Array.from(n1);
  const chars2 = Array.from(n2);

  const half1 = chars1.slice(0, Math.max(1, Math.min(6, Math.ceil(chars1.length / 2)))).join("");
  const half2 = chars2.slice(Math.max(1, Math.floor(chars2.length / 2))).join("");

  let moniker = (half1 + half2).toLowerCase();
  if (moniker.length > 0) {
    moniker = moniker.charAt(0).toUpperCase() + moniker.slice(1);
  }

  // Cap length to prevent layout breakage on 1000-char inputs
  if (moniker.length > 16) {
    moniker = moniker.substring(0, 16);
  }

  return moniker || "The Couple";
}

/**
 * Bilateral Hash Synthesizer for 100% Deterministic & Consistent Fair Score
 */
export function calculateLoveCalculator(inputs: Record<string, any>): LoveCalculatorOutputs {
  const rawName1 = inputs.name1 !== undefined ? String(inputs.name1) : "Romeo";
  const rawName2 = inputs.name2 !== undefined ? String(inputs.name2) : "Juliet";
  const name1 = rawName1.trim() || "Romeo";
  const name2 = rawName2.trim() || "Juliet";
  const mode = String(inputs.mode || "name").toLowerCase();

  const dob1 = inputs.dob1 ? String(inputs.dob1) : "1996-05-15";
  const dob2 = inputs.dob2 ? String(inputs.dob2) : "1998-09-20";
  const sign1 = (inputs.sign1 ? String(inputs.sign1).toLowerCase() : "leo") as ZodiacSign;
  const sign2 = (inputs.sign2 ? String(inputs.sign2).toLowerCase() : "gemini") as ZodiacSign;

  // Bilateral alphabet sort so order doesn't change score
  const sortedNames = [name1.toLowerCase(), name2.toLowerCase()].sort().join("");
  let hash = 0;
  for (let i = 0; i < sortedNames.length; i++) {
    hash = (hash * 33 + sortedNames.charCodeAt(i)) % 10007;
  }

  // Calculate sub-engines
  const numerology = calculateNumerology(name1, name2);
  const zodiac = calculateZodiacMatch(sign1, sign2);
  const lifePath = calculateLifePath(dob1, dob2);
  const flames = calculateFLAMES(name1, name2);
  const moniker = generateCoupleMoniker(name1, name2);

  const flamesScoreMap: Record<FLAMESOutcome, number> = {
    Marriage: 98,
    Lovers: 92,
    Affection: 86,
    Friends: 78,
    Siblings: 65,
    Enemies: 54,
  };
  const flamesScore = flamesScoreMap[flames.outcome] || 80;

  let finalScore = 82;

  if (mode === "flames") {
    finalScore = flamesScore;
  } else if (mode === "zodiac") {
    finalScore = zodiac.elementHarmonyScore;
  } else if (mode === "birthday") {
    finalScore = lifePath.lifePathScore;
  } else if (mode === "ultimate") {
    // Rebalanced Aggregate multi-engine: Weights sum to 100% (30% + 25% + 25% + 20%)
    finalScore = Math.min(
      100,
      Math.max(
        50,
        Math.round(
          numerology.harmonyScore * 0.30 +
            zodiac.elementHarmonyScore * 0.25 +
            lifePath.lifePathScore * 0.25 +
            flamesScore * 0.20
        )
      )
    );
  } else {
    // Default Name Numerology Mode
    const hashBonus = hash % 15;
    finalScore = Math.min(99, Math.max(52, Math.round(numerology.harmonyScore * 0.85 + hashBonus)));
  }

  // Tier Badges & Verdicts
  let tierBadge = "Opposites Attract / Dynamic Balance ⚖️";
  let verdict = "A balanced mix of similarities and differences that inspires mutual growth!";
  let advice = "Embrace each other's unique perspectives as opportunities to learn and expand together.";

  if (finalScore >= 90) {
    tierBadge = "Cosmic Soulmates / Twin Flames ✨";
    verdict = "An extraordinary harmonic alignment! Pure natural attraction and shared vision.";
    advice = "Nurture this rare connection with mutual appreciation and celebrate your milestones together.";
  } else if (finalScore >= 75) {
    tierBadge = "Deeply Compatible Chemistry 💕";
    verdict = "Strong emotional warmth, seamless communication, and natural affection!";
    advice = "Keep spontaneous dates and open conversations alive to strengthen your connection.";
  } else if (finalScore >= 50) {
    tierBadge = "Opposites Attract / Dynamic Balance ⚖️";
    verdict = "A balanced mix of similarities and differences that inspires mutual growth!";
    advice = "Embrace each other's unique perspectives as opportunities to learn and expand together.";
  } else {
    tierBadge = "Unique Connection / Growth Potential 🌱";
    verdict = "An intriguing connection that flourishes with intentional effort and empathy!";
    advice = "Invest time in discovering mutual goals and practice patience during disagreements.";
  }

  // Dimensional Chemistry Breakdown Metrics
  const dimensions: DimensionalChemistry = {
    passion: Math.min(100, Math.max(50, Math.round(finalScore * 0.95 + (hash % 9)))),
    communication: Math.min(100, Math.max(50, Math.round(finalScore * 0.92 + ((hash + 3) % 9)))),
    trust: Math.min(100, Math.max(50, Math.round(finalScore * 0.97 + ((hash + 5) % 8)))),
    longTermVision: Math.min(100, Math.max(50, Math.round(finalScore * 0.90 + ((hash + 7) % 10)))),
  };

  return {
    compatibilityScore: finalScore,
    tierBadge,
    verdict,
    moniker,
    dimensions,
    numerology,
    zodiac,
    lifePath,
    flames,
    advice,
  };
}

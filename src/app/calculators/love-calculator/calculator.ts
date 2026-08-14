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

const VOWELS = new Set(["a", "e", "i", "o", "u", "y"]);

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
 * Pythagorean Name Numerology Engine
 */
export function calculateNumerology(name1: string, name2: string): NumerologyBreakdown {
  const clean1 = name1.toLowerCase().replace(/[^a-z]/g, "");
  const clean2 = name2.toLowerCase().replace(/[^a-z]/g, "");

  const getNumbers = (str: string) => {
    let soulSum = 0;
    let personalitySum = 0;
    for (const char of str) {
      const val = PYTHAGOREAN_MAP[char] || 0;
      if (VOWELS.has(char)) {
        soulSum += val;
      } else {
        personalitySum += val;
      }
    }
    return {
      soul: reduceToSingleDigit(soulSum || 1),
      personality: reduceToSingleDigit(personalitySum || 1),
    };
  };

  const n1 = getNumbers(clean1);
  const n2 = getNumbers(clean2);

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
 * Zodiac Western Astrology Compatibility Matcher
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
  let verdict = "Dynamic Opposites Attract";

  if (e1 === e2) {
    score = 92;
    verdict = `Same Element (${e1.toUpperCase()}) — Deep Mutual Understanding`;
  } else if ((e1 === "fire" && e2 === "air") || (e1 === "air" && e2 === "fire")) {
    score = 96;
    verdict = "Fire & Air — Inspiring, Passionate & Electrifying";
  } else if ((e1 === "earth" && e2 === "water") || (e1 === "water" && e2 === "earth")) {
    score = 95;
    verdict = "Earth & Water — Nurturing, Stable & Long-Lasting";
  } else if ((e1 === "fire" && e2 === "water") || (e1 === "water" && e2 === "fire")) {
    score = 65;
    verdict = "Fire & Water — Steam & High Passion, Needs Emotional Patience";
  } else if ((e1 === "earth" && e2 === "air") || (e1 === "air" && e2 === "earth")) {
    score = 68;
    verdict = "Earth & Air — Practical vs Conceptual, Fosters Personal Growth";
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
 * 90s Classic "FLAMES" Game Engine
 */
export function calculateFLAMES(name1: string, name2: string): FLAMESResult {
  let arr1 = name1.toLowerCase().replace(/[^a-z]/g, "").split("");
  let arr2 = name2.toLowerCase().replace(/[^a-z]/g, "").split("");

  // Cross out matching letters
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
      description: "Identical letter resonance — Pure Affection!",
    };
  }

  const flames: { code: FLAMESOutcome; desc: string }[] = [
    { code: "Friends", desc: "Solid Foundation & Lifelong Support" },
    { code: "Lovers", desc: "Passionate Romantic Connection" },
    { code: "Affection", desc: "Sweet Emotional Warmth & Caring" },
    { code: "Marriage", desc: "Long-Term Devotion & Shared Future" },
    { code: "Enemies", desc: "Fiery Dynamic — High Tension & Spark" },
    { code: "Siblings", desc: "Comfortable Familiarity & Protective Trust" },
  ];

  const index = (totalRemaining - 1) % flames.length;
  const match = flames[index];

  return {
    outcome: match.code,
    remainingLettersCount: totalRemaining,
    description: match.desc,
  };
}

/**
 * Generate Portmanteau Couple Moniker (e.g. Brad + Angelina => Brangelina)
 */
export function generateCoupleMoniker(name1: string, name2: string): string {
  const n1 = name1.trim();
  const n2 = name2.trim();

  if (!n1 || !n2) return "The Couple";

  const half1 = n1.substring(0, Math.max(2, Math.ceil(n1.length / 2)));
  const half2 = n2.substring(Math.floor(n2.length / 2));

  let moniker = (half1 + half2).toLowerCase();
  moniker = moniker.charAt(0).toUpperCase() + moniker.slice(1);

  return moniker;
}

/**
 * Bilateral Hash Synthesizer for 100% Deterministic & Consistent Fair Score
 */
export function calculateLoveCalculator(inputs: Record<string, any>): LoveCalculatorOutputs {
  const name1 = String(inputs.name1 || "Romeo").trim();
  const name2 = String(inputs.name2 || "Juliet").trim();
  const mode = String(inputs.mode || "name").toLowerCase();

  const dob1 = inputs.dob1 ? String(inputs.dob1) : undefined;
  const dob2 = inputs.dob2 ? String(inputs.dob2) : undefined;
  const sign1 = inputs.sign1 ? (String(inputs.sign1).toLowerCase() as ZodiacSign) : undefined;
  const sign2 = inputs.sign2 ? (String(inputs.sign2).toLowerCase() as ZodiacSign) : undefined;

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

  let finalScore = 82;

  if (mode === "flames") {
    // FLAMES outcome score mapping
    const flamesMap: Record<FLAMESOutcome, number> = {
      Marriage: 98,
      Lovers: 92,
      Affection: 86,
      Friends: 78,
      Siblings: 65,
      Enemies: 54,
    };
    finalScore = flamesMap[flames.outcome] || 80;
  } else if (mode === "zodiac") {
    finalScore = zodiac.elementHarmonyScore;
  } else if (mode === "birthday") {
    finalScore = lifePath.lifePathScore;
  } else if (mode === "ultimate") {
    // Aggregate multi-engine
    finalScore = Math.round(
      numerology.harmonyScore * 0.35 +
        zodiac.elementHarmonyScore * 0.25 +
        lifePath.lifePathScore * 0.25 +
        (hash % 10)
    );
  } else {
    // Default Name Numerology Mode
    const hashBonus = (hash % 15);
    finalScore = Math.min(99, Math.max(52, Math.round(numerology.harmonyScore * 0.85 + hashBonus)));
  }

  // Tier Badges
  let tierBadge = "Opposites Attract / Dynamic Balance";
  let verdict = "You bring different strengths to the table, creating a vibrant dynamic!";
  let advice = "Focus on active listening and discovering shared hobbies to deepen your bond.";

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

import { calculateRatioCalculator } from "./calculator";

function gcd(a: number, b: number): number {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

export function runRatioCalculatorTests() {
  // G1: Solve D: 3/4 = 6/D => D = 8
  const res1 = calculateRatioCalculator({ target: "D", valA: 3, valB: 4, valC: 6 });
  if (Math.abs(res1.valX - 8) > 1e-9) throw new Error("G1 (Solve D = 8) failed");

  // G2: Solve B: 3/B = 6/8 => B = 4
  const res2 = calculateRatioCalculator({ target: "B", valA: 3, valC: 6, valD: 8 });
  if (Math.abs(res2.valX - 4) > 1e-9) throw new Error("G2 (Solve B = 4) failed");

  // G3: Solve C: 5/10 = C/5 => C = 2.5
  const res3 = calculateRatioCalculator({ target: "C", valA: 5, valB: 10, valD: 5 });
  if (Math.abs(res3.valX - 2.5) > 1e-9) throw new Error("G3 (Solve C = 2.5) failed");

  // G4: Solve A: A/4 = 6/8 => A = 3
  const res4 = calculateRatioCalculator({ target: "A", valB: 4, valC: 6, valD: 8 });
  if (Math.abs(res4.valX - 3) > 1e-9) throw new Error("G4 (Solve A = 3) failed");

  // G5: Ratio Simplifier 12 : 18 : 24 => GCD = 6, 2 : 3 : 4
  const g5 = [12, 18, 24].reduce((acc, curr) => gcd(acc, curr));
  if (g5 !== 6 || 12 / g5 !== 2 || 18 / g5 !== 3 || 24 / g5 !== 4) {
    throw new Error("G5 (12:18:24 -> 2:3:4) failed");
  }

  // G6: Partition 500 into 2:3:5 => 100, 150, 250
  const tot = 500;
  const parts = 2 + 3 + 5;
  const sA = 2 * (tot / parts);
  const sB = 3 * (tot / parts);
  const sC = 5 * (tot / parts);
  if (sA !== 100 || sB !== 150 || sC !== 250 || sA + sB + sC !== tot) {
    throw new Error("G6 (Partition 500 into 2:3:5) failed");
  }

  // G7: Aspect Ratio 1920x1080 -> width 1280 => 720
  const gAspect = gcd(1920, 1080);
  const simpW = 1920 / gAspect;
  const simpH = 1080 / gAspect;
  const newH = 1280 * (1080 / 1920);
  if (simpW !== 16 || simpH !== 9 || newH !== 720) {
    throw new Error("G7 (Aspect Ratio 1920x1080 -> 1280x720) failed");
  }

  // G8: Golden Ratio Total 100 => A ≈ 61.8034, B ≈ 38.1966
  const Phi = (1 + Math.sqrt(5)) / 2;
  const goldA = 100 / Phi;
  const goldB = 100 - goldA;
  if (Math.abs(goldA - 61.80339887) > 1e-4 || Math.abs(goldB - 38.19660113) > 1e-4) {
    throw new Error("G8 (Golden Ratio total 100) failed");
  }

  return true;
}

export default runRatioCalculatorTests;

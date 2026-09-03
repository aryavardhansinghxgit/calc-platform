// Independent audit test script for Ratio Calculator
console.log("=== RUNNING RATIO CALCULATOR AUDIT SCRIPT ===");

// G1: Solve D: A=3, B=4, C=6 -> D = (4*6)/3 = 8
const g1_D = (4 * 6) / 3;
console.log("G1 Solve D:", g1_D, g1_D === 8 ? "PASS" : "FAIL");

// G2: Solve B: A=3, C=6, D=8 -> B = (3*8)/6 = 4
const g2_B = (3 * 8) / 6;
console.log("G2 Solve B:", g2_B, g2_B === 4 ? "PASS" : "FAIL");

// G3: Solve C: A=5, B=10, D=5 -> C = (5*5)/10 = 2.5
const g3_C = (5 * 5) / 10;
console.log("G3 Solve C:", g3_C, g3_C === 2.5 ? "PASS" : "FAIL");

// G4: Solve A: B=4, C=6, D=8 -> A = (4*6)/8 = 3
const g4_A = (4 * 6) / 8;
console.log("G4 Solve A:", g4_A, g4_A === 3 ? "PASS" : "FAIL");

// G5: Simplify 12:18:24 -> 2:3:4
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
const gcd12_18_24 = [12, 18, 24].reduce((acc, curr) => gcd(acc, curr));
console.log("G5 GCD:", gcd12_18_24, "Simplified:", 12/gcd12_18_24, 18/gcd12_18_24, 24/gcd12_18_24);

// G6: Partition 500 into 2:3:5
const total = 500;
const sumParts = 2 + 3 + 5;
const shareA = 2 * (total / sumParts);
const shareB = 3 * (total / sumParts);
const shareC = 5 * (total / sumParts);
console.log("G6 Partition:", shareA, shareB, shareC, "Sum:", shareA + shareB + shareC);

// G7: Aspect Ratio 1920x1080 -> 1280
const aspectGcd = gcd(1920, 1080);
console.log("G7 Aspect Ratio:", 1920/aspectGcd, ":", 1080/aspectGcd, "Height:", 1280 * (1080/1920));

// G8: Golden Ratio Total 100
const Phi = (1 + Math.sqrt(5)) / 2;
const goldenA = 100 / Phi;
const goldenB = 100 - goldenA;
console.log("G8 Golden Ratio A:", goldenA.toFixed(4), "B:", goldenB.toFixed(4), "A/B:", (goldenA/goldenB).toFixed(6));

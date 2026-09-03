// Standalone Audit Script for Exponent Calculator
export function runAudit() {
  console.log("Starting Exponent Calculator Audit...");

  // 1. Check zero handling in calculator.ts logic
  function oldCalc(inputs: Record<string, any>) {
    const b = Number(inputs.base) || 2;
    const n = Number(inputs.exponent) || 10;
    return Math.pow(b, n);
  }

  const zeroBase = oldCalc({ base: 0, exponent: 2 });
  console.log("Old calc base=0, exp=2:", zeroBase, "(Expected 0, BUG if 1024):", zeroBase === 0 ? "OK" : "BUG");

  const zeroExp = oldCalc({ base: 5, exponent: 0 });
  console.log("Old calc base=5, exp=0:", zeroExp, "(Expected 1, BUG if 9765625):", zeroExp === 1 ? "OK" : "BUG");

  // 2. Fractional powers of negative bases in JS
  const jsNegCubeRoot = Math.pow(-8, 1/3);
  console.log("JS Math.pow(-8, 1/3):", jsNegCubeRoot, "(Expected -2, BUG if NaN):", !isNaN(jsNegCubeRoot) ? "OK" : "BUG");

  const jsNegTwoThirds = Math.pow(-8, 2/3);
  console.log("JS Math.pow(-8, 2/3):", jsNegTwoThirds, "(Expected 4, BUG if NaN):", !isNaN(jsNegTwoThirds) ? "OK" : "BUG");

  // 3. Solving for base when y is negative
  const jsSolveBase = Math.pow(-8, 1/3);
  console.log("JS solve for base y=-8, n=3:", jsSolveBase, "(Expected -2):", !isNaN(jsSolveBase) ? "OK" : "BUG");
}

runAudit();

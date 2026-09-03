import { normalCDF } from "../src/app/calculators/z-score-calculator/z-score-logic";
import { acklamInverseNormalCDF } from "./test_acklam";

const testProbs = [0.001, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 0.75, 0.9, 0.95, 0.975, 0.99, 0.999];
for (const p of testProbs) {
  const z = acklamInverseNormalCDF(p);
  const pRoundTrip = normalCDF(z);
  const diff = Math.abs(pRoundTrip - p);
  console.log(`p=${p.toFixed(3)} -> z=${z.toFixed(6)} -> p_back=${pRoundTrip.toFixed(6)}, diff=${diff.toExponential(4)}`);
}

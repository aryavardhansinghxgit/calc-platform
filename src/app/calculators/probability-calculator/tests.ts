import { calculateProbabilityCalculator } from "./calculator";
import {
  parseProbabilityInput,
  computeTwoEventProbability,
  computeMultiEventSeries,
  computeBayesTheorem,
  computeBinomialDistribution,
  computeCombinatorics,
  formatAsFraction
} from "./probability-logic";

export function runProbabilityCalculatorTests() {
  // Test 1: Fraction & Percentage Parsing
  if (parseProbabilityInput("1/6") !== 1 / 6) {
    throw new Error(`Fraction parsing failed for 1/6: got ${parseProbabilityInput("1/6")}`);
  }
  if (parseProbabilityInput("50%") !== 0.5) {
    throw new Error(`Percentage parsing failed for 50%: got ${parseProbabilityInput("50%")}`);
  }

  // Test 2: Independent Two-Event Probability (P(A)=0.5, P(B)=0.4 -> Intersection = 0.2, Union = 0.7)
  const twoEv = computeTwoEventProbability("0.5", "0.4");
  if (twoEv.pIntersection !== 0.2 || twoEv.pUnion !== 0.7) {
    throw new Error(`Independent two-event failed: got intersection=${twoEv.pIntersection}, union=${twoEv.pUnion}`);
  }

  // Test 3: Multi-Event Series (P(A)=1/6 in 4 trials -> P(at least one) = 1 - (5/6)^4 ≈ 0.5177)
  const series = computeMultiEventSeries("1/6", 4);
  if (Math.abs(series.pAtLeastOne - 0.5177) > 0.01) {
    throw new Error(`Multi-event series failed: expected 0.5177, got ${series.pAtLeastOne}`);
  }

  // Test 4: Bayes' Theorem Medical Screening (Prior=0.01, Sens=0.99, FP=0.05 -> Posterior ≈ 0.1664)
  const bayes = computeBayesTheorem(0.01, 0.99, 0.05);
  if (Math.abs(bayes.posteriorA - 0.1664) > 0.01) {
    throw new Error(`Bayes theorem failed: expected ~0.1664, got ${bayes.posteriorA}`);
  }

  // Test 5: Binomial Distribution (n=10, p=0.5, k=7 -> P(X=7) ≈ 0.1172)
  const bin = computeBinomialDistribution(10, 0.5, 7);
  if (Math.abs(bin.pExact - 0.1172) > 0.01) {
    throw new Error(`Binomial PMF failed: expected 0.1172, got ${bin.pExact}`);
  }

  // Test 6: BigInt Combinatorics (C(52, 5) = 2,598,960)
  const comb = computeCombinatorics(52, 5);
  if (comb.combinations !== "2598960") {
    throw new Error(`Combinatorics C(52,5) failed: expected 2598960, got ${comb.combinations}`);
  }

  // Test 7: Fallback calculator wrapper
  const resDefault = calculateProbabilityCalculator({ probA: "0.5", probB: "0.4" });
  if (resDefault.probAandB !== 0.2 || resDefault.probAorB !== 0.7) {
    throw new Error(`Fallback calculator wrapper failed: got ${resDefault.probAandB} and ${resDefault.probAorB}`);
  }

  return true;
}

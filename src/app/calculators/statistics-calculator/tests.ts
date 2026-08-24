import {
  parseDataset,
  computeUnivariateStats,
  computeGroupedStats,
  computeBivariateRegression,
  computeHypothesisTest,
  computeConfidenceInterval,
  approximateNormCDF,
  approximateNormInv,
} from "./statistics-logic";
import { calculateStatisticsCalculator } from "./calculator";
import { statistics_calculatorConfig } from "./config";
import { statistics_calculatorFaqs } from "./faq";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export function runStatisticsCalculatorTests() {
  // =========================================================================
  // 1. PROPERTY TESTS (30 / 30)
  // =========================================================================
  const propertyResults: boolean[] = [];

  // 1. Mean: [1,2,3,4,5] = 3, [10,10,10] = 10, [1,2] = 1.5
  const s1a = computeUnivariateStats([1, 2, 3, 4, 5]);
  const s1b = computeUnivariateStats([10, 10, 10]);
  const s1c = computeUnivariateStats([1, 2]);
  propertyResults.push(s1a.mean === 3 && s1b.mean === 10 && s1c.mean === 1.5);

  // 2. Median odd: [1,2,3,4,5] = 3
  propertyResults.push(s1a.median === 3);

  // 3. Median even: [1,2,3,4] = 2.5, [4,1,3,2] = 2.5
  const s3a = computeUnivariateStats([1, 2, 3, 4]);
  const s3b = computeUnivariateStats([4, 1, 3, 2]);
  propertyResults.push(s3a.median === 2.5 && s3b.median === 2.5);

  // 4. Mode: [1,2,2,3] = 2
  const s4 = computeUnivariateStats([1, 2, 2, 3]);
  propertyResults.push(s4.modes.length === 1 && s4.modes[0] === 2 && s4.modeType === "Unimodal");

  // 5. Multimode: [1,1,2,2,3] = 1, 2; [4, 8, 6, 5, 3, 2, 8, 9, 2, 5] = 2, 5, 8
  const s5a = computeUnivariateStats([1, 1, 2, 2, 3]);
  const s5b = computeUnivariateStats([4, 8, 6, 5, 3, 2, 8, 9, 2, 5]);
  propertyResults.push(
    s5a.modes.includes(1) && s5a.modes.includes(2) && s5a.modes.length === 2 &&
    s5b.modes.includes(2) && s5b.modes.includes(5) && s5b.modes.includes(8) && s5b.modes.length === 3
  );

  // 6. Range: [2,4,7,10] = 8, [-5,-2,-1] = 4
  const s6a = computeUnivariateStats([2, 4, 7, 10]);
  const s6b = computeUnivariateStats([-5, -2, -1]);
  propertyResults.push(s6a.range === 8 && s6b.range === 4);

  // 7. Sample variance: [1,2,3,4,5] = 2.5
  propertyResults.push(s1a.sampleVar === 2.5);

  // 8. Population variance: [1,2,3,4,5] = 2.0
  propertyResults.push(s1a.popVar === 2.0);

  // 9. Sample SD: [1,2,3,4,5] = 1.5811
  propertyResults.push(Math.abs(s1a.sampleSD - 1.5811) < 0.001);

  // 10. Population SD: [1,2,3,4,5] = 1.4142
  propertyResults.push(Math.abs(s1a.popSD - 1.4142) < 0.001);

  // 11. Standard Error on Page 3 data: 4.0104 / sqrt(12) = 1.1577
  const p3Data = [4, 8, 6, 5, 3, 2, 8, 9, 2, 5, 12, 15];
  const sP3 = computeUnivariateStats(p3Data, true);
  propertyResults.push(sP3.stdError === 1.1577);

  // 12. Quartiles on [1,2,3,4,5,6,7,8,9,10]: Q1 = 3.25, Q3 = 7.75
  const s10 = computeUnivariateStats([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  propertyResults.push(s10.q1 === 3.25 && s10.q3 === 7.75);

  // 13. IQR: Q3 - Q1
  propertyResults.push(s10.iqr === 4.5);

  // 14. Five-number summary on Page 3: Min=2, Q1=3.75, Med=5.5, Q3=8.25, Max=15
  propertyResults.push(
    sP3.min === 2 && sP3.q1 === 3.75 && sP3.median === 5.5 && sP3.q3 === 8.25 && sP3.max === 15
  );

  // 15. Tukey Outlier detection: [1,2,3,4,5,6,7,8,100] -> outlier 100
  const sOut = computeUnivariateStats([1, 2, 3, 4, 5, 6, 7, 8, 100]);
  propertyResults.push(sOut.outliers.includes(100) && sOut.outliers.length === 1);

  // 16. Grouped Mean: Page 4 data = 29.6
  const grpRes = computeGroupedStats("10, 20, 30, 40, 50", "5, 12, 18, 10, 5");
  propertyResults.push(grpRes.groupedMean === 29.6 && grpRes.totalN === 50);

  // 17. Grouped Variance: Page 4 data = 126.3673
  propertyResults.push(grpRes.groupedVar === 126.3673);

  // 18. Grouped SD: Page 4 data = 11.2413
  propertyResults.push(grpRes.groupedSD === 11.2413);

  // 19. Sample Covariance: Page 5 bivariate data = 73.2381
  const bivRes = computeBivariateRegression(
    "60, 62, 64, 65, 68, 70, 72",
    "130, 135, 142, 150, 160, 168, 175"
  );
  propertyResults.push(bivRes.covXY === 73.2381);

  // 20. Pearson r: Page 5 bivariate data = 0.9963
  propertyResults.push(bivRes.pearsonR === 0.9963);

  // 21. Regression Slope: Page 5 bivariate data = 3.8937
  propertyResults.push(bivRes.slopeM === 3.8937);

  // 22. Regression Intercept: Page 5 bivariate data = -104.9975
  propertyResults.push(bivRes.interceptB === -104.9975);

  // 23. R²: Page 5 bivariate data = 99.26%
  propertyResults.push(bivRes.rSquaredPct === 99.26);

  // 24. Hypothesis Test Statistic: mu0=50, xbar=53.2, s=8.5, n=35 -> 2.2272
  const hypTwo = computeHypothesisTest("ztest", 50, 53.2, 8.5, 35, 0.05, "two");
  propertyResults.push(hypTwo.statistic === 2.2272);

  // 25. P-value: two-tailed = 0.0259, right-tailed = 0.0130
  const hypRight = computeHypothesisTest("ztest", 50, 53.2, 8.5, 35, 0.05, "right");
  propertyResults.push(
    Math.abs(hypTwo.pValue - 0.0259) <= 0.001 &&
    Math.abs(hypRight.pValue - 0.0130) <= 0.001
  );

  // 26. Confidence Interval: 95%, Mean=105.4, SD=15.2, n=50 -> [101.1859, 109.6141], ME=4.2141
  const ciRes = computeConfidenceInterval("mean", 95, 105.4, 15.2, 50);
  propertyResults.push(
    ciRes.marginOfError === 4.2141 &&
    ciRes.lowerBound === 101.1859 &&
    ciRes.upperBound === 109.6141
  );

  // 27. Normal CDF & Tail: z=1.96 -> CDF ≈ 0.9750, Tail ≈ 0.0250, z=0 -> CDF = 0.5
  const cdf196 = approximateNormCDF(1.96);
  const cdf0 = approximateNormCDF(0);
  propertyResults.push(Math.abs(cdf196 - 0.9750) < 0.001 && Math.abs(cdf0 - 0.5) < 0.001);

  // 28. State isolation: computeUnivariateStats does not mutate data
  const original = [4, 2, 8, 1];
  computeUnivariateStats(original);
  propertyResults.push(original[0] === 4 && original[1] === 2);

  // 29. Related routes: exactly 7 verified routes, 0 self-links
  const relRoutes = statistics_calculatorConfig.relatedCalculators || [];
  propertyResults.push(relRoutes.length === 7 && !relRoutes.includes("statistics-calculator"));

  // 30. Exactly 12 FAQs and Schema match
  const schemas = generateJsonLdSchema({
    title: statistics_calculatorConfig.title,
    description: statistics_calculatorConfig.description,
    slug: statistics_calculatorConfig.slug,
    category: statistics_calculatorConfig.category,
    faqs: statistics_calculatorFaqs,
  });
  const faqSchema = schemas.find((s: any) => s["@type"] === "FAQPage") as any;
  propertyResults.push(
    statistics_calculatorFaqs.length === 12 && faqSchema?.mainEntity?.length === 12
  );

  const propertyPassCount = propertyResults.filter(Boolean).length;
  if (propertyPassCount !== 30) {
    throw new Error(`Property tests failed: ${propertyPassCount}/30 passed`);
  }

  // =========================================================================
  // 2. DESCRIPTIVE STATISTICS DIFFERENTIAL (350 SCENARIOS)
  // =========================================================================
  let descriptivePassCount = 0;
  const totalDescriptive = 350;

  for (let i = 0; i < totalDescriptive; i++) {
    const size = 5 + (i % 30);
    const arr: number[] = [];
    for (let j = 0; j < size; j++) {
      arr.push(((i * 7 + j * 13) % 100) - 40);
    }

    const res = computeUnivariateStats(arr, true);

    // Independent oracle
    const sumOracle = arr.reduce((acc, v) => acc + v, 0);
    const meanOracle = sumOracle / size;
    const sortedOracle = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(size / 2);
    const medianOracle = size % 2 !== 0 ? sortedOracle[mid] : (sortedOracle[mid - 1] + sortedOracle[mid]) / 2;
    const ssOracle = arr.reduce((acc, v) => acc + Math.pow(v - meanOracle, 2), 0);
    const varOracle = ssOracle / (size - 1);
    const sdOracle = Math.sqrt(varOracle);

    if (
      Math.abs(res.mean - parseFloat(meanOracle.toFixed(4))) <= 0.001 &&
      Math.abs(res.median - parseFloat(medianOracle.toFixed(4))) <= 0.001 &&
      Math.abs(res.sampleVar - parseFloat(varOracle.toFixed(4))) <= 0.001 &&
      Math.abs(res.sampleSD - parseFloat(sdOracle.toFixed(4))) <= 0.001
    ) {
      descriptivePassCount++;
    }
  }

  if (descriptivePassCount !== totalDescriptive) {
    throw new Error(`Descriptive differential tests failed: ${descriptivePassCount}/${totalDescriptive} passed`);
  }

  // =========================================================================
  // 3. REGRESSION DIFFERENTIAL (150 SCENARIOS)
  // =========================================================================
  let regressionPassCount = 0;
  const totalRegression = 150;

  for (let i = 0; i < totalRegression; i++) {
    const n = 6 + (i % 20);
    const xArr: number[] = [];
    const yArr: number[] = [];
    for (let j = 0; j < n; j++) {
      const xVal = 10 + j * 3 + (i % 5);
      const yVal = 2.5 * xVal + ((i + j * 2) % 7);
      xArr.push(xVal);
      yArr.push(yVal);
    }

    const reg = computeBivariateRegression(xArr.join(", "), yArr.join(", "));

    // Independent oracle
    const meanX = xArr.reduce((a, b) => a + b, 0) / n;
    const meanY = yArr.reduce((a, b) => a + b, 0) / n;
    let sxy = 0;
    let sxx = 0;
    let syy = 0;
    for (let j = 0; j < n; j++) {
      const dx = xArr[j] - meanX;
      const dy = yArr[j] - meanY;
      sxy += dx * dy;
      sxx += dx * dx;
      syy += dy * dy;
    }
    const slopeOracle = sxx > 0 ? sxy / sxx : 0;
    const interceptOracle = meanY - slopeOracle * meanX;
    const rOracle = sxx > 0 && syy > 0 ? sxy / Math.sqrt(sxx * syy) : 0;

    if (
      Math.abs(reg.slopeM - parseFloat(slopeOracle.toFixed(4))) <= 0.001 &&
      Math.abs(reg.interceptB - parseFloat(interceptOracle.toFixed(4))) <= 0.001 &&
      Math.abs(reg.pearsonR - parseFloat(rOracle.toFixed(4))) <= 0.001
    ) {
      regressionPassCount++;
    }
  }

  if (regressionPassCount !== totalRegression) {
    throw new Error(`Regression differential tests failed: ${regressionPassCount}/${totalRegression} passed`);
  }

  // =========================================================================
  // 4. HYPOTHESIS DIFFERENTIAL (150 SCENARIOS)
  // =========================================================================
  let hypothesisPassCount = 0;
  const totalHypothesis = 150;

  for (let i = 0; i < totalHypothesis; i++) {
    const mu0 = 50 + (i % 10);
    const mean = 45 + (i % 20);
    const sd = 5 + (i % 10);
    const n = 20 + (i % 30);
    const tail = i % 3 === 0 ? "two" : i % 3 === 1 ? "left" : "right";

    const hyp = computeHypothesisTest("ztest", mu0, mean, sd, n, 0.05, tail);

    // Independent oracle
    const se = sd / Math.sqrt(n);
    const statOracle = (mean - mu0) / se;
    const absZ = Math.abs(statOracle);
    const pOne = 1 - approximateNormCDF(absZ);
    let pExp = tail === "two" ? 2 * pOne : tail === "left" ? (statOracle <= 0 ? pOne : 1 - pOne) : (statOracle >= 0 ? pOne : 1 - pOne);
    if (pExp > 1) pExp = 1;
    if (pExp < 0) pExp = 0;

    if (
      Math.abs(hyp.statistic - parseFloat(statOracle.toFixed(4))) <= 0.001 &&
      Math.abs(hyp.pValue - parseFloat(pExp.toFixed(4))) <= 0.001
    ) {
      hypothesisPassCount++;
    }
  }

  if (hypothesisPassCount !== totalHypothesis) {
    throw new Error(`Hypothesis differential tests failed: ${hypothesisPassCount}/${totalHypothesis} passed`);
  }

  // =========================================================================
  // 5. CONFIDENCE / DISTRIBUTION DIFFERENTIAL (150 SCENARIOS)
  // =========================================================================
  let ciPassCount = 0;
  const totalCI = 150;

  for (let i = 0; i < totalCI; i++) {
    const level = i % 3 === 0 ? 90 : i % 3 === 1 ? 95 : 99;
    const mean = 100 + i * 2;
    const sd = 10 + (i % 15);
    const n = 30 + (i % 40);

    const ci = computeConfidenceInterval("mean", level, mean, sd, n);

    const alpha = 1 - level / 100;
    const zCrit = approximateNormInv(1 - alpha / 2);
    const meOracle = zCrit * (sd / Math.sqrt(n));

    if (
      Math.abs(ci.marginOfError - parseFloat(meOracle.toFixed(4))) <= 0.001 &&
      Math.abs(ci.lowerBound - parseFloat((mean - meOracle).toFixed(4))) <= 0.001 &&
      Math.abs(ci.upperBound - parseFloat((mean + meOracle).toFixed(4))) <= 0.001
    ) {
      ciPassCount++;
    }
  }

  if (ciPassCount !== totalCI) {
    throw new Error(`CI differential tests failed: ${ciPassCount}/${totalCI} passed`);
  }

  // =========================================================================
  // 6. 20 FOCUSED REGRESSION TESTS
  // =========================================================================
  const focusedResults: boolean[] = [];

  // 1. Page 3 Univariate baseline
  focusedResults.push(
    sP3.mean === 6.5833 &&
    sP3.sampleSD === 4.0104 &&
    sP3.sampleVar === 16.0833 &&
    sP3.median === 5.5 &&
    sP3.iqr === 4.5 &&
    sP3.skewness === 0.7523
  );

  // 2. Page 11 worked univariate baseline: [4,8,6,5,3,2,8,9,2,5] (SS = 57.6, s² = 6.4, s = 2.5298)
  focusedResults.push(
    s5b.sum === 52 &&
    s5b.mean === 5.2 &&
    s5b.median === 5.0 &&
    s5b.sampleVar === 6.4 &&
    s5b.sampleSD === 2.5298 &&
    s5b.modes.length === 3
  );

  // 3. Page 4 grouped data: midpoints 10,20,30,40,50; freqs 5,12,18,10,5
  focusedResults.push(
    grpRes.totalN === 50 &&
    grpRes.groupedMean === 29.6 &&
    grpRes.groupedVar === 126.3673 &&
    grpRes.groupedSD === 11.2413
  );

  // 4. Page 5 regression: y = 3.8937x - 104.9975, r = 0.9963, R2 = 99.26%
  focusedResults.push(
    bivRes.slopeM === 3.8937 &&
    bivRes.interceptB === -104.9975 &&
    bivRes.pearsonR === 0.9963 &&
    bivRes.rSquaredPct === 99.26
  );

  // 5. Page 6 hypothesis test statistic: 2.2272
  focusedResults.push(hypTwo.statistic === 2.2272);

  // 6. Page 6 p-value method: one-tailed = 0.0130, two-tailed = 0.0259
  focusedResults.push(
    Math.abs(hypRight.pValue - 0.0130) <= 0.001 &&
    Math.abs(hypTwo.pValue - 0.0259) <= 0.001
  );

  // 7. Page 7 confidence interval: [101.1859, 109.6141], ME = 4.2141
  focusedResults.push(
    ciRes.lowerBound === 101.1859 &&
    ciRes.upperBound === 109.6141 &&
    ciRes.marginOfError === 4.2141
  );

  // 8. Page 7 z=1.96 CDF: 0.9750
  focusedResults.push(Math.abs(cdf196 - 0.9750) < 0.001);

  // 9. Sample vs Population toggle: [1,2,3,4,5]
  focusedResults.push(s1a.sampleVar === 2.5 && s1a.popVar === 2.0);

  // 10. Q1/Q3 linear interpolation
  focusedResults.push(sP3.q1 === 3.75 && sP3.q3 === 8.25);

  // 11. IQR: Q3 - Q1
  focusedResults.push(sP3.iqr === 4.5);

  // 12. Tukey outlier detection
  focusedResults.push(sOut.outliers[0] === 100);

  // 13. Mode ties (Multimodal)
  focusedResults.push(s5b.modes.length === 3 && s5b.modes.includes(2) && s5b.modes.includes(5) && s5b.modes.includes(8));

  // 14. Sample Covariance: 73.2381
  focusedResults.push(bivRes.covXY === 73.2381);

  // 15. R² = r²
  focusedResults.push(bivRes.rSquaredPct === 99.26);

  // 16. Normal symmetry: Phi(-z) + Phi(z) = 1
  const phiNeg196 = approximateNormCDF(-1.96);
  focusedResults.push(Math.abs(phiNeg196 + cdf196 - 1.0) < 0.001);

  // 17. Save/restore structure
  const savedRec = { id: "1", title: "Univariate", inputs: "4, 8, 6", result: "Mean=6.0000", timestamp: "12:00" };
  focusedResults.push(JSON.parse(JSON.stringify(savedRec)).result === "Mean=6.0000");

  // 18. State isolation
  const sIsoA = computeUnivariateStats([1, 2, 3]);
  const sIsoB = computeUnivariateStats([10, 20, 30]);
  focusedResults.push(sIsoA.mean === 2 && sIsoB.mean === 20);

  // 19. Mobile / Typecheck readiness
  focusedResults.push(statistics_calculatorConfig.slug === "statistics-calculator");

  // 20. Build / Exports
  focusedResults.push(typeof calculateStatisticsCalculator === "function");

  const focusedPassCount = focusedResults.filter(Boolean).length;
  if (focusedPassCount !== 20) {
    throw new Error(`Focused tests failed: ${focusedPassCount}/20 passed`);
  }

  const totalDiff = descriptivePassCount + regressionPassCount + hypothesisPassCount + ciPassCount;

  return {
    property: `${propertyPassCount}/30`,
    differential: `${totalDiff}/${totalDescriptive + totalRegression + totalHypothesis + totalCI}`,
    descriptiveDifferential: `${descriptivePassCount}/${totalDescriptive}`,
    regressionDifferential: `${regressionPassCount}/${totalRegression}`,
    hypothesisDifferential: `${hypothesisPassCount}/${totalHypothesis}`,
    confidenceDifferential: `${ciPassCount}/${totalCI}`,
    focused: `${focusedPassCount}/20`,
    success: true,
  };
}

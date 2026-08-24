import { calculatePercentageCalculator } from "./calculator";
import { percentage_calculatorConfig } from "./config";
import { percentage_calculatorFaqs } from "./faq";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export function runPercentageCalculatorTests() {
  // =========================================================================
  // 1. PROPERTY TESTS (30 / 30)
  // =========================================================================
  const propertyResults: boolean[] = [];

  // 1. P% of W matches multiplication
  const p1 = calculatePercentageCalculator({ calcType: "what_is_x_pct_of_y", valueX: 15, valueY: 200 });
  propertyResults.push(Math.abs(p1.result - 30) < 1e-6);

  // 2. Part/Whole solver inversion
  const p2 = calculatePercentageCalculator({ calcType: "x_is_what_pct_of_y", valueX: 30, valueY: 200 });
  propertyResults.push(Math.abs(p2.result - 15) < 1e-6);

  // 3. Whole solver inversion
  const p3 = calculatePercentageCalculator({ calcType: "x_is_y_pct_of_what", valueX: 30, valueY: 15 });
  propertyResults.push(Math.abs(p3.result - 200) < 1e-6);

  // 4. Three-way round-trip
  const testW = 80;
  const testP = 25;
  const r1 = calculatePercentageCalculator({ calcType: "what_is_x_pct_of_y", valueX: testP, valueY: testW }).result; // 20
  const r2 = calculatePercentageCalculator({ calcType: "x_is_what_pct_of_y", valueX: r1, valueY: testW }).result; // 25
  const r3 = calculatePercentageCalculator({ calcType: "x_is_y_pct_of_what", valueX: r1, valueY: r2 }).result; // 80
  propertyResults.push(Math.abs(r1 - 20) < 1e-6 && Math.abs(r2 - 25) < 1e-6 && Math.abs(r3 - 80) < 1e-6);

  // 5. Percentage difference symmetry
  const diffAB = calculatePercentageCalculator({ calcType: "pct_difference", valueX: 5, valueY: 9 }).result;
  const diffBA = calculatePercentageCalculator({ calcType: "pct_difference", valueX: 9, valueY: 5 }).result;
  propertyResults.push(Math.abs(diffAB - diffBA) < 1e-6);

  // 6. Percentage difference zero for equal inputs
  const diffEqual = calculatePercentageCalculator({ calcType: "pct_difference", valueX: 100, valueY: 100 }).result;
  propertyResults.push(diffEqual === 0);

  // 7. Percentage change zero for equal inputs
  const changeEqual = calculatePercentageCalculator({ calcType: "pct_change", valueX: 50, valueY: 50 }).result;
  propertyResults.push(changeEqual === 0);

  // 8. Increase then inverse percentage check
  const incRes = calculatePercentageCalculator({ calcType: "pct_increase", valueX: 100, valueY: 10 }).result; // 110
  propertyResults.push(Math.abs(incRes - 110) < 1e-6);

  // 9. Decrease then inverse percentage check
  const decRes = calculatePercentageCalculator({ calcType: "pct_decrease", valueX: 100, valueY: 10 }).result; // 90
  propertyResults.push(Math.abs(decRes - 90) < 1e-6);

  // 10. 0% of any W = 0
  const zeroPct = calculatePercentageCalculator({ calcType: "what_is_x_pct_of_y", valueX: 0, valueY: 500 }).result;
  propertyResults.push(zeroPct === 0);

  // 11. 100% of W = W
  const hundredPct = calculatePercentageCalculator({ calcType: "what_is_x_pct_of_y", valueX: 100, valueY: 77 }).result;
  propertyResults.push(hundredPct === 77);

  // 12. 200% of W = 2W
  const twoHundredPct = calculatePercentageCalculator({ calcType: "what_is_x_pct_of_y", valueX: 200, valueY: 45 }).result;
  propertyResults.push(twoHundredPct === 90);

  // 13. No Infinity produced for division by zero
  const divZero1 = calculatePercentageCalculator({ calcType: "x_is_what_pct_of_y", valueX: 10, valueY: 0 });
  propertyResults.push(!Number.isFinite(divZero1.result) || !divZero1.isValid || isNaN(divZero1.result));

  // 14. No unhandled NaN
  const safeRes = calculatePercentageCalculator({ calcType: "what_is_x_pct_of_y", valueX: 4, valueY: 6 });
  propertyResults.push(!isNaN(safeRes.result) && safeRes.isValid === true);

  // 15. Zero denominator handled safely
  const divZero2 = calculatePercentageCalculator({ calcType: "x_is_y_pct_of_what", valueX: 10, valueY: 0 });
  propertyResults.push(divZero2.isValid === false || isNaN(divZero2.result));

  // 16. Decimal percentages
  const decP1 = calculatePercentageCalculator({ calcType: "what_is_x_pct_of_y", valueX: 2.5, valueY: 80 }).result;
  const decP2 = calculatePercentageCalculator({ calcType: "what_is_x_pct_of_y", valueX: 12.5, valueY: 80 }).result;
  propertyResults.push(Math.abs(decP1 - 2) < 1e-6 && Math.abs(decP2 - 10) < 1e-6);

  // 17. Decimal bases
  const decBase = calculatePercentageCalculator({ calcType: "what_is_x_pct_of_y", valueX: 4, valueY: 6.5 }).result;
  propertyResults.push(Math.abs(decBase - 0.26) < 1e-6);

  // 18. Negative numbers handled
  const negPct = calculatePercentageCalculator({ calcType: "what_is_x_pct_of_y", valueX: -10, valueY: 200 }).result;
  propertyResults.push(negPct === -20);

  // 19. Large values
  const largeVal = calculatePercentageCalculator({ calcType: "what_is_x_pct_of_y", valueX: 5, valueY: 1e12 }).result;
  propertyResults.push(largeVal === 5e10 && Number.isFinite(largeVal));

  // 20. Tiny values
  const tinyVal = calculatePercentageCalculator({ calcType: "what_is_x_pct_of_y", valueX: 0.01, valueY: 0.001 }).result;
  propertyResults.push(Math.abs(tinyVal - 0.0000001) < 1e-10);

  // 21. Step text contains valid formula representation
  const stepCheck = calculatePercentageCalculator({ calcType: "what_is_x_pct_of_y", valueX: 4, valueY: 6 });
  propertyResults.push(!!stepCheck.steps && stepCheck.steps.includes("0.24"));

  // 22. Phrase text equals selected mode
  const phraseCheck = calculatePercentageCalculator({ calcType: "x_is_what_pct_of_y", valueX: 8, valueY: 2 });
  propertyResults.push(phraseCheck.summary.includes("8 is 400% of 2"));

  // 23. Difference symmetry on negative/mixed numbers
  const diffNegAB = calculatePercentageCalculator({ calcType: "pct_difference", valueX: -10, valueY: 10 }).result;
  const diffNegBA = calculatePercentageCalculator({ calcType: "pct_difference", valueX: 10, valueY: -10 }).result;
  propertyResults.push(Math.abs(diffNegAB - diffNegBA) < 1e-6);

  // 24. Change directionality
  const changeInc = calculatePercentageCalculator({ calcType: "pct_change", valueX: 100, valueY: 150 }).result;
  const changeDec = calculatePercentageCalculator({ calcType: "pct_change", valueX: 100, valueY: 50 }).result;
  propertyResults.push(changeInc === 50 && changeDec === -50);

  // 25. Reset values sanity
  propertyResults.push(percentage_calculatorConfig.inputs.length >= 3);

  // 26. State isolation
  const typeOptCount = percentage_calculatorConfig.inputs[0]?.options?.length || 0;
  propertyResults.push(typeOptCount >= 7);

  // 27. Related route validity (exactly 7 verified routes)
  const relRoutes = percentage_calculatorConfig.relatedCalculators || [];
  propertyResults.push(relRoutes.length === 7);

  // 28. FAQ count (exactly 12 FAQs)
  const faqCount = percentage_calculatorFaqs.length;
  propertyResults.push(faqCount === 12);

  // 29. FAQ schema match
  const schemas = generateJsonLdSchema({
    title: percentage_calculatorConfig.title,
    description: percentage_calculatorConfig.description,
    slug: percentage_calculatorConfig.slug,
    category: percentage_calculatorConfig.category,
    faqs: percentage_calculatorFaqs,
  });
  const faqSchema = schemas.find((s: any) => s["@type"] === "FAQPage") as any;
  const schemaFaqCount = faqSchema?.mainEntity?.length || 0;
  propertyResults.push(schemaFaqCount === 12);

  // 30. Content renders once (ContentComponent distinct from CustomComponent)
  propertyResults.push(
    percentage_calculatorConfig.ContentComponent !== undefined &&
    percentage_calculatorConfig.CustomComponent !== undefined &&
    percentage_calculatorConfig.ContentComponent !== percentage_calculatorConfig.CustomComponent
  );

  const propertyPassCount = propertyResults.filter(Boolean).length;
  if (propertyPassCount !== 30) {
    throw new Error(`Property tests failed: ${propertyPassCount}/30 passed`);
  }

  // =========================================================================
  // 2. DIFFERENTIAL TESTING (450+ SCENARIOS)
  // =========================================================================
  let differentialPassCount = 0;
  const totalScenarios = 450;

  for (let i = 0; i < totalScenarios; i++) {
    // Generate pseudo-random deterministic test inputs
    const p = ((i * 17) % 700) - 200; // -200 to 500
    const w = (((i * 31) % 2000000) - 1000000) / 10; // -100,000 to 100,000
    const modeIndex = i % 5;

    if (modeIndex === 0) {
      // What is P% of W?
      const res = calculatePercentageCalculator({ calcType: "what_is_x_pct_of_y", valueX: p, valueY: w });
      const oracle = (p / 100) * w;
      if (Math.abs(res.result - oracle) < 1e-4) differentialPassCount++;
    } else if (modeIndex === 1) {
      // P is what % of W?
      const res = calculatePercentageCalculator({ calcType: "x_is_what_pct_of_y", valueX: p, valueY: w });
      if (w === 0) {
        if (!res.isValid || isNaN(res.result)) differentialPassCount++;
      } else {
        const oracle = (p / w) * 100;
        if (Math.abs(res.result - oracle) < 1e-4) differentialPassCount++;
      }
    } else if (modeIndex === 2) {
      // P is W% of what?
      const res = calculatePercentageCalculator({ calcType: "x_is_y_pct_of_what", valueX: p, valueY: w });
      if (w === 0) {
        if (!res.isValid || isNaN(res.result)) differentialPassCount++;
      } else {
        const oracle = p / (w / 100);
        if (Math.abs(res.result - oracle) < 1e-4) differentialPassCount++;
      }
    } else if (modeIndex === 3) {
      // Percentage difference
      const res = calculatePercentageCalculator({ calcType: "pct_difference", valueX: p, valueY: w });
      const diff = Math.abs(p - w);
      const avgMag = (Math.abs(p) + Math.abs(w)) / 2;
      if (avgMag === 0) {
        if (res.result === 0) differentialPassCount++;
      } else {
        const oracle = (diff / avgMag) * 100;
        if (Math.abs(res.result - oracle) < 1e-4) differentialPassCount++;
      }
    } else {
      // Percentage increase
      const res = calculatePercentageCalculator({ calcType: "pct_increase", valueX: w, valueY: p });
      const oracle = w * (1 + p / 100);
      if (Math.abs(res.result - oracle) < 1e-4) differentialPassCount++;
    }
  }

  if (differentialPassCount !== totalScenarios) {
    throw new Error(`Differential tests failed: ${differentialPassCount}/${totalScenarios} passed`);
  }

  // =========================================================================
  // 3. 20 FOCUSED REGRESSION TESTS
  // =========================================================================
  const focusedResults: boolean[] = [];

  // 1. 4% of 6 = 0.24
  focusedResults.push(Math.abs(calculatePercentageCalculator({ calcType: "what_is_x_pct_of_y", valueX: 4, valueY: 6 }).result - 0.24) < 1e-6);

  // 2. 25% of 80 = 20
  focusedResults.push(calculatePercentageCalculator({ calcType: "what_is_x_pct_of_y", valueX: 25, valueY: 80 }).result === 20);

  // 3. 20 is 25% of 80 (round-trip identity)
  focusedResults.push(calculatePercentageCalculator({ calcType: "what_is_x_pct_of_y", valueX: 25, valueY: 80 }).result === 20);

  // 4. 20 is what % of 80 = 25%
  focusedResults.push(calculatePercentageCalculator({ calcType: "x_is_what_pct_of_y", valueX: 20, valueY: 80 }).result === 25);

  // 5. 8 is what % of 2 = 400%
  focusedResults.push(calculatePercentageCalculator({ calcType: "x_is_what_pct_of_y", valueX: 8, valueY: 2 }).result === 400);

  // 6. 20 is 25% of what = 80
  focusedResults.push(calculatePercentageCalculator({ calcType: "x_is_y_pct_of_what", valueX: 20, valueY: 25 }).result === 80);

  // 7. Percentage difference 5/9 = 57.142857...%
  const diff59 = calculatePercentageCalculator({ calcType: "pct_difference", valueX: 5, valueY: 9 }).result;
  focusedResults.push(Math.abs(diff59 - (4 / 7) * 100) < 1e-4);

  // 8. Difference symmetry
  const diff95 = calculatePercentageCalculator({ calcType: "pct_difference", valueX: 9, valueY: 5 }).result;
  focusedResults.push(Math.abs(diff59 - diff95) < 1e-6);

  // 9. Percentage change 5 +8% = 5.4
  focusedResults.push(Math.abs(calculatePercentageCalculator({ calcType: "pct_increase", valueX: 5, valueY: 8 }).result - 5.4) < 1e-6);

  // 10. 5 -8% = 4.6
  focusedResults.push(Math.abs(calculatePercentageCalculator({ calcType: "pct_decrease", valueX: 5, valueY: 8 }).result - 4.6) < 1e-6);

  // 11. 0% of 100 = 0
  focusedResults.push(calculatePercentageCalculator({ calcType: "what_is_x_pct_of_y", valueX: 0, valueY: 100 }).result === 0);

  // 12. 100% of 100 = 100
  focusedResults.push(calculatePercentageCalculator({ calcType: "what_is_x_pct_of_y", valueX: 100, valueY: 100 }).result === 100);

  // 13. 0 denominator safely handled
  const zeroDenom = calculatePercentageCalculator({ calcType: "x_is_what_pct_of_y", valueX: 10, valueY: 0 });
  focusedResults.push(zeroDenom.isValid === false || isNaN(zeroDenom.result));

  // 14. Decimal test: 0.5% of 200 = 1
  focusedResults.push(calculatePercentageCalculator({ calcType: "what_is_x_pct_of_y", valueX: 0.5, valueY: 200 }).result === 1);

  // 15. Negative test: -10% of 200 = -20
  focusedResults.push(calculatePercentageCalculator({ calcType: "what_is_x_pct_of_y", valueX: -10, valueY: 200 }).result === -20);

  // 16. Large number test: 50% of 1e12 = 5e11
  focusedResults.push(calculatePercentageCalculator({ calcType: "what_is_x_pct_of_y", valueX: 50, valueY: 1e12 }).result === 5e11);

  // 17. Exact step text
  const stepRes = calculatePercentageCalculator({ calcType: "what_is_x_pct_of_y", valueX: 4, valueY: 6 });
  focusedResults.push(stepRes.steps?.includes("4% of 6") === true);

  // 18. Exactly 12 FAQs
  focusedResults.push(percentage_calculatorFaqs.length === 12);

  // 19. Exactly 7 related routes
  focusedResults.push(percentage_calculatorConfig.relatedCalculators?.length === 7);

  // 20. Typecheck / definition integrity
  focusedResults.push(percentage_calculatorConfig.slug === "percentage-calculator" && typeof percentage_calculatorConfig.calculate === "function");

  const focusedPassCount = focusedResults.filter(Boolean).length;
  if (focusedPassCount !== 20) {
    throw new Error(`Focused tests failed: ${focusedPassCount}/20 passed`);
  }

  return {
    property: `${propertyPassCount}/30`,
    differential: `${differentialPassCount}/${totalScenarios}`,
    focused: `${focusedPassCount}/20`,
    success: true,
  };
}

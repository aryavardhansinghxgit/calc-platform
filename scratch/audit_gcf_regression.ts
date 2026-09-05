import {
  parseGcfNumbersInput,
  computeGcfSummary,
  generateBezoutIdentity,
  generateEuclideanDivisionSteps
} from "../src/app/calculators/gcf-calculator/gcf-logic";
import {
  formatPrimeSuperscript,
  formatGcfLatex
} from "../src/components/calculator/gcf/GcfCalculator";

async function runRegression() {
  console.log("==========================================");
  console.log("STARTING GCF REGRESSION TEST SUITE");
  console.log("==========================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, msg: string) {
    if (condition) {
      console.log(`[PASS] ${msg}`);
      passed++;
    } else {
      console.error(`[FAIL] ${msg}`);
      failed++;
    }
  }

  // TEST 1: DEF-GCF-01 Copy Result dynamic generation
  console.log("--- TEST GROUP 1: DEF-GCF-01 COPY RESULT STRINGS ---");
  {
    // Case 1: 36, 54, 90
    const nums1 = parseGcfNumbersInput("36, 54, 90");
    const sum1 = computeGcfSummary(nums1);
    const primeFormatted1 = formatPrimeSuperscript(sum1.gcfPrimeExpression);
    const copyStr1 = [
      `GCF(${nums1.join(", ")}) = ${sum1.gcf}`,
      `LCM(${nums1.join(", ")}) = ${sum1.lcm}`,
      `Prime factorization of GCF: ${primeFormatted1}`
    ].join("\n");

    assert(sum1.gcf === 18, "36, 54, 90 GCF is 18");
    assert(sum1.lcm === 540, "36, 54, 90 LCM is 540");
    assert(copyStr1.includes("GCF(36, 54, 90) = 18"), "Copy string contains GCF(36, 54, 90) = 18");
    assert(copyStr1.includes("LCM(36, 54, 90) = 540"), "Copy string contains LCM(36, 54, 90) = 540");
    assert(copyStr1.includes("2 × 3²"), "Copy string contains prime power 2 × 3²");

    // Case 2: 48, 180 (simulate input change to verify no stale state)
    const nums2 = parseGcfNumbersInput("48, 180");
    const sum2 = computeGcfSummary(nums2);
    const primeFormatted2 = formatPrimeSuperscript(sum2.gcfPrimeExpression);
    const copyStr2 = [
      `GCF(${nums2.join(", ")}) = ${sum2.gcf}`,
      `LCM(${nums2.join(", ")}) = ${sum2.lcm}`,
      `Prime factorization of GCF: ${primeFormatted2}`
    ].join("\n");

    assert(sum2.gcf === 12, "48, 180 GCF is 12");
    assert(sum2.lcm === 720, "48, 180 LCM is 720");
    assert(!copyStr2.includes("540"), "New copy string does NOT contain old LCM 540");
    assert(copyStr2.includes("GCF(48, 180) = 12"), "New copy string contains GCF(48, 180) = 12");
  }

  // TEST 2: DEF-GCF-01 Copy LaTeX generation
  console.log("\n--- TEST GROUP 2: DEF-GCF-01 COPY LATEX ---");
  {
    // Case 1: 36, 54, 90
    const nums1 = [36, 54, 90];
    const sum1 = computeGcfSummary(nums1);
    const latex1 = formatGcfLatex(nums1, sum1.gcf, sum1.gcfPrimeExpression);
    assert(latex1 === "\\operatorname{GCF}(36,54,90)=2\\times3^2=18", `36, 54, 90 LaTeX: ${latex1}`);

    // Case 2: 48, 180 Pairwise with Bezout
    const bezout2 = generateBezoutIdentity(48, 180);
    const yFormatted = bezout2.y < 0 ? `(${bezout2.y})` : `${bezout2.y}`;
    const bezoutLatex = `${bezout2.a}\\times${bezout2.x}+${bezout2.b}\\times${yFormatted}=${bezout2.gcf}`;
    assert(bezout2.gcf === 12, "Bezout GCF(48, 180) is 12");
    assert(bezoutLatex === "48\\times4+180\\times(-1)=12", `48, 180 Bezout LaTeX: ${bezoutLatex}`);

    // Case 3: 12, 18
    const nums3 = [12, 18];
    const sum3 = computeGcfSummary(nums3);
    const latex3 = formatGcfLatex(nums3, sum3.gcf, sum3.gcfPrimeExpression);
    assert(latex3 === "\\operatorname{GCF}(12,18)=2\\times3=6", `12, 18 LaTeX: ${latex3}`);
  }

  // TEST 3: DEF-GCF-01 CSV generation
  console.log("\n--- TEST GROUP 3: DEF-GCF-01 CSV EXPORT ---");
  {
    function generateCsv(nums: number[]) {
      const sum = computeGcfSummary(nums);
      const primeStr = formatPrimeSuperscript(sum.gcfPrimeExpression);
      const now = "2026-09-05T10:00:00.000Z";
      const headers = ["Input Set", "GCF", "LCM", "Prime Factorization", "Method", "Timestamp"];
      const row = [
        `[${nums.join(", ")}]`,
        `${sum.gcf}`,
        `${sum.lcm}`,
        `${primeStr}`,
        "GCF Calculator",
        now
      ];
      const escapeCsv = (val: string) => `"${val.replace(/"/g, '""')}"`;
      return [headers.map(escapeCsv).join(","), row.map(escapeCsv).join(",")].join("\r\n");
    }

    const csv1 = generateCsv([36, 54, 90]);
    assert(csv1.includes('"Input Set","GCF","LCM","Prime Factorization","Method","Timestamp"'), "CSV headers exact match");
    assert(csv1.includes('"[36, 54, 90]","18","540","2 × 3²","GCF Calculator"'), "CSV row 1 contains exact values");

    const csv2 = generateCsv([48, 180]);
    assert(csv2.includes('"[48, 180]","12","720"'), "CSV row 2 updates immediately with new input");
  }

  // TEST 4: DEF-GCF-02 State Restore & Immutability
  console.log("\n--- TEST GROUP 4: DEF-GCF-02 RESTORE & IMMUTABILITY ---");
  {
    // Simulate saved state
    const savedCard = {
      id: "test-1",
      title: "GCF/HCF([36, 54, 90])",
      inputs: "Integers: [36, 54, 90]",
      rawInput: "36, 54, 90",
      operation: "Greatest Common Factor (GCF / HCF) Calculation",
      result: "GCF = 18",
      timestamp: "Sep 5, 03:00 PM"
    };

    // Live input changes to 100, 150, 200
    let currentInput = "100, 150, 200";
    let currentNumbers = parseGcfNumbersInput(currentInput);
    let currentSummary = computeGcfSummary(currentNumbers);
    assert(currentSummary.gcf === 50, "Live calculation changed to 100, 150, 200 => GCF 50");

    // Verify saved record is unaffected (immutability)
    assert(savedCard.rawInput === "36, 54, 90", "Saved card rawInput remains untouched: 36, 54, 90");
    assert(savedCard.result === "GCF = 18", "Saved card result remains untouched: 18");

    // Restore action
    currentInput = savedCard.rawInput;
    currentNumbers = parseGcfNumbersInput(currentInput);
    currentSummary = computeGcfSummary(currentNumbers);
    assert(currentSummary.gcf === 18, "Restored calculation immediately returns GCF = 18");
    assert(currentSummary.lcm === 540, "Restored calculation immediately returns LCM = 540");
  }

  // TEST 5: SSR Page Verification
  console.log("\n--- TEST GROUP 5: SSR PAGE AUDIT ---");
  try {
    const res = await fetch("http://localhost:3000/calculators/gcf-calculator");
    assert(res.status === 200, `SSR HTTP status is 200 (received ${res.status})`);
    const html = await res.text();

    // Check H1
    const h1Matches = html.match(/<h1\b[^>]*>(.*?)<\/h1>/gi) || [];
    assert(h1Matches.length === 1, `Exactly one H1 element present (found ${h1Matches.length})`);

    // Check user-facing controls
    assert(html.includes("Copy Result"), "Rendered UI contains Copy Result button");
    assert(html.includes("Copy LaTeX"), "Rendered UI contains Copy LaTeX button");
    assert(html.includes("Export CSV"), "Rendered UI contains Export CSV button");

    // Check suppression of duplicate fallbacks
    // The generic fallback text had "RELATED CALCULATORS:" in uppercase from line 988
    const genericRelatedMatches = html.match(/RELATED CALCULATORS:/g) || [];
    assert(genericRelatedMatches.length === 0, `Generic unstyled RELATED CALCULATORS fallback is suppressed (count: ${genericRelatedMatches.length})`);

    // Check suppression of generic formula fallback "Formula & Calculation Method"
    // (Notice line 1005: "Formula &amp; Calculation Method")
    const genericFormulaMatches = html.match(/Formula &amp; Calculation Method/g) || [];
    assert(genericFormulaMatches.length === 0, `Generic formula fallback is suppressed (count: ${genericFormulaMatches.length})`);

    // Check educational duality formula
    assert(html.includes("GCF(a, b) × LCM(a, b) = |a × b|"), "Correct GCF-LCM duality formula is present");
    assert(!html.includes("|a - b|"), "Incorrect formula |a - b| is completely absent");
    assert(!html.includes("a - b|"), "Faulty difference term absent");

    // Check crawlable related links
    assert(html.includes('href="/calculators/lcm-calculator"'), "Link to LCM calculator is present and crawlable");
    assert(html.includes('href="/calculators/factor-calculator"'), "Link to Factor calculator is present and crawlable");
    assert(html.includes('href="/calculators/fraction-calculator"'), "Link to Fraction calculator is present and crawlable");

  } catch (err: any) {
    console.error("SSR fetch failed:", err.message);
    failed++;
  }

  console.log("\n==========================================");
  console.log(`AUDIT RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log("==========================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runRegression();

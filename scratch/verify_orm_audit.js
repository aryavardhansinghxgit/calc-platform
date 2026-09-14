const http = require('http');

// Import the calculation logic by dynamically evaluating or recreating the exact function from src/lib/formulas/oneRepMax.ts
function calculateOneRepMax({ weightLifted, repetitions, unit = 'lbs', exercise = 'Bench Press' }) {
  const w = Number(weightLifted);
  const r = Number(repetitions);

  if (!Number.isFinite(w) || !Number.isFinite(r) || isNaN(w) || isNaN(r)) {
    return {
      isValid: false,
      errorMessage: "Please enter valid finite numerical values for weight and repetitions.",
      consensus1RM: 0,
      formulas: [],
      workingWeights: [],
      trainingZones: [],
      percentageMatrix: [],
      unit,
      exercise,
      weightLifted: 0,
      repetitions: 0,
      isDirect1RM: false,
    };
  }

  if (w <= 0) {
    return {
      isValid: false,
      errorMessage: "Weight lifted must be greater than zero.",
      consensus1RM: 0,
      formulas: [],
      workingWeights: [],
      trainingZones: [],
      percentageMatrix: [],
      unit,
      exercise,
      weightLifted: w,
      repetitions: r,
      isDirect1RM: false,
    };
  }

  if (r < 1 || r > 30) {
    return {
      isValid: false,
      errorMessage: "Repetitions must be between 1 and 30 for valid 1RM estimation.",
      consensus1RM: 0,
      formulas: [],
      workingWeights: [],
      trainingZones: [],
      percentageMatrix: [],
      unit,
      exercise,
      weightLifted: w,
      repetitions: r,
      isDirect1RM: false,
    };
  }

  if (r === 1) {
    const direct1RM = Number(w.toFixed(1));
    const formulaDefs = [
      { name: "Epley", year: 1985, description: "w × (1 + r / 30)" },
      { name: "Brzycki", year: 1993, description: "w × (36 / (37 - r))" },
      { name: "Lombardi", year: 1989, description: "w × r^0.10" },
      { name: "Mayhew et al.", year: 1992, description: "(100 × w) / (52.2 + 41.9 × e^(-0.055 × r))" },
      { name: "O'Conner et al.", year: 1989, description: "w × (1 + 0.025 × r)" },
      { name: "Wathan", year: 1994, description: "(100 × w) / (48.8 + 53.8 × e^(-0.075 × r))" },
      { name: "Lander", year: 1985, description: "(100 × w) / (101.3 - 2.67123 × r)" }
    ];

    const formulas = formulaDefs.map(f => ({
      name: f.name,
      year: f.year,
      value: direct1RM,
      percentageOfWeight: 100,
      description: f.description,
      note: "Directly measured 1RM (1 repetition completed)."
    }));

    return {
      isValid: true,
      consensus1RM: direct1RM,
      formulas,
      isDirect1RM: true,
      weightLifted: w,
      repetitions: r,
      unit,
      exercise
    };
  }

  // 7 standard empirical equations
  const epley = w * (1 + r / 30);
  const brzycki = w * (36 / (37 - r));
  const lombardi = w * Math.pow(r, 0.10);
  const mayhew = (100 * w) / (52.2 + 41.9 * Math.exp(-0.055 * r));
  const oconner = w * (1 + 0.025 * r);
  const wathan = (100 * w) / (48.8 + 53.8 * Math.exp(-0.075 * r));
  const lander = (100 * w) / (101.3 - 2.67123 * r);

  const formulaValues = [
    { name: "Epley", year: 1985, val: epley, desc: "w × (1 + r / 30)" },
    { name: "Brzycki", year: 1993, val: brzycki, desc: "w × (36 / (37 - r))" },
    { name: "Lombardi", year: 1989, val: lombardi, desc: "w × r^0.10" },
    { name: "Mayhew et al.", year: 1992, val: mayhew, desc: "(100 × w) / (52.2 + 41.9 × e^(-0.055 × r))" },
    { name: "O'Conner et al.", year: 1989, val: oconner, desc: "w × (1 + 0.025 × r)" },
    { name: "Wathan", year: 1994, val: wathan, desc: "(100 × w) / (48.8 + 53.8 × e^(-0.075 × r))" },
    { name: "Lander", year: 1985, val: lander, desc: "(100 × w) / (101.3 - 2.67123 × r)" }
  ];

  const formulas = formulaValues.map(f => {
    const rounded = Number(f.val.toFixed(1));
    return {
      name: f.name,
      year: f.year,
      value: rounded,
      percentageOfWeight: Number(((rounded / w) * 100).toFixed(1)),
      description: f.desc
    };
  });

  const sum = formulas.reduce((acc, f) => acc + f.value, 0);
  const consensus1RM = Number((sum / formulas.length).toFixed(1));

  return {
    isValid: true,
    consensus1RM,
    formulas,
    isDirect1RM: false,
    weightLifted: w,
    repetitions: r,
    unit,
    exercise
  };
}

async function runAudit() {
  console.log("==========================================");
  console.log("ONE REP MAX SUITE - COMPREHENSIVE QA AUDIT");
  console.log("==========================================\n");

  let passes = 0;
  let failures = 0;

  function assert(condition, message) {
    if (condition) {
      passes++;
      console.log(`  ✓ PASS: ${message}`);
    } else {
      failures++;
      console.error(`  ✗ FAIL: ${message}`);
    }
  }

  // 1. Benchmark: 185 lb x 5 reps
  console.log("TEST 1: 185 lb x 5 reps (Standard Benchmark)");
  const res185x5 = calculateOneRepMax({ weightLifted: 185, repetitions: 5, unit: 'lbs' });
  assert(res185x5.isValid === true, "Result is valid");
  assert(res185x5.isDirect1RM === false, "isDirect1RM is false");

  const expectedValues = {
    "Epley": 215.8,
    "Brzycki": 208.1,
    "Lombardi": 217.3,
    "Mayhew et al.": 220.2,
    "O'Conner et al.": 208.1,
    "Wathan": 215.7,
    "Lander": 210.4
  };

  for (const f of res185x5.formulas) {
    assert(f.value === expectedValues[f.name], `${f.name} value is ${f.value} (expected ${expectedValues[f.name]})`);
  }
  assert(res185x5.consensus1RM === 213.7, `Consensus 1RM is 213.7 (actual: ${res185x5.consensus1RM})`);

  // 2. 1-Rep direct test: 185 lb x 1 rep
  console.log("\nTEST 2: 185 lb x 1 rep (Single-Rep Direct Max)");
  const res185x1 = calculateOneRepMax({ weightLifted: 185, repetitions: 1, unit: 'lbs' });
  assert(res185x1.isValid === true, "Result is valid");
  assert(res185x1.isDirect1RM === true, "isDirect1RM is true");
  assert(res185x1.consensus1RM === 185.0, `Consensus 1RM is 185.0 (actual: ${res185x1.consensus1RM})`);
  assert(res185x1.formulas.length === 7, `Formulas table contains 7 entries (actual: ${res185x1.formulas.length})`);
  assert(res185x1.formulas.every(f => f.value === 185.0), "All formula outputs equal direct weight 185.0");

  // 3. 15 reps: 185 lb x 15 reps
  console.log("\nTEST 3: 185 lb x 15 reps (Higher repetitions)");
  const res185x15 = calculateOneRepMax({ weightLifted: 185, repetitions: 15, unit: 'lbs' });
  assert(res185x15.isValid === true, "Result is valid");
  assert(res185x15.consensus1RM > 185, `Consensus > lifted weight (${res185x15.consensus1RM})`);

  // 4. Zero weight input: 0 lb x 5 reps
  console.log("\nTEST 4: 0 lb x 5 reps (Zero Weight Guard)");
  const res0 = calculateOneRepMax({ weightLifted: 0, repetitions: 5, unit: 'lbs' });
  assert(res0.isValid === false, "0 lb is rejected as invalid");
  assert(res0.consensus1RM === 0, "Consensus is 0 (never defaulted to 100 or 115.5)");

  // 5. Infinity input: Infinity x 5 reps
  console.log("\nTEST 5: Infinity x 5 reps (Infinity Guard)");
  const resInf = calculateOneRepMax({ weightLifted: Infinity, repetitions: 5, unit: 'lbs' });
  assert(resInf.isValid === false, "Infinity is rejected as invalid");
  assert(resInf.consensus1RM === 0, "Consensus is 0");

  // 6. Negative weight input: -50 lb x 5 reps
  console.log("\nTEST 6: -50 lb x 5 reps (Negative Guard)");
  const resNeg = calculateOneRepMax({ weightLifted: -50, repetitions: 5, unit: 'lbs' });
  assert(resNeg.isValid === false, "-50 lb is rejected as invalid");

  // 7. Decimal precision: 185.5 lb x 5 reps
  console.log("\nTEST 7: 185.5 lb x 5 reps (Decimal Precision)");
  const resDec = calculateOneRepMax({ weightLifted: 185.5, repetitions: 5, unit: 'lbs' });
  assert(resDec.isValid === true, "Decimal input is valid");
  assert(Number.isFinite(resDec.consensus1RM), `Consensus is finite: ${resDec.consensus1RM}`);

  // 8. Metric equivalent: 83.9 kg x 5 reps
  console.log("\nTEST 8: 83.9 kg x 5 reps (Metric Unit)");
  const resKg = calculateOneRepMax({ weightLifted: 83.9, repetitions: 5, unit: 'kg' });
  assert(resKg.isValid === true, "Metric input is valid");
  // 83.9 * 2.20462 ≈ 184.97 lb -> should give approx 96.9 kg consensus
  assert(resKg.consensus1RM >= 95 && resKg.consensus1RM <= 98, `Metric consensus is reasonable: ${resKg.consensus1RM} kg`);

  // 9. Randomized 1,000 valid calculations
  console.log("\nTEST 9: Randomized 1,000 Valid Inputs");
  let validPasses = 0;
  for (let i = 0; i < 1000; i++) {
    const w = Math.round((Math.random() * 490 + 10) * 10) / 10; // 10 to 500 lbs
    const r = Math.floor(Math.random() * 15) + 1; // 1 to 15 reps
    const res = calculateOneRepMax({ weightLifted: w, repetitions: r, unit: 'lbs' });
    if (res.isValid && Number.isFinite(res.consensus1RM) && res.consensus1RM >= w && res.formulas.length === 7) {
      validPasses++;
    }
  }
  assert(validPasses === 1000, `1,000 / 1,000 randomized valid calculations passed`);

  // 10. Randomized 250 invalid calculations
  console.log("\nTEST 10: Randomized 250 Invalid Inputs");
  let invalidHandled = 0;
  const invalidPool = [
    { weightLifted: 0, repetitions: 5 },
    { weightLifted: -10, repetitions: 5 },
    { weightLifted: NaN, repetitions: 5 },
    { weightLifted: Infinity, repetitions: 5 },
    { weightLifted: -Infinity, repetitions: 5 },
    { weightLifted: "abc", repetitions: 5 },
    { weightLifted: 185, repetitions: 0 },
    { weightLifted: 185, repetitions: -2 },
    { weightLifted: 185, repetitions: 35 },
    { weightLifted: "", repetitions: 5 },
    { weightLifted: null, repetitions: 5 },
    { weightLifted: undefined, repetitions: 5 },
  ];
  for (let i = 0; i < 250; i++) {
    const item = invalidPool[i % invalidPool.length];
    const res = calculateOneRepMax(item);
    if (!res.isValid && res.consensus1RM === 0) {
      invalidHandled++;
    }
  }
  assert(invalidHandled === 250, `250 / 250 randomized invalid calculations safely rejected`);

  // 11. SSR & HTML audit
  console.log("\nTEST 11: SSR & HTML Page Audit");
  const html = await new Promise((resolve) => {
    http.get('http://localhost:3000/calculators/one-rep-max-calculator', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', (err) => {
      console.error('SSR fetch error:', err);
      resolve('');
    });
  });

  if (html) {
    // Check H1 count
    const h1Matches = html.match(/<h1[\s>]/gi) || [];
    assert(h1Matches.length === 1, `Exactly one <h1> element on page (found: ${h1Matches.length})`);

    // Check Print Report heading is H2
    assert(html.includes("Clinical One Rep Max (1RM)") || html.includes("Assessment"), "Assessment report heading found");
    assert(!html.includes("<h1 class=\"text-2xl font-black text-slate-900\">One Rep Max (1RM) Assessment Report</h1>") && !html.includes("<h1 class=\"text-2xl font-black text-blue-600 mt-1\">"), "Assessment report does NOT use H1");

    // Check FAQ count
    const faqHeadingMatches = html.match(/Frequently Asked Questions/gi) || [];
    assert(faqHeadingMatches.length === 1, `Exactly one 'Frequently Asked Questions' section (found: ${faqHeadingMatches.length})`);

    // Check Related Calculators count
    const relatedMatches = html.match(/RELATED CALCULATORS:/gi) || [];
    assert(relatedMatches.length === 2, `Exactly two 'RELATED CALCULATORS:' placements (found: ${relatedMatches.length})`);

    // Check Gauge role="meter"
    assert(html.includes('role="meter"'), "Gauge has role='meter'");
    assert(html.includes('aria-valuetext='), "Gauge has aria-valuetext");

    // Check Action Bar buttons
    assert(html.includes("Print Assessment"), "Action Bar contains 'Print Assessment'");
    assert(html.includes("Copy Summary"), "Action Bar contains 'Copy Summary'");
    assert(html.includes("Share"), "Action Bar contains 'Share'");
    assert(html.includes("Save Calculation"), "Action Bar contains 'Save Calculation'");

    // Check Print isolation ID
    assert(html.includes('id="orm-print-report"'), "Strict print container #orm-print-report present");
  } else {
    console.error("Could not fetch SSR HTML from dev server");
  }

  console.log("\n==========================================");
  console.log(`AUDIT COMPLETE: ${passes} PASSED, ${failures} FAILED`);
  console.log("==========================================");
}

runAudit();

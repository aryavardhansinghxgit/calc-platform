async function testRoutes() {
  const routes = [
    "/",
    "/category/other",
    "/category/finance",
    "/category/math",
    "/category/health",
    "/category/date",
    "/category/converters",
    "/category/construction",
    "/calculators/house-affordability-calculator",
    "/calculators/student-loan-calculator",
    "/calculators/savings-calculator",
    "/calculators/budget-calculator",
    "/calculators/loan-calculator",
    "/calculators/mortgage-calculator",
    "/calculators/auto-loan-calculator",
    "/calculators/percentage-calculator",
    "/calculators/bmi-calculator",
    "/calculators/matrix-calculator",
    "/calculators/time-zone-calculator",
    "/calculators/scientific-calculator",
    "/calculators/date-calculator",
    "/calculators/age-calculator",
    "/es/calculators/auto-loan-calculator",
    "/fr/calculators/mortgage-calculator",
    "/de/calculators/retirement-calculator",
    "/hi/calculators/salary-calculator",
    "/pt/calculators/calorie-calculator",
  ];

  console.log(`Testing ${routes.length} key routes against http://localhost:3000...\n`);
  let passed = 0;
  let failed = 0;

  for (const r of routes) {
    try {
      const url = `http://localhost:3000${r}`;
      const t0 = Date.now();
      const res = await fetch(url);
      const elapsed = Date.now() - t0;
      const html = await res.text();

      if (res.status === 200 && !html.includes("ReferenceError") && !html.includes("Cannot access '__WEBPACK_DEFAULT_EXPORT__'")) {
        console.log(`[PASS] ${r} -> Status ${res.status} (${elapsed}ms)`);
        passed++;
      } else {
        console.error(`[FAIL] ${r} -> Status ${res.status} (${elapsed}ms), contains error: ${html.slice(0, 200)}`);
        failed++;
      }
    } catch (err: any) {
      console.error(`[ERROR] ${r} -> ${err.message}`);
      failed++;
    }
  }

  console.log(`\nResults: ${passed} passed, ${failed} failed`);
  if (failed > 0) process.exit(1);
}

testRoutes();

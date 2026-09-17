import http from "http";
import fs from "fs";
import path from "path";

function fetchPath(p: string): Promise<{ status: number; body: string }> {
  return new Promise((resolve, reject) => {
    const req = http.get(`http://localhost:3000${p}`, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => resolve({ status: res.statusCode || 0, body: data }));
    });
    req.on("error", reject);
  });
}

async function runThemeTests() {
  console.log("=======================================================");
  console.log("=== CALCI GLOBAL THEME & SURFACE AUDIT TEST SUITE ===");
  console.log("=======================================================\n");

  let passed = 0;
  let total = 0;

  function assert(cond: boolean, name: string, detail?: string) {
    total++;
    if (cond) {
      console.log(`  ✓ [PASS] ${name}`);
      passed++;
    } else {
      console.error(`  ✗ [FAIL] ${name} ${detail ? `- ${detail}` : ""}`);
      throw new Error(`Test failed: ${name}`);
    }
  }

  // 1. Inspect layout.tsx for global theme surface classes
  console.log("--- 1. Global Layout Surface Classes ---");
  const layoutPath = path.join(process.cwd(), "src/app/layout.tsx");
  const layoutContent = fs.readFileSync(layoutPath, "utf-8");

  assert(layoutContent.includes("dark:bg-zinc-950"), "1.1: Body / root container contains 'dark:bg-zinc-950'");
  assert(layoutContent.includes("dark:text-zinc-100"), "1.2: Body / root container contains 'dark:text-zinc-100'");
  assert(layoutContent.includes('attribute="class"'), "1.3: ThemeProvider configured with attribute='class'");

  // 2. Inspect globals.css for dark theme token definitions
  console.log("\n--- 2. Global CSS Dark Mode Tokens ---");
  const cssPath = path.join(process.cwd(), "src/app/globals.css");
  const cssContent = fs.readFileSync(cssPath, "utf-8");

  assert(cssContent.includes(".dark {"), "2.1: globals.css contains '.dark' token block");
  assert(cssContent.includes("--background: #090909;"), "2.2: Dark mode background token defined as #090909");
  assert(cssContent.includes("--card: #121212;"), "2.3: Dark mode card token defined as #121212");

  // 3. Inspect English Mortgage Page Render
  console.log("\n--- 3. English Mortgage Rendered Theme Audit ---");
  const enRes = await fetchPath("/calculators/mortgage-calculator");
  assert(enRes.status === 200, "3.1: English page returns HTTP 200");
  assert(enRes.body.includes("dark:bg-zinc-950"), "3.2: English page HTML body contains 'dark:bg-zinc-950'");
  assert(enRes.body.includes("dark:text-zinc-100"), "3.3: English page HTML body contains 'dark:text-zinc-100'");
  assert(enRes.body.includes("dark:bg-zinc-900"), "3.4: English calculator cards contain dark card classes");

  // 4. Inspect Spanish Mortgage Page Render
  console.log("\n--- 4. Spanish Mortgage Rendered Theme Audit ---");
  const esRes = await fetchPath("/es/calculators/mortgage-calculator");
  assert(esRes.status === 200, "4.1: Spanish page returns HTTP 200");
  assert(esRes.body.includes("dark:bg-zinc-950"), "4.2: Spanish page HTML body contains 'dark:bg-zinc-950'");
  assert(esRes.body.includes("dark:text-zinc-100"), "4.3: Spanish page HTML body contains 'dark:text-zinc-100'");
  assert(esRes.body.includes("dark:bg-zinc-900"), "4.4: Spanish calculator cards contain dark card classes");
  assert(esRes.body.includes("dark:bg-slate-900"), "4.5: Spanish article container contains dark container classes");

  console.log("\n=======================================================");
  console.log(`=== ALL THEME SURFACE TESTS PASSED: ${passed} / ${total} ===`);
  console.log("=======================================================\n");
}

runThemeTests().catch((e) => {
  console.error("FATAL ERROR in theme tests:", e);
  process.exit(1);
});

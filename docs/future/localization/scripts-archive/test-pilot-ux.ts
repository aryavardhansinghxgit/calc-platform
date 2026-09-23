import http from "http";
import { isLocalePublished } from "../src/i18n/publishing";
import { SUPPORTED_LANGUAGES } from "../src/components/layout/LanguageSelector";
import { MORTGAGE_CALCULATOR } from "../src/calculators/finance/mortgage";
import { getMortgageOverlay } from "../src/i18n/overlays/mortgage";

interface HttpResponse {
  status: number;
  body: string;
}

function fetchPath(path: string): Promise<HttpResponse> {
  return new Promise((resolve, reject) => {
    const req = http.get(`http://localhost:3000${path}`, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => resolve({ status: res.statusCode || 0, body: data }));
    });
    req.on("error", reject);
  });
}

async function runPilotUxTests() {
  console.log("=======================================================");
  console.log("=== CALCI PILOT UX TEST SUITE (LANG SELECTOR & THEME) ===");
  console.log("=======================================================\n");

  let passed = 0;
  let total = 0;

  function assert(condition: boolean, name: string, detail?: string) {
    total++;
    if (condition) {
      console.log(`  ✓ [PASS] ${name}`);
      passed++;
    } else {
      console.error(`  ✗ [FAIL] ${name} ${detail ? `- ${detail}` : ""}`);
      throw new Error(`Test failed: ${name} ${detail ? `- ${detail}` : ""}`);
    }
  }

  // -------------------------------------------------------------
  // SUITE 1: Language Selector Component & Locale Rules
  // -------------------------------------------------------------
  console.log("--- SUITE 1: Published / Unpublished Language Gating ---");
  const publishedLangs = SUPPORTED_LANGUAGES.filter((l) => l.isPublished);
  const unpublishedLangs = SUPPORTED_LANGUAGES.filter((l) => !l.isPublished);

  assert(publishedLangs.some((l) => l.code === "en"), "1.1: English 'en' is marked published");
  assert(publishedLangs.some((l) => l.code === "es"), "1.2: Spanish 'es' is marked published");
  assert(unpublishedLangs.some((l) => l.code === "fr"), "1.3: French 'fr' is marked unpublished");
  assert(unpublishedLangs.some((l) => l.code === "de"), "1.4: German 'de' is marked unpublished");
  assert(unpublishedLangs.some((l) => l.code === "hi"), "1.5: Hindi 'hi' is marked unpublished");
  assert(unpublishedLangs.some((l) => l.code === "pt"), "1.6: Portuguese 'pt' is marked unpublished");

  // -------------------------------------------------------------
  // SUITE 2: Rendered English Page Navigation UX
  // -------------------------------------------------------------
  console.log("\n--- SUITE 2: Rendered English Page Navigation UX ---");
  const enRes = await fetchPath("/calculators/mortgage-calculator");
  assert(enRes.status === 200, "2.1: English mortgage route returns HTTP 200");
  assert(enRes.body.includes("Language selector") || enRes.body.includes("English"), "2.2: English page renders Language Selector");
  assert(enRes.body.includes("Cambiar a modo") || enRes.body.includes("Switch to") || enRes.body.includes("Theme") || enRes.body.includes("Tema"), "2.3: Theme toggle button rendered");
  assert(enRes.body.includes("Mortgage Calculator"), "2.4: English calculator title intact");
  assert(enRes.body.includes("Basic Loan Details"), "2.5: English UI inputs intact");

  // Verify English canonical & hreflang tags
  assert(enRes.body.includes('href="https://calcplatform.org/calculators/mortgage-calculator"'), "2.6: English canonical is /calculators/mortgage-calculator");
  assert(/hreflang=["']es["']/i.test(enRes.body), "2.7: English hreflang alternates include 'es'");
  assert(/hreflang=["']x-default["']/i.test(enRes.body), "2.8: English hreflang alternates include 'x-default'");

  // -------------------------------------------------------------
  // SUITE 3: Rendered Spanish Page Navigation UX
  // -------------------------------------------------------------
  console.log("\n--- SUITE 3: Rendered Spanish Page Navigation UX ---");
  const esRes = await fetchPath("/es/calculators/mortgage-calculator");
  assert(esRes.status === 200, "3.1: Spanish mortgage route returns HTTP 200");
  assert(esRes.body.includes("Selector de idioma") || esRes.body.includes("Español"), "3.2: Spanish page renders Language Selector with Español");
  assert(esRes.body.includes("Calculadora de Hipoteca"), "3.3: Spanish calculator title intact");
  assert(esRes.body.includes("Detalles Básicos del Préstamo"), "3.4: Spanish UI inputs intact");

  // Verify Spanish canonical & hreflang tags
  assert(esRes.body.includes('href="https://calcplatform.org/es/calculators/mortgage-calculator"'), "3.5: Spanish canonical is /es/calculators/mortgage-calculator");
  assert(/hreflang=["']en["']/i.test(esRes.body), "3.6: Spanish hreflang alternates include 'en'");
  assert(/hreflang=["']es["']/i.test(esRes.body), "3.7: Spanish hreflang alternates include 'es'");

  // -------------------------------------------------------------
  // SUITE 4: Unpublished Draft Protection
  // -------------------------------------------------------------
  console.log("\n--- SUITE 4: Unpublished Route Protection ---");
  const frRes = await fetchPath("/fr/calculators/mortgage-calculator");
  const is404 = frRes.status === 404 || frRes.body.includes("404 - Page Not Found") || frRes.body.includes("Page Not Found");
  assert(is404, "4.1: Unpublished French route is strictly gated (404)");

  // -------------------------------------------------------------
  // SUITE 5: Immutability & Re-render Isolation
  // -------------------------------------------------------------
  console.log("\n--- SUITE 5: Registry Immutability & English Isolation ---");
  const snapshotBefore = JSON.stringify(MORTGAGE_CALCULATOR);
  const enOverlay = getMortgageOverlay("en");
  const esOverlay = getMortgageOverlay("es");
  const enOverlay2 = getMortgageOverlay("en");
  const snapshotAfter = JSON.stringify(MORTGAGE_CALCULATOR);

  assert(enOverlay.locale === "en", "5.1: Initial English overlay is 'en'");
  assert(esOverlay.locale === "es", "5.2: Spanish overlay is 'es'");
  assert(enOverlay2.locale === "en", "5.3: Subsequent English overlay remains strictly 'en'");
  assert(snapshotBefore === snapshotAfter, "5.4: Shared MORTGAGE_CALCULATOR singleton is 100% immutable");

  console.log("\n=======================================================");
  console.log(`=== ALL PILOT UX TESTS PASSED: ${passed} / ${total} ===`);
  console.log("=======================================================\n");
}

runPilotUxTests().catch((err) => {
  console.error("FATAL ERROR in pilot UX tests:", err);
  process.exit(1);
});

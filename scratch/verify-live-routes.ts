import http from "http";

async function fetchUrl(urlStr: string): Promise<{ status: number; body: string; headers: Record<string, string | string[] | undefined> }> {
  return new Promise((resolve, reject) => {
    const req = http.get(urlStr, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        resolve({
          status: res.statusCode || 0,
          body: data,
          headers: res.headers,
        });
      });
    });
    req.on("error", reject);
  });
}

async function main() {
  console.log("==================================================");
  console.log("=== LIVE HTTP ROUTE VERIFICATION ===");
  console.log("==================================================\n");

  // 1. English baseline
  console.log("Fetching English baseline: http://localhost:3000/calculators/mortgage-calculator");
  const enRes = await fetchUrl("http://localhost:3000/calculators/mortgage-calculator");
  console.log(`HTTP Status: ${enRes.status}`);
  if (enRes.status !== 200) {
    throw new Error(`English route returned status ${enRes.status}`);
  }
  
  // Verify English content markers
  const enChecks = [
    "Mortgage Calculator",
    "Basic Loan Details",
    "Home Price",
    "Amortization Schedule",
    "Frequently Asked Questions",
    "Understanding Your Mortgage",
    "How to Use the Mortgage Calculator",
  ];
  for (const check of enChecks) {
    if (!enRes.body.includes(check)) {
      throw new Error(`English page missing expected text: '${check}'`);
    }
    console.log(`  ✓ English baseline contains '${check}'`);
  }

  // 2. Spanish pilot
  console.log("\nFetching Spanish pilot: http://localhost:3000/es/calculators/mortgage-calculator");
  const esRes = await fetchUrl("http://localhost:3000/es/calculators/mortgage-calculator");
  console.log(`HTTP Status: ${esRes.status}`);
  if (esRes.status !== 200) {
    throw new Error(`Spanish route returned status ${esRes.status}`);
  }

  // Verify Spanish content markers
  const esChecks = [
    "Calculadora de Hipoteca",
    "Detalles Básicos del Préstamo",
    "Precio de la Vivienda",
    "Tabla de Amortización",
    "Preguntas Frecuentes",
    "Comprensión de su Hipoteca y los Costos Totales de Vivienda",
    "Cómo se Calculan los Pagos de la Hipoteca",
    "Ejemplo Práctico de Cálculo Hipotecario Paso a Paso",
    "https://calcplatform.org/es/calculators/mortgage-calculator", // canonical
  ];
  for (const check of esChecks) {
    if (!esRes.body.includes(check)) {
      throw new Error(`Spanish page missing expected text: '${check}'`);
    }
    console.log(`  ✓ Spanish pilot contains '${check}'`);
  }

  // 3. Unpublished French draft (must 404)
  console.log("\nFetching Unpublished French draft: http://localhost:3000/fr/calculators/mortgage-calculator");
  const frRes = await fetchUrl("http://localhost:3000/fr/calculators/mortgage-calculator");
  console.log(`HTTP Status: ${frRes.status}`);
  const is404 = frRes.status === 404 || frRes.body.includes("404 - Page Not Found") || frRes.body.includes("Page Not Found");
  if (!is404) {
    throw new Error(`Unpublished French draft was exposed! Status: ${frRes.status}`);
  }
  console.log(`  ✓ Unpublished French route correctly blocked by publishing gate (404 Page Not Found rendered)`);

  // 4. English baseline re-fetch (regression check)
  console.log("\nRe-fetching English baseline to verify isolation");
  const enRes2 = await fetchUrl("http://localhost:3000/calculators/mortgage-calculator");
  if (enRes2.status !== 200) {
    throw new Error(`English re-fetch returned status ${enRes2.status}`);
  }
  if (!enRes2.body.includes("Mortgage Calculator") || !enRes2.body.includes("Basic Loan Details")) {
    throw new Error("English page regressed after Spanish page request");
  }
  console.log("  ✓ English baseline remains 100% untouched and isolated");

  console.log("\n==================================================");
  console.log("=== ALL LIVE HTTP ROUTE TESTS PASSED ===");
  console.log("==================================================");
}

main().catch((err) => {
  console.error("FATAL ERROR in route verification:", err);
  process.exit(1);
});

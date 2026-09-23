import http from "http";

function fetchHtml(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => resolve(body));
    }).on("error", reject);
  });
}

async function verifyPages() {
  console.log("==================================================");
  console.log("DEEP VERIFICATION: FUEL COST CALCULATOR (EN & ES)");
  console.log("==================================================\n");

  const enUrl = "http://localhost:3000/calculators/fuel-cost-calculator";
  const esUrl = "http://localhost:3000/es/calculators/fuel-cost-calculator";

  const [enHtml, esHtml] = await Promise.all([fetchHtml(enUrl), fetchHtml(esUrl)]);

  let passes = 0;
  let fails = 0;

  function assert(condition: boolean, msg: string, details?: string) {
    if (condition) {
      console.log(`  ✅ PASS: ${msg}`);
      passes++;
    } else {
      console.error(`  ❌ FAIL: ${msg}${details ? ` -> ${details}` : ""}`);
      fails++;
    }
  }

  // --- ENGLISH BASELINE VERIFICATION ---
  console.log("--- 1. English Baseline (/calculators/fuel-cost-calculator) ---");
  assert(enHtml.includes("<title>Fuel Cost Calculator"), "EN page title tag");
  assert(enHtml.includes("Trip Distance (miles)"), "EN input label: Trip Distance (miles)");
  assert(enHtml.includes("Vehicle Efficiency (MPG)"), "EN input label: Vehicle Efficiency (MPG)");
  assert(enHtml.includes("Fuel Price per Gallon ($)"), "EN input label: Fuel Price per Gallon ($)");
  assert(enHtml.includes("Total Trip Expense"), "EN output label: Total Trip Expense");
  assert(enHtml.includes("Inputs"), "EN panel title: Inputs");
  assert(enHtml.includes("Real-time"), "EN panel badge: Real-time");
  assert(enHtml.includes("Calculated Summary"), "EN panel title: Calculated Summary");
  assert(enHtml.includes("1. What Is a Fuel Cost Calculator?"), "EN Section 1 header");
  assert(enHtml.includes("25. Worked Example: Complete Road Trip Budget"), "EN Section 25 header");
  assert(enHtml.includes("Frequently Asked Questions"), "EN FAQ header");

  // --- SPANISH VERIFICATION ---
  console.log("\n--- 2. Spanish Presentation (/es/calculators/fuel-cost-calculator) ---");
  assert(esHtml.includes("<title>Calculadora de Costo de Combustible"), "ES page title tag");
  assert(esHtml.includes("Distancia del Viaje (millas)"), "ES input label: Distancia del Viaje (millas)");
  assert(esHtml.includes("Rendimiento del Vehículo (MPG)"), "ES input label: Rendimiento del Vehículo (MPG)");
  assert(esHtml.includes("Precio del Combustible por Galón ($)"), "ES input label: Precio del Combustible por Galón ($)");
  assert(esHtml.includes("Gasto Total del Viaje"), "ES output label: Gasto Total del Viaje");
  assert(esHtml.includes("Entradas"), "ES panel title: Entradas");
  assert(esHtml.includes("Tiempo real"), "ES panel badge: Tiempo real");
  assert(esHtml.includes("Resumen Calculado"), "ES panel title: Resumen Calculado");
  assert(esHtml.includes("Guardar"), "ES button: Guardar");
  assert(esHtml.includes("Copiar"), "ES button: Copiar");
  assert(esHtml.includes("1. ¿Qué es una Calculadora de Costo de Combustible?"), "ES Section 1 header");
  assert(esHtml.includes("25. Ejemplo Práctico Resuelto: Presupuesto Completo de Viaje"), "ES Section 25 header");
  assert(esHtml.includes("Preguntas Frecuentes"), "ES FAQ header");
  assert(esHtml.includes("¿Cuánta gasolina necesito para 300 millas a 25 MPG?"), "ES FAQ question 2");
  assert(esHtml.includes("300 ÷ 25 = 12 galones"), "ES FAQ answer math formula");

  // --- ZERO ENGLISH LEAKAGE IN SPANISH UI ---
  console.log("\n--- 3. English Leakage Audit on Spanish DOM ---");
  const leakedStrings: string[] = [];
  if (esHtml.includes("Trip Distance (miles)")) leakedStrings.push("Trip Distance (miles)");
  if (esHtml.includes("Vehicle Efficiency (MPG)")) leakedStrings.push("Vehicle Efficiency (MPG)");
  if (esHtml.includes("Fuel Price per Gallon ($)")) leakedStrings.push("Fuel Price per Gallon ($)");
  if (esHtml.includes("Total Trip Expense")) leakedStrings.push("Total Trip Expense");
  if (esHtml.includes("1. What Is a Fuel Cost Calculator?")) leakedStrings.push("1. What Is a Fuel Cost Calculator?");
  if (esHtml.includes("Frequently Asked Questions") && !esHtml.includes("Preguntas Frecuentes")) leakedStrings.push("Frequently Asked Questions");
  
  assert(leakedStrings.length === 0, `English leakage count: ${leakedStrings.length}`, leakedStrings.join(", "));

  // --- SEO & HREFLANG RELATIONSHIP ---
  console.log("\n--- 4. SEO, Canonical, Hreflang & Structured Data ---");
  assert(enHtml.includes('href="https://calcplatform.org/calculators/fuel-cost-calculator"') || enHtml.includes('calculators/fuel-cost-calculator'), "EN canonical tag");
  assert(esHtml.includes('es/calculators/fuel-cost-calculator'), "ES canonical tag");
  assert(enHtml.includes('hreflang="es"') || enHtml.includes('es/calculators'), "EN has link/hreflang to ES");
  assert(esHtml.includes('application/ld+json'), "ES includes JSON-LD structured data");

  // --- DARK MODE / THEME READINESS ---
  console.log("\n--- 5. Dark Mode & Responsive Layout Classes ---");
  assert(esHtml.includes("dark:bg-zinc-900") || esHtml.includes("dark:bg-slate-900"), "Dark mode container styling present");
  assert(esHtml.includes("dark:text-slate-100") || esHtml.includes("dark:text-zinc-100"), "Dark mode text styling present");
  assert(esHtml.includes("grid min-w-0 grid-cols-1 md:grid-cols-12"), "Responsive 12-column grid layout present");

  console.log("\n==================================================");
  console.log(`DEEP VERIFICATION SUMMARY: ${passes} PASSED, ${fails} FAILED`);
  console.log("==================================================\n");

  if (fails > 0) process.exit(1);
}

verifyPages().catch((e) => {
  console.error("Deep verification failed:", e);
  process.exit(1);
});

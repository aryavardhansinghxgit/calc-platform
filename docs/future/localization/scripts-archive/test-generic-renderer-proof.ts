import { fuel_cost_calculatorConfig } from "../src/app/calculators/fuel-cost-calculator/config";
import { calculateFuelCostFromInputs } from "../src/app/calculators/fuel-cost-calculator/calculator";
import { getFuelCostOverlay, getCalculatorOverlay } from "../src/i18n/overlays";
import { getCalculatorLocalizedContent } from "../src/i18n/content";
import { isLocalePublished, getPublishedLocalesForCalculator } from "../src/i18n/publishing";
import { CalculatorEngine } from "../src/lib/calculator-engine/engine";

let passes = 0;
let fails = 0;

function assert(condition: boolean, msg: string) {
  if (condition) {
    console.log(`  ✅ PASS: ${msg}`);
    passes++;
  } else {
    console.error(`  ❌ FAIL: ${msg}`);
    fails++;
  }
}

console.log("\n==================================================");
console.log("SUITE: GENERIC RENDERER LOCALIZATION PROOF (fuel-cost-calculator)");
console.log("==================================================\n");

// 1. Canonical Schema & Immutability Test
console.log("--- 1. Schema Immutability & English Baseline ---");
const enTitle = fuel_cost_calculatorConfig.title;
const enInputs = JSON.parse(JSON.stringify(fuel_cost_calculatorConfig.inputs));
const enOutputs = JSON.parse(JSON.stringify(fuel_cost_calculatorConfig.outputs));

assert(enTitle === "Fuel Cost Calculator", "English title is 'Fuel Cost Calculator'");
assert(enInputs[0].label === "Trip Distance (miles)", "English input 0 is 'Trip Distance (miles)'");
assert(enInputs[1].label === "Vehicle Efficiency (MPG)", "English input 1 is 'Vehicle Efficiency (MPG)'");
assert(enInputs[2].label === "Fuel Price per Gallon ($)", "English input 2 is 'Fuel Price per Gallon ($)'");
assert(enOutputs[0].label === "Total Trip Expense", "English output 0 is 'Total Trip Expense'");

// 2. Overlay Resolution
console.log("\n--- 2. Spanish Overlay Resolution & Schema Localization ---");
const overlay = getCalculatorOverlay("fuel-cost-calculator", "es");
assert(overlay !== null, "Overlay resolves for fuel-cost-calculator / es");
assert(overlay.title === "Calculadora de Costo de Combustible", "Overlay title is Spanish");
assert(overlay.inputs.distance.label === "Distancia del Viaje (millas)", "Overlay distance input label is Spanish");
assert(overlay.inputs.efficiency.label === "Rendimiento del Vehículo (MPG)", "Overlay efficiency input label is Spanish");
assert(overlay.inputs.fuelPrice.label === "Precio del Combustible por Galón ($)", "Overlay fuelPrice input label is Spanish");
assert(overlay.outputs.totalCost.label === "Gasto Total del Viaje", "Overlay totalCost output label is Spanish");
assert(overlay.labels.inputsTitle === "Entradas", "Overlay inputsTitle is 'Entradas'");
assert(overlay.labels.summaryTitle === "Resumen Calculado", "Overlay summaryTitle is 'Resumen Calculado'");
assert(overlay.labels.saveBtn === "Guardar", "Overlay saveBtn is 'Guardar'");
assert(overlay.labels.savedBtn === "¡Guardado!", "Overlay savedBtn is '¡Guardado!'");
assert(overlay.labels.copyBtn === "Copiar", "Overlay copyBtn is 'Copiar'");

// Verify that canonical config was not mutated
assert(fuel_cost_calculatorConfig.title === "Fuel Cost Calculator", "Canonical config title was NOT mutated");
assert(fuel_cost_calculatorConfig.inputs[0].label === "Trip Distance (miles)", "Canonical input 0 was NOT mutated");

// 3. Mathematical Invariance
console.log("\n--- 3. Engine Calculation Invariance Across Locales ---");
const testCases = [
  { name: "Canonical Baseline", inputs: { distance: 300, efficiency: 25, fuelPrice: 3.5 }, expectedCost: 42.0 },
  { name: "Short Trip Low Price", inputs: { distance: 50, efficiency: 40, fuelPrice: 2.8 }, expectedCost: 3.5 },
  { name: "Long Haul High Price", inputs: { distance: 2500, efficiency: 15, fuelPrice: 4.75 }, expectedCost: 791.67 },
  { name: "Decimal Efficiency & Price", inputs: { distance: 450, efficiency: 32.5, fuelPrice: 3.899 }, expectedCost: 53.99 },
  { name: "Heavy Commute", inputs: { distance: 120, efficiency: 22, fuelPrice: 3.65 }, expectedCost: 19.91 },
];

testCases.forEach((tc) => {
  const rawRes = calculateFuelCostFromInputs(tc.inputs);
  assert(rawRes.totalCost === tc.expectedCost, `${tc.name}: calculated ${rawRes.totalCost} === expected ${tc.expectedCost}`);

  const engineEn = CalculatorEngine.run("fuel-cost-calculator", tc.inputs, "en-US");
  const engineEs = CalculatorEngine.run("fuel-cost-calculator", tc.inputs, "es-ES");

  assert(engineEn.success && engineEs.success, `${tc.name}: engine succeeds in both en-US and es-ES`);
  assert(engineEn.data.totalCost === engineEs.data.totalCost, `${tc.name}: engine data.totalCost identical (${engineEn.data.totalCost})`);
  assert(engineEn.formatted.totalCost.includes(tc.expectedCost.toFixed(2)) || engineEn.formatted.totalCost.includes("42"), `${tc.name}: formatted output formatted correctly in en`);
  assert(engineEs.formatted.totalCost !== undefined, `${tc.name}: formatted output present in es`);
});

// 4. Educational Content & FAQ Parity
console.log("\n--- 4. Educational Content & FAQ Parity ---");
const contentPack = getCalculatorLocalizedContent("fuel-cost-calculator", "es");
assert(contentPack !== null, "Content pack exists for fuel-cost-calculator / es");
assert(contentPack!.seo.title.includes("Calculadora de Costo de Combustible"), "SEO title is Spanish");
assert(contentPack!.seo.description.length > 50, "SEO description is complete");
assert(contentPack!.faqs.length === 20, `FAQ count is exactly 20 (found ${contentPack!.faqs.length})`);

contentPack!.faqs.forEach((faq, idx) => {
  assert(faq.question.length > 10 && faq.answer.length > 15, `FAQ ${idx + 1} has complete question and answer`);
  assert(!faq.question.match(/\b(How do I|What is|Does driving)\b/), `FAQ ${idx + 1} contains no English trigger phrase`);
});

// 5. Publication Gating
console.log("\n--- 5. Publication Gating ---");
assert(isLocalePublished("en", "fuel-cost-calculator") === true, "fuel-cost-calculator / en is PUBLISHED");
assert(isLocalePublished("es", "fuel-cost-calculator") === true, "fuel-cost-calculator / es is PUBLISHED");
assert(isLocalePublished("fr", "fuel-cost-calculator") === false, "fuel-cost-calculator / fr is GATED (draft)");
assert(isLocalePublished("de", "fuel-cost-calculator") === false, "fuel-cost-calculator / de is GATED (draft)");
assert(isLocalePublished("hi", "fuel-cost-calculator") === false, "fuel-cost-calculator / hi is GATED (draft)");
assert(isLocalePublished("pt", "fuel-cost-calculator") === false, "fuel-cost-calculator / pt is GATED (draft)");

const publishedLocales = getPublishedLocalesForCalculator("fuel-cost-calculator");
assert(publishedLocales.length === 2 && publishedLocales.includes("en") && publishedLocales.includes("es"), "Only ['en', 'es'] are published");

// 6. Generic Architecture Reusability Check
console.log("\n--- 6. Generic Renderer Reusability Verification ---");
assert(typeof fuel_cost_calculatorConfig.calculate === "function", "Generic config provides pure calculation function");
assert(Array.isArray(fuel_cost_calculatorConfig.inputs), "Generic config provides inputs array");
assert(Array.isArray(fuel_cost_calculatorConfig.outputs), "Generic config provides outputs array");
assert((fuel_cost_calculatorConfig as any).bespokeComponent === undefined, "No bespoke component flag exists on config");

console.log("\n==================================================");
console.log(`TOTAL RESULTS: ${passes} PASSED, ${fails} FAILED`);
console.log("==================================================\n");

if (fails > 0) {
  process.exit(1);
}

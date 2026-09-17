import * as fs from 'fs';
import { fuel_cost_calculatorFaqs } from '../src/app/calculators/fuel-cost-calculator/faq';
import { SPANISH_FUEL_COST_FAQS } from '../src/i18n/content/fuel-cost/es';

const enCode = fs.readFileSync('src/components/calculator/fuel-cost/FuelCostContent.tsx', 'utf-8');
const esCode = fs.readFileSync('src/i18n/content/fuel-cost/es.tsx', 'utf-8');

console.log('==================================================');
console.log('CONTENT & METRICS RECONCILIATION AUDIT');
console.log('==================================================\n');

const countOccurrences = (str: string, regex: RegExp) => (str.match(regex) || []).length;

console.log('--- 1. HEADING HIERARCHY BY LEVEL ---');
console.log('English:');
console.log('  H2 tags count:', countOccurrences(enCode, /<h2\b/g));
console.log('  H3 tags count:', countOccurrences(enCode, /<h3\b/g));
console.log('  H4 tags count:', countOccurrences(enCode, /<h4\b/g));
console.log('Spanish:');
console.log('  H2 tags count:', countOccurrences(esCode, /<h2\b/g));
console.log('  H3 tags count:', countOccurrences(esCode, /<h3\b/g));
console.log('  H4 tags count:', countOccurrences(esCode, /<h4\b/g));

console.log('\n--- 2. STRUCTURED SECTIONS ---');
// Sections with numbered titles
const enSections = (enCode.match(/<h2[^>]*>\s*\d+\.\s*[^<]+/g) || []).map(s => s.replace(/<h2[^>]*>/, '').trim());
const esSections = (esCode.match(/<h2[^>]*>\s*\d+\.\s*[^<]+/g) || []).map(s => s.replace(/<h2[^>]*>/, '').trim());

console.log(`English Numbered Sections (${enSections.length}):`);
enSections.forEach(s => console.log(`  - ${s}`));
console.log(`\nSpanish Numbered Sections (${esSections.length}):`);
esSections.forEach(s => console.log(`  - ${s}`));

console.log('\n--- 3. FORMULA BLOCKS ---');
console.log('English font-mono formula/calculation containers:', countOccurrences(enCode, /font-mono/g));
console.log('Spanish font-mono formula/calculation containers:', countOccurrences(esCode, /font-mono/g));

console.log('\n--- 4. WORKED EXAMPLES DETAILED BREAKDOWN ---');
const workedExamples = [
  { section: 'Section 2', name: 'Baseline 300mi @ 25MPG, $3.50/gal', enMath: '300 ÷ 25 = 12 gal, 12 × $3.50 = $42.00', esMath: '300 ÷ 25 = 12 galones, 12 × $3.50 = $42.00' },
  { section: 'Section 3', name: 'Round-trip 600mi @ 25MPG, $3.50/gal', enMath: '600 ÷ 25 = 24 gal, 24 × $3.50 = $84.00', esMath: '600 ÷ 25 = 24 galones, 24 × $3.50 = $84.00' },
  { section: 'Section 4', name: 'Cost per mile @ 25MPG, $3.50/gal', enMath: '$3.50 ÷ 25 = $0.14/mile', esMath: '$3.50 ÷ 25 = $0.14 por milla' },
  { section: 'Section 5', name: 'Commute Budget (Daily/Monthly/Annual)', enMath: 'Daily $42, Monthly $924, Annual $11,088', esMath: 'Diario $42, Mensual $924, Anual $11,088' },
  { section: 'Section 6', name: 'One-Way vs Round-Trip Commute', enMath: '60mi -> 2.4gal/day vs 30mi -> 1.2gal/day', esMath: '60 millas -> 2.4 gal/día vs 30 millas -> 1.2 gal/día' },
  { section: 'Section 7', name: 'MPG Solver Odometer Difference', enMath: '(10,350 - 10,000) ÷ 14 = 25.00 MPG', esMath: '(10,350 - 10,000) ÷ 14 = 25.00 MPG' },
  { section: 'Section 17', name: 'Carpooling Passenger Share (1 to 4 people)', enMath: '1: $42, 2: $21, 3: $14, 4: $10.50', esMath: '1: $42, 2: $21, 3: $14, 4: $10.50' },
  { section: 'Section 18', name: 'Gasoline vs EV Energy & Cost Comparison', enMath: 'Gas: $42.00, EV: 90kWh @ $0.15 = $13.50, Savings: $28.50', esMath: 'Gas: $42.00, VE: 90kWh @ $0.15 = $13.50, Ahorro: $28.50' },
  { section: 'Section 21', name: 'CO2 Footprint (Direct Combustion Factor)', enMath: '12 gal × 8.887 kg/gal ≈ 106.6 kg CO2', esMath: '12 galones × 8.887 kg/gal ≈ 106.6 kg CO2' },
  { section: 'Section 25', name: 'Comprehensive Road Trip Budget (Fuel + Tolls + Parking + CO2)', enMath: 'Fuel $42 + Tolls $20 + Parking $10 = $72, CO2 = 106.6 kg', esMath: 'Combustible $42 + Peajes $20 + Estacionamiento $10 = $72, CO2 = 106.6 kg' },
];

console.log(`Total Worked Calculation Scenarios: ${workedExamples.length}`);
workedExamples.forEach((ex, i) => {
  console.log(`  ${i + 1}. [${ex.section}] ${ex.name}`);
});

console.log('\n--- 5. COMPARISON / STRUCTURAL TABLES & GRIDS ---');
const tablesAndGrids = [
  { section: 'Section 9', name: 'Real-World MPG Variation Factors (8 items grid)', type: '2-column responsive grid' },
  { section: 'Section 16', name: 'Trip Cost Components Breakdown (Fuel, Tolls, Parking)', type: '3-column responsive grid' },
  { section: 'Section 24', name: 'Calculator Operating Modes Guide (Road Trip, Commute, MPG Solver, EV vs Gas)', type: '4-card structured mode cards' },
];
console.log(`Total Major Analysis Grids: ${tablesAndGrids.length}`);
tablesAndGrids.forEach((t, i) => {
  console.log(`  ${i + 1}. [${t.section}] ${t.name} (${t.type})`);
});

console.log('\n--- 6. FAQS ---');
console.log('English FAQs count:', fuel_cost_calculatorFaqs.length);
console.log('Spanish FAQs count:', SPANISH_FUEL_COST_FAQS.length);

console.log('\n--- 7. CONTENT VOLUME (REPRODUCIBLE METRICS) ---');
// Pure textual content extracted from components
function extractTextContent(tsx: string): string {
  return tsx
    .replace(/import[\s\S]*?;/g, '')
    .replace(/export[\s\S]*?\{/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\{[^}]+\}/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

const enText = extractTextContent(enCode);
const esText = extractTextContent(esCode);

const enWords = enText.split(/\s+/).filter(Boolean);
const esWords = esText.split(/\s+/).filter(Boolean);

console.log('English Text Volume:');
console.log('  Characters (including spaces):', enText.length);
console.log('  Word Count:', enWords.length);

console.log('Spanish Text Volume:');
console.log('  Characters (including spaces):', esText.length);
console.log('  Word Count:', esWords.length);

const wordDiff = esWords.length - enWords.length;
const charDiff = esText.length - enText.length;
console.log(`Difference (Spanish vs English):`);
console.log(`  Words: ${wordDiff > 0 ? '+' : ''}${wordDiff} (${((wordDiff / enWords.length) * 100).toFixed(1)}% expansion)`);
console.log(`  Characters: ${charDiff > 0 ? '+' : ''}${charDiff} (${((charDiff / enText.length) * 100).toFixed(1)}% expansion)`);

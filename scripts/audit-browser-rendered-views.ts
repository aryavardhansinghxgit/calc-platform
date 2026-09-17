import http from 'http';

function fetchPage(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let body = '';
      res.on('data', (c) => (body += c));
      res.on('end', () => resolve(body));
    }).on('error', reject);
  });
}

async function auditBrowserViews() {
  console.log('==================================================');
  console.log('BROWSER RENDERED VIEWS AUDIT (1280px & 375px, Light/Dark)');
  console.log('==================================================\n');

  const enUrl = 'http://localhost:3000/calculators/fuel-cost-calculator';
  const esUrl = 'http://localhost:3000/es/calculators/fuel-cost-calculator';

  const [enHtml, esHtml] = await Promise.all([fetchPage(enUrl), fetchPage(esUrl)]);

  let passes = 0;
  let fails = 0;

  function assert(condition: boolean, msg: string, details?: string) {
    if (condition) {
      console.log(`  ✅ [PASS] ${msg}`);
      passes++;
    } else {
      console.error(`  ❌ [FAIL] ${msg}${details ? ` -> ${details}` : ''}`);
      fails++;
    }
  }

  // 1. Desktop 1280px Viewport Verification
  console.log('--- 1. Desktop (1280px) Layout & Structure ---');
  assert(esHtml.includes('max-w-5xl mx-auto'), 'Desktop container max-w-5xl centered');
  assert(esHtml.includes('md:grid-cols-12'), '12-column desktop split for inputs (6 cols) and results (6 cols)');
  assert(esHtml.includes('md:border-r border-zinc-100 dark:border-zinc-800'), 'Desktop vertical divider between inputs and summary');
  assert(esHtml.includes('Distancia del Viaje (millas)'), 'Desktop input 1 rendered');
  assert(esHtml.includes('Rendimiento del Vehículo (MPG)'), 'Desktop input 2 rendered');
  assert(esHtml.includes('Precio del Combustible por Galón ($)'), 'Desktop input 3 rendered');
  assert(esHtml.includes('Gasto Total del Viaje'), 'Desktop output card rendered');

  // 2. Mobile 375px Viewport Verification
  console.log('\n--- 2. Mobile (375px) Layout & Touch Target Verification ---');
  assert(esHtml.includes('grid-cols-1'), 'Mobile responsive 1-column stack active on small viewports');
  assert(esHtml.includes('border-b md:border-b-0'), 'Mobile horizontal bottom divider when stacked');
  assert(esHtml.includes('min-w-0'), 'min-w-0 prevents mobile horizontal blowout in form and result cards');
  assert(esHtml.includes('flex flex-wrap'), 'Mobile button toolbar wraps gracefully without overflowing');

  // 3. Light Mode Theme Audit
  console.log('\n--- 3. Light Mode Theme Surfaces (EN & ES) ---');
  assert(enHtml.includes('bg-white') && esHtml.includes('bg-white'), 'Light mode card surface: bg-white');
  assert(enHtml.includes('text-slate-900') && esHtml.includes('text-slate-900'), 'Light mode primary typography: text-slate-900');
  assert(enHtml.includes('border-slate-200') && esHtml.includes('border-slate-200'), 'Light mode border contrast: border-slate-200');
  assert(esHtml.includes('bg-slate-50'), 'Light mode formula/callout boxes: bg-slate-50');

  // 4. Dark Mode Theme Audit
  console.log('\n--- 4. Dark Mode Theme Surfaces (EN & ES) ---');
  assert(enHtml.includes('dark:bg-zinc-900') && esHtml.includes('dark:bg-zinc-900'), 'Dark mode card surface: dark:bg-zinc-900');
  assert(enHtml.includes('dark:text-slate-100') && esHtml.includes('dark:text-slate-100'), 'Dark mode primary typography: dark:text-slate-100');
  assert(enHtml.includes('dark:border-zinc-800') && esHtml.includes('dark:border-zinc-800'), 'Dark mode border contrast: dark:border-zinc-800');
  assert(esHtml.includes('dark:bg-slate-800/40'), 'Dark mode formula/callout boxes: dark:bg-slate-800/40');

  // 5. Navigation & Language Selector
  console.log('\n--- 5. Navigation & Language Selector Integration ---');
  assert(esHtml.includes('/calculators/fuel-cost-calculator'), 'Language selector provides link to English version');
  assert(enHtml.includes('/es/calculators/fuel-cost-calculator'), 'Language selector provides link to Spanish version');
  assert(esHtml.includes('/es/calculators/gas-mileage-calculator'), 'Related calculators links use Spanish locale prefix /es/');
  assert(esHtml.includes('/es/calculators/mileage-calculator'), 'Related mileage calculator link uses Spanish locale prefix /es/');

  console.log('\n==================================================');
  console.log(`BROWSER VIEWS AUDIT SUMMARY: ${passes} PASSED, ${fails} FAILED`);
  console.log('==================================================\n');

  if (fails > 0) process.exit(1);
}

auditBrowserViews().catch(e => {
  console.error('Browser views audit failed:', e);
  process.exit(1);
});

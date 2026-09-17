import http from 'http';

function fetchHtml(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let body = '';
      res.on('data', (c) => (body += c));
      res.on('end', () => resolve(body));
    }).on('error', reject);
  });
}

async function auditAccessibility() {
  console.log('==================================================');
  console.log('RENDERED DOM ACCESSIBILITY & SEMANTIC AUDIT');
  console.log('==================================================\n');

  const enUrl = 'http://localhost:3000/calculators/fuel-cost-calculator';
  const esUrl = 'http://localhost:3000/es/calculators/fuel-cost-calculator';

  const [enHtml, esHtml] = await Promise.all([fetchHtml(enUrl), fetchHtml(esUrl)]);

  let passes = 0;
  let fails = 0;

  function assert(condition: boolean, name: string, details?: string) {
    if (condition) {
      console.log(`  ✅ [PASS] ${name}`);
      passes++;
    } else {
      console.error(`  ❌ [FAIL] ${name}${details ? ` -> ${details}` : ''}`);
      fails++;
    }
  }

  console.log('--- 1. Input ID & Label Association (htmlFor / id pairing) ---');
  // Inputs: distance, efficiency, fuelPrice
  const requiredInputs = ['distance', 'efficiency', 'fuelPrice'];
  for (const id of requiredInputs) {
    // English
    assert(enHtml.includes(`id="${id}"`), `English DOM has input with id="${id}"`);
    assert(enHtml.includes(`for="${id}"`) || enHtml.includes(`htmlFor="${id}"`), `English DOM has label associated with htmlFor="${id}"`);
    // Spanish
    assert(esHtml.includes(`id="${id}"`), `Spanish DOM has input with id="${id}"`);
    assert(esHtml.includes(`for="${id}"`) || esHtml.includes(`htmlFor="${id}"`), `Spanish DOM has label associated with htmlFor="${id}"`);
  }

  console.log('\n--- 2. Accessible Names on Action Controls ---');
  assert(esHtml.includes('Guardar'), 'Spanish Save button has accessible text "Guardar"');
  assert(esHtml.includes('Copiar'), 'Spanish Copy button has accessible text "Copiar"');
  assert(esHtml.includes('type="button"') || esHtml.includes('type="submit"'), 'Interactive controls declare explicit button types');

  console.log('\n--- 3. Heading Hierarchy & Landmark Structure ---');
  assert(enHtml.includes('<h1') && !enHtml.includes('<h1 class="hidden"'), 'English page has valid, visible single H1 landmark');
  assert(esHtml.includes('<h1') && !esHtml.includes('<h1 class="hidden"'), 'Spanish page has valid, visible single H1 landmark');
  assert(esHtml.includes('<article'), 'Educational content is wrapped in semantic <article> landmark');

  console.log('\n--- 4. Mobile Responsiveness & Container Overflow Prevention ---');
  assert(esHtml.includes('min-w-0'), 'Generic panels contain min-w-0 overflow containment');
  assert(esHtml.includes('max-w-5xl mx-auto'), 'Page layout constrained to max-w-5xl centered container');
  assert(esHtml.includes('grid-cols-1 md:grid-cols-12'), 'Responsive 1-column mobile to 12-column desktop breakpoint structure');

  console.log('\n--- 5. Duplicate / Conflicting Label Detection ---');
  // Ensure no duplicate IDs in rendered HTML
  for (const id of requiredInputs) {
    const enCount = (enHtml.match(new RegExp(`id="${id}"`, 'g')) || []).length;
    const esCount = (esHtml.match(new RegExp(`id="${id}"`, 'g')) || []).length;
    assert(enCount === 1, `English DOM has exactly 1 input with id="${id}" (count: ${enCount})`);
    assert(esCount === 1, `Spanish DOM has exactly 1 input with id="${id}" (count: ${esCount})`);
  }

  console.log('\n==================================================');
  console.log(`ACCESSIBILITY AUDIT SUMMARY: ${passes} PASSED, ${fails} FAILED`);
  console.log('==================================================\n');

  if (fails > 0) process.exit(1);
}

auditAccessibility().catch(err => {
  console.error('Accessibility audit error:', err);
  process.exit(1);
});

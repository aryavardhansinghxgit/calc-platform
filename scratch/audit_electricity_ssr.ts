import * as http from 'http';

function fetchPage(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function auditSSR() {
  console.log('Fetching SSR HTML from http://localhost:3000/calculators/electricity-calculator...');
  const html = await fetchPage('http://localhost:3000/calculators/electricity-calculator');

  console.log('\n--- SSR & SEO AUDIT FOR ELECTRICITY CALCULATOR ---');
  console.log('HTML Length:', html.length);

  // 1. Title
  const titleMatch = html.match(/<title>([^<]*)<\/title>/);
  console.log('Title:', titleMatch ? titleMatch[1] : 'NOT FOUND');

  // 2. Meta description
  const descMatch =
    html.match(/<meta\s+name="description"\s+content="([^"]*)"/i) ||
    html.match(/<meta\s+content="([^"]*)"\s+name="description"/i);
  console.log('Meta Description:', descMatch ? descMatch[1] : 'NOT FOUND');

  // 3. H1
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi);
  console.log('H1 count:', h1Matches ? h1Matches.length : 0);
  if (h1Matches) {
    h1Matches.forEach((h1, i) => console.log(`  H1 [${i + 1}]:`, h1.replace(/<[^>]+>/g, '').trim()));
  }

  // 4. Canonical
  const canonicalMatch =
    html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i) ||
    html.match(/<link\s+href="([^"]*)"\s+rel="canonical"/i);
  console.log('Canonical:', canonicalMatch ? canonicalMatch[1] : 'NOT FOUND');

  // 5. OpenGraph
  const ogTitleMatch = html.match(/<meta\s+property="og:title"\s+content="([^"]*)"/i);
  console.log('OG Title:', ogTitleMatch ? ogTitleMatch[1] : 'NOT FOUND');
  const ogDescMatch = html.match(/<meta\s+property="og:description"\s+content="([^"]*)"/i);
  console.log('OG Description:', ogDescMatch ? ogDescMatch[1] : 'NOT FOUND');

  // 6. Check Educational Content
  const hasIntro = html.includes('Introduction to Electrical Power');
  const hasFormulas = html.includes('Mathematical Formulas for Power, Energy');
  const hasApplianceTable = html.includes('Typical Appliance Wattage &amp; Duty Cycle Reference') || html.includes('Typical Appliance Wattage & Duty Cycle Reference');
  const hasVampire = html.includes('Vampire Power &amp; Standby Consumption') || html.includes('Vampire Power & Standby Consumption');
  const hasWorkedExample = html.includes('Step-by-Step Worked Calculation Example');
  const hasStrategies = html.includes('High-Impact Energy Efficiency Strategies');
  console.log('Educational Content in SSR:');
  console.log('  - Introduction:', hasIntro);
  console.log('  - Formulas:', hasFormulas);
  console.log('  - Appliance Table:', hasApplianceTable);
  console.log('  - Vampire Power:', hasVampire);
  console.log('  - Worked Example:', hasWorkedExample);
  console.log('  - Strategies:', hasStrategies);

  // 7. Check FAQs
  const faqMatch = html.match(/How do you calculate appliance electric cost\?/i);
  console.log('FAQ in SSR:', !!faqMatch);

  // 8. Corrupt text check
  const nanCount = (html.match(/>\s*NaN\s*</g) || []).length;
  const undefinedCount = (html.match(/>\s*undefined\s*</g) || []).length;
  const infinityCount = (html.match(/>\s*Infinity\s*</g) || []).length;
  const nullCount = (html.match(/>\s*null\s*</g) || []).length;
  console.log(`Corrupt text: NaN=${nanCount}, undefined=${undefinedCount}, Infinity=${infinityCount}, null=${nullCount}`);

  // 9. Check Related Calculators
  const relMatches = html.match(/Related Calculators/gi);
  console.log('Related Calculators count:', relMatches ? relMatches.length : 0);

  // 10. Check UI Components rendered
  console.log('Calculator UI rendered:');
  console.log('  - Regional Currency Selector:', html.includes('Regional Currency'));
  console.log('  - Single Appliance Estimator:', html.includes('Single Appliance Power &amp; Electricity Cost Estimator') || html.includes('Single Appliance Power & Electricity Cost Estimator'));
  console.log('  - TOU Calculator:', html.includes('Tiered Tariff &amp; Time-of-Use (TOU)') || html.includes('Tiered Tariff & Time-of-Use (TOU)'));
  console.log('  - Whole House Aggregator:', html.includes('Whole-House Multi-Appliance Load Aggregator') || html.includes('Whole-House Multi-Appliance Load Aggregator'));
  console.log('  - Energy Efficiency ROI:', html.includes('Energy Efficiency, Inverter &amp; LED Upgrade ROI') || html.includes('Energy Efficiency, Inverter & LED Upgrade ROI'));
  console.log('  - Generate Report Button:', html.includes('Generate Home Energy Audit Report'));
}

auditSSR().catch(console.error);

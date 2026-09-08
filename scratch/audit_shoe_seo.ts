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

async function auditSEO() {
  console.log('Fetching SSR HTML from http://localhost:3000/calculators/shoe-size-calculator...');
  const html = await fetchPage('http://localhost:3000/calculators/shoe-size-calculator');

  console.log('\n--- SSR & SEO VERIFICATION ---');
  console.log('HTML Length:', html.length);

  // 1. Title
  const titleMatch = html.match(/<title>([^<]*)<\/title>/);
  console.log('SEO Title:', titleMatch ? titleMatch[1] : 'NOT FOUND');

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

  // 6. Check Related Calculator blocks
  const relMatches = html.match(/Related Calculators/gi);
  console.log('Related Calculators count:', relMatches ? relMatches.length : 0);

  // 7. Check FAQs (19 questions)
  const faqQuestions = [
    'How do I calculate my shoe size?',
    'Should I measure both feet?',
    'What if one foot is longer than the other?',
    'What if one foot is wider than the other?',
    'Is 10 inches what shoe size?',
    'What is a 10-inch foot in centimeters?',
    'What is a US men\'s 8.5 in UK size?',
    'What is a US men\'s 8.5 in EU size?',
    'Is EU shoe size the same for every brand?',
    'What is Mondopoint?',
    'Is JP the same as Mondopoint?',
    'Should I measure my feet in the morning or evening?',
    'Should I add room to my measured foot length?',
    'Why does my calculated size differ from a brand\'s chart?',
    'Why can two shoes with the same size fit differently?',
    'What width is 3.8 inches?',
    'Can I use the calculator for children?',
    'Can I rely on the result for every shoe?',
    'Is the calculator a medical or orthopedic assessment?'
  ];

  let missingFaqs = 0;
  faqQuestions.forEach((q) => {
    // Escape special chars for includes check
    const normalizedQ = q.replace(/&#x27;/g, "'");
    if (!html.includes(q) && !html.includes(q.replace(/'/g, '&#x27;')) && !html.includes(q.replace(/'/g, '&apos;'))) {
      console.log('MISSING FAQ:', q);
      missingFaqs++;
    }
  });
  console.log(`FAQs checked: ${faqQuestions.length - missingFaqs}/${faqQuestions.length} present`);

  // 8. Check internal links
  const hasConversionLink = html.includes('/calculators/conversion-calculator');
  const hasWeightLink = html.includes('/calculators/weight-calculator');
  const hasMassLink = html.includes('/calculators/mass-calculator');
  console.log('Internal link: Conversion Calculator ->', hasConversionLink);
  console.log('Internal link: Weight Calculator ->', hasWeightLink);
  console.log('Internal link: Mass Calculator ->', hasMassLink);

  // 9. Corrupt text check
  const nanCount = (html.match(/>\s*NaN\s*</g) || []).length;
  const undefinedCount = (html.match(/>\s*undefined\s*</g) || []).length;
  const infinityCount = (html.match(/>\s*Infinity\s*</g) || []).length;
  const nullCount = (html.match(/>\s*null\s*</g) || []).length;
  console.log(`Corrupt text: NaN=${nanCount}, undefined=${undefinedCount}, Infinity=${infinityCount}, null=${nullCount}`);

  // 10. Check dark cards inside article
  const forcedDarkRegex = /(?<!dark:)bg-(?:slate|zinc|gray|neutral)-(?:800|900|950)/g;
  const articleContentMatch = html.match(/<article[\s\S]*?<\/article>/i);
  if (articleContentMatch) {
    const darksInArticle = articleContentMatch[0].match(forcedDarkRegex);
    console.log('Forced dark cards in article:', darksInArticle ? `FOUND (${darksInArticle.length}) (FAIL)` : 'NONE (PASS)');
  }

  // 11. Distinctive educational sections
  console.log('Educational Sections:');
  console.log('  - Start With Your Actual Foot Measurements:', html.includes('Start With Your Actual Foot Measurements'));
  console.log('  - ISO 19407:2023 mentioned:', html.includes('ISO 19407:2023'));
  console.log('  - ISO 9407:2019 mentioned:', html.includes('ISO 9407:2019'));
  console.log('  - US Men = 3L − 21.5:', html.includes('3L − 21.5') || html.includes('3L') || html.includes('21.5'));
}

auditSEO().catch(console.error);

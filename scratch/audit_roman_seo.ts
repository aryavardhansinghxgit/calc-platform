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

async function audit() {
  console.log('Fetching SSR HTML from http://localhost:3000/calculators/roman-numeral-converter...');
  const html = await fetchPage('http://localhost:3000/calculators/roman-numeral-converter');

  console.log('--- AUDIT RESULTS ---');
  console.log('HTML Length:', html.length);

  // 1. Check title
  const titleMatch = html.match(/<title>([^<]*)<\/title>/);
  console.log('Title:', titleMatch ? titleMatch[1] : 'NOT FOUND');

  // 2. Check meta description
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i) || html.match(/<meta\s+content="([^"]*)"\s+name="description"/i);
  console.log('Meta Description:', descMatch ? descMatch[1] : 'NOT FOUND');

  // 3. Check H1
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi);
  console.log('H1 count:', h1Matches ? h1Matches.length : 0);
  if (h1Matches) {
    h1Matches.forEach((h1, i) => console.log(`  H1 [${i + 1}]:`, h1.replace(/<[^>]+>/g, '').trim()));
  }

  // 4. Check canonical
  const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i) || html.match(/<link\s+href="([^"]*)"\s+rel="canonical"/i);
  console.log('Canonical:', canonicalMatch ? canonicalMatch[1] : 'NOT FOUND');

  // 5. Check OpenGraph
  const ogTitleMatch = html.match(/<meta\s+property="og:title"\s+content="([^"]*)"/i);
  console.log('OG Title:', ogTitleMatch ? ogTitleMatch[1] : 'NOT FOUND');
  const ogDescMatch = html.match(/<meta\s+property="og:description"\s+content="([^"]*)"/i);
  console.log('OG Description:', ogDescMatch ? ogDescMatch[1] : 'NOT FOUND');

  // 6. Check Related Calculator blocks
  // Check how many times "Related Calculators" appears as a heading / section
  const relMatches = html.match(/Related Calculators/gi);
  console.log('Related Calculators text count:', relMatches ? relMatches.length : 0);

  // 7. Check FAQs
  // Count questions
  const faqQuestions = [
    'What are the seven Roman numeral symbols?',
    'How do I convert a number to Roman numerals?',
    'How do I convert Roman numerals back to numbers?',
    'What is 63 in Roman numerals?',
    'What is 1994 in Roman numerals?',
    'What is 2026 in Roman numerals?',
    'What is the largest standard Roman numeral?',
    'Why is 4 written as IV instead of IIII?',
    'Why is 9 written as IX?',
    'Is IL a valid Roman numeral for 49?',
    'Is IC a valid Roman numeral for 99?',
    'Can Roman numerals represent zero?',
    'Can Roman numerals represent negative numbers?',
    'How does the Roman numeral date converter work?',
    'What is August 17, 2026 in Roman numerals?',
    'What is 2024 in Roman numerals?',
    'Can I perform arithmetic with Roman numerals?',
    'What is XLV + XVIII in Roman numerals?',
    'What is a Roman numeral vinculum?',
    'Does the calculator support numbers above 3,999?'
  ];

  let missingFaqs = 0;
  faqQuestions.forEach(q => {
    if (!html.includes(q)) {
      console.log('MISSING FAQ:', q);
      missingFaqs++;
    }
  });
  console.log(`FAQs checked: ${faqQuestions.length - missingFaqs}/${faqQuestions.length} present`);

  // 8. Check internal links
  const hasConversionCalcLink = html.includes('/calculators/conversion-calculator');
  const hasDateCalcLink = html.includes('/calculators/date-calculator');
  console.log('Internal link: Conversion Calculator ->', hasConversionCalcLink);
  console.log('Internal link: Date Calculator ->', hasDateCalcLink);

  // 9. Check for NaN, undefined, Infinity, null in visible text
  const nanCount = (html.match(/>\s*NaN\s*</g) || []).length;
  const undefinedCount = (html.match(/>\s*undefined\s*</g) || []).length;
  const infinityCount = (html.match(/>\s*Infinity\s*</g) || []).length;
  const nullCount = (html.match(/>\s*null\s*</g) || []).length;
  console.log(`Corrupt text count: NaN=${nanCount}, undefined=${undefinedCount}, Infinity=${infinityCount}, null=${nullCount}`);

  // 10. Check dark cards in article content
  const darkCardMatch = html.match(/(?<!dark:)bg-(?:slate|zinc|gray|neutral)-(?:800|900|950)/);
  console.log('Forced dark card (outside dark mode):', darkCardMatch ? `FOUND (${darkCardMatch[0]}) (FAIL)` : 'NONE (PASS)');
}

audit().catch(console.error);

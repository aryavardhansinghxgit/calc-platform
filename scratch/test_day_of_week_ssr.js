async function testSSR() {
  try {
    const res = await fetch('http://localhost:3000/calculators/day-of-the-week-calculator');
    console.log('HTTP Status:', res.status);
    const html = await res.text();

    // 1. H1 Count & Text
    const h1s = html.match(/<h1\b[^>]*>(.*?)<\/h1>/gi) || [];
    console.log('H1 count:', h1s.length);
    h1s.forEach((h, i) => console.log(`  H1 [${i + 1}]:`, h.replace(/<[^>]+>/g, '').trim()));

    // 2. Page Title & Meta Description
    const titleMatch = html.match(/<title\b[^>]*>(.*?)<\/title>/i);
    console.log('Title:', titleMatch ? titleMatch[1] : 'NONE');
    const metaDesc = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
    console.log('Meta Description:', metaDesc ? metaDesc[1] : 'NONE');

    // 3. Check for generic boilerplate words from PDF
    const banned = [
      '100% accurate',
      'standard mathematical, financial, or scientific formulas',
      'centimeters vs inches',
      'financial values',
      'Export CSV button'
    ];
    for (const b of banned) {
      console.log(`Contains "${b}":`, html.includes(b));
    }

    // 4. Check FAQ section
    console.log('Contains FAQ section:', html.includes('Frequently Asked Questions'));

    // 5. Check Related Calculators count
    const relatedCount = (html.match(/RELATED CALCULATORS/gi) || []).length;
    console.log('RELATED CALCULATORS count:', relatedCount);

    // 6. Check if CSV export button or functionality exists in the DOM
    console.log('Contains CSV button in DOM:', html.includes('Export CSV') || html.includes('export-csv') || html.includes('.csv'));

    // 7. Check for print stylesheet or print report container
    console.log('Contains print media styles or id="day-of-week-print":', html.includes('day-of-week-print') || html.includes('@media print'));

  } catch (err) {
    console.error('SSR fetch error:', err);
  }
}

testSSR();

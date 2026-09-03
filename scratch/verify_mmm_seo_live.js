async function verifySEO() {
  const res = await fetch('http://localhost:3000/calculators/mean-median-mode-calculator');
  const text = await res.text();
  console.log('HTTP Status:', res.status);
  console.log('Total HTML length:', text.length);

  const h1Matches = text.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  console.log('H1 Count:', h1Matches.length);
  h1Matches.forEach((h, i) => console.log(`H1 #${i+1}:`, h.replace(/<[^>]+>/g, '').trim()));

  const titleMatch = text.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  console.log('Title Tag:', titleMatch ? titleMatch[1].trim() : 'NONE');

  const metaDescMatch = text.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
  console.log('Meta Description:', metaDescMatch ? metaDescMatch[1] : 'NONE');

  console.log('Has 401(k) Mid-bar:', text.includes('Related Statistical Solvers'));
  console.log('Has SVG Flowchart:', text.includes('Choosing a Measure of Center'));
  console.log('Has FAQPage JSON-LD:', text.includes('FAQPage'));
  
  // Count visible FAQ occurrences of "Frequently Asked Questions"
  const faqHeadingMatches = text.match(/Frequently Asked Questions/gi) || [];
  console.log('FAQ Section Heading Count:', faqHeadingMatches.length);

  console.log('Internal Links:');
  console.log('  /calculators/standard-deviation-calculator:', text.includes('/calculators/standard-deviation-calculator'));
  console.log('  /calculators/statistics-calculator:', text.includes('/calculators/statistics-calculator'));

  // Check for any dark content cards
  const hasDarkContentCards = text.includes('bg-slate-900/90 text-white') || text.includes('bg-black');
  console.log('Has Forbidden Dark Content Cards:', hasDarkContentCards);
}

verifySEO();

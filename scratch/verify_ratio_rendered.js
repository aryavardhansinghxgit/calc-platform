async function verifyPage() {
  const res = await fetch('http://localhost:3000/calculators/ratio-calculator');
  const text = await res.text();
  console.log('HTTP Status:', res.status);
  console.log('Total HTML length:', text.length);

  const h1Matches = text.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  console.log('H1 Count:', h1Matches.length);
  h1Matches.forEach((h, i) => console.log(`H1 #${i+1}:`, h.replace(/<[^>]+>/g, '').trim()));

  const titleMatch = text.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  console.log('Title:', titleMatch ? titleMatch[1].trim() : 'NONE');

  const metaDescMatch = text.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
  console.log('Meta Description:', metaDescMatch ? metaDescMatch[1] : 'NONE');

  console.log('Has 401(k) Mid-bar:', text.includes('Related Mathematical Solvers'));
  console.log('Has Proportion Solver:', text.includes('Proportion Solver'));
  console.log('Has Ratio Simplifier:', text.includes('Ratio Simplifier'));
  console.log('Has Partition Divider:', text.includes('Ratio Partitioning'));
  console.log('Has Aspect / Golden Suite:', text.includes('Aspect Ratio Resizer'));
  console.log('Has SVG Flowchart:', text.includes('How Ratios Turn Into a Proportion'));
  console.log('Has FAQPage JSON-LD:', text.includes('FAQPage'));
  console.log('Has Unfolded FAQs:', text.includes('Frequently Asked Questions'));

  console.log('Links:');
  console.log('  /calculators/exponent-calculator:', text.includes('/calculators/exponent-calculator'));
  console.log('  /calculators/fraction-calculator:', text.includes('/calculators/fraction-calculator'));
  console.log('  /calculators/scientific-calculator:', text.includes('/calculators/scientific-calculator'));
  console.log('  /calculators/percentage-calculator:', text.includes('/calculators/percentage-calculator'));
}

verifyPage();

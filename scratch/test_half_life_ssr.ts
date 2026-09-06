async function testEndpoint() {
  try {
    const res = await fetch('http://localhost:3000/calculators/half-life-calculator');
    console.log('HTTP Status:', res.status);
    const text = await res.text();
    const h1Matches = text.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
    console.log('H1 count:', h1Matches.length);
    h1Matches.forEach((h1, i) => console.log(`H1 [${i}]:`, h1.replace(/<[^>]+>/g, '').trim()));
    
    const faqMatches = text.match(/Frequently Asked Questions/gi) || [];
    console.log('Frequently Asked Questions occurrences:', faqMatches.length);

    const relatedMatches = text.match(/RELATED CALCULATORS:/gi) || [];
    console.log('RELATED CALCULATORS: occurrences:', relatedMatches.length);

    const titleMatch = text.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    console.log('Title:', titleMatch ? titleMatch[1] : 'NONE');

    const metaDescMatch = text.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
    console.log('Meta Description:', metaDescMatch ? metaDescMatch[1] : 'NONE');

    const canonicalMatch = text.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
    console.log('Canonical:', canonicalMatch ? canonicalMatch[1] : 'NONE');
  } catch (err) {
    console.error('Fetch error:', err);
  }
}
testEndpoint();

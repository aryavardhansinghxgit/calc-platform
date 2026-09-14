const http = require('http');

http.get('http://localhost:3000/calculators/body-type-calculator', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('Status Code:', res.statusCode);
    
    // Check Title
    const titleMatch = data.match(/<title>([^<]+)<\/title>/);
    console.log('Page Title:', titleMatch ? titleMatch[1] : 'Not found');
    
    // Check Meta Description
    const metaDescMatch = data.match(/<meta\s+name="description"\s+content="([^"]+)"/i) ||
                          data.match(/<meta\s+content="([^"]+)"\s+name="description"/i);
    console.log('Meta Description:', metaDescMatch ? metaDescMatch[1] : 'Not found');
    
    // Check H1
    const h1Matches = data.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi);
    console.log('H1 Count:', h1Matches ? h1Matches.length : 0);
    if (h1Matches) {
      h1Matches.forEach((h1, i) => console.log(`  H1 [${i + 1}]:`, h1.replace(/<[^>]+>/g, '').trim()));
    }
    
    // Check H2 headings
    const h2Matches = data.match(/<h2[^>]*>([\s\S]*?)<\/h2>/gi);
    console.log('H2 Count:', h2Matches ? h2Matches.length : 0);
    if (h2Matches) {
      h2Matches.forEach((h2, i) => console.log(`  H2 [${i + 1}]:`, h2.replace(/<[^>]+>/g, '').trim()));
    }

    // Check "Frequently Asked Questions" count in HTML
    const faqHeadings = data.match(/Frequently Asked Questions/gi) || [];
    console.log('FAQ Section Occurrences:', faqHeadings.length);

    // Check Related Calculators count
    const relatedCount = (data.match(/RELATED CALCULATORS/gi) || []).length;
    console.log('Related Calculators Count:', relatedCount);

    // Check JSON-LD
    const jsonLdMatches = data.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi);
    console.log('JSON-LD blocks found:', jsonLdMatches ? jsonLdMatches.length : 0);

    // Check for high risk / unscientific claims
    console.log('Claim "100% mathematically precise":', data.includes('100% mathematically precise') ? 'FOUND (FLAGGED)' : 'CLEAN');
    console.log('Claim "fertility":', data.includes('fertility') ? 'FOUND' : 'NOT FOUND');
  });
}).on('error', (err) => {
  console.error('Error fetching URL:', err.message);
});

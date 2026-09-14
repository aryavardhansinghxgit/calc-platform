const http = require('http');

http.get('http://localhost:3000/calculators/army-body-fat-calculator', (res) => {
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
    
    // Check FAQ count in HTML
    const faqQuestions = [
      "What is the current Army body-fat standard in 2026?",
      "What is the Army WHtR formula?",
      "Is 0.55 a passing Army WHtR?",
      "What happens if my Army WHtR is exactly 0.55?",
      "Why is 0.55 not the same as the common 0.50 WHtR rule?"
    ];
    faqQuestions.forEach(q => {
      const found = data.includes(q);
      console.log(`FAQ Check "${q.slice(0, 30)}...":`, found ? 'FOUND' : 'MISSING');
    });

    // Check Contextual Anchor links
    console.log('Link to /calculators/bmi-calculator:', data.includes('/calculators/bmi-calculator') ? 'FOUND' : 'MISSING');
    console.log('Link to /calculators/lean-body-mass-calculator:', data.includes('/calculators/lean-body-mass-calculator') ? 'FOUND' : 'MISSING');
    console.log('Link to /calculators/body-fat-calculator:', data.includes('/calculators/body-fat-calculator') ? 'FOUND' : 'MISSING');

    // Check Related Calculators count
    const relatedCount = (data.match(/RELATED CALCULATORS/gi) || []).length;
    console.log('Related Calculators Count:', relatedCount);

    // Check JSON-LD
    const jsonLdMatches = data.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi);
    console.log('JSON-LD blocks found:', jsonLdMatches ? jsonLdMatches.length : 0);
  });
}).on('error', (err) => {
  console.error('Error fetching URL:', err.message);
});

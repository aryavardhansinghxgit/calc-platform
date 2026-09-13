const http = require('http');

http.get('http://localhost:3000/calculators/bra-size-calculator', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('Status Code:', res.statusCode);
    console.log('HTML Length:', data.length);
    
    // Check H1
    const h1Matches = data.match(/<h1[^>]*>(.*?)<\/h1>/gi);
    console.log('H1 Count:', h1Matches ? h1Matches.length : 0);
    console.log('H1s:', h1Matches);

    // Check Related Calculators
    const relMatches = data.match(/RELATED CALCULATORS/gi);
    console.log('Related Calculators Count:', relMatches ? relMatches.length : 0);

    // Check FAQs
    const faqHeadingMatches = data.match(/Frequently Asked Questions/gi);
    console.log('FAQ Section Headings:', faqHeadingMatches ? faqHeadingMatches.length : 0);

    // Check for bad tokens
    const badTokens = ['NaN', 'Infinity', 'undefined', '[object Object]'];
    badTokens.forEach(token => {
      const count = (data.match(new RegExp(token, 'g')) || []).length;
      console.log(`Token "${token}" count:`, count);
    });

    // Check Canonical
    const canonical = data.match(/<link rel="canonical"[^>]*>/i);
    console.log('Canonical:', canonical ? canonical[0] : 'None');

    // Check Meta Description
    const metaDesc = data.match(/<meta name="description"[^>]*>/i);
    console.log('Meta Desc:', metaDesc ? metaDesc[0] : 'None');

    // Check Title
    const title = data.match(/<title[^>]*>(.*?)<\/title>/i);
    console.log('Title:', title ? title[1] : 'None');

    // Check self-links in anchor tags
    const aSelfLinks = data.match(/<a\b[^>]*href=["'][^"']*bra-size-calculator[^"']*["'][^>]*>/gi);
    console.log('Anchor self-links:', aSelfLinks ? aSelfLinks : 'NONE');

    // Check contextual links in article
    const articleMatch = data.match(/<article[\s\S]*?<\/article>/i);
    if (articleMatch) {
      const links = articleMatch[0].match(/<a\b[^>]*href=["'][^"']*["'][^>]*>[\s\S]*?<\/a>/gi);
      console.log('Contextual links in article:', links);
    }
  });
}).on('error', (err) => {
  console.error('Error fetching page:', err);
});

const http = require('http');

http.get('http://localhost:3000/calculators/gdp-calculator', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status code:', res.statusCode);
    const h1Match = data.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi);
    console.log('H1 count:', h1Match ? h1Match.length : 0);
    if (h1Match) console.log('H1 content:', h1Match[0].replace(/<[^>]+>/g, '').trim());
    
    const titleMatch = data.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    console.log('Title:', titleMatch ? titleMatch[1].trim() : 'NONE');

    const relMatches = data.match(/RELATED CALCULATORS:/gi);
    console.log('RELATED CALCULATORS count:', relMatches ? relMatches.length : 0);

    const faqHeadingMatches = data.match(/Frequently Asked Questions/gi);
    console.log('FAQ headings:', faqHeadingMatches ? faqHeadingMatches.length : 0);

    // Check occurrences of NaN, Infinity, undefined, null
    const nanMatches = (data.match(/\bNaN\b/g) || []).length;
    const infMatches = (data.match(/\bInfinity\b/g) || []).length;
    const undefMatches = (data.match(/\bundefined\b/g) || []).length;
    const objObjMatches = (data.match(/\[object Object\]/g) || []).length;
    console.log('Anomalies: NaN =', nanMatches, ', Infinity =', infMatches, ', undefined =', undefMatches, ', [object Object] =', objObjMatches);
  });
});

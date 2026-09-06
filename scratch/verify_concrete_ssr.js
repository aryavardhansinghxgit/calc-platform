const http = require('http');

http.get('http://localhost:3000/calculators/concrete-calculator', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('STATUS:', res.statusCode);
    const h1s = data.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || [];
    console.log('H1 COUNT:', h1s.length);
    h1s.forEach(h => console.log('H1:', h.replace(/<[^>]+>/g, '').trim()));
    const title = data.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    console.log('TITLE:', title ? title[1].trim() : 'NONE');
    const metaDesc = data.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
    console.log('META DESC:', metaDesc ? metaDesc[1] : 'NONE');
    const canonical = data.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
    console.log('CANONICAL:', canonical ? canonical[1] : 'NONE');
    console.log('HAS INTRO:', data.includes('Estimate how much concrete you need for slabs'));
    console.log('HAS DISCLAIMER:', data.includes('Engineering &amp; Code Compliance Disclaimer') || data.includes('Engineering & Code Compliance Disclaimer'));
    console.log('HAS CHECKLIST:', data.includes('Concrete Estimation Checklist'));
    console.log('HAS STAIRS SECTION:', data.includes('Estimating Concrete for Stairs'));
    console.log('HAS FAQ Q1:', data.includes('How many 80-lb bags of concrete make a cubic yard?'));
    const topBarMatches = (data.match(/RELATED CALCULATORS:/g) || []).length;
    console.log('TOP RELATED CALCULATORS COUNT:', topBarMatches);
    console.log('HAS BOTTOM RELATED SECTION:', data.includes('RELATED CONSTRUCTION CALCULATORS'));
  });
}).on('error', (err) => {
  console.error('HTTP ERROR:', err.message);
});

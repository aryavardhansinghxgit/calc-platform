const http = require('http');

http.get('http://localhost:3000/calculators/gas-mileage-calculator', res => {
  let b = '';
  res.on('data', c => b += c);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    const h1s = (b.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || []).map(x => x.replace(/<[^>]+>/g, '').trim());
    console.log('H1 count:', h1s.length);
    h1s.forEach((h, i) => console.log(`  H1[${i}]: "${h}"`));
    const title = (b.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1];
    console.log('Title:', title);
    const meta = (b.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) || [])[1];
    console.log('Meta:', meta);
    const canonical = (b.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i) || [])[1];
    console.log('Canonical:', canonical);
    ['NaN', 'Infinity', 'undefined', 'null'].forEach(tok => {
      const re = new RegExp('>([^<]*?\\b' + tok + '\\b[^<]*?)<', 'g');
      const m = [...b.matchAll(re)];
      console.log('Visible token', tok, 'count:', m.length);
    });

    // Check related blocks
    const relatedTop = b.includes('RELATED CALCULATORS');
    const relatedBottom = b.includes('Related Transportation &amp; Energy Calculators') || b.includes('Related Transportation');
    console.log('Related top block present:', relatedTop);
    console.log('Related bottom block present:', relatedBottom);
  });
});

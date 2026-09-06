const http = require('http');

http.get('http://localhost:3000/calculators/square-footage-calculator', (res) => {
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
    console.log('HAS SECTION 1:', data.includes('Understanding Square Footage: Core Mathematical Definition'));
    console.log('HAS SECTION 2:', data.includes('Mathematical Formulas Across All Geometric Shapes'));
    console.log('HAS SECTION 3:', data.includes('How to Measure Complex &amp; Irregular Floor Plans') || data.includes('How to Measure Complex & Irregular Floor Plans'));
    console.log('HAS SECTION 4:', data.includes('Material Waste Margins &amp; Packaging Conversion Guidelines') || data.includes('Material Waste Margins & Packaging Conversion Guidelines'));
    console.log('HAS FAQ TEXT:', data.includes('How do you convert square feet to square meters?'));
    const relatedCount = (data.match(/RELATED CALCULATORS:/g) || []).length;
    console.log('RELATED CALCULATORS COUNT:', relatedCount);
  });
}).on('error', (err) => {
  console.error('HTTP ERROR:', err.message);
});

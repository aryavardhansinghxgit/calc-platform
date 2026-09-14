const http = require('http');
http.get('http://localhost:3000/calculators/body-type-calculator', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const scripts = data.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];
    let faqSchemaCount = 0;
    scripts.forEach(s => {
      const content = s.replace(/<script[^>]*>/, '').replace(/<\/script>/, '');
      try {
        const parsed = JSON.parse(content);
        if (parsed['@type'] === 'FAQPage') {
          faqSchemaCount++;
          console.log('FAQ Schema entities count:', parsed.mainEntity.length);
          console.log('First schema question:', parsed.mainEntity[0]?.name);
          console.log('Last schema question:', parsed.mainEntity[parsed.mainEntity.length - 1]?.name);
        }
      } catch(e) {
        console.error('JSON-LD parse error:', e.message);
      }
    });
    console.log('Total FAQPage schemas found:', faqSchemaCount);
  });
});

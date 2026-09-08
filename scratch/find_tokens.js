const http = require('http');

http.get('http://localhost:3000/calculators/gas-mileage-calculator', res => {
  let b = '';
  res.on('data', c => b += c);
  res.on('end', () => {
    // Strip scripts and styles
    const cleanHtml = b.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                       .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

    ['NaN', 'Infinity', 'undefined', 'null'].forEach(tok => {
      const re = new RegExp('>([^<]*?\\b' + tok + '\\b[^<]*?)<', 'g');
      const matches = [...cleanHtml.matchAll(re)];
      console.log(`Visible text token '${tok}': ${matches.length} matches`);
      matches.forEach(m => console.log(`  Match: "${m[1].trim()}"`));
    });
  });
});

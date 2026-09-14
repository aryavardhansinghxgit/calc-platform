const http = require('http');

http.get('http://localhost:3000/calculators/bac-calculator', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status Code:', res.statusCode);
    const titleMatch = data.match(/<title>([^<]*)<\/title>/i);
    console.log('Title:', titleMatch ? titleMatch[1] : 'NONE');
    const metaDesc = data.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
    console.log('Meta Desc:', metaDesc ? metaDesc[1] : 'NONE');
    const h1Matches = data.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
    console.log('H1 Count:', h1Matches.length);
    h1Matches.forEach((h1, i) => console.log(`H1 #${i+1}:`, h1.trim()));
    console.log('Contains Calories Burned link:', data.includes('/calculators/calories-burned-calculator'));
    console.log('Contains Body Fat link:', data.includes('/calculators/body-fat-calculator'));
    console.log('Contains Lean Body Mass link:', data.includes('/calculators/lean-body-mass-calculator'));
    console.log('Contains Ideal Weight link:', data.includes('/calculators/ideal-weight-calculator'));
  });
}).on('error', err => console.error(err));

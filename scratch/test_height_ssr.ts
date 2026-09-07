async function testSSR() {
  const res = await fetch('http://localhost:3000/calculators/height-calculator');
  console.log('HTTP status:', res.status);
  const html = await res.text();
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  console.log('H1 occurrences:', h1Matches.length);
  console.log('H1 text:', h1Matches[0]);
  console.log('Title tag:', html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]);
  console.log('Meta description:', html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i)?.[1]);
  console.log('Canonical:', html.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i)?.[1]);
  console.log('Has NaN text:', html.includes('>NaN<') || html.includes(' NaN '));
  console.log('Has Infinity text:', html.includes('>Infinity<') || html.includes(' Infinity '));
  console.log('Has undefined text:', html.includes('>undefined<') || html.includes(' undefined '));
  console.log('Has Medical Disclaimer:', html.toLowerCase().includes('disclaimer') || html.toLowerCase().includes('not a medical diagnosis'));
  console.log('Has Educational Content:', html.includes('Introduction to Human Stature Genetics'));
  console.log('Has FAQ Section:', html.includes('Frequently Asked Questions'));
  console.log('Has Related Calculators:', html.includes('RELATED CALCULATORS'));
}
testSSR();

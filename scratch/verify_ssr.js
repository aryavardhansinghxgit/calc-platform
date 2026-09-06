async function run() {
  const res = await fetch('http://localhost:3000/calculators/concrete-calculator');
  console.log('HTTP STATUS:', res.status);
  const html = await res.text();
  
  const h1s = html.match(/<h1[^>]*>.*?<\/h1>/gi);
  console.log('H1 COUNT:', h1s?.length);
  console.log('H1 CONTENT:', h1s);

  const hasContent = html.includes('1. Concrete Volume &amp; Material Estimation Fundamentals');
  console.log('HAS EDUCATIONAL CONTENT:', hasContent);

  const hasDisclaimer = html.includes('Engineering &amp; Code Compliance Disclaimer');
  console.log('HAS DISCLAIMER:', hasDisclaimer);

  const hasFAQ = html.includes('Frequently Asked Questions');
  console.log('HAS FAQ (should be false):', hasFAQ);

  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*>/i);
  console.log('CANONICAL TAG:', canonicalMatch ? canonicalMatch[0] : 'None');

  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
  console.log('TITLE:', titleMatch ? titleMatch[1] : 'None');
}
run();

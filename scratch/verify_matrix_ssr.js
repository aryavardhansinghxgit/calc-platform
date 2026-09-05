async function checkMatrixSSR() {
  console.log('--- CHECKING MATRIX CALCULATOR SSR & HTML ---');
  const res = await fetch('http://localhost:3000/calculators/matrix-calculator');
  console.log('HTTP Status:', res.status);
  const html = await res.text();

  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  console.log('Page Title:', titleMatch ? titleMatch[1] : 'Not Found');

  const descMatch = html.match(/<meta name="description" content="([^"]+)"/);
  console.log('Meta Description:', descMatch ? descMatch[1] : 'Not Found');

  const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
  console.log('Canonical URL:', canonicalMatch ? canonicalMatch[1] : 'Not Found');

  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/g);
  console.log('H1 Count:', h1Matches ? h1Matches.length : 0);
  if (h1Matches) {
    h1Matches.forEach((h, i) => console.log(`H1 [${i}]:`, h.replace(/<[^>]+>/g, '').trim()));
  }

  // Educational content sections
  console.log('Contains Section 1 (Intro):', html.includes('1. Introduction to the Matrix Calculator'));
  console.log('Contains Section 2 (Concept):', html.includes('2. Mathematical Concept, Definitions &amp; Matrix Notation') || html.includes('2. Mathematical Concept, Definitions & Matrix Notation'));
  console.log('Contains Section 3 (Formulas):', html.includes('3. Core Matrix Formulas &amp; Non-Commutative Arithmetic') || html.includes('3. Core Matrix Formulas & Non-Commutative Arithmetic'));
  console.log('Contains Section 4 (How It Works):', html.includes('4. How the Calculation Works'));
  console.log('Contains Section 5 (Examples):', html.includes('5. Worked Calculation Examples'));
  console.log('Contains Section 6 (Visual Table):', html.includes('6. Visual Understanding'));
  console.log('Contains Section 7 (Mistakes):', html.includes('7. Common Errors'));
  console.log('Contains Section 8 (Applications):', html.includes('8. Real-World Applications'));
  console.log('Contains Section 9 (Related):', html.includes('9. Related Mathematical Concepts'));
  console.log('Contains Section 10 (Summary):', html.includes('10. Educational Summary'));

  // Verified internal links
  console.log('Contains link to Scientific Calculator:', html.includes('href="/calculators/scientific-calculator"'));
  console.log('Contains link to Distance Calculator:', html.includes('href="/calculators/distance-calculator"'));
  console.log('Contains link to Slope Calculator:', html.includes('href="/calculators/slope-calculator"'));
  console.log('Contains link to Quadratic Formula Calculator:', html.includes('href="/calculators/quadratic-formula-calculator"'));

  // Ensure no broken &det; strings remain
  console.log('Contains raw &det; entity error:', html.includes('&det;'));
}

checkMatrixSSR().catch(console.error);

async function checkSSR() {
  const res = await fetch('http://localhost:3000/calculators/distance-calculator');
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
  
  console.log('Contains Section 1:', html.includes('1. What Is Distance?'));
  console.log('Contains Section 2:', html.includes('2. Distance Between Two Points in 2D'));
  console.log('Contains Section 3:', html.includes('3. Distance in 3D Coordinates'));
  console.log('Contains Section 4:', html.includes('4. Distance Between Latitude and Longitude Coordinates'));
  console.log('Contains Section 5:', html.includes('5. What Is Great-Circle Distance?'));
  console.log('Contains Section 6:', html.includes('6. Speed, Distance and Time'));
  console.log('Contains Section 7:', html.includes('7. Point-to-Line Distance'));
  console.log('Contains Section 8:', html.includes('8. Distance Units and Conversions'));
  console.log('Contains Section 9:', html.includes('9. How the Distance Calculator Chooses the Formula'));
  console.log('Contains Section 10:', html.includes('10. Common Distance-Calculation Mistakes'));
  console.log('Contains Section 11:', html.includes('11. Worked Examples at a Glance'));
  console.log('Contains Section 12:', html.includes('12. Distance in Mathematics, Engineering and Navigation'));
  console.log('Contains Section 13:', html.includes('13. Distance Formula Reference'));
  console.log('Contains Understanding the Result:', html.includes('Understanding the Result'));
  console.log('Contains FAQs Heading:', html.includes('Frequently Asked Questions'));
  console.log('Contains Link to Slope Calculator:', html.includes('href="/calculators/slope-calculator"'));
  console.log('Contains Link to Pythagorean Calculator:', html.includes('href="/calculators/pythagorean-theorem-calculator"'));
  console.log('Contains Link to Triangle Calculator:', html.includes('href="/calculators/triangle-calculator"'));
  console.log('Contains Link to Standard Deviation Calculator:', html.includes('href="/calculators/standard-deviation-calculator"'));
}

checkSSR().catch(console.error);

async function verifySEO() {
  const res = await fetch('http://localhost:3000/calculators/z-score-calculator');
  console.log('HTTP Status:', res.status);
  const html = await res.text();

  // 1. Title
  const titleMatch = html.match(/<title>(.*?)<\/title>/);
  console.log('1. Title:', titleMatch ? titleMatch[1] : 'NONE');

  // 2. Meta description
  const metaMatch = html.match(/<meta\s+name="description"\s+content="(.*?)"/i) || html.match(/<meta\s+content="(.*?)"\s+name="description"/i);
  console.log('2. Meta Description:', metaMatch ? metaMatch[1] : 'NONE');

  // 3. H1
  const h1Matches = html.match(/<h1[^>]*>(.*?)<\/h1>/gi);
  console.log('3. H1 Count:', h1Matches ? h1Matches.length : 0);
  if (h1Matches) console.log('   H1 Content:', h1Matches[0].replace(/<[^>]+>/g, '').trim());

  // 4. Internal Links
  const hasStdDev = html.includes('href="/calculators/standard-deviation-calculator"');
  const hasConfInt = html.includes('href="/calculators/confidence-interval-calculator"');
  const hasStats = html.includes('href="/calculators/statistics-calculator"');
  console.log('4. Internal Links:');
  console.log('   Standard Deviation Calculator:', hasStdDev);
  console.log('   Confidence Interval Calculator:', hasConfInt);
  console.log('   Statistics Calculator:', hasStats);

  // 5. SVG Diagram
  const hasSVGDiagram = html.includes('How a Raw Score Becomes a Z-Score');
  console.log('5. Educational SVG Diagram:', hasSVGDiagram);

  // 6. Comparison Table
  const hasTable = html.includes('Z-Score vs Percentile vs Critical Value');
  console.log('6. Comparison Table:', hasTable);

  // 7. FAQs
  const faqHeadingMatches = (html.match(/Frequently Asked Questions/gi) || []).length;
  console.log('7. "Frequently Asked Questions" Headings:', faqHeadingMatches);
  const hasQ1 = html.includes('What is a z-score?');
  const hasQ37 = html.includes('Can I print or export a z-score report?');
  console.log('   First FAQ Present:', hasQ1);
  console.log('   Last FAQ Present:', hasQ37);

  // 8. Calculator Functions
  console.log('8. Calculator Live Engine Present (Z = 1.5000):', html.includes('1.5000'));
  console.log('   Master Action Toolbar Present:', html.includes('Normal Distribution Analysis Suite'));
}

verifySEO();

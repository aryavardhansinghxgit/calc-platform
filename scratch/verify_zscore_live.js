async function verifyLive() {
  const res = await fetch('http://localhost:3000/calculators/z-score-calculator');
  console.log('HTTP Status:', res.status);
  const html = await res.text();
  console.log('HTML Length:', html.length);
  console.log('Contains Z = 1.5000:', html.includes('1.5000'));
  console.log('Contains Master Action Toolbar:', html.includes('Normal Distribution Analysis Suite'));
  console.log('Contains Executive PDF & Print Report Preview:', html.includes('Executive PDF &amp; Print Report Preview (2 Pages)') || html.includes('Executive PDF & Print Report Preview'));
  console.log('Contains 4 Cards:');
  console.log('  Card 1 (Standard Z-Score):', html.includes('Standard Z-Score &amp; Probability Engine') || html.includes('Standard Z-Score & Probability Engine'));
  console.log('  Card 2 (Inverse Z-Score):', html.includes('Inverse Z-Score &amp; Critical Value Solver') || html.includes('Inverse Z-Score & Critical Value Solver'));
  console.log('  Card 3 (Interval Area):', html.includes('Interval &amp; Range Area Calculator') || html.includes('Interval & Range Area Calculator'));
  console.log('  Card 4 (Batch Dataset):', html.includes('Batch Dataset &amp; CSV Z-Score Analyzer') || html.includes('Batch Dataset & CSV Z-Score Analyzer'));
}

verifyLive();

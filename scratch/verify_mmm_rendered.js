async function verifyPage() {
  const res = await fetch('http://localhost:3000/calculators/mean-median-mode-calculator');
  const text = await res.text();
  console.log('HTTP Status:', res.status);
  console.log('Total HTML length:', text.length);

  const h1Matches = text.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  console.log('H1 Count:', h1Matches.length);
  h1Matches.forEach((h, i) => console.log(`H1 #${i+1}:`, h.replace(/<[^>]+>/g, '').trim()));

  console.log('Has Master Action Toolbar:');
  console.log('  Copy Summary:', text.includes('Copy Summary'));
  console.log('  Copy LaTeX:', text.includes('Copy LaTeX'));
  console.log('  Share:', text.includes('Share'));
  console.log('  Export CSV:', text.includes('Export CSV'));
  console.log('  Reset Defaults:', text.includes('Reset Defaults'));
  console.log('  Print / Save PDF:', text.includes('Print / Save PDF'));

  console.log('Modules:');
  console.log('  Card 1 Standard Raw:', text.includes('Standard Raw Data Stream Mode'));
  console.log('  Card 2 Advanced Means:', text.includes('Advanced Means Suite'));
  console.log('  Card 3 Grouped Data:', text.includes('Frequency Distribution / Grouped Data Mode'));
  console.log('  Card 4 Target Solver:', text.includes('Target Mean Solver'));
  console.log('  Card 5 Comparison:', text.includes('Two-Dataset Direct Comparison'));
  console.log('  Card 6 Outlier:', text.includes('Outlier Detection & Skewness Inspector'));

  console.log('Report Modal Present:', text.includes('mmm-report-content'));
}

verifyPage();

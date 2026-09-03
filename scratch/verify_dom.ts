async function main() {
  const res = await fetch("http://localhost:3000/calculators/pregnancy-weight-gain-calculator");
  const html = await res.text();

  const h1Matches = html.match(/<h1[^>]*>.*?<\/h1>/gi) || [];
  console.log("H1 Count:", h1Matches.length);
  h1Matches.forEach((h1) => console.log("  H1:", h1.replace(/<[^>]+>/g, "").trim()));

  const relatedMatches = html.match(/RELATED CALCULATORS/gi) || [];
  console.log("Related Calculators count:", relatedMatches.length);

  const faqHeaderMatches = html.match(/Frequently Asked Questions/gi) || [];
  console.log("FAQ header count in DOM:", faqHeaderMatches.length);

  const disclaimerMatches = html.match(/Medical Disclaimer/gi) || [];
  console.log("Disclaimer count in DOM:", disclaimerMatches.length);
}

main().catch(console.error);

export {};

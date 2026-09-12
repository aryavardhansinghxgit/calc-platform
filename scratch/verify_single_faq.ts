async function checkSingleFaq() {
  const res = await fetch("http://localhost:3000/calculators/mileage-calculator");
  const html = await res.text();

  const faqMatches = html.match(/Frequently Asked Questions/gi);
  console.log("Occurrences of 'Frequently Asked Questions':", faqMatches ? faqMatches.length : 0);

  // Check questions
  const hasQ21 = html.includes("How do I calculate my car&#x27;s mileage?") || html.includes("How do I calculate my car's mileage?");
  const hasQ36 = html.includes("Can the Mileage Calculator calculate EV charging cost?");
  console.log("Has Q21:", hasQ21);
  console.log("Has Q36:", hasQ36);

  // Check if generic fallback FAQ is rendered
  const hasGenericFaq = html.includes("How does Mileage Calculator work?");
  console.log("Has generic fallback FAQ:", hasGenericFaq);

  if (faqMatches && faqMatches.length === 1 && hasQ21 && hasQ36 && !hasGenericFaq) {
    console.log("SUCCESS: Exactly one FAQ section present with the full domain Q&A set!");
  } else {
    console.error("FAIL: FAQ occurrences or questions mismatch!");
    process.exit(1);
  }
}

checkSingleFaq();
